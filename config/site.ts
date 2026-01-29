/**
 * 메인 페이지 소개/연락처 설정
 */
export const siteProfile = {
    greeting: 'Welcome to SLAS.LOG! 👋',
    intro: '빠르게 흘러가는 하루 속에서\n천천히 남기고 싶은 것들이 생겼습니다.\n개발과 일상을 기록하는 공간입니다.',
    links: [
        { label: 'Email', href: 'slasugofficial@gmail.com', icon: 'mail' as const },
        { label: 'GitHub', href: 'https://github.com/ParkAsher', icon: 'github' as const },
    ],
} as const;
