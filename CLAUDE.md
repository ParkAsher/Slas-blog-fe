# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**NNOUSS.LOG** — nnouss의 개인 블로그. Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4로 구성된 풀스택 블로그 프론트엔드. 백엔드는 NestJS 기반 외부 API(`NEXT_PUBLIC_API_BASE`)에 분리되어 있다.

## 핵심 명령어

```bash
npm run dev      # Turbopack 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드 (Turbopack)
npm run start    # 프로덕션 서버 실행
```

테스트 프레임워크 없음. 타입 체크: `npx tsc --noEmit`

## 아키텍처

### 라우팅 (App Router)
| 경로 | 설명 |
|------|------|
| `app/` | 메인 블로그 홈 |
| `app/post/[slug]/` | 포스트 상세 / 편집 |
| `app/story/` | 스토리 목록 |
| `app/write/` | 글 작성 (TipTap 에디터) |
| `app/signin/`, `app/signup/` | 인증 |
| `app/adm/` | 어드민 대시보드 |
| `app/dev/` | 개발용 테스트 페이지 |

`app/adm/`과 `app/dev/`는 헤더/메인 래퍼가 조건부로 숨겨진다 (`components/conditional-*.tsx`).

### API 레이어 (`lib/apis/`)
모든 HTTP 요청은 `lib/apis/core.ts`의 `fetchApi()`를 통한다. `credentials: 'include'`로 쿠키 전송, Bearer 토큰 선택적 지원. 응답 실패 시 `ApiError`(status, data 포함) throw.

도메인별로 분리: `auth/`, `post/`, `comment/`, `write/`, `edit/`, `admin/`, `main/`, `metrics/`

### 상태 관리
- **Jotai**: 인증 상태 (`lib/atoms/auth.ts`) — `accessToken`, `user`는 `sessionStorage`에 저장
- **TanStack Query**: 서버 데이터 페칭 (staleTime 5분, refetchOnWindowFocus 비활성화)

### 전역 Provider 순서 (`config/providers.tsx`)
`JotaiProvider → QueryClientProvider → ThemeProvider`

### 이미지
NCloud Object Storage (`kr.object.ncloudstorage.com/slasug/**`)에 업로드. `next.config.ts`에 `remotePatterns` 등록되어 있음.

## 코드 스타일 규칙

- **경로 별칭**: `@/` = 프로젝트 루트. 상대 경로 사용 금지
- **UI 컴포넌트**: `components/ui/`는 shadcn/ui 자동 생성 파일. 직접 수정하지 말고 래퍼 컴포넌트 작성
- **API 함수**: `lib/apis/{domain}/` 폴더에 도메인별 분리, `index.ts`에서 re-export
- **사이트 메타데이터**: `app/metadata.ts`에서 중앙 관리, 페이지별 override는 `generateMetadata()` 사용
- **사이트 URL**: `lib/site-url.ts` 또는 `process.env.NEXT_PUBLIC_SITE_URL` 참조

## 환경변수

| 변수 | 용도 |
|------|------|
| `NEXT_PUBLIC_API_BASE` | 백엔드 API URL (기본: `http://localhost:8000`) |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL (기본: `https://nnouss.xyz`) |

## 커밋 컨벤션

커밋 요청 시 `git diff`로 변경 내역 전체를 먼저 파악하고, 연관된 파일끼리 묶어 **여러 커밋으로 분리**한다. 모든 변경을 한 커밋에 묶지 않는다.

**분리 기준 예시**
- 기능 A 구현 파일들 → 커밋 1
- 기능 B 버그 수정 파일들 → 커밋 2
- 문서/설정 변경 → 커밋 3

각 커밋은 아래 타입 중 가장 적합한 것을 선택하고 `[type]: 한글 메시지` 형식으로 작성한다.

| 타입 | 사용 시점 |
|------|-----------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 포매팅, 세미콜론 누락 등 (로직 변경 없음) |
| `design` | CSS 등 사용자 UI 디자인 변경 |
| `test` | 테스트 코드 추가/수정 |
| `refactor` | 프로덕션 코드 리팩토링 |
| `build` | 빌드 파일 수정 |
| `ci` | CI 설정 파일 수정 |
| `perf` | 성능 개선 |
| `chore` | 자잘한 수정, 빌드 업데이트 |
| `rename` | 파일/폴더명 변경만 한 경우 |
| `remove` | 파일 삭제만 한 경우 |

## 금지 구역

- `node_modules/` — 읽지 말 것
- `.next/` — 빌드 캐시, 읽지 말 것
- `components/ui/` — shadcn/ui 자동 생성 파일, 수정 금지
