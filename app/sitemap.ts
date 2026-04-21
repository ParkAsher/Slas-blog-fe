import { MetadataRoute } from 'next';

const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nnouss.xyz'
).replace(/\/$/, '');
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/signin`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    let postPages: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_BASE}/post/all`, {
            next: { revalidate: 86400 },
        });
        if (res.ok) {
            const posts: { slug: string; createdAt: string }[] = await res.json();
            postPages = posts.map((post) => ({
                url: encodeURI(`${SITE_URL}/post/${post.slug}`),
                lastModified: new Date(post.createdAt),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));
        }
    } catch (error) {
        console.error('사이트맵 생성 중 오류:', error);
    }

    return [...staticPages, ...postPages];
}
