'use client';

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    maxTags?: number;
}

export function TagInput({ tags, onChange, maxTags = 5 }: TagInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue) && tags.length < maxTags) {
            onChange([...tags, trimmedValue]);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    return (
        <div className='space-y-2'>
            <div className='flex flex-wrap gap-2 p-2 border border-input rounded-md bg-background min-h-[42px]'>
                {tags.map((tag, index) => (
                    <Badge
                        key={index}
                        variant='secondary'
                        className='px-2 py-1 text-sm flex-shrink-0 max-w-full break-words whitespace-normal'
                    >
                        <span className='break-words'>{tag}</span>
                        <button
                            type='button'
                            onClick={() => removeTag(index)}
                            className='ml-1.5 hover:text-destructive transition-colors flex-shrink-0'
                        >
                            <X className='h-3 w-3 cursor-pointer' />
                        </button>
                    </Badge>
                ))}
                {tags.length < maxTags && (
                    <Input
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={addTag}
                        placeholder={tags.length === 0 ? '태그를 입력하세요 (최대 5개)' : ''}
                        className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto pl-2 flex-1 min-w-[150px] flex-shrink'
                    />
                )}
            </div>
        </div>
    );
}
