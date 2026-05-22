// 태그 리스트 레이아웃 요구사항을 정적으로 검증하는 테스트
import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../components/main/tag-list.tsx', import.meta.url), 'utf8');

test('vertical tag items keep the count at the far right and clamp long tag names to two lines', () => {
    assert.match(
        source,
        /flex items-center justify-between gap-2[^\n'"]*w-full[^\n'"]*min-w-0/,
        'tag row should span the full button width and allow text shrinkage'
    );
    assert.match(
        source,
        /line-clamp-2[^\n'"]*min-w-0[^\n'"]*overflow-hidden[^\n'"]*text-ellipsis/,
        'tag name should clamp after two lines with ellipsis behavior'
    );
    assert.match(source, /Badge[^>]+className='[^']*shrink-0/, 'post count badge should not shrink');
});
