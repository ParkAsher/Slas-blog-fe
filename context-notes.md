# Context Notes

- 메인 히어로는 `components/main/intro-section.tsx`의 `IntroSection`에서 관리된다.
- 사용자는 히어로 오른쪽 요소들이 굳이 필요 없다고 판단했다.
- 제품 맥락은 조용하고 개인적인 블로그이며, 불필요한 보조 패널을 줄이는 방향이 PRODUCT.md와 DESIGN.md의 기록 우선 원칙에 맞다.
- 우측 `noteCards` 패널은 제거하고, 기존 대형 제목과 소개 문구, 연락 링크는 유지했다.
- 단일 컬럼이 과하게 넓어지지 않도록 히어로 본문 래퍼를 `max-w-[46rem]`로 제한했다.
