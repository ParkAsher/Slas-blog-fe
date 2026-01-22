const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

/**
 * 페이지뷰 트래킹 (POST /metrics/track, 204 No Content)
 * - 실패 시 throw. 호출부에서 catch 후 로깅만 하고 페이지 동작은 유지.
 *
 * @param visitorId 로그인: String(userId), 비로그인: localStorage UUID
 */
export async function trackPageView(visitorId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/metrics/track`, {
        method: 'POST',
        headers: {
            'x-visitor-id': visitorId,
            'Content-Type': 'application/json',
        },
        body: '{}',
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`[metrics] track failed: ${response.status}`);
    }
    // 204 No Content: body 없음, response.json() 호출하지 않음
}
