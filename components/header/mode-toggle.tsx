'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = resolvedTheme === 'dark';

    const handleToggle = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <Button
            variant='ghost'
            size='icon'
            aria-label='테마 전환'
            onClick={handleToggle}
            className='relative cursor-pointer'
        >
            {mounted ? (
                <>
                    <Sun
                        className={`size-5 transition-all ${
                            isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                        }`}
                    />
                    <Moon
                        className={`absolute size-5 transition-all ${
                            isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                    />
                </>
            ) : (
                <Sun className='size-5' />
            )}
            <span className='sr-only'>다크모드 토글</span>
        </Button>
    );
}
