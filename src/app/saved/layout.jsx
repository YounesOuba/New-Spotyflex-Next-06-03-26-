// Server component layout — provides metadata for the /saved route.
// The page itself is 'use client', so metadata must live here.

export const metadata = {
    title: 'Saved Articles — Your Reading List',
    description: 'View and manage your saved SpotyFlex fitness articles. Bookmark workouts, nutrition guides, and wellness tips to read later at your convenience.',
    robots: { index: false, follow: false }, // Private/personal page — no value in indexing
    alternates: { canonical: 'https://spotyflex.com/saved' },
    openGraph: {
        title: 'Your Saved Articles — SpotyFlex',
        description: 'Access your personal reading list of bookmarked fitness articles on SpotyFlex.',
        url: 'https://spotyflex.com/saved',
        type: 'website',
    },
};

export default function SavedLayout({ children }) {
    return children;
}
