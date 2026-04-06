'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRoleBadge } from './user-role-badge';
import { ChangeRoleDialog } from './change-role-dialog';
import { DeactivateUserDialog } from './deactivate-user-dialog';
import type { User } from '@/lib/apis/admin';

interface UserTableProps {
  users: User[] | undefined;
  isLoading: boolean;
  onRefresh?: () => void;
}

export function UserTable({ users, isLoading, onRefresh }: UserTableProps) {
  const [changeRoleUserId, setChangeRoleUserId] = useState<string | null>(null);
  const [deactivateUserId, setDeactivateUserId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>닉네임</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>가입일</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className='h-4 w-20' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-40' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-20' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-24' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-4 w-16' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-8 w-20' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className='flex items-center justify-center py-10 text-center'>
        <p className='text-muted-foreground'>회원이 없습니다.</p>
      </div>
    );
  }

  const selectedChangeRoleUser = users.find((u) => u.id === changeRoleUserId);
  const selectedDeactivateUser = users.find((u) => u.id === deactivateUserId);

  return (
    <>
      <div className='border border-border rounded-lg overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>닉네임</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className={user.isDeleted ? 'opacity-50' : ''}
              >
                <TableCell className='font-medium'>{user.nickname}</TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {user.email}
                </TableCell>
                <TableCell>
                  <UserRoleBadge role={user.role as 'ADMIN' | 'USER'} />
                </TableCell>
                <TableCell className='text-sm'>
                  {format(new Date(user.createdAt), 'yyyy.MM.dd', { locale: ko })}
                </TableCell>
                <TableCell className='text-sm'>
                  {user.isDeleted ? (
                    <span className='text-destructive font-medium'>비활성화</span>
                  ) : (
                    <span className='text-green-600 font-medium'>활성</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    {!user.isDeleted && (
                      <>
                        <Button
                          size='sm'
                          variant='outline'
                          className='cursor-pointer'
                          onClick={() => setChangeRoleUserId(user.id)}
                        >
                          역할 변경
                        </Button>
                        <Button
                          size='sm'
                          variant='destructive'
                          className='cursor-pointer'
                          onClick={() => setDeactivateUserId(user.id)}
                        >
                          비활성화
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog 컴포넌트들 */}
      {selectedChangeRoleUser && (
        <ChangeRoleDialog
          open={!!changeRoleUserId}
          onOpenChange={(open) => !open && setChangeRoleUserId(null)}
          userId={selectedChangeRoleUser.id}
          nickname={selectedChangeRoleUser.nickname}
          currentRole={selectedChangeRoleUser.role as 'ADMIN' | 'USER'}
          onSuccess={onRefresh}
        />
      )}

      {selectedDeactivateUser && (
        <DeactivateUserDialog
          open={!!deactivateUserId}
          onOpenChange={(open) => !open && setDeactivateUserId(null)}
          userId={selectedDeactivateUser.id}
          nickname={selectedDeactivateUser.nickname}
          onSuccess={onRefresh}
        />
      )}
    </>
  );
}
