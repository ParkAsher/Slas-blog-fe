'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from './header/site-header';

export function ConditionalSiteHeader() {
  const pathname = usePathname();

  // /adm으로 시작하는 경로에서는 헤더 표시 안 함
  if (pathname.startsWith('/adm')) {
    return null;
  }

  return <SiteHeader />;
}
