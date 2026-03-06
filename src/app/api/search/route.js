import { getAllArticles } from '@/lib/api';
import { searchArticles } from '@/lib/search';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Get query parameter
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';

    // Validate query
    if (!q || q.length < 1) {
      return Response.json([], {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }

    // Fetch all articles
    const articles = await getAllArticles();

    if (!articles || articles.length === 0) {
      return Response.json([], {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }

    // Search articles
    const results = searchArticles(articles, q, 8); // Limit to 8 results for modal

    return Response.json(results, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
    });
  } catch (error) {
    console.error('❌ Search API Error:', error);
    return Response.json(
      { error: 'Search failed', message: error.message },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
