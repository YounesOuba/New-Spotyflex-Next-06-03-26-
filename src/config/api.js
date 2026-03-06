/**
 * API Configuration for SpotyFlex Frontend
 * Backend endpoints and configuration
 */

export const API_CONFIG = {
  // Base API URL - adjust based on environment
  BASE_URL: typeof window !== 'undefined' 
    ? window.location.origin  // Uses current domain
    : 'https://spotyflex.com',
  
  // API Endpoints
  ENDPOINTS: {
    // Subscribe/Email endpoints
    SUBSCRIBE: '/api/subscribe.php',
    UNSUBSCRIBE: '/api/unsubscribe.php',
    
    // Contact form
    CONTACT: '/api/sendContact.php',
    
    // Comments
    GET_COMMENTS: '/api/getComments.php',
    ADD_COMMENT: '/api/addComment.php',
    UPDATE_COMMENT: '/api/updateComment.php',
    DELETE_COMMENT: '/api/deleteComment.php',
    
    // Article notifications (Joomla webhook)
    SEND_NEW_ARTICLE: '/api/sendNewArticle.php',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Headers configuration
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // API validation helpers
  VALIDATION: {
    // Email regex pattern
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Minimum lengths
    MIN_LENGTH: {
      email: 5,
      name: 2,
      message: 10,
      comment: 1,
      subject: 3,
    },
    
    // Maximum lengths
    MAX_LENGTH: {
      name: 100,
      message: 5000,
      comment: 1000,
      subject: 200,
    },
  },
};

/**
 * Make API request with error handling
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.HEADERS,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Subscribe email endpoint
 */
export async function subscribeEmail(email) {
  return apiRequest(API_CONFIG.ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/**
 * Submit contact form
 */
export async function submitContact(data) {
  return apiRequest(API_CONFIG.ENDPOINTS.CONTACT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get comments for article
 */
export async function getComments(articleSlug) {
  return apiRequest(
    `${API_CONFIG.ENDPOINTS.GET_COMMENTS}?article_slug=${encodeURIComponent(articleSlug)}`
  );
}

/**
 * Add comment to article
 */
export async function addComment(data) {
  return apiRequest(API_CONFIG.ENDPOINTS.ADD_COMMENT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update existing comment
 */
export async function updateComment(data) {
  return apiRequest(API_CONFIG.ENDPOINTS.UPDATE_COMMENT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Delete comment
 */
export async function deleteComment(data) {
  return apiRequest(API_CONFIG.ENDPOINTS.DELETE_COMMENT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export default API_CONFIG;
