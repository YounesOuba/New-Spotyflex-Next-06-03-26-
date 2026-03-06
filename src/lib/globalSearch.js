/**
 * Global Search Utilities
 * Centralized search functionality for the entire application
 * 
 * Usage:
 * import { useGlobalSearch, useQuickSearch } from '@/lib/globalSearch';
 */

import { searchArticles, getSearchSuggestions, groupResultsByCategory } from './search';
import { getAllArticles } from './api';

let articlesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get all articles with caching
 */
async function getCachedArticles() {
  const now = Date.now();
  
  // Return cached articles if still fresh
  if (articlesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return articlesCache;
  }

  // Fetch fresh articles
  const articles = await getAllArticles();
  articlesCache = articles;
  cacheTimestamp = now;
  
  return articles;
}

/**
 * Perform a search across all articles
 * @param {string} query - Search query
 * @param {number} limit - Maximum results to return
 * @returns {Promise<Array>} - Search results ranked by relevance
 */
export async function performSearch(query, limit = 10) {
  try {
    const articles = await getCachedArticles();
    return searchArticles(articles, query, limit);
  } catch (error) {
    console.error('Global search error:', error);
    return [];
  }
}

/**
 * Perform quick search (used in search modal)
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Top 5-8 results for quick display
 */
export async function performQuickSearch(query) {
  return performSearch(query, 8);
}

/**
 * Get search suggestions (trending, tags, popular articles)
 * @param {string} query - Optional search query to filter suggestions
 * @returns {Promise<Object>} - Suggestions object with trending, tags, articles
 */
export async function getSearchSuggestionsGlobal(query = '') {
  try {
    const articles = await getCachedArticles();
    return getSearchSuggestions(articles, query);
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return {
      trending: [],
      tags: [],
      categories: [],
      articles: [],
    };
  }
}

/**
 * Get grouped search results by category
 * @param {string} query - Search query
 * @returns {Promise<Object>} - Results grouped by category
 */
export async function getGroupedSearchResults(query) {
  try {
    const articles = await getCachedArticles();
    const results = searchArticles(articles, query);
    return groupResultsByCategory(results);
  } catch (error) {
    console.error('Error getting grouped results:', error);
    return { workouts: [], nutrition: [], guides: [] };
  }
}

/**
 * Clear search cache
 * Useful after adding new articles
 */
export function clearSearchCache() {
  articlesCache = null;
  cacheTimestamp = null;
}

/**
 * Get search statistics
 * @returns {Promise<Object>} - Stats about available articles and tags
 */
export async function getSearchStats() {
  try {
    const articles = await getCachedArticles();
    
    const stats = {
      totalArticles: articles.length,
      categories: {},
      tagCount: 0,
      averageReadTime: 0,
      lastUpdated: new Date().toISOString(),
    };

    // Count by category
    articles.forEach(article => {
      const cat = article.category || 'general';
      stats.categories[cat] = (stats.categories[cat] || 0) + 1;
    });

    // Count unique tags
    const uniqueTags = new Set();
    articles.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => uniqueTags.add(tag));
      }
    });
    stats.tagCount = uniqueTags.size;

    // Calculate average read time
    const totalReadTime = articles.reduce((sum, a) => sum + (a.readTime || 0), 0);
    stats.averageReadTime = Math.round(totalReadTime / articles.length) || 0;

    return stats;
  } catch (error) {
    console.error('Error getting search stats:', error);
    return {};
  }
}

/**
 * React Hook for using global search in components
 * Usage: const { search, results, loading } = useGlobalSearch();
 */
export function useGlobalSearch() {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const search = React.useCallback(async (query) => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchResults = await performSearch(query.trim());
      setResults(searchResults);
    } catch (err) {
      setError(err.message);
      setResults([]);
      console.error('Search hook error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { search, results, loading, error };
}

/**
 * React Hook for quick search (optimized for modals/dropdowns)
 */
export function useQuickSearch() {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const quickSearch = React.useCallback(async (query) => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const searchResults = await performQuickSearch(query.trim());
      setResults(searchResults);
    } catch (err) {
      console.error('Quick search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { quickSearch, results, loading };
}

/**
 * Advanced search with filters
 * @param {string} query - Search query
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} - Filtered and ranked results
 */
export async function advancedSearch(query, filters = {}) {
  try {
    let articles = await getCachedArticles();

    // Apply category filter
    if (filters.category) {
      articles = articles.filter(a => a.category === filters.category);
    }

    // Apply tag filter
    if (filters.tags && Array.isArray(filters.tags)) {
      articles = articles.filter(a =>
        filters.tags.some(tag =>
          a.tags && a.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    // Apply date range filter
    if (filters.dateFrom || filters.dateTo) {
      articles = articles.filter(a => {
        const aDate = new Date(a.publishedDate);
        if (filters.dateFrom && aDate < new Date(filters.dateFrom)) return false;
        if (filters.dateTo && aDate > new Date(filters.dateTo)) return false;
        return true;
      });
    }

    // Apply read time filter
    if (filters.minReadTime || filters.maxReadTime) {
      articles = articles.filter(a => {
        const readTime = a.readTime || 0;
        if (filters.minReadTime && readTime < filters.minReadTime) return false;
        if (filters.maxReadTime && readTime > filters.maxReadTime) return false;
        return true;
      });
    }

    // Search filtered articles
    return searchArticles(articles, query, filters.limit || 20);
  } catch (error) {
    console.error('Advanced search error:', error);
    return [];
  }
}

export default {
  performSearch,
  performQuickSearch,
  getSearchSuggestionsGlobal,
  getGroupedSearchResults,
  getSearchStats,
  clearSearchCache,
  advancedSearch,
};
