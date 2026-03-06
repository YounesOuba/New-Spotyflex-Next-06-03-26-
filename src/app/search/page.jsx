export const dynamic = 'force-static';

export const metadata = {
  title: 'Search Articles — Find Workouts & Nutrition Tips',
  description: 'Search the SpotyFlex fitness library for specific workout routines, healthy recipes, and expert training advice.',
  alternates: { canonical: 'https://spotyflex.com/search' },
};

import SearchContent from '@/components/SearchContent';

export default function SearchPage() {
  return <SearchContent />;
}