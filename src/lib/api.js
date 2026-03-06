const JOOMLA_API = 'https://cms.spotyflex.com/api/index.php/v1/content/articles';
const JOOMLA_API_TOKEN = () => process.env.NEXT_PUBLIC_JOOMLA_TOKEN;

// Valid category IDs from your setup
const VALID_CATEGORIES = [15, 16, 17]; // workouts, nutrition, guides

// Cache duration: 5 minutes (300000ms)
// const CACHE_DURATION = 5 * 60 * 1000;
// let postsCache = null;
// let cacheTimestamp = 0;

// Normalize Joomla article data to clean structure
function normalizeArticle(rawArticle) {
  try {
    const article = rawArticle.attributes || rawArticle;
    // console.log('Article tags:', article.tags); // Debug log as requested

    if (article.state !== 1) {
      return null;
    }

    const categoryId = article.catid || article.category_id || article.categoryId || rawArticle.relationships?.category?.data?.id;

    if (!categoryId) {
      return null;
    }

    if (!VALID_CATEGORIES.includes(parseInt(categoryId))) {
      return null;
    }

    const categoryMap = {
      15: 'workouts',
      16: 'nutrition',
      17: 'guides'
    };

    // Extract image
    let image = null;
    if (article.images) {
      try {
        const imagesData = typeof article.images === 'string'
          ? JSON.parse(article.images)
          : article.images;
        image = imagesData.image_intro || imagesData.image_fulltext;

        if (image && !image.startsWith('http') && !image.startsWith('//')) {
          const baseUrl = 'https://cms.spotyflex.com/';
          // Remove leading slash if present to avoid double slash
          const cleanImage = image.startsWith('/') ? image.substring(1) : image;
          image = `${baseUrl}${cleanImage}`;
        }
      } catch (e) {
        console.error('Failed to parse images:', e);
      }
    }

    // Define cleanContent first for the full article content
    const rawHtml = article.text || article.introtext || article.fulltext || '';
    const cleanContent = rawHtml
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '');

    // Improved excerpt extraction
    const fullContent = (article.introtext || article.text || article.fulltext || '')
      .replace(/<script[^>]*>.*?<\/script>/gis, '')
      .replace(/<style[^>]*>.*?<\/style>/gis, '')
      .replace(/<!--.*?-->/gis, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\{[^{}]*\}/g, '')     // strip JSON blobs
      .replace(/\[[^\[\]]*\]/g, '')   // strip shortcodes
      .replace(/https?:\/\/\S+/g, '') // strip URLs
      .replace(/&[a-z]+;/gi, ' ')     // strip HTML entities
      .replace(/\s+/g, ' ')
      .trim();

    // Remove title prefix if present
    let cleanedTextForExcerpt = fullContent;
    if (article.title && cleanedTextForExcerpt.toLowerCase().startsWith(article.title.toLowerCase())) {
      cleanedTextForExcerpt = cleanedTextForExcerpt.substring(article.title.length).replace(/^[|:\-\s]+/, '').trim();
    }

    // Strip any remaining non-readable characters
    cleanedTextForExcerpt = cleanedTextForExcerpt.replace(/[^\w\s.,!?'"-]/g, ' ').replace(/\s+/g, ' ').trim();

    const excerpt = cleanedTextForExcerpt.substring(0, 300).trim() + (cleanedTextForExcerpt.length > 300 ? '...' : '');

    // Validate required fields
    if (!article.title || !article.alias) {
      return null;
    }

    // Calculate actual read time based on text content
    const plainText = (article.text || article.introtext || article.fulltext || '')
      .replace(/<[^>]*>/g, ' ');
    const wordCount = plainText.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) || 1;

    return {
      id: article.id,
      title: article.title,
      slug: `${article.id}-${article.alias}`,
      excerpt: excerpt,
      content: cleanContent, // Full HTML content
      image: image,
      category: categoryMap[parseInt(categoryId)] || 'general',
      categoryId: parseInt(categoryId),
      publishedDate: String(article.created), // Ensure it's a string
      updatedDate: String(article.modified || article.created), // Ensure it's a string
      author: article.created_by_alias || 'SpotyFlex Team',
      readTime: readTime,
      tags: Array.isArray(article.tags)
        ? article.tags.map(t => t.title || t.name || t).filter(Boolean)
        : (article.tags && typeof article.tags === 'object')
          ? Object.values(article.tags).map(t => t.title || t.name || t).filter(Boolean)
          : [],
    };
  } catch (error) {
    console.error('Error normalizing article:', error);
    return null;
  }
}

// Sort articles by creation date (newest first)
function sortArticlesByDate(a, b) {
  return new Date(b.publishedDate) - new Date(a.publishedDate);
}

// Fetch all articles with pagination support
export async function getAllArticles() {
  try {
    // Check cache first
    // const now = Date.now();
    // if (postsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    //   return postsCache;
    // }

    // console.log('🔄 Fetching from Joomla API with pagination...');

    let allRawPosts = [];
    let nextUrl = JOOMLA_API;
    let pageCount = 0;

    // Fetch all pages
    while (nextUrl && pageCount < 10) { // Limit to 10 pages max (safety)
      pageCount++;
      // console.log(`📄 Fetching page ${pageCount}...`);

      const res = await fetch(nextUrl, {
        headers: {
          'Authorization': `Bearer ${JOOMLA_API_TOKEN()}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ API Error:', res.status, errorText);
        break;
      }

      const text = await res.text();
      let data;
      try {
        // Find JSON start and end robustly
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');

        if (firstBrace === -1 || lastBrace === -1) {
          throw new Error('No JSON object delimiters found');
        }

        const jsonString = text.substring(firstBrace, lastBrace + 1);
        data = JSON.parse(jsonString);
      } catch (e) {
        console.error('❌ JSON Parsing failed:', e.message);
        // Log truncated snippet for debugging without flooding
        console.log('Snippet:', text.length > 200 ? text.substring(0, 200) + '...' : text);
        break;
      }

      const pagePosts = data.data || [];

      // console.log(`  ✓ Received ${pagePosts.length} articles from page ${pageCount}`);

      allRawPosts = [...allRawPosts, ...pagePosts];

      // Check if there's a next page
      nextUrl = data.links?.next || null;

      if (!nextUrl) {
        // console.log('✓ All pages fetched');
        break;
      }
    }

    // console.log('📊 Total raw articles received (all pages):', allRawPosts.length);

    // Normalize and filter articles
    const normalizedPosts = allRawPosts
      .map((article, index) => normalizeArticle(article, index))
      .filter((post) => post !== null);

    // console.log('✅ Total normalized articles:', normalizedPosts.length);

    // Sort by date (newest first)
    const sortedPosts = normalizedPosts.sort(sortArticlesByDate);

    // Update cache
    // postsCache = sortedPosts;
    // cacheTimestamp = Date.now();

    return sortedPosts;
  } catch (error) {
    console.error('💥 Failed to fetch articles:', error);
    return [];
  }
}

// Fetch single article by slug
// Fetch single article by slug - NOW WITH FULL CONTENT
// Fetch single article by slug
export async function getArticleBySlug(slug) {
  try {
    // Extract the numeric id from the start of the slug (e.g. "42-my-article")
    const id = parseInt(slug.split('-')[0]);

    if (!isNaN(id)) {
      // First try: fetch directly by id from Joomla API (fast, reliable)
      const res = await fetch(`${JOOMLA_API}/${id}`, {
        headers: {
          'Authorization': `Bearer ${JOOMLA_API_TOKEN()}`,
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
      });

      if (res.ok) {
        const text = await res.text();
        try {
          const firstBrace = text.indexOf('{');
          const lastBrace = text.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1) {
            const data = JSON.parse(text.substring(firstBrace, lastBrace + 1));
            const normalized = normalizeArticle(data.data || data);
            if (normalized) return normalized;
          } else {
            // Try parsing directly if no braces found (unlikely but possible if it's already clean)
            const data = JSON.parse(text);
            const normalized = normalizeArticle(data.data || data);
            if (normalized) return normalized;
          }
        } catch (e) {
          console.error('Failed to parse single article response:', e.message);
        }
      }
    }

    // Fallback: search in cached articles
    const allArticles = await getAllArticles();
    return allArticles.find(post => post.slug === slug) || null;

  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

// Fetch articles by category
export async function getArticlesByCategory(category) {
  try {
    const allArticles = await getAllArticles();
    return allArticles.filter((post) => post.category === category);
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return [];
  }
}

// Fetch recent articles
export async function getRecentArticles(limit = 10) {
  try {
    const allArticles = await getAllArticles();
    return allArticles.slice(0, limit);
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    return [];
  }
}

// Fetch featured articles
export async function getFeaturedArticles(limit = 3) {
  try {
    const allArticles = await getAllArticles();
    // Logic to select featured articles (e.g., specific IDs, tags, or random)
    // For now, we'll take the first 3
    return allArticles.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}