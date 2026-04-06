'use client';

import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { adminLogoutAtom } from '@/lib/atoms/admin-auth';

interface AdmHeaderProps {
  title: string;
  description?: string;
  nickname?: string;
}

export function AdmHeader({ title, description, nickname }: AdmHeaderProps) {
  const router = useRouter();
  const logoutAdmin = useSetAtom(adminLogoutAtom);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/adm/login');
  };

  return (
    <header className='border-b border-border bg-white dark:bg-slate-950 sticky top-0 z-40'>
      <div className='flex items-center justify-between px-6 py-4'>
        {/* 좌측 제목 영역 */}
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
          {description && (
            <p className='text-sm text-muted-foreground mt-1'>{description}</p>
          )}
        </div>

        {/* 우측 사용자 영역 */}
        <div className='flex items-center gap-4'>
          {nickname && (
            <div className='text-right'>
              <p className='text-sm font-medium'>{nickname}</p>
              <p className='text-xs text-muted-foreground'>관리자</p>
            </div>
          )}
          <Button
            variant='ghost'
            size='sm'
            className='cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950'
            onClick={handleLogout}
          >
            <LogOut className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </header>
  );
}
