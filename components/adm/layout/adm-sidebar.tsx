'use client';

import { Users, LogOut, Shield, FileText } from 'lucide-react';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { adminLogoutAtom, adminUserAtom } from '@/lib/atoms/admin-auth';
import { useAtom } from 'jotai';

interface AdmSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdmSidebar({ activeSection, onSectionChange }: AdmSidebarProps) {
  const router = useRouter();
  const logoutAdmin = useSetAtom(adminLogoutAtom);
  const [adminUser] = useAtom(adminUserAtom);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/adm/login');
  };

  return (
    <aside className='w-64 border-r border-border bg-white dark:bg-slate-950 flex flex-col h-screen'>
      {/* 브랜드 영역 */}
      <div className='p-6 border-b border-border'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0'>
            <Shield className='w-5 h-5' />
          </div>
          <div>
            <h2 className='font-bold text-base tracking-tight'>관리자 패널</h2>
            <p className='text-xs text-muted-foreground'>Admin</p>
          </div>
        </div>
      </div>

      {/* 메뉴 영역 */}
      <nav className='flex-1 p-4 space-y-1'>
        <Button
          variant={activeSection === 'users' ? 'default' : 'ghost'}
          className={`w-full justify-start cursor-pointer ${
            activeSection === 'users'
              ? 'bg-blue-600 hover:bg-blue-700 text-white font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
          onClick={() => onSectionChange('users')}
        >
          <Users className='w-4 h-4 mr-3' />
          회원 관리
        </Button>
        <Button
          variant={activeSection === 'posts' ? 'default' : 'ghost'}
          className={`w-full justify-start cursor-pointer ${
            activeSection === 'posts'
              ? 'bg-blue-600 hover:bg-blue-700 text-white font-medium'
              : 'hover:bg-gray-100 dark:hover:bg-slate-800'
          }`}
          onClick={() => onSectionChange('posts')}
        >
          <FileText className='w-4 h-4 mr-3' />
          게시글 관리
        </Button>
      </nav>

      {/* 사용자 영역 */}
      <div className='border-t border-border p-4 space-y-3'>
        {adminUser && (
          <div className='px-2'>
            <p className='text-xs text-muted-foreground'>로그인됨</p>
            <p className='text-sm font-medium truncate'>{adminUser.nickname}</p>
          </div>
        )}
        <Button
          variant='outline'
          className='w-full justify-start cursor-pointer hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600'
          onClick={handleLogout}
        >
          <LogOut className='w-4 h-4 mr-3' />
          로그아웃
        </Button>
      </div>
    </aside>
  );
}
