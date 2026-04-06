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
import { deactivateUser } from '@/lib/apis/admin';
import type { ApiError } from '@/lib/apis/core';
import { adminTokenAtom } from '@/lib/atoms/admin-auth';

interface DeactivateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  nickname: string;
  onSuccess?: () => void;
}

export function DeactivateUserDialog({
  open,
  onOpenChange,
  userId,
  nickname,
  onSuccess,
}: DeactivateUserDialogProps) {
  const queryClient = useQueryClient();
  const [adminToken] = useAtom(adminTokenAtom);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!adminToken) throw new Error('인증 토큰이 없습니다.');
      return deactivateUser(userId, adminToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success(`${nickname}님을 비활성화했습니다.`);
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const err = error as ApiError;
      const message = (err.data && (err.data.message || err.data.error)) || err.message || '비활성화에 실패했습니다.';
      toast.error(message);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>회원 비활성화</AlertDialogTitle>
          <AlertDialogDescription>
            <span className='font-medium'>{nickname}</span>님을 비활성화하시겠습니까? 이 작업은
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
            {isPending ? '비활성화 중...' : '비활성화'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
