'use client';

import { useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPostDate } from '@/lib/utils';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { Post } from '@/lib/apis/main';
import type { PostType } from '@/lib/apis/write';

interface PostCardProps {
    post: Post;
    postType?: PostType;
}

const POST_CARD_RADIUS_CLASS = 'rounded-[4px]';

function getCategoryTagClasses(postType: PostType) {
    const base =
        `text-[10px] md:text-xs px-2 py-1 ${POST_CARD_RADIUS_CLASS} border-0 transition-none ` +
        'focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0';

    if (postType === 'dev') {
        return [base, 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200'].join(' ');
    }
    return [base, 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'].join(' ');
}

function getCategoryCountClass(postType: PostType) {
    if (postType === 'dev') return 'text-sky-700 dark:text-sky-200';
    return 'text-rose-700 dark:text-rose-200';
}

interface TagsRowProps {
    tags: string[];
    tagClasses: string;
    tagCountClass: string;
}

function TagsRow({ tags, tagClasses, tagCountClass }: TagsRowProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const countMeasureRef = useRef<HTMLSpanElement>(null);
    const [visibleCount, setVisibleCount] = useState<number | null>(null);

    const measure = useCallback(() => {
        const container = containerRef.current;
        const measureEl = measureRef.current;
        const countMeasureEl = countMeasureRef.current;
        if (!container || !measureEl || !countMeasureEl) return;

        const hostWidth = container.parentElement?.clientWidth ?? container.clientWidth;
        if (hostWidth === 0) return;

        const gapWidth = 6;
        const tagWidths = Array.from(measureEl.children).map(
            (child) => (child as HTMLElement).getBoundingClientRect().width
        );
        const safetyWidth = 8;
        const availableWidth = Math.max(hostWidth - safetyWidth, 0);

        const getTagsWidth = (count: number) =>
            tagWidths.slice(0, count).reduce((total, width, index) => total + width + (index > 0 ? gapWidth : 0), 0);

        let nextVisibleCount = tags.length;

        for (let count = tags.length; count >= 0; count--) {
            const hiddenCount = tags.length - count;
            const tagsWidth = getTagsWidth(count);

            let countWidth = 0;
            if (hiddenCount > 0) {
                countMeasureEl.textContent = `+${hiddenCount}`;
                countWidth = countMeasureEl.getBoundingClientRect().width + (count > 0 ? gapWidth : 0);
            }

            if (tagsWidth + countWidth <= availableWidth) {
                nextVisibleCount = count;
                break;
            }
        }

        setVisibleCount((prev) => (prev === nextVisibleCount ? prev : nextVisibleCount));
    }, [tags.length]);

    useLayoutEffect(() => {
        measure();
    }, [measure]);

    useEffect(() => {
        const container = containerRef.current;
        const host = container?.parentElement;
        if (!host) return;

        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(host);

        return () => resizeObserver.disconnect();
    }, [measure]);

    useEffect(() => {
        if (!('fonts' in document)) return;

        let cancelled = false;
        document.fonts.ready.then(() => {
            if (!cancelled) measure();
        });

        return () => {
            cancelled = true;
        };
    }, [measure]);

    const ready = visibleCount !== null;
    const hiddenCount = ready ? tags.length - visibleCount : 0;
    const maxHiddenCount = Math.max(tags.length - 1, 1);

    return (
        <>
            <div
                ref={measureRef}
                className='absolute left-0 top-0 flex flex-nowrap items-center gap-1.5 pointer-events-none'
                style={{ visibility: 'hidden' }}
                aria-hidden='true'
            >
                {tags.map((tag) => (
                    <Badge key={tag} variant='outline' className={`${tagClasses} flex-shrink-0`}>
                        {tag}
                    </Badge>
                ))}
            </div>
            <span
                ref={countMeasureRef}
                className={`absolute left-0 top-0 text-[10px] md:text-xs flex-shrink-0 pointer-events-none ${tagCountClass}`}
                style={{ visibility: 'hidden' }}
                aria-hidden='true'
            >
                +{maxHiddenCount}
            </span>
            <div
                ref={containerRef}
                className='flex flex-nowrap items-center gap-1.5 overflow-hidden'
                style={{ visibility: ready ? 'visible' : 'hidden' }}
            >
                {tags.slice(0, visibleCount ?? tags.length).map((tag) => (
                    <Badge key={tag} variant='outline' className={`${tagClasses} flex-shrink-0`}>
                        {tag}
                    </Badge>
                ))}
                {hiddenCount > 0 && (
                    <span className={`text-[10px] md:text-xs flex-shrink-0 ${tagCountClass}`}>
                        +{hiddenCount}
                    </span>
                )}
            </div>
        </>
    );
}

export function PostCard({ post, postType }: PostCardProps) {
    const router = useRouter();
    const resolvedPostType: PostType = postType ?? post.type ?? 'dev';
    const tagClasses = getCategoryTagClasses(resolvedPostType);
    const tagCountClass = getCategoryCountClass(resolvedPostType);

    const handleClick = () => {
        router.push(`/post/${post.slug}`);
    };

    return (
        <Card
            className={`cursor-pointer border-0 shadow-none transition-colors p-3 h-full flex flex-col overflow-hidden ${POST_CARD_RADIUS_CLASS} bg-muted/35 hover:bg-muted/45 dark:bg-card dark:hover:bg-card`}
            onClick={handleClick}
        >
            <CardHeader className='p-0 flex flex-col gap-2'>
                <div
                    className={`relative w-full aspect-video overflow-hidden bg-muted ${POST_CARD_RADIUS_CLASS}`}
                >
                    {post.thumbnail ? (
                        <Image
                            src={post.thumbnail}
                            alt=''
                            fill
                            className='object-cover'
                        />
                    ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                            <ImageIcon className='w-12 h-12 text-muted-foreground' />
                        </div>
                    )}
                </div>

                {post.tags && post.tags.length > 0 && (
                    <TagsRow
                        tags={post.tags}
                        tagClasses={tagClasses}
                        tagCountClass={tagCountClass}
                    />
                )}

                <CardTitle
                    className='m-0 text-base md:text-lg font-semibold leading-snug line-clamp-2 min-w-0'
                    style={{ minHeight: 'calc(1.375 * 2em)' }}
                >
                    {post.title}
                </CardTitle>

                <div className='text-muted-foreground text-xs md:text-sm'>
                    {formatPostDate(post.createdAt)}
                </div>
            </CardHeader>
        </Card>
    );
}
