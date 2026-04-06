'use client';

import { usePathname } from 'next/navigation';

interface ConditionalMainWrapperProps {
  children: React.ReactNode;
}

export function ConditionalMainWrapper({ children }: ConditionalMainWrapperProps) {
  const pathname = usePathname();

  // /adm으로 시작하는 경로에서는 main 래퍼 없음
  if (pathname.startsWith('/adm')) {
    return <>{children}</>;
  }

  return (
    <main className='mx-auto w-full max-w-5xl px-4 py-10'>
      {children}
    </main>
  );
}
