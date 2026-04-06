'use client';

import { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface UserSearchProps {
  onSearch: (search: string) => void;
  isLoading?: boolean;
}

export function UserSearch({ onSearch, isLoading }: UserSearchProps) {
  const [search, setSearch] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // 기존 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 새 타이머 설정
    debounceTimerRef.current = setTimeout(() => {
      onSearch(search);
    }, 300);

    // 언마운트 시 타이머 정리
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [search, onSearch]);

  return (
    <div className='relative'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
      <Input
        placeholder='닉네임으로 검색...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={isLoading}
        className='pl-10'
      />
    </div>
  );
}
