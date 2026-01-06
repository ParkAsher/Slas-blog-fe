'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts, type Post } from '@/lib/apis/main';
import { PostListSkeleton } from '@/components/loading';
import { PostCard } from './post-card';

interface PostListProps {
    selectedTag?: string;
    initialPosts?: Post[];
}

export function PostList({ selectedTag, initialPosts }: PostListProps) {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfiniteQuery({
            queryKey: ['posts', selectedTag],
            queryFn: ({ pageParam = 1 }) =>
                getPosts({
                    page: pageParam,
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
            initialData:
                initialPosts && !selectedTag
                    ? {
                          pages: [initialPosts],
                          pageParams: [1],
                      }
                    : undefined,
        });

    // 무한스크롤 감지
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
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

    // 초기 데이터가 있고 태그 필터가 없으면 스켈레톤 표시 안 함
    if (isLoading && (!initialPosts || selectedTag)) {
        return <PostListSkeleton />;
    }

    if (isError) {
        return (
            <div className='text-center py-10'>
                <p className='text-muted-foreground'>게시글을 불러오는 중 오류가 발생했습니다.</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className='text-center py-10'>
                <p className='text-muted-foreground'>게시글이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            <div ref={loadMoreRef} className='h-10' />
            {isFetchingNextPage && <PostListSkeleton count={2} />}
        </div>
    );
}
