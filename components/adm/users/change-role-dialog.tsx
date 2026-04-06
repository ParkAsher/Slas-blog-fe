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
import { changeRole } from '@/lib/apis/admin';
import type { ApiError } from '@/lib/apis/core';
import { adminTokenAtom } from '@/lib/atoms/admin-auth';

interface ChangeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  nickname: string;
  currentRole: 'ADMIN' | 'USER';
  onSuccess?: () => void;
}

export function ChangeRoleDialog({
  open,
  onOpenChange,
  userId,
  nickname,
  currentRole,
  onSuccess,
}: ChangeRoleDialogProps) {
  const queryClient = useQueryClient();
  const [adminToken] = useAtom(adminTokenAtom);

  const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!adminToken) throw new Error('인증 토큰이 없습니다.');
      return changeRole(userId, { role: newRole }, adminToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success(`${nickname}님의 역할을 ${newRole === 'ADMIN' ? '관리자' : '일반 사용자'}로 변경했습니다.`);
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const err = error as ApiError;
      const message = (err.data && (err.data.message || err.data.error)) || err.message || '역할 변경에 실패했습니다.';
      toast.error(message);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>역할 변경</AlertDialogTitle>
          <AlertDialogDescription>
            <span className='font-medium'>{nickname}</span>님의 역할을{' '}
            <span className='font-medium'>
              {currentRole === 'ADMIN' ? '일반 사용자' : '관리자'}
            </span>
            로 변경하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate()}
            disabled={isPending}
            className='bg-blue-600 hover:bg-blue-700'
          >
            {isPending ? '변경 중...' : '변경'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
