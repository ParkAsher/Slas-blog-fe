import type { PostDetail } from './get-post-detail.api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

/**
 * 서버 컴포넌트에서 사용하는 게시글 조회 함수
 * generateMetadata 등 서버 사이드에서 사용
 */
export async function getPostServer(slug: string): Promise<PostDetail | null> {
    try {
        const response = await fetch(`${API_BASE}/post/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // SEO를 위한 캐싱 설정
            // 60초마다 재검증 (ISR - Incremental Static Regeneration)
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            // 404인 경우 (게시글 없음)
            if (response.status === 404) {
                return null;
            }
            // 기타 에러는 throw
            throw new Error(`Failed to fetch post: ${response.status}`);
        }

        return response.json() as Promise<PostDetail>;
    } catch (error) {
        console.error('Error fetching post for SEO:', error);
        // 에러 발생 시 null 반환 (메타데이터 생성 실패 방지)
        return null;
    }
}
