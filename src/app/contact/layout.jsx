// Server component layout — provides metadata for the /contact route.
// The page itself is 'use client', so metadata must live here.

export const metadata = {
    title: 'Contact Us — Training Questions & Collaboration',
    description: 'Have a training question, want to collaborate, or give feedback? Contact the SpotyFlex team. We read every message and typically reply within 24 hours.',
    alternates: { canonical: 'https://spotyflex.com/contact' },
    openGraph: {
        title: 'Contact SpotyFlex — Get in Touch',
        description: 'Reach out to the SpotyFlex team with training questions, collaboration ideas, or general feedback. We read every message.',
        url: 'https://spotyflex.com/contact',
        type: 'website',
    },
    twitter: {
        title: 'Contact SpotyFlex',
        description: 'Have a training question or want to collaborate? Reach out to the SpotyFlex team.',
    },
};

export default function ContactLayout({ children }) {
    return children;
}
