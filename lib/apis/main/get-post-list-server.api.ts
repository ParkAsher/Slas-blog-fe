import type { Post, GetPostsParams } from './get-post-list.api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

/**
 * 서버 컴포넌트에서 사용하는 게시글 목록 조회 함수
 * 메인 페이지 SSR 등 서버 사이드에서 사용
 */
export async function getPostsServer(params: GetPostsParams): Promise<Post[]> {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('page', params.page.toString());
        if (params.tag) {
            queryParams.append('tag', params.tag);
        }

        const response = await fetch(`${API_BASE}/post?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // SEO를 위한 캐싱 설정
            // 60초마다 재검증 (ISR - Incremental Static Regeneration)
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            // 에러 발생 시 빈 배열 반환 (SSR 실패 방지)
            if (response.status === 404) {
                return [];
            }
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        return response.json() as Promise<Post[]>;
    } catch (error) {
        console.error('Error fetching posts for SEO:', error);
        // 에러 발생 시 빈 배열 반환 (SSR 실패 방지)
        return [];
    }
}
