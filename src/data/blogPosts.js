import axios from 'axios';

// Cache for posts to avoid redundant API calls
let postsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Joomla API endpoint & token
// const JOOMLA_API = '/api/index.php/v1/content/articles';
const JOOMLA_API = `${import.meta.env.VITE_API_URL}/index.php/v1/content/articles`;
const JOOMLA_API_TOKEN = import.meta.env.VITE_JOOMLA_TOKEN || 'c2hhMjU2OjUxMDoxYzYyYTgzMWYwY2E2ZjgyYTFjODdjMmM5Y2Q3YTk2YjQ1NjM1NjIwMDVhN2ZjNjVmMzNjOWI3MTdjN2JhOGUy';

/**
 * Extract clean HTML content from Joomla article text
 * Removes HTML tags and unwanted elements
 */
const extractBodyContent = (html) => {
  if (!html) return '';

  // Remove everything before <body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;

  // Remove <style>, <script>, <meta>, <link>, <head>
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<meta[^>]*>/gi, '');
  content = content.replace(/<link[^>]*>/gi, '');
  content = content.replace(/<head[\s\S]*?<\/head>/gi, '');

  return content.trim();
};

/**
 * Parse images from Joomla article metadata
 */
const parseArticleImages = (images) => {
  let imagesObj = {};
  let imageUrl = '';

  if (!images) {
    return { imagesObj, imageUrl };
  }

  try {
    imagesObj = typeof images === 'string' ? JSON.parse(images) : images;
    imageUrl = imagesObj?.image_intro || imagesObj?.image_fulltext || '';
  } catch {
    imagesObj = images;
    imageUrl = imagesObj?.image_intro || imagesObj?.image_fulltext || '';
  }

  return { imagesObj, imageUrl };
};

/**
 * Detect article primary category from metadata
 * workouts | nutrition | guides
 * Uses Joomla category IDs: 15=workouts, 16=nutrition, 17=guides
 */
const detectPrimaryCategory = (item) => {
  const attrs = item.attributes || item;
  
  // Try multiple ways to get category ID
  let catId = attrs.catid || attrs.category_id;
  
  // If no catid in attributes, try relationships
  if (!catId && item.relationships && item.relationships.category && item.relationships.category.data) {
    catId = item.relationships.category.data.id;
  }
  
  if (catId) {
    const catIdStr = String(catId);
    switch (catIdStr) {
      case '15':
        return 'workouts';
      case '16':
        return 'nutrition';
      case '17':
        return 'guides';
      default:
        return null; // Don't process articles in other categories
    }
  }

  // Fallback: If no category found, try to detect from tags
  const tags = attrs.tags;
  if (tags && typeof tags === 'object') {
    const tagsArray = Array.isArray(tags) ? tags : Object.values(tags);
    const tagsStr = tagsArray.map(t => String(t).toLowerCase()).join(',');
    if (tagsStr.includes('gym') || tagsStr.includes('workout') || tagsStr.includes('strength') || tagsStr.includes('exercise')) {
      if (import.meta.env.DEV) console.log(`[FALLBACK] Detected "workouts" from tags for: "${attrs.title}"`);
      return 'workouts';
    }
    if (tagsStr.includes('nutrition') || tagsStr.includes('diet') || tagsStr.includes('meal')) {
      return 'nutrition';
    }
    if (tagsStr.includes('guide') || tagsStr.includes('beginner')) {
      return 'guides';
    }
  }

  return null;
};

/**
 * Normalize tags to lowercase kebab-case
 */
const normalizeTags = (tags) => {
  let tagsArr = [];

  if (Array.isArray(tags)) {
    tagsArr = tags
      .map((tag) => {
        const tagStr = String(tag.title || tag).toLowerCase().trim();
        // Convert spaces to hyphens
        return tagStr.replace(/\s+/g, '-');
      })
      .filter(Boolean);
  } else if (tags && typeof tags === 'object') {
    tagsArr = Object.values(tags)
      .map((t) => {
        const tagStr = String(t).toLowerCase().trim();
        return tagStr.replace(/\s+/g, '-');
      })
      .filter((t) => typeof t === 'string' && !!t);
  }

  return tagsArr;
};

/**
 * Extract read time from article metadata
 */
const extractReadTime = (metadata, attribs) => {
  try {
    const metaObj = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;
    if (metaObj?.readTime) return metaObj.readTime;
  } catch {
    // Silently fail if JSON parsing fails
  }

  try {
    const attribsObj = typeof attribs === 'string' ? JSON.parse(attribs) : attribs;
    if (attribsObj?.readTime) return attribsObj.readTime;
  } catch {
    // Silently fail if JSON parsing fails
  }

  return '';
};

/**
 * Normalize raw article data from Joomla into clean BlogPost structure
 */
const normalizeArticle = (item) => {
  const attrs = item.attributes || item;

  // ⚠️ CRITICAL: Only process published articles (state === 1)
  // Filter out: state 0 (draft), state 2 (archived), state -2 (trashed)
  if (attrs.state !== 1) {
    return null;
  }

  // Validate required fields
  if (!attrs.title || !attrs.alias) {
    return null;
  }

  // Parse images
  const { imagesObj, imageUrl } = parseArticleImages(attrs.images);

  // Extract content (Joomla uses 'text' field for full HTML content)
  const rawHtml = attrs.text || attrs.introtext || '';
  const introtext = extractBodyContent(rawHtml);
  const fulltext = extractBodyContent(attrs.fulltext || '');
  const contentString = `${introtext}${fulltext}`;
  
  // For API articles, preserve the full HTML with embedded styles
  // This will be used by ArticlePage to extract and apply Joomla styles
  const fullHtmlContent = rawHtml || contentString;

  // Extract category and tags
  const primaryCategory = detectPrimaryCategory(item);
  
  // Only process articles with valid category (workouts, nutrition, or guides)
  if (!primaryCategory) {
    if (import.meta.env.DEV) console.log(`[FILTERED OUT] Article: "${attrs.title}" - Category ID not recognized`);
    return null;
  }
  
  const tags = normalizeTags(attrs.tags);
  
  // DEBUG: Log category info
  if (import.meta.env.DEV) console.log(`[INCLUDED] Article: "${attrs.title}" | Category: ${primaryCategory} | Tags: ${JSON.stringify(tags)}`);

  // Extract metadata
  const readTime = attrs.note || extractReadTime(attrs.metadata, attrs.attribs);
  const href = attrs.alias || String(item.id);

  return {
    id: String(item.id),
    title: attrs.title,
    alias: attrs.alias,
    introtext,
    fulltext,
    content: introtext,
    fullContent: fullHtmlContent,
    readTime,
    image: imageUrl,
    images: imagesObj,
    metadesc: attrs.metadesc || '',
    metakey: attrs.metakey || '',
    created: attrs.created || '',
    modified: attrs.modified || '',
    publishedAt: attrs.created || '',
    primaryCategory,
    tags,
    href,
    featured: attrs.featured === 1,
    language: attrs.language || '*',
    note: attrs.note || '',
    hits: attrs.hits || 0,
    access: attrs.access || 0,
    ordering: attrs.ordering || 0,
  };
};

/**
 * Compare dates for sorting (newest first)
 */
const sortArticlesByDate = (a, b) => {
  const dateA = new Date(a.created).getTime();
  const dateB = new Date(b.created).getTime();
  return dateB - dateA; // Newest first
};

export const getAllPosts = async () => {
  try {
    // Check cache first - avoid redundant API calls
    const now = Date.now();
    if (postsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      if (import.meta.env.DEV) console.log('[CACHE HIT] Returning cached posts');
      return postsCache;
    }

    const res = await axios.get(JOOMLA_API, {
      headers: {
        Authorization: `Bearer ${JOOMLA_API_TOKEN}`,
      },
    });

    const rawPosts = res.data.data || [];

    if (import.meta.env.DEV) console.log(`\n[API RESPONSE] Received ${rawPosts.length} articles from API`);

    // DEBUG: Log first article structure to see what fields are available
    if (rawPosts.length > 0) {
      if (import.meta.env.DEV) console.log('Sample article structure:', JSON.stringify(rawPosts[0], null, 2));
    }

    // Step 1: Filter articles by state === 1 (published only)
    // Normalize article data into clean structure
    const normalizedPosts = rawPosts
      .map(normalizeArticle)
      .filter((post) => post !== null); // Remove null entries

    if (normalizedPosts.length === 0) {
      if (import.meta.env.DEV) console.warn('[WARNING] No articles were processed after normalization!');
      return [];
    }

    // DEBUG: Show category breakdown
    const categoryBreakdown = {
      workouts: normalizedPosts.filter(p => p.primaryCategory === 'workouts').length,
      nutrition: normalizedPosts.filter(p => p.primaryCategory === 'nutrition').length,
      guides: normalizedPosts.filter(p => p.primaryCategory === 'guides').length,
    };
    if (import.meta.env.DEV) console.log('[CATEGORY BREAKDOWN]', categoryBreakdown);

    // Step 2: Sort articles by creation date (newest first)
    const sortedPosts = normalizedPosts.sort(sortArticlesByDate);

    // Step 3: Final validation - ensure all posts have valid href
    const validatedPosts = sortedPosts.filter(
      (post) => !!post.href && post.href.trim() !== ''
    );

    if (import.meta.env.DEV) console.log(`[FINAL] Returning ${validatedPosts.length} validated articles`);
    
    // Update cache
    postsCache = validatedPosts;
    cacheTimestamp = Date.now();
    
    return validatedPosts;
  } catch (err) {
    console.error(
      'Failed to fetch posts from Joomla API:',
      err.response?.data || err.message
    );
    return [];
  }
};
