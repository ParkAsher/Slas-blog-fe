---
name: NNOUSS.LOG
description: 개발과 일상을 기록하는 개인 블로그 — 조용하고 정밀한 무채색 시스템
colors:
  surface: "#ffffff"
  ink: "#1f1f1f"
  surface-muted: "#f6f6f6"
  ink-muted: "#717171"
  edge: "#e8e8e8"
  warm-signal: "#fbbf24"
  dev-signal: "#0ea5e9"
  story-signal: "#f43f5e"
  destructive: "#dc2626"
typography:
  display:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
rounded:
  sharp: "4px"
  default: "0.625rem"
  large: "0.75rem"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.default}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "#303030"
    textColor: "{colors.surface}"
    rounded: "{rounded.default}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.default}"
    padding: "8px 16px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.default}"
    padding: "8px 16px"
  post-card:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "12px"
  post-card-hover:
    backgroundColor: "#f0f0f0"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "12px"
  intro-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "24px"
  tag-dev:
    backgroundColor: "#e0f2fe"
    textColor: "#075985"
    rounded: "{rounded.sharp}"
    padding: "4px 8px"
  tag-story:
    backgroundColor: "#ffe4e6"
    textColor: "#9f1239"
    rounded: "{rounded.sharp}"
    padding: "4px 8px"
---

# Design System: NNOUSS.LOG

## 1. Overview

**Creative North Star: "The Quiet Chronicle"**

NNOUSS.LOG는 빠르게 흘러가는 하루 속에서 천천히 남기고 싶은 것들의 기록이다. 이 디자인 시스템은 그 문장을 시각적으로 번역한다. 무채색 기반 위에 단 하나의 따뜻한 신호(Warm Signal, 앰버)가 존재하고, 두 개의 카테고리 신호(Dev의 sky, Story의 rose)가 의미 있을 때만 등장한다. 색은 쓸 이유가 없으면 쓰지 않는다.

레이아웃은 조용하다. 카드는 그림자 없이 배경보다 조금 짙은 표면으로만 구분된다. 모서리는 4px로 날카롭게 깎여 있다. 이 정밀함이 시스템의 개성이다. 둥글고 친근한 SaaS UI, 화면을 가득 채우는 애니메이션, 반짝이는 그라디언트 버튼 — 이 시스템은 그런 것들과 정확히 반대 방향에 있다.

여백이 목소리다. 콘텐츠 사이의 간격, 섹션 사이의 호흡이 이 블로그의 리듬을 만든다. 디자인이 앞에 나서는 순간 블로그는 쇼케이스가 되어버린다. 항상 글이 먼저다.

**Key Characteristics:**
- 무채색(Ash White / Ink Black) 기반, 색은 카테고리·환영 신호에만 사용
- 4px 날카로운 모서리가 시스템 전체를 관통하는 시그니처
- 그림자 없는 평탄한 레이어링, 깊이는 표면 명도 차이로만 표현
- Pretendard 단일 서체, 700/600/400 세 가지 굵기로 위계 구성
- 호버/인터랙션은 조용하게: 배경 명도 전환, scale 미세 조정만 허용

## 2. Colors: The Ash White / Ink Black Palette

두 개의 중립축(Ash White 계열 배경, Ink Black 계열 전경)과 세 개의 신호(Warm Signal, Dev Signal, Story Signal)로 구성된 절제된 팔레트.

### Primary
- **Warm Signal** (`#fbbf24` / `oklch(0.799 0.184 82)`): 인트로 카드 테두리와 인사 텍스트에만 등장하는 유일한 브랜드 온기. 이 색은 홈 화면에서 "여기 사람이 있다"는 신호다. 다른 곳에 쓰면 안 된다.

### Secondary
- **Dev Signal** (`#0ea5e9` / sky-500): Dev 카테고리 태그 배경/텍스트에서만 사용. 코드와 기술을 상징하는 차가운 파랑.
- **Story Signal** (`#f43f5e` / rose-500): Story 카테고리 태그에서만 사용. 일상과 감정을 상징하는 따뜻한 로즈.

### Neutral
- **Ash White** (`#ffffff` / `oklch(1 0 0)`): 페이지 배경. 라이트 모드의 캔버스.
- **Surface Muted** (`#f6f6f6` / `oklch(0.97 0 0)`): 포스트 카드, 비활성 버튼, 입력 필드 배경. 배경보다 약간 어둡게 카드를 떠오르게 한다.
- **Edge** (`#e8e8e8` / `oklch(0.922 0 0)`): 경계선, 구분선. 가능한 한 얇고 조용하게.
- **Ink Muted** (`#717171` / `oklch(0.556 0 0)`): 메타데이터, 날짜, 보조 텍스트.
- **Ink Black** (`#1f1f1f` / `oklch(0.145 0 0)`): 본문 텍스트, 제목. 순수한 검정은 아니다.
- **Destructive** (`#dc2626`): 삭제, 오류 상태에만 사용.

### Named Rules
**The Warm Signal Rule.** Warm Signal(`#fbbf24` 앰버)은 인트로 카드에만 존재한다. 버튼, 링크, 아이콘, 섹션 제목 어디에도 쓰지 않는다. 이 색의 희소성이 존재 이유다.

**The Category Color Rule.** Dev Signal(sky)과 Story Signal(rose)은 태그/배지 컨텍스트에서만 사용한다. 배경 전체를 물들이거나 제목 텍스트에 사용하면 카테고리 구분 신호로서의 의미를 잃는다.

## 3. Typography

**Body Font:** Pretendard Variable (Pretendard, -apple-system 폴백)

단일 서체, 세 가지 굵기(400 / 600 / 700)로 위계를 만든다. 디스플레이 전용 서체나 세리프 서체를 별도로 쓰지 않는다. Pretendard의 한국어/영어 혼용 가독성이 이 블로그의 목소리와 맞다.

**Character:** 기하학적이지 않고 인문주의적이다. 조용하지만 단조롭지 않다. 굵기 대비(700 vs 400)가 계층을 명확히 하며, 같은 굵기를 반복하면 위계가 무너진다.

### Hierarchy
- **Display** (700, clamp(1.875rem → 2.25rem), 줄간격 1.2, -0.025em): 포스트 상세 제목(h1). 최상단에서 단 한 번 등장.
- **Headline** (700, 1.5rem, 줄간격 1.3, -0.01em): 인트로 섹션 인사 텍스트. 페이지당 1–2회.
- **Title** (600, 1.125rem, 줄간격 1.4): 섹션 헤더(DEV / STORY), 포스트 카드 제목.
- **Body** (400, 1rem, 줄간격 1.7): 본문 텍스트. 최대 줄 길이 65–75ch 준수.
- **Label** (400, 0.75rem, 줄간격 1.5): 태그, 날짜, 메타데이터, "더보기" 링크.

### Named Rules
**The Single Weight Step Rule.** 같은 레벨에 700과 400을 섞지 않는다. 카드 제목은 Title(600), 본문은 Body(400)로 고정하고, 둘 사이의 중간 굵기(500)는 사용하지 않는다. 중간값은 위계를 흐린다.

## 4. Elevation

이 시스템은 기본적으로 평탄하다. 그림자를 구조적 깊이 표현에 사용하지 않는다. 깊이는 오직 **표면 명도 차이**로 표현한다: 배경(`surface`)보다 조금 어두운 `surface-muted`가 카드를 띄워 올리는 유일한 방법이다.

예외는 인트로 카드 하나뿐이다. `shadow-lg shadow-amber-500/20` — 앰버색 확산 그림자가 카드에 온기를 준다. 이것은 구조적 깊이가 아니라 Warm Signal의 연장이다. 다른 카드에 복사하지 않는다.

다크 모드에서는 명도를 역전한다: 배경이 가장 어둡고(`oklch(0.145 0 0)`), 카드 표면이 약간 밝다(`oklch(0.205 0 0)`). 그림자는 다크 모드에서도 존재하지 않는다.

### Named Rules
**The Flat-By-Default Rule.** 표면은 기본적으로 그림자 없이 존재한다. 카드가 떠있는 느낌은 `surface-muted` 배경으로 충분하다. 그림자가 필요하다고 느껴진다면 명도 대비가 부족한 것이다 — 색을 조정한다.

## 5. Components

### Buttons
조용하고 기능적이다. 시선을 끌려 하지 않는다.

- **Shape:** 기본 radius (10px, `--radius: 0.625rem`)
- **Primary:** Ink Black 배경, Ash White 텍스트. 패딩 8px 16px. 눌리는 느낌보다 결정의 느낌.
- **Hover:** 배경 약간 밝아짐(`#303030`). `scale(1.02)` 없음 — 버튼은 움직이지 않는다.
- **Ghost / Icon:** 투명 배경, 호버 시 `surface-muted`로 전환. 헤더 아이콘 버튼(모드 토글, 유저 메뉴)에 사용.
- **Focus:** ring 스타일, `oklch(0.708 0 0)` — 접근성 AA 충족.

### Tags / Badges
시스템에서 색이 가장 많이 쓰이는 유일한 곳. 카테고리 신호 전달이 목적이다.

- **Shape:** Sharp (4px) — 포스트 카드와 동일한 모서리로 일관성 유지
- **Dev Tag:** sky-100 배경(`#e0f2fe`), sky-800 텍스트(`#075985`). 다크: sky-900 배경, sky-200 텍스트.
- **Story Tag:** rose-100 배경(`#ffe4e6`), rose-800 텍스트(`#9f1239`). 다크: rose-900, rose-200.
- **크기:** 10px(모바일) / 12px(데스크탑), 패딩 4px 8px.

### Post Card (시그니처 컴포넌트)
이 블로그의 가장 중요한 컴포넌트. 그림자 없이 표면 색상만으로 부유감을 만든다.

- **Corner Style:** Sharp (4px) — 시스템 시그니처
- **Background:** `surface-muted` (#f6f6f6), 호버 시 `#f0f0f0`
- **Shadow Strategy:** 없음. 인트로 카드 그림자를 복사하지 않는다.
- **Border:** 없음 (border-0)
- **Internal Padding:** 12px
- **Thumbnail:** aspect-ratio 16:9, 동일한 4px radius, `object-cover`

### Intro Card
홈 화면의 유일한 강조 요소. Warm Signal이 여기서 집중된다.

- **Corner Style:** Sharp (4px)
- **Border:** 2px solid `warm-signal` (#fbbf24 라이트, #f59e0b 다크)
- **Shadow:** `shadow-lg shadow-amber-500/20` — 앰버 확산 그림자
- **Background:** `surface` (흰 배경)
- **Padding:** 24px

### Navigation / Header
가장 조용한 컴포넌트. 스크롤해도 존재를 잊게 만드는 것이 목표다.

- **Position:** sticky top-0, z-50
- **Background:** `surface/80` + `backdrop-blur` — 내용이 뒤로 보일 때 흐리게
- **Border:** 하단 1px `edge/60` — 가볍게만 구분
- **Logo:** `NNOUSS` (sky→violet→fuchsia 그라디언트), `.LOG` (foreground). 둘의 대비로 블로그 이름의 이중성 표현.
- **Nav links:** `ink-muted` 색상, 호버 시 `ink`로 전환. 트랜지션만.
- **Mobile:** Sheet 드로어로 대체.

### Inputs / Fields
기능적이고 눈에 띄지 않는다.

- **Style:** `edge` 색상 테두리, `surface-muted` 배경, `default` radius (10px)
- **Focus:** ring 스타일로 포커스 표시. 테두리 색 변화 없음.
- **Placeholder:** `ink-muted` 색상.

## 6. Do's and Don'ts

### Do:
- **Do** 카드에 4px(sharp) radius를 사용한다. 이것이 이 시스템의 시그니처다. `rounded-lg`나 `rounded-xl`로 무심코 바꾸지 않는다.
- **Do** 색을 쓰기 전에 이유를 댄다. Dev/Story 구분이거나 Warm Signal 환영이거나 Destructive 오류가 아니라면 무채색을 쓴다.
- **Do** 포스트 카드는 항상 그림자 없이 `surface-muted` 배경만으로 만든다. 깊이는 명도 차이로 충분하다.
- **Do** WCAG AA를 충족하는 명도 대비를 라이트/다크 양 모드에서 모두 확인한다.
- **Do** `@media (prefers-reduced-motion: reduce)` 환경에서 모든 트랜지션을 비활성화한다.
- **Do** 본문 줄 길이는 65–75ch를 지킨다. 넓은 화면에서 `max-w-5xl` 컨테이너가 이를 보장한다.

### Don't:
- **Don't** Warm Signal(앰버)을 인트로 카드 밖에서 쓴다. 버튼, 링크, 아이콘, 섹션 제목 어디에도 금지.
- **Don't** 포스트 카드에 그림자를 추가한다. 인트로 카드의 앰버 그림자는 유일한 예외이며 복사 금지.
- **Don't** 지나치게 화려한 애니메이션을 쓴다. 스크롤 파티클, 3D 회전, 스태거 등장 연출 — 이 시스템에서 금지된 언어다.
- **Don't** SaaS 마케팅 클리셰를 사용한다. 그라디언트 히어로 섹션, 큰 숫자 지표, 반짝이는 CTA 버튼.
- **Don't** Medium/Velog 기본 디자인을 답습한다. 플랫폼 기본값처럼 보이는 순간 이 블로그의 개성은 사라진다.
- **Don't** 같은 크기의 카드를 아이콘+제목+설명 패턴으로 반복 나열한다. 이미 있는 포스트 카드 그리드 외에 새로운 동일 카드 그리드를 만들지 않는다.
- **Don't** `border-left`나 `border-right` 2px 이상을 색상 강조 수단으로 쓴다. 필요하다면 배경 색조로 대체한다.
- **Don't** 딱딱한 기업 문서 느낌을 낸다. 회색 일색 docs 스타일, 줄 간격 없는 빽빽한 레이아웃은 이 블로그의 목소리와 충돌한다.
