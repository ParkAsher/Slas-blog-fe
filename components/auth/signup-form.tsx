'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { checkEmailAvailability, checkNicknameAvailability, signup } from '@/lib/apis/auth';
import { SignUpFormValues, signUpSchema } from '@/lib/validations/auth';

export function SignupForm() {
    const router = useRouter();
    const [emailStatus, setEmailStatus] = useState<'idle' | 'available' | 'duplicate' | 'error'>(
        'idle'
    );
    const [emailMessage, setEmailMessage] = useState('');

    const [nicknameStatus, setNicknameStatus] = useState<
        'idle' | 'available' | 'duplicate' | 'error'
    >('idle');
    const [nicknameMessage, setNicknameMessage] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: 'onChange',
    });

    const emailValue = watch('email');
    const nicknameValue = watch('nickname');

    useEffect(() => {
        setEmailStatus('idle');
        setEmailMessage('');
    }, [emailValue]);

    useEffect(() => {
        setNicknameStatus('idle');
        setNicknameMessage('');
    }, [nicknameValue]);

    const { mutate: checkEmail, isPending: isCheckingEmail } = useMutation({
        mutationFn: (email: string) => checkEmailAvailability(email),
        onMutate: () => {
            setEmailStatus('idle');
            setEmailMessage('');
        },
        onSuccess: (available) => {
            if (available) {
                setEmailStatus('available');
                setEmailMessage('사용 가능한 이메일입니다.');
            } else {
                setEmailStatus('duplicate');
                setEmailMessage('이미 사용 중인 이메일입니다.');
            }
        },
        onError: (error) => {
            console.error(error);
            setEmailStatus('error');
            setEmailMessage('이메일 확인 중 오류가 발생했습니다.');
        },
    });

    const { mutate: checkNickname, isPending: isCheckingNickname } = useMutation({
        mutationFn: (nickname: string) => checkNicknameAvailability(nickname),
        onMutate: () => {
            setNicknameStatus('idle');
            setNicknameMessage('');
        },
        onSuccess: (available) => {
            if (available) {
                setNicknameStatus('available');
                setNicknameMessage('사용 가능한 닉네임입니다.');
            } else {
                setNicknameStatus('duplicate');
                setNicknameMessage('이미 사용 중인 닉네임입니다.');
            }
        },
        onError: (error) => {
            console.error(error);
            setNicknameStatus('error');
            setNicknameMessage('닉네임 확인 중 오류가 발생했습니다.');
        },
    });

    const { mutate: signupMutate, isPending: isSigningUp } = useMutation({
        mutationFn: (data: SignUpFormValues) => signup(data.email, data.password, data.nickname),
        onSuccess: () => {
            alert('회원가입이 완료되었습니다!');
            router.push('/');
        },
        onError: (error) => {
            console.error('회원가입 실패:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        },
    });

    const onSubmit = (data: SignUpFormValues) => {
        if (errors.email) {
            alert('이메일을 올바르게 입력해주세요.');
            return;
        }

        if (emailStatus !== 'available') {
            alert('이메일 중복 확인을 완료해주세요.');
            return;
        }

        if (errors.password) {
            alert('비밀번호를 올바르게 입력해주세요.');
            return;
        }

        if (errors.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (errors.nickname) {
            alert('닉네임을 올바르게 입력해주세요.');
            return;
        }

        if (nicknameStatus !== 'available') {
            alert('닉네임 중복 확인을 완료해주세요.');
            return;
        }

        signupMutate(data);
    };

    return (
        <div className='flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md space-y-8'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>회원 가입</h1>
                    <p className='text-muted-foreground'>
                        블로그에 가입하고 다양한 개발 이야기를 함께 나눠보세요.
                    </p>
                </div>

                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>이메일</Label>
                        <div className='flex gap-2'>
                            <Input
                                id='email'
                                type='email'
                                placeholder='example@email.com'
                                {...register('email')}
                                className='flex-1'
                                aria-invalid={
                                    errors.email ||
                                    emailStatus === 'duplicate' ||
                                    emailStatus === 'error'
                                        ? 'true'
                                        : 'false'
                                }
                                required
                            />
                            <Button
                                type='button'
                                variant='outline'
                                className='shrink-0 whitespace-nowrap cursor-pointer'
                                onClick={() => {
                                    const trimmed = (emailValue || '').trim();
                                    if (!trimmed) {
                                        alert('이메일을 입력해주세요.');
                                        return;
                                    }
                                    checkEmail(trimmed);
                                }}
                                disabled={isCheckingEmail}
                            >
                                {isCheckingEmail ? '확인 중...' : '중복확인'}
                            </Button>
                        </div>
                        {errors.email && (
                            <p className='text-sm text-destructive'>{errors.email.message}</p>
                        )}
                        {emailMessage && !errors.email && (
                            <p
                                className={`text-sm ${
                                    emailStatus === 'available'
                                        ? 'text-sky-500 dark:text-sky-400'
                                        : 'text-destructive'
                                }`}
                            >
                                {emailMessage}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='password'>비밀번호</Label>
                        <Input
                            id='password'
                            type='password'
                            placeholder='8~16자, 영문/숫자 최소 하나씩 포함'
                            {...register('password')}
                            aria-invalid={errors.password ? 'true' : 'false'}
                            required
                        />
                        {errors.password && (
                            <p className='text-sm text-destructive'>{errors.password.message}</p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='password-confirm'>비밀번호 확인</Label>
                        <Input
                            id='password-confirm'
                            type='password'
                            placeholder='비밀번호를 다시 입력하세요'
                            {...register('passwordConfirm')}
                            aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
                            required
                        />
                        {errors.passwordConfirm && (
                            <p className='text-sm text-destructive'>
                                {errors.passwordConfirm.message}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='nickname'>닉네임</Label>
                        <div className='flex gap-2'>
                            <Input
                                id='nickname'
                                type='text'
                                placeholder='2~8자'
                                {...register('nickname')}
                                className='flex-1'
                                aria-invalid={
                                    errors.nickname ||
                                    nicknameStatus === 'duplicate' ||
                                    nicknameStatus === 'error'
                                        ? 'true'
                                        : 'false'
                                }
                                required
                            />
                            <Button
                                type='button'
                                variant='outline'
                                className='shrink-0 whitespace-nowrap cursor-pointer'
                                onClick={() => {
                                    const trimmed = (nicknameValue || '').trim();
                                    if (!trimmed) {
                                        alert('닉네임을 입력해주세요.');
                                        return;
                                    }
                                    checkNickname(trimmed);
                                }}
                                disabled={isCheckingNickname}
                            >
                                {isCheckingNickname ? '확인 중...' : '중복확인'}
                            </Button>
                        </div>
                        {errors.nickname && (
                            <p className='text-sm text-destructive'>{errors.nickname.message}</p>
                        )}
                        {nicknameMessage && !errors.nickname && (
                            <p
                                className={`text-sm ${
                                    nicknameStatus === 'available'
                                        ? 'text-sky-500 dark:text-sky-400'
                                        : 'text-destructive'
                                }`}
                            >
                                {nicknameMessage}
                            </p>
                        )}
                    </div>

                    <Button
                        type='submit'
                        className='w-full cursor-pointer'
                        size='lg'
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? '가입 중...' : '가입'}
                    </Button>
                </form>

                <div className='text-center text-sm text-muted-foreground'>
                    이미 회원이신가요?{' '}
                    <Link
                        href='/signin'
                        className='font-medium text-primary underline-offset-4 hover:underline'
                    >
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
}
