import type { Metadata } from 'next';
import './globals.css';

import Providers from '@/config/providers';
import { ConditionalSiteHeader } from '@/components/conditional-site-header';
import { ConditionalMainWrapper } from '@/components/conditional-main-wrapper';
import { defaultMetadata } from './metadata';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // JSON-LD Organization 스키마
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "NNOUSS.LOG",
        "url": "https://nnouss.xyz",
        "logo": "https://nnouss.xyz/favicon-32x32.png",
        "description": "nnouss의 개인 블로그입니다. 개발, 일상, 그리고 다양한 주제의 글을 공유합니다.",
        "sameAs": [
            "https://github.com/nnouss"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "slasugofficial@gmail.com"
        }
    };

    // JSON-LD WebSite 스키마
    const webSiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "NNOUSS.LOG",
        "url": "https://nnouss.xyz",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nnouss.xyz/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <html lang='ko' suppressHydrationWarning>
            <body
                className='min-h-screen bg-background text-foreground antialiased'
                suppressHydrationWarning
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
                />
                <Providers>
                    <ConditionalSiteHeader />
                    <ConditionalMainWrapper>{children}</ConditionalMainWrapper>
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
