import { getAllArticles, getFeaturedArticles } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import TopicsStrip from '@/components/TopicsStrip';
import LatestArticles from '@/components/LatestArticles';
import EmailSection from '@/components/EmailSection';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata = {
  title: 'SpotyFlex — Fitness, Workouts & Nutrition Blog',
  description: 'Discover science-backed workouts, meal plans, and nutrition guides on SpotyFlex. Build strength, burn fat, and live healthier — for every fitness level.',
  alternates: { canonical: 'https://spotyflex.com' },
  openGraph: {
    title: 'SpotyFlex — Fitness, Workouts & Nutrition Blog',
    description: 'Discover science-backed workouts, meal plans, and nutrition guides on SpotyFlex. Build strength, burn fat, and live healthier — for every fitness level.',
    url: 'https://spotyflex.com',
    type: 'website',
  },
  twitter: {
    title: 'SpotyFlex — Fitness, Workouts & Nutrition Blog',
    description: 'Discover science-backed workouts, meal plans, and nutrition guides on SpotyFlex.',
  },
};

export default async function HomePage() {
  const articles = await getAllArticles();
  const featuredArticles = await getFeaturedArticles(5);
  const latestArticle = articles[0] || null;
  const recentArticles = articles.slice(1, 25);

  // Calculate dynamic stats for the Hero layout
  const blogStats = {
    totalArticles: (articles || []).length,
    avgReadTime: (articles && articles.length > 0)
      ? Math.round(articles.reduce((acc, curr) => acc + (parseInt(curr.readTime) || 0), 0) / articles.length) + " min"
      : "0 min",
    topCategory: (articles && articles.length > 0)
      ? Object.entries(articles.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
      }, {})).sort((a, b) => b[1] - a[1])[0][0]
      : "General",
    weeklyNew: (articles || []).filter(a => {
      const pubDate = new Date(a.publishedDate);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return pubDate >= sevenDaysAgo;
    }).length,
  };

  return (
    <div className="min-h-screen bg-[#212121]">
      <HeroSection
        latestArticle={latestArticle}
        recentArticles={recentArticles.slice(0, 3)}
        blogStats={blogStats}
      />
      <TopicsStrip articles={articles} />
      {/* <CategorySection /> */}
      <FeaturedSection articles={featuredArticles} />
      <LatestArticles articles={recentArticles} />
      <EmailSection />
    </div>
  );
}