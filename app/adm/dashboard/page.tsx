'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { AdmSidebar } from '@/components/adm/layout/adm-sidebar';
import { AdmHeader } from '@/components/adm/layout/adm-header';
import { UserManagement } from '@/components/adm/users/user-management';
import { PostManagement } from '@/components/adm/posts/post-management';
import { isAdminAuthAtom, adminUserAtom } from '@/lib/atoms/admin-auth';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAdminAuth] = useAtom(isAdminAuthAtom);
  const [adminUser] = useAtom(adminUserAtom);
  const [activeSection, setActiveSection] = useState('users');
  const [mounted, setMounted] = useState(false);

  // 클라이언트 마운트 후 인증 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAdminAuth) {
      router.push('/adm/login');
    }
  }, [mounted, isAdminAuth, router]);

  // 마운트되기 전이나 미인증 상태는 빈 div 렌더링 (하이드레이션 미스매치 방지)
  if (!mounted || !isAdminAuth) {
    return <div />;
  }

  const getHeaderContent = () => {
    switch (activeSection) {
      case 'posts':
        return {
          title: '게시글 관리',
          description: '전체 게시글을 조회하고 관리합니다.',
        };
      case 'users':
      default:
        return {
          title: '회원 관리',
          description: '전체 회원 정보를 조회하고 관리합니다.',
        };
    }
  };

  const headerContent = getHeaderContent();

  return (
    <div className='flex h-screen overflow-hidden bg-background'>
      {/* 사이드바 */}
      <AdmSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* 메인 영역 */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* 헤더 */}
        <AdmHeader
          title={headerContent.title}
          description={headerContent.description}
          nickname={adminUser?.nickname}
        />

        {/* 컨텐츠 */}
        <main className='flex-1 overflow-auto p-6'>
          {activeSection === 'users' && <UserManagement />}
          {activeSection === 'posts' && <PostManagement />}
        </main>
      </div>
    </div>
  );
}
