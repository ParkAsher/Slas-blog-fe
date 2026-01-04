'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/apis/post';
import type { ApiError } from '@/lib/apis/core';
import { PostDetailHeader } from '@/components/post/post-detail-header';
import { PostDetailContent } from '@/components/post/post-detail-content';
import { PostDetailActions } from '@/components/post/post-detail-actions';

interface PostDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
    const { slug } = use(params);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => getPost(slug),
    });

    if (isLoading) {
        return (
            <div className='text-center py-10'>
                <p className='text-muted-foreground'>게시글을 불러오는 중...</p>
            </div>
        );
    }

    if (isError) {
        // 404 에러인 경우 (게시글을 찾을 수 없음)
        const apiError = error as ApiError;
        if (apiError?.status === 404) {
            return (
                <div className='text-center py-10'>
                    <p className='text-muted-foreground'>게시글을 찾을 수 없습니다.</p>
                </div>
            );
        }

        // 기타 에러
        const errorMessage =
            error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        return (
            <div className='text-center py-10 space-y-2'>
                <p className='text-muted-foreground'>게시글을 불러오는 중 오류가 발생했습니다.</p>
                <p className='text-sm text-destructive'>{errorMessage}</p>
            </div>
        );
    }

    // 에러가 없는데 데이터가 없는 경우 (예상치 못한 상황)
    if (!data) {
        return (
            <div className='text-center py-10'>
                <p className='text-muted-foreground'>게시글 데이터를 불러올 수 없습니다.</p>
            </div>
        );
    }

    return (
        <article className='space-y-8'>
            <PostDetailHeader post={data} />
            <PostDetailContent content={data.content} />
            <PostDetailActions authorId={data.author.id} slug={data.slug} />
        </article>
    );
}
