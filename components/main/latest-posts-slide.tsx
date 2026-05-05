'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { getLatestPosts, type Post } from '@/lib/apis/main';
import type { PostType } from '@/lib/apis/write';
import { PostCard } from './post-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const SECTION_TITLE: Record<PostType, string> = {
    dev: 'DEV',
    story: 'STORY',
};

export interface LatestPostsSlideProps {
    type: PostType;
}

export function LatestPostsSlide({ type }: LatestPostsSlideProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [snapCount, setSnapCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        const update = () => {
            setSnapCount(api.scrollSnapList().length);
            setSelectedIndex(api.selectedScrollSnap());
        };

        update();
        api.on('select', update);
        api.on('reInit', update);

        return () => {
            api.off('select', update);
            api.off('reInit', update);
        };
    }, [api]);

    const { data: posts, isLoading, isError, refetch } = useQuery<Post[]>({
        queryKey: ['posts', 'latest', type],
        queryFn: () => getLatestPosts(type),
        staleTime: 60 * 1000,
    });

    const title = SECTION_TITLE[type];
    const moreHref = `/${type}`;

    if (isLoading) {
        return (
            <section className='w-full space-y-4'>
                <div className='flex items-center justify-between pb-3 border-b border-border/60'>
                    <h2 className='text-xl font-bold tracking-tight'>{title}</h2>
                    <Link
                        href={moreHref}
                        className='text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors duration-150 py-2 -my-2'
                    >
                        더보기
                        <ChevronRight className='size-3.5' />
                    </Link>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className='flex flex-col gap-2'>
                            <Skeleton className='aspect-video w-full rounded-[4px]' />
                            <Skeleton className='h-4 w-3/4 rounded-[4px]' />
                            <Skeleton className='h-3 w-1/3 rounded-[4px]' />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className='w-full space-y-4'>
            <div className='flex items-center justify-between pb-3 border-b border-border/60'>
                <h2 className='text-xl font-bold tracking-tight'>{title}</h2>
                <Link
                    href={moreHref}
                    className='text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors duration-150 py-2 -my-2'
                >
                    더보기
                    <ChevronRight className='size-3.5' />
                </Link>
            </div>
            {isError || !posts?.length ? (
                <div className='w-full rounded-[4px] border border-dashed bg-muted/30 px-4 py-8 text-center'>
                    <p className='text-sm font-medium text-foreground'>
                        {isError ? `${title} 글을 불러오지 못했습니다.` : `${title} 글이 아직 없습니다.`}
                    </p>
                    <p className='mt-2 text-sm text-muted-foreground'>
                        {isError
                            ? '네트워크 상태를 확인한 뒤 다시 시도해 주세요.'
                            : '새 기록이 올라오면 이곳에 표시됩니다.'}
                    </p>
                    {isError && (
                        <Button
                            type='button'
                            variant='outline'
                            className='mt-5 rounded-[4px]'
                            onClick={() => refetch()}
                        >
                            다시 불러오기
                        </Button>
                    )}
                </div>
            ) : (
                <div className='w-full space-y-4'>
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: 'start',
                            loop: false,
                            skipSnaps: false,
                        }}
                        className='w-full'
                    >
                        <CarouselContent className='-ml-4'>
                            {posts.map((post) => (
                                <CarouselItem
                                    key={post.id}
                                    className='pl-4 basis-full sm:basis-1/2 md:basis-1/3'
                                >
                                    <PostCard post={post} postType={type} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    {snapCount > 1 && (
                        <div className='flex justify-center gap-1.5'>
                            {Array.from({ length: snapCount }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => api?.scrollTo(i)}
                                    aria-label={`${i + 1}번째 슬라이드`}
                                    className={cn(
                                        'size-2 rounded-full transition-colors duration-200',
                                        i === selectedIndex
                                            ? 'bg-foreground'
                                            : 'bg-border hover:bg-muted-foreground/50'
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
