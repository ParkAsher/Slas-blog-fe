import { fetchApi } from '@/lib/apis/core';

export interface ChartData {
    date: string;
    dau: number;
    pv: number;
}

export interface MetricsChart {
    data: ChartData[];
}

/**
 * 통계 그래프 데이터 조회
 * - 최근 5일 일별 데이터 (DAU, PV)
 */
export async function getChart(): Promise<MetricsChart> {
    return fetchApi<MetricsChart>('/metrics/chart', {
        method: 'GET',
    });
}
