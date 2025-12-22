'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPostDate } from '@/lib/utils';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { Post } from '@/lib/apis/main';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/post/${post.slug}`);
    };

    return (
        <Card
            className='cursor-pointer hover:shadow-md transition-shadow p-0 md:py-6'
            onClick={handleClick}
        >
            <CardHeader className='p-0 md:px-6'>
                {/* 모바일: 썸네일 상단 */}
                <div className='md:hidden space-y-3'>
                    <div className='relative w-full aspect-video overflow-hidden bg-muted border border-border'>
                        {post.thumbnail ? (
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                fill
                                className='object-cover'
                            />
                        ) : (
                            <div className='w-full h-full flex items-center justify-center'>
                                <ImageIcon className='w-12 h-12 text-muted-foreground' />
                            </div>
                        )}
                    </div>
                    <div className='space-y-2 px-4 py-3'>
                        <CardTitle className='text-lg'>{post.title}</CardTitle>
                        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                            <span>{post.author.nickname}</span>
                            <span>•</span>
                            <span>{formatPostDate(post.createdAt)}</span>
                            <span>•</span>
                            <span>조회 {post.views}</span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className='flex flex-wrap gap-2 pt-1'>
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant='outline' className='text-xs'>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 데스크톱: 기존 레이아웃 */}
                <div className='hidden md:flex items-stretch justify-between gap-4'>
                    <div className='flex-1 flex flex-col'>
                        <CardTitle className='text-xl mb-2'>{post.title}</CardTitle>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                            <span>{post.author.nickname}</span>
                            <span>•</span>
                            <span>{formatPostDate(post.createdAt)}</span>
                            <span>•</span>
                            <span>조회 {post.views}</span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-auto'>
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant='outline'>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='relative w-64 aspect-video flex-shrink-0 overflow-hidden bg-muted border border-border'>
                        {post.thumbnail ? (
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                fill
                                className='object-cover'
                            />
                        ) : (
                            <div className='w-full h-full flex items-center justify-center'>
                                <ImageIcon className='w-12 h-12 text-muted-foreground' />
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
