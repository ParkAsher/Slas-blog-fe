'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deletePosts } from '@/lib/apis/admin';
import type { ApiError } from '@/lib/apis/core';
import { adminTokenAtom } from '@/lib/atoms/admin-auth';

interface DeletePostsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postIds: string[];
  count: number;
  onSuccess?: () => void;
}

export function DeletePostsDialog({
  open,
  onOpenChange,
  postIds,
  count,
  onSuccess,
}: DeletePostsDialogProps) {
  const queryClient = useQueryClient();
  const [adminToken] = useAtom(adminTokenAtom);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!adminToken) throw new Error('인증 토큰이 없습니다.');
      return deletePosts({ postIds }, adminToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      toast.success(`${count}개의 게시글을 삭제했습니다.`);
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const err = error as ApiError;
      const message = (err.data && (err.data.message || err.data.error)) || err.message || '삭제에 실패했습니다.';
      toast.error(message);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            선택한 <span className='font-medium'>{count}개</span>의 게시글을 삭제하시겠습니까? 이 작업은
            되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate()}
            disabled={isPending}
            className='bg-destructive hover:bg-destructive/90'
          >
            {isPending ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
