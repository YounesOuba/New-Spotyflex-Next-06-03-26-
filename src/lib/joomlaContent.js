/**
 * Scopes all CSS rules to a given container selector.
 * Example: h2 { ... } => .sf-article-capsule[data-article-id="123"] h2 { ... }
 * Handles most common selectors, ignores @keyframes/@font-face.
 */
export function scopeCssToContainer(css, containerSelector) {
  if (!css || !containerSelector) return css;

  // Helper to scope selectors
  const scopeSelectors = (selectors) => {
    return selectors.split(',').map(sel => {
      sel = sel.trim();
      // Don't double-scope if already inside container
      if (sel.startsWith(containerSelector)) return sel;
      // Don't scope :root, html, body, or @ rules
      if (/^(:root|html|body|@)/.test(sel)) return sel;
      return `${containerSelector} ${sel}`;
    }).join(', ');
  };

  // Handle @media and other at-rules with nested blocks
  const scopedCss = css.replace(/@media[^{]+{[^{}]*{[^{}]*}[^{}]*}/g, block => {
    return block.replace(/([^{}/]+){([^}]*)}/g, (match, selectors, body) => {
      if (/^\s*@/.test(selectors)) return match;
      const scoped = scopeSelectors(selectors);
      return `${scoped} {${body}}`;
    });
  });

  // Scope top-level rules (not inside @media)
  const finalCss = scopedCss.replace(/([^{}/]+){([^}]*)}/g, (match, selectors, body) => {
    if (/^\s*@/.test(selectors)) return match;
    const scoped = scopeSelectors(selectors);
    return `${scoped} {${body}}`;
  });

  return finalCss;
}

/**
 * PERMANENT SOLUTION: Extract styles and preserve them AS-IS
 * No CSS manipulation, no scoping, no parsing - just extract and return
 */
export const extractJoomlaStyles = (html) => {
  // Handle empty or invalid input
  if (!html || typeof html !== 'string') {
    if (import.meta.env.DEV) console.warn('[extractJoomlaStyles] Empty or invalid input');
    return { html: '', css: '' };
  }

  const styles = [];
  
  // Extract ALL <style> tags - preserve content EXACTLY as-is
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  
  while ((match = styleRegex.exec(html)) !== null) {
    const cssContent = match[1];
    
    // Handle CDATA wrapped CSS (Joomla sometimes wraps it)
    const cdataMatch = cssContent.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
    const css = cdataMatch ? cdataMatch[1] : cssContent;
    
    if (css.trim()) {
      styles.push(css);
      if (import.meta.env.DEV) console.log(`[extractJoomlaStyles] Extracted style block, length: ${css.length}`);
    }
  }

  // Remove only the <style> tags from HTML, preserve everything else
  const cleanHtml = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Join all CSS without any modification or scoping
  const finalCss = styles.join('\n');

  if (import.meta.env.DEV) {
    console.log(`[extractJoomlaStyles] Found ${styles.length} style blocks`);
    console.log(`[extractJoomlaStyles] CSS length: ${finalCss.length}, HTML length: ${cleanHtml.length}`);
  }

  return {
    html: cleanHtml,
    css: finalCss,
  };
};

/**
 * Ensures article content has proper HTML structure for styling
 */
export const ensureProperHtmlStructure = (content) => {
  if (!content || typeof content !== 'string') {
    if (import.meta.env.DEV) console.warn('[ensureProperHtmlStructure] Empty or invalid content');
    return '';
  }

  const isHtml = content.includes('<') && content.includes('>');
  if (import.meta.env.DEV) console.log(`[ensureProperHtmlStructure] Content length: ${content.length}, isHTML: ${isHtml}`);

  if (isHtml) {
    if (import.meta.env.DEV) console.log('[ensureProperHtmlStructure] Content is HTML, returning as-is');
    return content;
  }

  if (import.meta.env.DEV) console.log('[ensureProperHtmlStructure] Content is plain text, wrapping in HTML tags');
  const paragraphs = content
    .split(/\n\n+/)
    .filter(p => p.trim())
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  const result = paragraphs || `<p>${content}</p>`;
  if (import.meta.env.DEV) console.log('[ensureProperHtmlStructure] Wrapped content:', result.substring(0, 100) + '...');
  return result;
};

/**
 * Legacy function - extracts article content and styles
 */
export const extractArticleContent = (html) => {
  const { html: content, css: styles } = extractJoomlaStyles(html);

  return {
    styles,
    content,
  };
};
