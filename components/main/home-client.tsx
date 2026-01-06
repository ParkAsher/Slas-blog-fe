'use client';

import { useState } from 'react';
import { TagList } from '@/components/main/tag-list';
import { PostList } from '@/components/main/post-list';
import type { Post } from '@/lib/apis/main';
import type { Tag } from '@/lib/apis/main';

interface HomeClientProps {
    initialPosts: Post[];
    initialTags: Tag[];
}

export function HomeClient({ initialPosts, initialTags }: HomeClientProps) {
    const [selectedTag, setSelectedTag] = useState<string | undefined>();

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
                    initialTags={initialTags}
                />
            </div>

            {/* 데스크톱: 왼쪽 태그 리스트 */}
            <aside className='hidden md:block w-40 flex-shrink-0'>
                <div className='sticky top-4'>
                    <TagList
                        selectedTag={selectedTag}
                        onTagSelect={handleTagSelect}
                        variant='vertical'
                        initialTags={initialTags}
                    />
                </div>
            </aside>

            {/* 게시글 리스트 */}
            <main className='flex-1 min-w-0'>
                <PostList selectedTag={selectedTag} initialPosts={initialPosts} />
            </main>
        </div>
    );
}
