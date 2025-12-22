import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostCardSkeleton() {
    return (
        <Card className='p-0 md:py-6'>
            <CardHeader className='p-0 md:px-6'>
                {/* 모바일: 썸네일 상단 */}
                <div className='md:hidden space-y-3'>
                    <Skeleton className="w-full aspect-video" />
                    <div className='space-y-2 px-4 py-3'>
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <div className='flex flex-wrap gap-2 pt-1'>
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-14" />
                        </div>
                    </div>
                </div>

                {/* 데스크톱: 기존 레이아웃 */}
                <div className='hidden md:flex items-stretch justify-between gap-4'>
                    <div className='flex-1 flex flex-col'>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2 mb-2" />
                        <div className='flex flex-wrap gap-2 mt-auto'>
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-14" />
                        </div>
                    </div>
                    <Skeleton className="w-64 aspect-video flex-shrink-0" />
                </div>
            </CardHeader>
        </Card>
    );
}

