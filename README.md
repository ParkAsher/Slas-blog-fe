# NNOUSS.LOG — Frontend

> 개발과 일상을 천천히 기록하던 개인 블로그 **[nnouss.xyz](https://nnouss.xyz)** 의 프론트엔드 소스입니다.
>
> 서비스 운영은 종료되었으며, 코드는 학습·참고용 아카이브로 공개합니다.

빠르게 흘러가는 하루 속에서 천천히 남기고 싶은 것들을 기록하기 위해 만든 1인 블로그입니다.
정보 전달보다 진솔한 기록을 목적으로, 개발(Dev)과 일상(Story) 두 개의 목소리를 한 공간에 담았습니다.

---

## 기술 스택

| 분류 | 사용 기술 |
| --- | --- |
| **프레임워크** | [Next.js 15](https://nextjs.org) (App Router · Turbopack) |
| **언어** | TypeScript 5 |
| **UI 런타임** | React 19 |
| **스타일** | Tailwind CSS v4 · `@tailwindcss/typography` · `tw-animate-css` |
| **컴포넌트** | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives 기반) · lucide-react |
| **서버 상태** | [TanStack Query v5](https://tanstack.com/query) |
| **클라이언트 상태** | [Jotai](https://jotai.org) (`atomWithStorage` · sessionStorage) |
| **폼 · 검증** | react-hook-form · [Zod v4](https://zod.dev) |
| **에디터** | [TipTap v3](https://tiptap.dev) (code-block-lowlight · image · youtube · link · highlight 등) |
| **코드 하이라이트** | lowlight · highlight.js |
| **이미지** | browser-image-compression (업로드 전 압축) · Naver Cloud Object Storage 호스팅 |
| **테마** | next-themes (라이트 / 다크) |
| **알림 · 차트** | sonner · recharts |
| **폰트** | [Pretendard](https://github.com/orioncactus/pretendard) (jsDelivr CDN) |
| **분석** | Vercel Analytics |

> 백엔드는 별도 저장소의 **NestJS** API 서버입니다. 이 저장소는 프론트엔드만 포함합니다.

---

## 주요 기능

- **콘텐츠** — `Dev` / `Story` 두 카테고리, 태그 기반 분류 및 필터, 슬러그(slug) 기반 게시글 상세
- **에디터** — TipTap 리치 텍스트 에디터. 이미지 업로드(클라이언트 압축 후 오브젝트 스토리지 업로드), 코드 블록 신택스 하이라이트, 유튜브 임베드, 썸네일 지정, 글 작성·수정·삭제
- **댓글** — 대댓글(스레드형) 구조, 인증 사용자 작성·수정·삭제
- **인증** — 이메일/비밀번호 회원가입(이메일·닉네임 중복 검사, Zod 스키마 검증), 로그인, Bearer 토큰 기반 API 인증
- **관리자** — 별도 로그인(`ADMIN` 권한), 게시글 관리(검색·타입 필터·일괄 삭제), 사용자 관리(검색·역할 변경·비활성화), 대시보드
- **SEO** — 동적 `sitemap.xml`(백엔드 글 목록 기반), `robots.txt`(관리·작성 경로 차단), JSON-LD(Organization / WebSite), Open Graph · Twitter Card, 호스트 기반 동적 사이트 URL
- **접근성 · UX** — WCAG AA 지향, skip-to-content 링크, ARIA 속성, 라이트/다크 모드, 모바일 우선 반응형 레이아웃

---

## 라우트 구조

| 경로 | 설명 | 인증 |
| --- | --- | --- |
| `/` | 메인 — 소개 + Dev/Story 최신 글 슬라이드 | - |
| `/dev` | 개발 글 목록 (태그 필터) | - |
| `/story` | 일상 글 목록 (태그 필터) | - |
| `/post/[slug]` | 게시글 상세 + 댓글 | - |
| `/post/[slug]/edit` | 게시글 수정 | ✅ 사용자 |
| `/write` | 글쓰기 | ✅ 사용자 |
| `/signin` · `/signup` | 사용자 로그인 / 회원가입 | - |
| `/adm` · `/adm/login` | 관리자 진입 / 로그인 | - |
| `/adm/dashboard` | 관리자 대시보드 (게시글 · 사용자 관리) | ✅ 관리자 |

---

## 프로젝트 구조

```
app/                  # Next.js App Router (라우트 · 레이아웃 · SEO 파일)
├─ adm/               #   관리자 영역 (login · dashboard)
├─ dev/ · story/      #   카테고리별 글 목록
├─ post/[slug]/       #   게시글 상세 · 수정
├─ write/             #   글쓰기
├─ signin/ · signup/  #   사용자 인증
├─ metadata.ts        #   공통 메타데이터 (Open Graph · 검색엔진 인증)
├─ sitemap.ts         #   동적 사이트맵
└─ robots.ts          #   크롤러 규칙

components/
├─ ui/                # shadcn/ui 기반 공용 컴포넌트
├─ main/ · post/      # 도메인 컴포넌트 (목록 · 카드 · 상세)
├─ write/             # TipTap 에디터 · 태그 입력 · 썸네일 업로드
├─ comment/           # 댓글 · 대댓글
├─ auth/ · adm/       # 인증 폼 · 관리자 화면
└─ providers/         # 테마 등 Provider

lib/
├─ apis/              # 도메인별 API 클라이언트 (core.ts = 중앙 fetch 래퍼)
├─ atoms/             # Jotai 전역 상태 (auth · admin-auth)
├─ validations/       # Zod 스키마
└─ utils/             # cn · date 등 유틸

config/               # 사이트 프로필 · Provider 구성
hooks/                # 커스텀 훅
public/               # 파비콘 · OG 이미지
```

---

## 아키텍처 메모

- **프론트 / 백엔드 분리** — UI는 이 저장소, 데이터는 별도 NestJS API 서버가 담당합니다. 모든 요청은 `lib/apis/core.ts` 의 중앙 `fetchApi` 래퍼를 거칩니다. (Bearer 토큰 주입, JSON/FormData 자동 분기, `credentials: include`, NestJS 에러 형태 파싱)
- **서버 상태** — TanStack Query 로 관리합니다. (기본 `staleTime` 5분, `retry` 1, 윈도우 포커스 리페치 비활성화)
- **클라이언트 상태** — Jotai 의 `atomWithStorage` 로 인증 토큰·사용자 정보를 `sessionStorage` 에 보관합니다. 일반 사용자(`auth`)와 관리자(`admin-auth`) 상태를 분리했습니다.
- **이미지 파이프라인** — 업로드 전 브라우저에서 압축한 뒤 Naver Cloud Object Storage 에 업로드하고, `next/image` 의 `remotePatterns` 로 해당 호스트를 허용합니다.

---

## 로컬 실행

> 화면에 데이터가 보이려면 `NEXT_PUBLIC_API_BASE` 에 해당하는 백엔드 API 서버가 함께 떠 있어야 합니다.

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local
#   .env.local 을 열어 백엔드 주소 등을 채웁니다.

# 3. 개발 서버 실행 (http://localhost:3000)
npm run dev
```

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (Turbopack) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |

---

## 환경변수

모든 변수는 `NEXT_PUBLIC_` 접두사라 빌드 시 클라이언트 번들에 인라인됩니다. **브라우저에 공개되는 값이므로 진짜 비밀키는 넣지 않습니다.** 자세한 형식은 [`.env.example`](./.env.example) 을 참고하세요.

| 변수 | 필수 | 설명 |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE` | ✅ | 백엔드 API 서버 주소 |
| `NEXT_PUBLIC_SITE_URL` | ✅ | 공개 사이트 URL (sitemap · OG 절대경로) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | - | Google Search Console 소유권 인증 토큰 |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | - | Naver 서치어드바이저 소유권 인증 토큰 |

---

## 디자인 철학

> 기록이 먼저, 디자인은 그 다음.

조용하고 진솔한 개인의 기록 공간을 지향합니다. 강렬한 장치 대신 일관된 톤과 여백으로 정체성을 만들고,
Dev 와 Story 두 목소리를 색으로 구분하되 같은 호흡을 유지합니다. 자세한 제품·디자인 의도는
[`PRODUCT.md`](./PRODUCT.md) 와 [`DESIGN.md`](./DESIGN.md) 에 정리되어 있습니다.

---

## 라이선스

개인 프로젝트로, 별도 오픈소스 라이선스를 부여하지 않은 학습·참고용 아카이브입니다.
Copyright © nnouss. All rights reserved.
