import { MetadataRoute } from 'next';

const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nnouss.xyz'
).replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/write/', '/post/*/edit/', '/adm/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
