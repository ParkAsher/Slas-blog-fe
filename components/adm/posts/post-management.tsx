'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { getPosts } from '@/lib/apis/admin';
import { adminTokenAtom } from '@/lib/atoms/admin-auth';
import { PostSearch } from './post-search';
import { PostTypeFilter } from './post-type-filter';
import { PostTable } from './post-table';
import { DeletePostsDialog } from './delete-posts-dialog';

export function PostManagement() {
  const [adminToken] = useAtom(adminTokenAtom);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-posts', page, search, type],
    queryFn: () => {
      if (!adminToken) throw new Error('인증 토큰이 없습니다.');
      // 'all'을 빈 문자열로 변환 (API 요청용)
      const apiType = type === 'all' ? '' : type;
      return getPosts({ page, search, type: apiType }, adminToken);
    },
    enabled: !!adminToken,
  });

  const handleSearch = useCallback((searchValue: string) => {
    setSearch(searchValue);
    setPage(1);
    setSelectedIds([]); // 검색 시 선택 해제
  }, []);

  const handleTypeChange = (typeValue: string) => {
    setType(typeValue);
    setPage(1);
    setSelectedIds([]); // 필터 변경 시 선택 해제
  };

  const handleSelectId = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected && data?.posts) {
      setSelectedIds(data.posts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSuccess = () => {
    setSelectedIds([]);
    setPage(1); // 삭제 후 첫 페이지로
    refetch();
  };

  return (
    <div className='space-y-6'>
      {/* 상단 바: 검색, 필터, 삭제 버튼 */}
      <div className='flex gap-4 items-end'>
        <div className='flex-1 max-w-xs'>
          <PostSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <PostTypeFilter value={type} onTypeChange={handleTypeChange} isLoading={isLoading} />
        <Button
          variant='destructive'
          className='cursor-pointer'
          onClick={() => {
            if (selectedIds.length === 0) {
              toast.warning('삭제할 게시글을 선택해 주세요.');
              return;
            }
            setDeleteDialogOpen(true);
          }}
          disabled={isLoading}
        >
          {selectedIds.length > 0 ? `삭제 (${selectedIds.length})` : '삭제'}
        </Button>
      </div>

      {/* 테이블 */}
      <PostTable
        posts={data?.posts}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onSelectId={handleSelectId}
        onSelectAll={handleSelectAll}
      />

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

      {/* 삭제 다이얼로그 */}
      {selectedIds.length > 0 && deleteDialogOpen && (
        <DeletePostsDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          postIds={selectedIds}
          count={selectedIds.length}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
