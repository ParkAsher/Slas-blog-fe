'use client';

import { useQuery } from '@tanstack/react-query';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { getChart } from '@/lib/apis/metrics/get-chart.api';
import { LineChart, Line, XAxis, CartesianGrid } from 'recharts';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const chartConfig = {
    dau: {
        label: 'DAU',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

/**
 * 다음 00시 10분까지의 시간(ms) 계산
 */
function getTimeUntilNextUpdate(): number {
    const now = new Date();
    const target = new Date();
    target.setHours(0, 10, 0, 0); // 오늘 00시 10분

    // 이미 00시 10분이 지났으면 내일 00시 10분으로 설정
    if (now >= target) {
        target.setDate(target.getDate() + 1);
    }

    return target.getTime() - now.getTime();
}

/**
 * 방문자 통계 그래프 컴포넌트
 * - 최근 5일 일별 데이터 (DAU)
 * - 매일 00시 10분에 자동 갱신
 * - 항상 embedded 모드로 사용됨 (외부 Card 없이 내용만 렌더)
 */
export function VisitorChart() {
    const { data: chartData, isLoading } = useQuery({
        queryKey: ['metrics', 'chart'],
        queryFn: getChart,
        staleTime: Infinity, // 수동 갱신 전까지 stale하지 않음
        refetchInterval: (query) => {
            // 다음 00시 10분까지의 시간 반환
            return getTimeUntilNextUpdate();
        },
        retry: 1,
    });

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return format(date, 'M/d', { locale: ko });
        } catch {
            return dateStr;
        }
    };

    if (isLoading) {
        return (
            <div className='p-2'>
                <Skeleton className='h-32 w-full' />
            </div>
        );
    }

    if (!chartData?.data || chartData.data.length === 0) {
        return null;
    }

    return (
        <div className='w-full'>
            <ChartContainer config={chartConfig} className='h-[180px] w-full'>
                <LineChart
                    accessibilityLayer
                    data={chartData.data}
                    margin={{
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 8,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey='date'
                        tickFormatter={formatDate}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={12}
                        interval={0}
                        padding={{ left: 20, right: 20 }}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line
                        dataKey='dau'
                        type='monotone'
                        stroke='#38bdf8'
                        strokeWidth={2}
                        dot={{
                            fill: '#38bdf8',
                            r: 4,
                            strokeWidth: 2,
                            stroke: '#fff',
                        }}
                        activeDot={{
                            r: 6,
                            fill: '#38bdf8',
                        }}
                        connectNulls={true}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    );
}
