import { fetchApi } from '@/lib/apis/core';

export interface SitemapPost {
    slug: string;
    createdAt: string;
}

export async function getAllPosts(): Promise<SitemapPost[]> {
    return fetchApi<SitemapPost[]>('/post/all', {
        method: 'GET',
    });
}
