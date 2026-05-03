'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { getLatestPosts, type Post } from '@/lib/apis/main';
import type { PostType } from '@/lib/apis/write';
import { PostCard } from './post-card';
import { Skeleton } from '@/components/ui/skeleton';

const SECTION_TITLE: Record<PostType, string> = {
    dev: 'DEV',
    story: 'STORY',
};

export interface LatestPostsSlideProps {
    type: PostType;
}

export function LatestPostsSlide({ type }: LatestPostsSlideProps) {
    const { data: posts, isLoading, isError } = useQuery<Post[]>({
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
                        className='text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors duration-150'
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
                    className='text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors duration-150'
                >
                    더보기
                    <ChevronRight className='size-3.5' />
                </Link>
            </div>
            {isError || !posts?.length ? (
                <div className='w-full rounded-[4px] border border-dashed bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground'>
                    게시글이 존재하지 않습니다
                </div>
            ) : (
                <div className='relative w-full'>
                    <Carousel
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
                        <CarouselPrevious className='left-0 top-1/2 -translate-y-1/2 sm:-left-2 md:-left-4' />
                        <CarouselNext className='right-0 top-1/2 -translate-y-1/2 sm:-right-2 md:-right-4' />
                    </Carousel>
                </div>
            )}
        </section>
    );
}
