import Link from 'next/link';

import { ModeToggle } from '@/components/header/mode-toggle';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
    return (
        <header className='sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur'>
            <div className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:flex-nowrap sm:gap-6'>
                <Link href='/' className='text-lg font-semibold tracking-tight sm:text-xl'>
                    Slasug.log
                </Link>
                <div className='flex flex-wrap items-center justify-end gap-2 sm:gap-3'>
                    <ModeToggle />
                    <Button variant='ghost' className='px-3 sm:px-4' asChild>
                        <Link href='/signup'>회원가입</Link>
                    </Button>
                    <Button className='px-3 sm:px-4' asChild>
                        <Link href='/signin'>로그인</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
