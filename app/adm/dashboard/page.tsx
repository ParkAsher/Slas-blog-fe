'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { AdmSidebar } from '@/components/adm/layout/adm-sidebar';
import { AdmHeader } from '@/components/adm/layout/adm-header';
import { UserManagement } from '@/components/adm/users/user-management';
import { isAdminAuthAtom, adminUserAtom } from '@/lib/atoms/admin-auth';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAdminAuth] = useAtom(isAdminAuthAtom);
  const [adminUser] = useAtom(adminUserAtom);

  // 미인증 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isAdminAuth) {
      router.push('/adm/login');
    }
  }, [isAdminAuth, router]);

  if (!isAdminAuth) {
    return null; // 리다이렉트 대기
  }

  return (
    <div className='flex h-screen overflow-hidden bg-background'>
      {/* 사이드바 */}
      <AdmSidebar activeSection='users' />

      {/* 메인 영역 */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* 헤더 */}
        <AdmHeader
          title='회원 관리'
          description='전체 회원 정보를 조회하고 관리합니다.'
          nickname={adminUser?.nickname}
        />

        {/* 컨텐츠 */}
        <main className='flex-1 overflow-auto p-6'>
          <UserManagement />
        </main>
      </div>
    </div>
  );
}
