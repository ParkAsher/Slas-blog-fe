import { TiptapEditor } from '@/components/write/tiptap/tiptap-editor';

interface PostDetailContentProps {
    content: string;
}

export function PostDetailContent({ content }: PostDetailContentProps) {
    return <TiptapEditor content={content} editable={false} />;
}
