import { getAllArticles } from '@/lib/api';

export const dynamic = "force-static";

export async function GET() {
  try {
    const articles = await getAllArticles();

    return Response.json(articles || [], {
      headers: {
        'Content-Type': 'application/json',
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
