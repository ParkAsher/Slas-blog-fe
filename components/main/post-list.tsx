'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/apis/main';
import type { PostType } from '@/lib/apis/write';
import { PostListSkeleton } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { PostCard } from './post-card';

interface PostListProps {
    type?: PostType;
    selectedTag?: string;
    onClearTag?: () => void;
}

export function PostList({ type, selectedTag, onClearTag }: PostListProps) {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
        useInfiniteQuery({
            queryKey: ['posts', type, selectedTag],
            queryFn: ({ pageParam = 1 }) =>
                getPosts({
                    page: pageParam,
                    ...(type && { type }),
                    ...(selectedTag && { tag: selectedTag }),
                }),
            getNextPageParam: (lastPage, allPages) => {
                // 마지막 페이지에 데이터가 있으면 다음 페이지로
                if (lastPage && lastPage.length > 0) {
                    return allPages.length + 1;
                }
                return undefined;
            },
            initialPageParam: 1,
        });

    // 무한스크롤 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 },
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const posts = data?.pages.flat() || [];

    if (isLoading) {
        return <PostListSkeleton />;
    }

    if (isError) {
        return (
            <div className='rounded-[4px] border border-dashed bg-muted/30 px-4 py-10 text-center'>
                <p className='text-sm font-medium text-foreground'>게시글을 불러오지 못했습니다.</p>
                <p className='mt-2 text-sm text-muted-foreground'>
                    잠시 후 다시 시도하거나 다른 글 목록으로 이동해 주세요.
                </p>
                <Button
                    type='button'
                    variant='outline'
                    className='mt-5 rounded-[4px]'
                    onClick={() => refetch()}
                >
                    다시 불러오기
                </Button>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            {posts.length === 0 ? (
                <div className='rounded-[4px] border border-dashed bg-muted/30 px-4 py-10 text-center'>
                    <p className='text-sm font-medium text-foreground'>
                        {selectedTag ? `'${selectedTag}' 태그의 글이 없습니다.` : '아직 게시글이 없습니다.'}
                    </p>
                    <p className='mt-2 text-sm text-muted-foreground'>
                        {selectedTag
                            ? '전체 글로 돌아가 다른 기록을 이어서 읽어보세요.'
                            : '새 기록이 올라오면 이곳에 표시됩니다.'}
                    </p>
                    {selectedTag && onClearTag && (
                        <Button
                            type='button'
                            variant='outline'
                            className='mt-5 rounded-[4px]'
                            onClick={onClearTag}
                        >
                            전체 글 보기
                        </Button>
                    )}
                </div>
            ) : (
                <div className='grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} postType={type} />
                    ))}
                </div>
            )}
            <div ref={loadMoreRef} className='h-10' />
            {isFetchingNextPage && <PostListSkeleton count={2} />}
        </div>
    );
}
