'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signin } from './apis';
import type { ApiError } from '@/lib/api';

export default function SignInPage() {
    const router = useRouter();

    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            signin(email, password),
        onMutate: () => {
            // 에러 초기화
            setEmailError(null);
            setPasswordError(null);
            setFormError(null);
        },
        onSuccess: (result) => {
            // 토큰을 sessionStorage 에 저장 → 브라우저 세션 동안만 유지
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('accessToken', result.accessToken);
            }

            // TODO: 이후에 전역 상태에 사용자 정보 저장 등을 추가할 수 있음

            router.push('/');
        },
        onError: (error: unknown) => {
            const err = error as ApiError;
            const message = (err.data && (err.data.message || err.data.error)) || err.message || '';

            // 백엔드에서 내려주는 메시지에 따라 필드 에러 매핑
            if (err.status === 401 && typeof message === 'string') {
                if (message.includes('존재하지 않는 이메일')) {
                    setEmailError(message);
                } else if (message.includes('비밀번호가 올바르지 않습니다')) {
                    setPasswordError(message);
                } else {
                    setFormError(message);
                }
            } else {
                setFormError('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get('email') || '').trim();
        const password = String(formData.get('password') || '');

        if (!email || !password) {
            if (!email) setEmailError('이메일을 입력해주세요.');
            if (!password) setPasswordError('비밀번호를 입력해주세요.');
            return;
        }

        mutate({ email, password });
    };

    return (
        <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md space-y-8'>
                {/* 타이틀 섹션 */}
                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>로그인</h1>
                </div>

                {/* 폼 섹션 */}
                <form className='space-y-6' onSubmit={handleSubmit}>
                    {/* 이메일 입력 */}
                    <div className='space-y-2'>
                        <Label htmlFor='email'>이메일</Label>
                        <div className='flex gap-2'>
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='example@email.com'
                                className='flex-1'
                                aria-invalid={!!emailError}
                                aria-describedby={emailError ? 'email-error' : undefined}
                            />
                        </div>
                        {emailError && (
                            <p id='email-error' className='text-sm text-red-500'>
                                {emailError}
                            </p>
                        )}
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className='space-y-2'>
                        <Label htmlFor='password'>비밀번호</Label>
                        <Input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='8~16자, 영문/숫자 최소 하나 씩 포함'
                            aria-invalid={!!passwordError}
                            aria-describedby={passwordError ? 'password-error' : undefined}
                        />
                        {passwordError && (
                            <p id='password-error' className='text-sm text-red-500'>
                                {passwordError}
                            </p>
                        )}
                    </div>

                    {/* 폼 전체 에러 */}
                    {formError && (
                        <p className='text-sm text-red-500' role='alert'>
                            {formError}
                        </p>
                    )}

                    {/* 로그인 버튼 */}
                    <Button
                        type='submit'
                        className='w-full cursor-pointer'
                        size='lg'
                        disabled={isPending}
                    >
                        {isPending ? '로그인 중...' : '로그인'}
                    </Button>
                </form>

                {/* 회원가입 링크 */}
                <div className='text-center text-sm text-muted-foreground'>
                    아직 회원이 아니신가요?{' '}
                    <Link
                        href='/signup'
                        className='font-medium text-primary underline-offset-4 hover:underline'
                    >
                        회원 가입
                    </Link>
                </div>
            </div>
        </div>
    );
}
