'use client';

import { Badge } from '@/components/ui/badge';

interface PostAuthorCellProps {
  nickname: string;
  isDeleted: boolean;
}

export function PostAuthorCell({ nickname, isDeleted }: PostAuthorCellProps) {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm font-medium'>{nickname}</span>
      {isDeleted && <Badge variant='destructive'>탈퇴</Badge>}
    </div>
  );
}
