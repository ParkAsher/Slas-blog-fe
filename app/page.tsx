'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TagList } from '@/components/main/tag-list';
import { PostList } from '@/components/main/post-list';
import { VisitorStats } from '@/components/main/visitor-stats';
import { VisitorChart } from '@/components/main/visitor-chart';
import { getSummary } from '@/lib/apis/metrics/get-summary.api';

export default function Home() {
    const [selectedTag, setSelectedTag] = useState<string | undefined>();

    const { data: summary, isLoading: isSummaryLoading } = useQuery({
        queryKey: ['metrics', 'summary'],
        queryFn: getSummary,
        staleTime: 60 * 60 * 1000, // 1시간
        refetchInterval: 60 * 60 * 1000, // 1시간마다 자동 갱신
        retry: 1,
    });

    const handleTagSelect = (tag: string | undefined) => {
        if (tag === undefined) {
            setSelectedTag(undefined);
        } else {
            setSelectedTag(selectedTag === tag ? undefined : tag);
        }
    };

    return (
        <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            {/* 모바일: 상단 태그 필터 바 */}
            <div className='md:hidden w-full min-w-0'>
                <TagList
                    selectedTag={selectedTag}
                    onTagSelect={handleTagSelect}
                    variant='horizontal'
                />
            </div>

            {/* 데스크톱: 왼쪽 태그 리스트 */}
            <aside className='hidden md:block w-40 flex-shrink-0'>
                <div className='sticky top-4'>
                    <TagList
                        selectedTag={selectedTag}
                        onTagSelect={handleTagSelect}
                        variant='vertical'
                    />
                </div>
            </aside>

            {/* 게시글 리스트 */}
            <main className='flex-1 min-w-0'>
                <div className='flex flex-col md:flex-row gap-4 mb-6'>
                    <div className='md:w-64 flex-shrink-0'>
                        <VisitorChart />
                    </div>
                    <div className='md:w-40 flex-shrink-0'>
                        <VisitorStats
                            today={summary?.today}
                            total={summary?.total}
                            isLoading={isSummaryLoading}
                        />
                    </div>
                </div>
                <PostList selectedTag={selectedTag} />
            </main>
        </div>
    );
}
