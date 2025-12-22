import { Skeleton } from '@/components/ui/skeleton';

interface TagListSkeletonProps {
    variant?: 'vertical' | 'horizontal';
}

export function TagListSkeleton({ variant = 'vertical' }: TagListSkeletonProps) {
    if (variant === 'horizontal') {
        return (
            <div className='w-full'>
                <Skeleton className='h-4 w-20 mb-2' />
                <div className='flex gap-2 overflow-x-auto pb-2'>
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className='h-8 w-24 flex-shrink-0 rounded-full' />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='space-y-2'>
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='h-8 w-full' />
            ))}
        </div>
    );
}

