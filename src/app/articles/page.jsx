import { getAllArticles } from '@/lib/api';
import ArticlesContent from '@/components/ArticlesContent';

export const metadata = {
    title: 'Fitness Articles — Training, Nutrition & Wellness',
    description: 'Explore our full library of expert fitness articles. From high-intensity workouts and muscle-building plans to healthy recipes and nutrition tips.',
    alternates: { canonical: 'https://spotyflex.com/articles' },
    openGraph: {
        title: 'Fitness Articles — SpotyFlex Fitness Library',
        description: 'Browse all workouts, nutrition guides, and wellness tips to help you build a healthier life.',
        type: 'website',
        url: 'https://spotyflex.com/articles',
    },
};

export default async function ArticlesPage() {
    const articles = await getAllArticles();

    return (
        <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
            <ArticlesContent articles={articles} />
        </main>
    );
}
