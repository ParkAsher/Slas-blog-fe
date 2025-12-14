'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom, userAtom } from '@/lib/authAtoms';
import { TagInput } from '@/components/write/tag/tag-input';
import { TiptapEditor } from '@/components/write/tiptap/tiptap-editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function WritePage() {
    const router = useRouter();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const user = useAtomValue(userAtom);
    const [mounted, setMounted] = useState(false);

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (!isAuthenticated || user?.role !== 'ADMIN') {
                router.push('/');
            }
        }
    }, [mounted, isAuthenticated, user, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 호출로 글 저장
        console.log({ title, tags, content });
    };

    if (!mounted) {
        return null;
    }

    if (!isAuthenticated || user?.role !== 'ADMIN') {
        return null;
    }

    return (
        <div className='mx-auto'>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                    <Label htmlFor='title'>제목</Label>
                    <Input
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='제목을 입력하세요'
                        required
                    />
                </div>

                <div className='space-y-2'>
                    <Label>
                        태그 <span className='text-muted-foreground'>({tags.length}/5)</span>
                    </Label>
                    <TagInput tags={tags} onChange={setTags} maxTags={5} />
                </div>

                <div className='space-y-2'>
                    <Label>내용</Label>
                    <TiptapEditor content={content} onChange={setContent} />
                </div>

                <div className='flex justify-end gap-2'>
                    <Button
                        className='cursor-pointer'
                        type='button'
                        variant='outline'
                        onClick={() => router.back()}
                    >
                        취소
                    </Button>
                    <Button className='cursor-pointer' type='submit'>
                        작성하기
                    </Button>
                </div>
            </form>
        </div>
    );
}
