'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { Button } from '@/components/ui/button';
import { getUsers } from '@/lib/apis/admin';
import { adminTokenAtom } from '@/lib/atoms/admin-auth';
import { UserSearch } from './user-search';
import { UserTable } from './user-table';

export function UserManagement() {
  const [adminToken] = useAtom(adminTokenAtom);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-users', page, search],
    queryFn: () => {
      if (!adminToken) throw new Error('인증 토큰이 없습니다.');
      return getUsers({ page, search }, adminToken);
    },
    enabled: !!adminToken,
  });

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(1); // 검색 시 첫 페이지로 초기화
  };

  return (
    <div className='space-y-6'>
      {/* 검색 영역 */}
      <div className='flex gap-4'>
        <div className='flex-1 max-w-xs'>
          <UserSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* 테이블 */}
      <UserTable users={data?.users} isLoading={isLoading} onRefresh={() => refetch()} />

      {/* 페이지네이션 */}
      {data && data.pagination.totalPages > 1 && (
        <div className='flex items-center justify-center gap-2'>
          <Button
            variant='outline'
            className='cursor-pointer'
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            이전
          </Button>

          <div className='flex items-center gap-2'>
            {[...Array(data.pagination.totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? 'default' : 'outline'}
                  size='sm'
                  className='w-10 cursor-pointer'
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant='outline'
            className='cursor-pointer'
            onClick={() => setPage((prev) => Math.min(data.pagination.totalPages, prev + 1))}
            disabled={page === data.pagination.totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
