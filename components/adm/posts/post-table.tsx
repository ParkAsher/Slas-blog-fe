'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { PostAuthorCell } from './post-author-cell';
import type { Post } from '@/lib/apis/admin';

interface PostTableProps {
  posts: Post[] | undefined;
  isLoading: boolean;
  selectedIds: string[];
  onSelectId: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
}

export function PostTable({
  posts,
  isLoading,
  selectedIds,
  onSelectId,
  onSelectAll,
}: PostTableProps) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-12'>
              <Checkbox disabled />
            </TableHead>
            <TableHead>제목</TableHead>
            <TableHead className='w-20'>타입</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead className='w-16'>조회수</TableHead>
            <TableHead className='w-16'>댓글</TableHead>
            <TableHead className='w-24'>작성일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Checkbox disabled />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-40' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-12' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-20' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-8' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-8' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-24' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className='flex items-center justify-center py-10 text-center'>
        <p className='text-muted-foreground'>게시글이 없습니다.</p>
      </div>
    );
  }

  const allSelected = posts.length > 0 && posts.every((p) => selectedIds.includes(p.id));
  const someSelected = posts.some((p) => selectedIds.includes(p.id));

  return (
    <div className='border border-border rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-12'>
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => onSelectAll(checked === true)}
              />
            </TableHead>
            <TableHead>제목</TableHead>
            <TableHead className='w-20'>타입</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead className='w-16'>조회수</TableHead>
            <TableHead className='w-16'>댓글</TableHead>
            <TableHead className='w-24'>작성일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(post.id)}
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      onSelectId(post.id);
                    } else {
                      onSelectId(post.id);
                    }
                  }}
                />
              </TableCell>
              <TableCell className='font-medium'>{post.title}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    post.type === 'dev'
                      ? 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                  }`}
                >
                  {post.type === 'dev' ? 'Dev' : 'Story'}
                </span>
              </TableCell>
              <TableCell>
                <PostAuthorCell
                  nickname={post.author.nickname}
                  isDeleted={post.author.isDeleted}
                />
              </TableCell>
              <TableCell className='text-sm text-right'>{post.views}</TableCell>
              <TableCell className='text-sm text-right'>{post.commentCount}</TableCell>
              <TableCell className='text-sm'>
                {format(new Date(post.createdAt), 'yyyy.MM.dd', { locale: ko })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
