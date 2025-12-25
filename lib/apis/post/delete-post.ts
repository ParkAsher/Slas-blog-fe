import { fetchApi } from '@/lib/api';

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
