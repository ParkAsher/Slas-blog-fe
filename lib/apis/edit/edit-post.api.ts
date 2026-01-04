import { fetchApi } from '@/lib/apis/core';

export interface EditPostDto {
    title?: string;
    tags?: string[];
    content?: string;
    thumbnailUrl?: string | null;
}

export interface EditPostResponse {
    success: boolean;
}

export async function editPost(
    slug: string,
    data: EditPostDto,
    token?: string
): Promise<EditPostResponse> {
    return await fetchApi<EditPostResponse>(
        `/post/${slug}`,
        {
            method: 'PUT',
            body: data as any,
        },
        token
    );
}
