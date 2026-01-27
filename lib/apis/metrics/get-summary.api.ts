import { fetchApi } from '@/lib/apis/core';

export interface MetricsSummary {
    today: number;
    total: number;
}

/**
 * 방문자 통계 요약 조회
 * - today: 오늘 방문자 수 (Redis HLL)
 * - total: 누적 방문자 수 (DB 합계)
 */
export async function getSummary(): Promise<MetricsSummary> {
    return fetchApi<MetricsSummary>('/metrics/summary', {
        method: 'GET',
    });
}
