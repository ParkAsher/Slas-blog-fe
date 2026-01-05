'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAtomValue, useSetAtom } from 'jotai';
import { Menu, Pencil } from 'lucide-react';

import { ModeToggle } from '@/components/header/mode-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { isAuthenticatedAtom, logoutAtom, userAtom } from '@/lib/atoms/auth';

export function SiteHeader() {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom); // 로그인 상태 확인
    const user = useAtomValue(userAtom); // 유저 정보
    const logout = useSetAtom(logoutAtom); // 로그아웃 함수
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
    };

    const isAdmin = mounted && user?.role === 'ADMIN';

    const authButtons =
        mounted && isAuthenticated ? (
            <>
                {isAdmin && (
                    <Link
                        href='/write'
                        className='w-full block py-2 px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                    >
                        글 쓰기
                    </Link>
                )}
                <button
                    onClick={handleLogout}
                    className='w-full text-left py-2 px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer'
                >
                    로그아웃
                </button>
            </>
        ) : (
            <>
                <Link
                    href='/signup'
                    className='w-full block py-2 px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                >
                    회원가입
                </Link>
                <Link
                    href='/signin'
                    className='w-full block py-2 px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                >
                    로그인
                </Link>
            </>
        );

    return (
        <header className='sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur'>
            <div className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:flex-nowrap sm:gap-6'>
                <Link href='/' className='text-lg font-semibold tracking-tight sm:text-xl'>
                    Slas.log
                </Link>
                <div className='flex flex-wrap items-center justify-end gap-2 sm:gap-3'>
                    <ModeToggle />
                    {/* 모바일 사이드 메뉴 */}
                    <div className='block sm:hidden'>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant='ghost' size='icon' className='cursor-pointer'>
                                    <Menu className='size-5' />
                                    <span className='sr-only'>메뉴 열기</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                                <SheetHeader className='border-b border-gray-300'>
                                    <SheetTitle className=''>메뉴</SheetTitle>
                                </SheetHeader>

                                <div className=''>
                                    <div className='flex flex-col gap-3'>{authButtons}</div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    {/* 데스크탑 버튼 */}
                    <div className='hidden sm:flex sm:items-center sm:gap-3'>
                        {mounted && isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='cursor-pointer'
                                        asChild
                                    >
                                        <Link href='/write'>
                                            <Pencil className='size-5' />
                                            <span className='sr-only'>글 쓰기</span>
                                        </Link>
                                    </Button>
                                )}
                                <Button
                                    className='px-3 sm:px-4 cursor-pointer'
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant='ghost'
                                    className='px-3 sm:px-4 cursor-pointer'
                                    asChild
                                >
                                    <Link href='/signup'>회원가입</Link>
                                </Button>
                                <Button className='px-3 sm:px-4 cursor-pointer' asChild>
                                    <Link href='/signin'>로그인</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
