export const dynamic = 'force-static';
export const revalidate = 300;
import { getAllArticles } from '@/lib/api';

const BASE = 'https://spotyflex.com';

// All category slugs that exist in your app
const CATEGORY_SLUGS = [
  'gym-workouts',
  'home-workouts',
  'fat-burning',
  'beginner',
  'meal-plans',
  'recipes',
  'supplements',
];

export default async function sitemap() {
  const articles = await getAllArticles();

  // ── Article URLs ──
  // Uses id-alias format to match /article/[slug] routes
  const articleUrls = articles.map(article => ({
    url: `${BASE}/article/${article.slug}`,
    lastModified: new Date(article.updatedDate || article.publishedDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // ── Category URLs ──
  const categoryUrls = CATEGORY_SLUGS.map(slug => ({
    url: `${BASE}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // ── Static URLs ──
  const staticUrls = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...articleUrls];
}