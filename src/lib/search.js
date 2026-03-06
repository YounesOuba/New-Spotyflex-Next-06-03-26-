/**
 * Advanced search utilities for articles
 * Provides intelligent article ranking and matching
 */

// Normalize text for better searching
export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ');
}

// Split query into tokens for multi-word search
export function tokenizeQuery(query) {
  return normalizeText(query).split(' ').filter(token => token.length > 0);
}

// Calculate similarity score between two strings (0-1)
export function calculateSimilarity(str1, str2, minLength = 3) {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);

  if (s1 === s2) return 1;
  if (s1.length < minLength || s2.length < minLength) return 0;

  // Check if one contains the other
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;

  // Levenshtein-like simple similarity
  let matches = 0;
  const tokens1 = s1.split(' ');
  const tokens2 = s2.split(' ');

  tokens1.forEach(token => {
    if (tokens2.some(t => t.includes(token) || token.includes(t))) {
      matches++;
    }
  });

  return matches / Math.max(tokens1.length, tokens2.length);
}

// Enhanced scoring function for articles
export function scoreArticle(article, query) {
  if (!query || query.trim().length === 0) return 0;

  const tokens = tokenizeQuery(query);
  let score = 0;

  // Title match (highest weight: 3x)
  if (article.title) {
    const titleNorm = normalizeText(article.title);
    tokens.forEach(token => {
      if (titleNorm.includes(token)) {
        score += 30 * (token.length / titleNorm.length); // Weight by relevance
      }
    });
  }

  // Category match (2x)
  if (article.category) {
    const categoryNorm = normalizeText(article.category);
    tokens.forEach(token => {
      if (categoryNorm.includes(token)) {
        score += 20;
      }
    });
  }

  // Tags match (2x)
  if (article.tags && Array.isArray(article.tags)) {
    const tagsStr = normalizeText(article.tags.join(' '));
    tokens.forEach(token => {
      if (tagsStr.includes(token)) {
        score += 20;
      }
    });
  }

  // Excerpt match (1.5x)
  if (article.excerpt) {
    const excerptNorm = normalizeText(article.excerpt);
    tokens.forEach(token => {
      if (excerptNorm.includes(token)) {
        score += 15;
      }
    });
  }

  // Content match (1x) - but only if query is substantial
  if (article.content && tokens.some(t => t.length > 3)) {
    const contentNorm = normalizeText(article.content);
    tokens.forEach(token => {
      if (contentNorm.includes(token)) {
        score += 5;
      }
    });
  }

  return score;
}

// Main search function
export function searchArticles(articles, query, limit = 10) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results = articles
    .map(article => ({
      ...article,
      _score: scoreArticle(article, query),
    }))
    .filter(article => article._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);

  return results;
}

// Group search results by category
export function groupResultsByCategory(articles) {
  const grouped = {
    workouts: [],
    nutrition: [],
    guides: [],
  };

  articles.forEach(article => {
    const category = article.category || 'guides';
    if (grouped[category]) {
      grouped[category].push(article);
    }
  });

  return grouped;
}

// Get search suggestions (popular articles, tags, categories)
export function getSearchSuggestions(articles, query = '') {
  const suggestions = {
    trending: getTrendingTopics(articles),
    tags: getPopularTags(articles),
    categories: getPopularCategories(articles),
    articles: getPopularArticles(articles, 5),
  };

  if (query && query.trim().length > 0) {
    suggestions.matches = searchArticles(articles, query, 5);
  }

  return suggestions;
}

// Get popular categories
export function getPopularCategories(articles) {
  const categories = {};
  articles.forEach(article => {
    const cat = article.category || 'guides';
    categories[cat] = (categories[cat] || 0) + 1;
  });
  return Object.entries(categories)
    .sort(([, a], [, b]) => b - a)
    .map(([cat, count]) => ({ name: cat, count }));
}

// Get popular tags
export function getPopularTags(articles) {
  const tags = {};
  articles.forEach(article => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1;
      });
    }
  });
  return Object.entries(tags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 50)
    .map(([tag, count]) => ({ name: tag, count }));
}

// Get most popular articles
export function getPopularArticles(articles, limit = 10) {
  return articles.slice(0, limit);
}

// Get trending topics based on tags
export function getTrendingTopics(articles) {
  return [
    'HIIT Workouts',
    'Meal Prep',
    'Protein Intake',
    'Recovery Tips',
    'Cardio Plans',
    'Strength Training',
    'Weight Loss',
    'Nutrition',
    'Fitness Guide',
    'Home Workout',
  ];
}

// Create a searchable index from articles (for future optimization)
export function createSearchIndex(articles) {
  const index = {
    titleIndex: {},
    tagIndex: {},
    categoryIndex: {},
    contentIndex: {},
    articles: articles,
    timestamp: Date.now(),
  };

  articles.forEach(article => {
    // Index by title words
    const titleTokens = tokenizeQuery(article.title);
    titleTokens.forEach(token => {
      if (!index.titleIndex[token]) index.titleIndex[token] = [];
      index.titleIndex[token].push(article.id);
    });

    // Index by tags
    if (article.tags) {
      article.tags.forEach(tag => {
        const tagNorm = normalizeText(tag);
        if (!index.tagIndex[tagNorm]) index.tagIndex[tagNorm] = [];
        index.tagIndex[tagNorm].push(article.id);
      });
    }

    // Index by category
    const cat = article.category || 'general';
    if (!index.categoryIndex[cat]) index.categoryIndex[cat] = [];
    index.categoryIndex[cat].push(article.id);

    // Index content (first 50 tokens only for performance)
    const contentTokens = tokenizeQuery(article.excerpt).split(' ').slice(0, 50);
    contentTokens.forEach(token => {
      if (!index.contentIndex[token]) index.contentIndex[token] = [];
      if (!index.contentIndex[token].includes(article.id)) {
        index.contentIndex[token].push(article.id);
      }
    });
  });

  return index;
}

// Search using index for faster results
export function searchArticlesWithIndex(index, query, limit = 10) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const tokens = tokenizeQuery(query);
  const relevantIds = new Set();
  const scores = {};

  // Collect matching article IDs from all indices
  tokens.forEach(token => {
    // Title index (highest weight)
    if (index.titleIndex[token]) {
      index.titleIndex[token].forEach(id => {
        scores[id] = (scores[id] || 0) + 30;
      });
    }

    // Tag index (high weight)
    if (index.tagIndex[token]) {
      index.tagIndex[token].forEach(id => {
        scores[id] = (scores[id] || 0) + 20;
      });
    }

    // Category index (medium weight)
    if (index.categoryIndex[token]) {
      index.categoryIndex[token].forEach(id => {
        scores[id] = (scores[id] || 0) + 15;
      });
    }

    // Content index (lower weight)
    if (index.contentIndex[token]) {
      index.contentIndex[token].forEach(id => {
        scores[id] = (scores[id] || 0) + 5;
      });
    }
  });

  // Convert scores to results
  const results = Object.entries(scores)
    .map(([id, score]) => {
      const article = index.articles.find(a => a.id == id);
      return { ...article, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);

  return results;
}
