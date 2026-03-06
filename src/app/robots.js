export const dynamic = 'force-static';

export default function robots() {
    return {
        rules: [
            // Standard crawlers — allow everything except private/admin
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/admin/'],
            },
            // Block AI training crawlers
            { userAgent: 'GPTBot', disallow: '/' },
            { userAgent: 'Google-Extended', disallow: '/' },
            { userAgent: 'CCBot', disallow: '/' },
            { userAgent: 'anthropic-ai', disallow: '/' },
            { userAgent: 'Claude-Web', disallow: '/' },
            { userAgent: 'Bytespider', disallow: '/' },
            { userAgent: 'FacebookBot', disallow: '/' },
            { userAgent: 'Applebot-Extended', disallow: '/' },
            { userAgent: 'cohere-ai', disallow: '/' },
        ],
        sitemap: 'https://spotyflex.com/sitemap.xml',
    };
}
