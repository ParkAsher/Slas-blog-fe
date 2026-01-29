'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TagList } from '@/components/main/tag-list';
import { PostList } from '@/components/main/post-list';
import { VisitorStats } from '@/components/main/visitor-stats';
import { VisitorChart } from '@/components/main/visitor-chart';
import { IntroSection } from '@/components/main/intro-section';
import { Card, CardContent } from '@/components/ui/card';
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
                <div className='flex flex-col md:flex-row md:items-stretch gap-4 mb-6'>
                    {/* 왼쪽: 소개 + Contact 링크 */}
                    <IntroSection />
                    {/* 오른쪽: 통계 그래프 하단에 Today/Total 합친 하나의 카드 (왼쪽 높이와 동일) */}
                    <div className='w-full md:w-64 flex-shrink-0 flex'>
                        <Card className='w-full h-full md:h-full flex flex-col min-h-[280px] md:min-h-0'>
                            <CardContent className='p-0 flex flex-col flex-1 min-h-0 justify-between'>
                                <div className='flex-shrink-0 px-6'>
                                    <VisitorChart />
                                </div>
                                <div className='flex-shrink-0'>
                                    <VisitorStats
                                        today={summary?.today}
                                        total={summary?.total}
                                        isLoading={isSummaryLoading}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                {/* 모바일: 게시글 바로 위에 태그 필터 */}
                <div className='md:hidden w-full min-w-0 mb-4'>
                    <TagList
                        selectedTag={selectedTag}
                        onTagSelect={handleTagSelect}
                        variant='horizontal'
                    />
                </div>
                <PostList selectedTag={selectedTag} />
            </main>
        </div>
    );
}
