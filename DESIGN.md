---
name: NNOUSS.LOG
description: 개발과 일상을 천천히 기록하는 개인 블로그
colors:
  ink: "#1c1c1c"
  canvas: "#ffffff"
  surface: "#f5f5f5"
  mid-gray: "#7c7c7c"
  line: "#eaeaea"
  amber-mark: "#f59e0b"
  sky-dev: "#0ea5e9"
  rose-story: "#f43f5e"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  tight: "4px"
  base: "10px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.tight}"
    padding: "10px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mid-gray}"
    rounded: "{rounded.tight}"
    padding: "8px 12px"
  tag-dev:
    backgroundColor: "#e0f2fe"
    textColor: "#075985"
    rounded: "{rounded.tight}"
    padding: "4px 8px"
  tag-story:
    backgroundColor: "#ffe4e6"
    textColor: "#9f1239"
    rounded: "{rounded.tight}"
    padding: "4px 8px"
  post-card:
    backgroundColor: "#f5f5f5"
    textColor: "{colors.ink}"
    rounded: "{rounded.tight}"
    padding: "12px"
---

# Design System: NNOUSS.LOG

## 1. Overview

**Creative North Star: "The Honest Log"**

NNOUSS.LOG는 수행이 아니라 기록이다. 빠르게 흘러가는 하루 속에서 천천히 남기고 싶은 것들 — 개발 중 마주친 문제, 풀었던 방법, 그날의 생각 — 을 솔직하게 담는 공간이다. 이 디자인 시스템은 기록자의 목소리가 방해받지 않도록 뒤로 물러선다. 시각적 장치가 눈에 띌수록 실패한 것이다.

팔레트는 거의 무채색이다. 단 하나의 따뜻한 액센트 — 앰버 — 가 인트로 섹션의 테두리와 블로그 이름 강조에만 사용된다. 나머지는 잉크와 종이다. Dev(sky)와 Story(rose) 카테고리 색상은 내용의 종류를 구별하는 신호로만 존재하며, 장식이 아니다.

이 시스템이 명시적으로 거부하는 것: SaaS 마케팅 랜딩의 언어 — 큰 숫자 지표, 그라디언트 히어로, 반복되는 CTA, 소셜 프루프 배지. Medium·Velog처럼 generic해서 누가 쓴지 지워진 플랫폼 느낌.

**Key Characteristics:**
- 무채색 기반 + 앰버 단일 액센트 (희소성이 핵심)
- 4px 반경 — 둥글지 않고 구조적이다
- 쉐도우 없는 카드 — 레이아웃이 계층을 만든다
- Pretendard — 한국어에 최적화된 단정한 산세리프
- 라이트/다크 모드 동등 지원

## 2. Colors: The Still Palette

하나의 따뜻한 신호, 두 개의 카테고리 신호, 나머지는 모두 중립이다.

### Primary
- **Amber Mark** (`#f59e0b`): 인트로 섹션 테두리·그림자, "NNOUSS" 로고 강조 텍스트에만 사용된다. 화면 전체에서 10% 미만이어야 한다. 희소성이 이 색의 의미다.

### Secondary
- **Sky Dev** (`#0ea5e9`): Dev 카테고리 태그. 라이트 모드에서 sky-100 배경(#e0f2fe) + sky-800 텍스트(#075985), 다크 모드에서 sky-900 배경 + sky-200 텍스트. 정보 신호이지 브랜드 색이 아니다.
- **Rose Story** (`#f43f5e`): Story 카테고리 태그. 라이트 모드에서 rose-100 배경(#ffe4e6) + rose-800 텍스트(#9f1239), 다크 모드에서 rose-900 배경 + rose-200 텍스트.

### Neutral
- **Ink** (`#1c1c1c`): 주요 텍스트, 다크 모드 배경. OKLCH 원본: `oklch(0.145 0 0)`.
- **Canvas** (`#ffffff`): 라이트 모드 배경, 다크 모드 주요 텍스트 근사값. OKLCH 원본: `oklch(1 0 0)`.
- **Surface** (`#f5f5f5`): 카드·뮤트 배경. OKLCH 원본: `oklch(0.97 0 0)`.
- **Mid Gray** (`#7c7c7c`): 날짜·메타 정보·보조 텍스트. OKLCH 원본: `oklch(0.556 0 0)`.
- **Line** (`#eaeaea`): 구분선, 테두리. OKLCH 원본: `oklch(0.922 0 0)`.

### Named Rules
**The Single Voice Rule.** 앰버는 인트로 섹션과 브랜드 로고에서만 사용된다. 버튼, 호버 효과, 강조 텍스트에 앰버를 추가하는 순간 희소성이 사라지고 시스템이 무너진다.

**The Signal Rule.** Sky(Dev)와 Rose(Story)는 카테고리 태그에만 사용된다. 이 두 색을 다른 맥락에서 쓰면 카테고리 신호로서의 의미가 희석된다.

## 3. Typography

**Body Font:** Pretendard Variable, Pretendard (한국어 가변 폰트, -apple-system 폴백)

**Character:** Pretendard는 한국어 텍스트에서 불필요한 긴장감 없이 읽힌다. 산세리프이지만 딱딱하지 않고, 가볍지만 느슨하지 않다. 디스플레이와 본문 모두 같은 서체 패밀리를 사용하며, 위계는 크기와 무게만으로 만든다.

### Hierarchy
- **Display** (700, clamp(1.875rem–2.25rem), line-height 1.2): 포스트 상세 페이지 제목(h1). 인트로 섹션 제목. 자간 -0.01em.
- **Headline** (700, 1.25rem, line-height 1.4): 홈 섹션 타이틀(DEV, STORY). 목록 페이지 구분 헤딩. 자간 -0.01em.
- **Title** (600, 1.125rem, line-height 1.4): 포스트 카드 제목. 화면에서 두 번째로 눈에 띄는 텍스트.
- **Body** (400, 1rem, line-height 1.625): 인트로 소개 문구, 포스트 본문. 행 길이는 65–75ch로 제한.
- **Label** (500, 0.875rem, line-height 1.5): 네비게이션 링크, 날짜·저자 메타 정보, "더보기" 링크.
- **Micro** (400–500, 0.625rem–0.75rem): 태그 배지 텍스트. 화면 밀도가 높은 영역에서만 사용.

### Named Rules
**The Single Family Rule.** 서체 패밀리는 Pretendard 하나다. 위계는 size + weight로만 만든다. 보조 서체를 추가하면 조용함이 깨진다.

## 4. Elevation

이 시스템은 기본적으로 평탄하다. 카드에는 그림자가 없고, 레이아웃 계층은 배경색과 여백으로 만든다. 그림자는 두 곳에서만 사용된다: 인트로 섹션의 앰버 소프트 글로우, 그리고 헤더의 배경 블러(backdrop-filter). 이 두 가지도 장식이 아니라 공간 신호다 — "이 섹션은 여기서 시작한다", "이 헤더는 콘텐츠 위에 떠 있다".

### Shadow Vocabulary
- **Amber Glow** (`box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.2)`): 인트로 섹션 전용. 앰버 테두리와 함께 사용되어 따뜻한 존재감을 만든다. 다크 모드에서는 불투명도 30%.
- **Header Blur** (`backdrop-filter: blur(8px)` + `background: rgba(255,255,255,0.8)`): 스티키 헤더 전용. 스크롤 시 콘텐츠와 헤더를 공간적으로 분리한다.

### Named Rules
**The Flat-by-Default Rule.** 카드, 입력 필드, 드롭다운은 기본 상태에서 그림자 없이 배경색과 테두리로 계층을 표현한다. 그림자는 앰버 글로우와 헤더 블러, 두 곳에만 예약되어 있다.

## 5. Components

### Buttons
- **Shape:** 거의 각진 모서리 (4px, rounded-tight). 둥근 버튼은 이 시스템에 어울리지 않는다.
- **Primary:** ink 배경(`#1c1c1c`) + canvas 텍스트(`#ffffff`). 패딩 10px 24px. 가장 강한 행동 신호.
- **Ghost / Icon:** 투명 배경, mid-gray 텍스트, 호버 시 surface 배경. 헤더 아이콘 버튼(User, Menu, ModeToggle)에 사용.
- **Hover / Focus:** 색 전환(transition-colors, 150ms). 포커스 링은 ring 컬러(`oklch(0.708 0 0)`), offset 2px.

### Tags / Chips
카테고리 신호이지 장식이 아니다.
- **Dev Tag:** sky-100 배경 + sky-800 텍스트 (라이트), sky-900 배경 + sky-200 텍스트 (다크). 4px 반경. 패딩 4px 8px.
- **Story Tag:** rose-100 배경 + rose-800 텍스트 (라이트), rose-900 배경 + rose-200 텍스트 (다크). 같은 형태.
- **Hover/Focus 효과 없음:** 태그는 정보 레이블이므로 hover·focus 강조를 의도적으로 제거한다.

### Cards / Post Cards
- **Corner Style:** 4px (rounded-tight) — 카드, 썸네일, 태그 모두 동일한 반경.
- **Background:** surface 35% 불투명도(`bg-muted/35`) — 라이트 모드에서 배경과 미묘하게 구분.
- **Shadow Strategy:** 없음. 배경색이 계층을 만든다.
- **Border:** 없음.
- **Internal Padding:** 12px.
- **Hover:** `bg-muted/45` — 미세한 배경 밝기 변화만. 이동·스케일 효과 없음.
- **Dark Mode:** card 토큰 배경(`oklch(0.205 0 0)`).

### Inputs / Fields
shadcn/ui 기본 스타일 사용. stroke 기반(border) + canvas 배경 + base(10px) 반경. 포커스 시 ring 컬러 테두리 강조.

### Navigation
- **Style:** 텍스트 링크. mid-gray 기본 색, hover 시 foreground로 전환. font-medium.
- **Desktop:** 헤더 inline 배치. 링크간 gap-3.
- **Mobile:** Sheet 사이드 메뉴. 각 링크는 block, 패딩 8px 12px, hover 시 accent 배경.
- **Logo:** "NNOUSS"는 sky→violet→fuchsia 그라디언트 텍스트, ".LOG"는 foreground. 이것은 기존 브랜드 요소로 유지된다. 새로운 UI 요소에 그라디언트 텍스트를 추가하지 않는다.

### Intro Section (Signature Component)
홈 화면 상단의 자기소개 블록. 앰버 2px 테두리 + 앰버 소프트 글로우 + 4px 반경. 이 컴포넌트가 전체 디자인에서 앰버가 가장 강하게 표현되는 유일한 장소다.

## 6. Do's and Don'ts

### Do:
- **Do** 앰버를 인트로 섹션과 "NNOUSS" 로고 강조에만 사용한다. 희소성이 이 색의 힘이다.
- **Do** 카드 위계는 배경색 차이와 여백으로 만든다. 테두리와 그림자가 없어도 계층은 분명하다.
- **Do** 4px 반경(rounded-tight)을 카드·태그·인트로 섹션에 일관되게 적용한다. 둥근 모서리는 시스템 컴포넌트(shadcn/ui 기본)에만 허용한다.
- **Do** Pretendard 단일 서체 패밀리를 유지한다. 계층은 size + weight로만 만든다.
- **Do** Dev/Story 카테고리 색(sky/rose)을 태그 이외 맥락에서 사용할 때 충분히 검토한다.
- **Do** 콘텐츠 line-length를 65–75ch로 제한한다. 특히 포스트 본문에서.

### Don't:
- **Don't** SaaS 마케팅 랜딩 패턴을 사용한다 — 큰 숫자 지표, 그라디언트 히어로 섹션, 소셜 프루프 배지, 반복되는 CTA 버튼. 이 블로그는 제품을 팔지 않는다.
- **Don't** 카드에 그림자를 추가한다. 그림자는 앰버 글로우(인트로)와 헤더 블러, 두 곳에만 예약되어 있다.
- **Don't** 새로운 UI 요소에 그라디언트 텍스트(background-clip: text)를 추가한다. 로고의 그라디언트는 기존 브랜드 요소로 유지하되, 확산시키지 않는다.
- **Don't** 앰버를 버튼·링크·강조 텍스트·호버 효과에 사용한다. 한 번 퍼지면 희소성은 회복되지 않는다.
- **Don't** 카드를 중첩한다. 카드 안에 카드는 항상 틀렸다.
- **Don't** Medium·Velog처럼 보이게 만든다 — generic한 플랫폼 느낌은 개성을 지운다.
- **Don't** 1px 이상의 컬러 side-stripe border를 장식으로 사용한다 (left/right border 강조 패턴).
