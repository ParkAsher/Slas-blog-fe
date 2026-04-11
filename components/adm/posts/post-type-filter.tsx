'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PostTypeFilterProps {
  value: string;
  onTypeChange: (type: string) => void;
  isLoading?: boolean;
}

export function PostTypeFilter({ value, onTypeChange, isLoading }: PostTypeFilterProps) {
  return (
    <Select value={value || 'all'} onValueChange={onTypeChange} disabled={isLoading}>
      <SelectTrigger className='w-32'>
        <SelectValue placeholder='타입 선택' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>전체</SelectItem>
        <SelectItem value='dev'>Dev</SelectItem>
        <SelectItem value='story'>Story</SelectItem>
      </SelectContent>
    </Select>
  );
}
