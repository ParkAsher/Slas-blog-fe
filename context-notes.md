# Context Notes

- 2026-05-23 태그 리스트 변경 목표는 dev/story 데스크톱 좌측 세로 태그 리스트에서 태그명과 게시글 수를 양끝 정렬하고, 긴 태그명은 최대 2줄 뒤 말줄임 처리하는 것이다.
- `app/dev/page.tsx`와 `app/story/page.tsx`는 둘 다 `TagList`의 `variant='vertical'`을 데스크톱 좌측 aside에 사용한다.
- 현재 `components/main/tag-list.tsx`의 세로 태그 항목은 내부 `div`에 `justify-between`이 있지만 `w-full`이 없어 버튼 전체 너비까지 벌어지지 않는다.
- 모바일 가로 태그 필터는 요청 범위가 아니므로 기존 형태를 유지한다.
- 세로 태그 항목은 내부 행을 `w-full min-w-0`으로 만들고 카운트 배지를 `shrink-0`으로 고정했다.
- 태그명은 `line-clamp-2`, `overflow-hidden`, `text-ellipsis`, `break-words`, `[overflow-wrap:anywhere]`를 적용해 최대 2줄 말줄임과 긴 문자열 줄바꿈을 함께 처리한다.
- `node --test tests/tag-list-layout.test.mjs`는 변경 전 실패했고, 컴포넌트 수정 후 통과했다.
- `npm run build`는 성공했고 `.next/static/chunks/app_globals_71f961d1.css`에 `.line-clamp-2`, `[overflow-wrap:anywhere]`, `.break-words`, `.text-ellipsis` CSS가 생성된 것을 확인했다.
- Browser 플러그인의 Node 실행 도구가 노출되지 않았고 Computer Use도 타임아웃되어 실제 화면 캡처 검증은 하지 못했다.

## 완료된 이전 작업

- 조회수 관련 프론트엔드 참조는 `views` 타입 필드와 관리자 게시글 테이블의 조회수 컬럼으로 확인했다.
- 공개 게시글 카드와 상세 화면은 `Post` 타입을 재사용하지만 조회수를 렌더링하지 않는다.
- 상세 페이지의 `getPost(slug)` 호출은 백엔드가 조회수 증가를 처리한다면 간접 영향이 있을 수 있으나, 프론트엔드 코드에는 조회수 증가 요청이 따로 없다.
- 이번 변경은 프론트엔드에서 조회수 필드 계약과 관리자 UI 표시를 제거하는 데 한정한다.
- 관리자 게시글 테이블은 조회수 헤더, 로딩 스켈레톤 셀, 실제 `post.views` 셀을 함께 제거해 컬럼 수를 맞췄다.
- `rg -n "\bviews\b|조회수" lib components app --glob '!components/ui/**'`는 잔여 참조 없이 종료 코드 1로 끝났다.
- 첫 `npm run build`는 샌드박스의 포트 바인딩 제한으로 실패했고, 승인된 권한으로 재실행한 빌드는 성공했다.
