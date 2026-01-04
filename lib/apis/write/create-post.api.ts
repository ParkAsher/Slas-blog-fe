import { fetchApi } from '@/lib/apis/core';

export interface CreatePostDto {
    title: string;
    tags: string[];
    content: string;
    thumbnailUrl?: string | null;
}

export interface CreatePostResponse {
    success: boolean;
}

export async function createPost(data: CreatePostDto, token?: string): Promise<CreatePostResponse> {
    return await fetchApi<CreatePostResponse>(
        '/post',
        {
            method: 'POST',
            body: data as any,
        },
        token
    );
}
