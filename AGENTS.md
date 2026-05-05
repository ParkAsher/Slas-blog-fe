# Global Codex Instructions

- 사용자에게 보여주는 모든 설명, 진행상황 업데이트, 질문, 최종 답변은 기본적으로 한국어로 작성한다.
- 사용자가 명시적으로 다른 언어를 요청한 경우에만 그 언어를 사용한다.
- 코드, 파일 경로, 명령어, API 이름, 식별자, 에러 메시지, 커밋 타입, 외부 문서의 고유 표현은 원문을 유지한다.
- 스킬을 사용할 때도 스킬 이름과 필수 원문 키워드는 유지하되, 스킬 사용 이유와 작업 설명은 한국어로 말한다.
- 영어로 된 지침이나 문서를 읽더라도 사용자에게 요약하거나 설명할 때는 한국어로 번역해 전달한다.

## Windows PowerShell Path Rules

- PowerShell에서 Next.js 동적 라우트 경로처럼 대괄호가 포함된 파일을 읽을 때는 `-Path` 대신 `-LiteralPath`를 사용한다.
- 예: `Get-Content -Encoding UTF8 -LiteralPath 'app\post\[slug]\page.tsx'`
- `Get-Content -Encoding UTF8 app\post\[slug]\page.tsx`처럼 쓰면 `[slug]`가 wildcard 문자 집합으로 해석되어 `-Encoding` 동적 매개변수 바인딩이 실패할 수 있다.
