import { fetchApi } from '@/lib/apis/core';
import type { Post } from '@/lib/apis/main/get-post-list.api';

export interface PostDetail extends Post {
    content: string;
    updatedAt: string;
}

/**
 * 게시글 조회 함수
 */
export async function getPost(slug: string): Promise<PostDetail | null> {
    try {
        return await fetchApi<PostDetail>(`/post/${slug}`, {
            method: 'GET',
        });
    } catch (error) {
        // ApiError 타입 확인
        const apiError = error as { status?: number; message?: string };

        // 404인 경우 (게시글 없음)
        if (apiError.status === 404) {
            return null;
        }

        console.error('Error fetching post:', error);
        // 에러 발생 시 null 반환
        return null;
    }
}
