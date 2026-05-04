'use client';

import Link from 'next/link';
import { Mail, Github } from 'lucide-react';
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
        <section
            className={cn(
                'w-full rounded-[4px] p-6 md:p-8',
                'border-2 border-amber-400 dark:border-amber-500',
                'shadow-lg shadow-amber-500/20 dark:shadow-amber-500/30',
                'flex flex-col gap-6',
            )}
        >
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl md:text-4xl font-bold tracking-tight leading-[1.2] text-balance'>
                    Welcome to{' '}
                    <span className='text-amber-500 dark:text-amber-400'>NNOUSS.LOG</span>
                    {' '}👋
                </h1>
                <p className='text-foreground/75 text-base md:text-lg leading-relaxed whitespace-pre-line'>
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
                                'inline-flex items-center gap-2 rounded-[4px] px-4 py-2',
                                'text-sm font-medium transition-colors duration-150',
                                'bg-muted/50 hover:bg-muted',
                            )}
                        >
                            <Icon className={cn('h-4 w-4 shrink-0', iconColor)} />
                            <span className='text-foreground'>{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
