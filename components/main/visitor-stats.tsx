'use client';

import { Skeleton } from '@/components/ui/skeleton';

interface VisitorStatsProps {
    today?: number;
    total?: number;
    isLoading?: boolean;
}

/**
 * 방문자 통계 카드 컴포넌트
 * - Today: 오늘 방문자 수
 * - Total: 누적 방문자 수
 */
export function VisitorStats({ today, total, isLoading }: VisitorStatsProps) {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    const content = isLoading ? (
        <div className='flex items-center justify-center gap-5'>
            <div className='flex items-center gap-2'>
                <Skeleton className='h-3.5 w-12' />
                <Skeleton className='h-5 w-14' />
            </div>
            <div className='h-5 w-px bg-border flex-shrink-0' />
            <div className='flex items-center gap-2'>
                <Skeleton className='h-3.5 w-12' />
                <Skeleton className='h-5 w-14' />
            </div>
        </div>
    ) : (
        <div className='flex items-center justify-center gap-5'>
            <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground leading-none'>Today</span>
                <span className='text-sm font-semibold leading-tight'>
                    {today !== undefined ? formatNumber(today) : '-'}
                </span>
            </div>
            <div className='h-5 w-px bg-border flex-shrink-0' />
            <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground leading-none'>Total</span>
                <span className='text-sm font-semibold leading-tight'>
                    {total !== undefined ? formatNumber(total) : '-'}
                </span>
            </div>
        </div>
    );

    // 항상 embedded 모드로 사용됨
    return <div className='w-full text-sm'>{content}</div>;
}
