'use client';

import { Card, CardContent } from '@/components/ui/card';
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
export function VisitorStats({
    today,
    total,
    isLoading,
}: VisitorStatsProps) {
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    return (
        <Card className='w-full !py-0'>
            <CardContent className='py-1.5 px-3'>
                {isLoading ? (
                    <div className='flex items-center justify-center gap-4'>
                        <div className='space-y-0.5 text-center'>
                            <Skeleton className='h-2.5 w-10 mx-auto' />
                            <Skeleton className='h-3.5 w-16 mx-auto' />
                        </div>
                        <div className='h-6 w-px bg-border flex-shrink-0' />
                        <div className='space-y-0.5 text-center'>
                            <Skeleton className='h-2.5 w-10 mx-auto' />
                            <Skeleton className='h-3.5 w-16 mx-auto' />
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center gap-4'>
                        {/* Today */}
                        <div className='text-center'>
                            <p className='text-[10px] text-muted-foreground mb-1 leading-none'>
                                Today
                            </p>
                            <p className='text-xs font-semibold leading-tight'>
                                {today !== undefined ? formatNumber(today) : '-'}
                            </p>
                        </div>

                        {/* 구분선 */}
                        <div className='h-6 w-px bg-border flex-shrink-0' />

                        {/* Total */}
                        <div className='text-center'>
                            <p className='text-[10px] text-muted-foreground mb-1 leading-none'>
                                Total
                            </p>
                            <p className='text-xs font-semibold leading-tight'>
                                {total !== undefined ? formatNumber(total) : '-'}
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
