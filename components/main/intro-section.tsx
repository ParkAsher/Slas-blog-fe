'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, Mail } from 'lucide-react';
import { siteProfile } from '@/config/site';
import { cn } from '@/lib/utils';

const iconMap = {
    mail: Mail,
    github: Github,
};

const iconColorClasses = {
    mail: 'text-muted-foreground',
    github: 'text-foreground',
};

export function IntroSection() {
    return (
        <section className='relative w-full overflow-hidden border-y border-border py-10 md:py-16'>
            <div className='absolute left-0 top-0 h-px w-28 bg-amber-mark' aria-hidden='true' />
            <div
                className='absolute bottom-0 right-0 h-px w-20 bg-amber-mark/80'
                aria-hidden='true'
            />

            <div className='max-w-[46rem] space-y-8'>
                <div className='inline-flex items-center gap-3 text-sm text-muted-foreground'>
                    <span className='h-px w-10 bg-amber-mark' aria-hidden='true' />
                    <span>nnouss가 나중에 다시 꺼내 볼 기록</span>
                </div>

                <div className='space-y-5'>
                    <h1 className='max-w-[11ch] text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.96] tracking-normal text-balance'>
                        천천히 남긴 개발과 하루.
                    </h1>
                    <p className='max-w-[34rem] whitespace-pre-line text-base leading-8 text-foreground/75 md:text-lg'>
                        {siteProfile.intro}
                    </p>
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                    {siteProfile.links.map((link) => {
                        const Icon = iconMap[link.icon as keyof typeof iconMap] ?? Mail;
                        const iconColor =
                            iconColorClasses[link.icon as keyof typeof iconColorClasses] ??
                            'text-muted-foreground';

                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel={
                                    link.href.startsWith('http')
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                className={cn(
                                    'inline-flex min-h-11 items-center gap-2 rounded-[4px] px-4',
                                    'border border-border bg-background text-sm font-medium',
                                    'transition-colors duration-150 hover:bg-muted/55',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                                )}
                            >
                                <Icon className={cn('size-4 shrink-0', iconColor)} />
                                <span className='text-foreground'>{link.label}</span>
                                <ArrowUpRight className='size-3.5 text-muted-foreground' />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
