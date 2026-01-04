import { fetchApi } from '@/lib/apis/core';
import type { Post } from '@/lib/apis/main/get-post-list.api';

export interface PostDetail extends Post {
    content: string;
    updatedAt: string;
}

export async function getPost(slug: string): Promise<PostDetail> {
    return fetchApi<PostDetail>(`/post/${slug}`, {
        method: 'GET',
    });
}
