'use client';

import { Badge } from '@/components/ui/badge';

interface UserRoleBadgeProps {
  role: 'ADMIN' | 'USER';
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  if (role === 'ADMIN') {
    return <Badge className='bg-red-600 hover:bg-red-700'>관리자</Badge>;
  }

  return <Badge variant='secondary'>일반 사용자</Badge>;
}
