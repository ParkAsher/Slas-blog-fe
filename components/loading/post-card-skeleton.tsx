import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostCardSkeleton() {
    return (
        <Card className='rounded-[4px] border-0 shadow-none p-0 md:py-6'>
            <CardHeader className='p-0 md:px-6'>
                <div className='md:hidden space-y-3'>
                    <Skeleton className="w-full aspect-video rounded-[4px]" />
                    <div className='space-y-2 px-4 py-3'>
                        <Skeleton className="h-5 w-3/4 rounded-[4px]" />
                        <Skeleton className="h-3 w-1/2 rounded-[4px]" />
                        <div className='flex flex-wrap gap-2 pt-1'>
                            <Skeleton className="h-5 w-16 rounded-[4px]" />
                            <Skeleton className="h-5 w-20 rounded-[4px]" />
                            <Skeleton className="h-5 w-14 rounded-[4px]" />
                        </div>
                    </div>
                </div>

                <div className='hidden md:flex items-stretch justify-between gap-4'>
                    <div className='flex-1 flex flex-col'>
                        <Skeleton className="h-6 w-3/4 rounded-[4px]" />
                        <Skeleton className="h-4 w-1/2 mt-2 mb-2 rounded-[4px]" />
                        <div className='flex flex-wrap gap-2 mt-auto'>
                            <Skeleton className="h-5 w-16 rounded-[4px]" />
                            <Skeleton className="h-5 w-20 rounded-[4px]" />
                            <Skeleton className="h-5 w-14 rounded-[4px]" />
                        </div>
                    </div>
                    <Skeleton className="w-64 aspect-video flex-shrink-0 rounded-[4px]" />
                </div>
            </CardHeader>
        </Card>
    );
}
