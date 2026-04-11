'use client';

import { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface PostSearchProps {
  onSearch: (search: string) => void;
  isLoading?: boolean;
}

export function PostSearch({ onSearch, isLoading }: PostSearchProps) {
  const [search, setSearch] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const onSearchRef = useRef(onSearch);

  // onSearch 참조를 항상 최신으로 유지
  useEffect(() => {
    onSearchRef.current = onSearch;
  });

  useEffect(() => {
    // 기존 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 새 타이머 설정
    debounceTimerRef.current = setTimeout(() => {
      onSearchRef.current(search);
    }, 300);

    // 언마운트 시 타이머 정리
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [search]);

  return (
    <div className='relative'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
      <Input
        placeholder='제목으로 검색...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={isLoading}
        className='pl-10'
      />
    </div>
  );
}
