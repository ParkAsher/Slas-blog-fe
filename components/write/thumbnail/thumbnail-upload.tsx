'use client';

import { useState, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/lib/authAtoms';
import { uploadThumbnailImage } from '@/lib/apis/write';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { X } from 'lucide-react';

interface ThumbnailUploadProps {
    onChange: (url: string | null) => void;
}

export function ThumbnailUpload({ onChange }: ThumbnailUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadedThumbnailPath, setUploadedThumbnailPath] = useState('');
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const token = useAtomValue(accessTokenAtom);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 이미지 파일 검증
        if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드 가능합니다.');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            // 서버에 업로드
            const response = await uploadThumbnailImage(file, token || undefined);

            setUploadedThumbnailPath(response.path);
            onChange(response.path);
        } catch (err: any) {
            setError(err.message || '이미지 업로드에 실패했습니다.');
            onChange(null);
        } finally {
            setUploading(false);
            // file input 초기화
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = () => {
        setUploadedThumbnailPath('');
        onChange(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className='space-y-2'>
            <div className='flex items-center gap-2'>
                <Label htmlFor='thumbnail'>썸네일</Label>
            </div>
            <div className='flex gap-2'>
                <Input
                    id='thumbnail'
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className='cursor-pointer'
                />
            </div>
            {uploading && (
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Spinner className='size-4' />
                    <span>업로드 중...</span>
                </div>
            )}
            {error && <p className='text-sm text-destructive'>{error}</p>}
            {uploadedThumbnailPath && !uploading && (
                <div className='mt-2 relative inline-block'>
                    <img
                        src={uploadedThumbnailPath}
                        alt='썸네일 미리보기'
                        className='w-full max-w-[160px] aspect-video object-cover rounded-md border border-input'
                    />
                    <button
                        type='button'
                        onClick={handleRemove}
                        className='absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 flex items-center justify-center transition-colors cursor-pointer'
                        aria-label='썸네일 삭제'
                    >
                        <X className='size-3' />
                    </button>
                </div>
            )}
        </div>
    );
}
