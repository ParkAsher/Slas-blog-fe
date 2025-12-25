import { fetchApi } from '@/lib/api';
import type { Post } from '@/lib/apis/main/get-post-list';

export interface PostDetail extends Post {
    content: string;
    updatedAt: string;
}

export async function getPost(slug: string): Promise<PostDetail> {
    return fetchApi<PostDetail>(`/post/${slug}`, {
        method: 'GET',
    });
}
