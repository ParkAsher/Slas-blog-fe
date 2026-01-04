import { fetchApi } from '@/lib/apis/core';

export interface DeletePostResponse {
    success: boolean;
}

export async function deletePost(slug: string, token: string): Promise<DeletePostResponse> {
    return fetchApi<DeletePostResponse>(
        `/post/${slug}`,
        {
            method: 'DELETE',
        },
        token
    );
}
