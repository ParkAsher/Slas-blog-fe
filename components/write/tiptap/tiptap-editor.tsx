'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import { all, createLowlight, common } from 'lowlight';
import { TiptapToolbar } from './tiptap-toolbar';
import './tiptap-editor.css';
import 'highlight.js/styles/atom-one-dark.css';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

const lowlight = createLowlight(common);

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4],
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'code-block',
                    spellcheck: 'false',
                    autocorrect: 'off',
                    autocapitalize: 'off',
                },
            }),
            Underline,
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Youtube.configure({
                nocookie: true,
                allowFullscreen: true,
                progressBarColor: 'white',
                width: 640,
                height: 360,
                HTMLAttributes: {
                    class: 'youtube-embed',
                },
            }),
            Image.configure({
                inline: false,
                allowBase64: false,
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
            ImageResize,
        ],
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[600px] p-4',
                spellcheck: 'false',
                autocorrect: 'off',
                autocapitalize: 'off',
            },
        },
        content,
    });

    if (!editor) {
        return null;
    }

    return (
        <div className='border border-input rounded-md overflow-hidden'>
            <TiptapToolbar editor={editor} />
            <div className='bg-background h-[600px] overflow-auto'>
                <EditorContent editor={editor} className='tiptap' spellCheck={false} />
            </div>
        </div>
    );
}
