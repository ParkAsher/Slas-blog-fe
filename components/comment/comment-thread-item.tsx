'use client';

import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { CommentThread } from '@/lib/apis/comment';
import { deleteComment, editComment } from '@/lib/apis/comment';
import { formatCommentDate } from '@/lib/utils/date';
import { userAtom, accessTokenAtom } from '@/lib/atoms/auth';
import { ReplyForm } from '@/components/comment/reply-form';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export interface CommentThreadItemProps {
    postId: string;
    reply: CommentThread;
    openReplyToId: string | null;
    onOpenReply: (commentId: string) => void;
    onCloseReply: () => void;
    editingCommentId: string | null;
    onStartEdit: (commentId: string) => void;
    onCancelEdit: () => void;
}

export function CommentThreadItem({
    postId,
    reply,
    openReplyToId,
    onOpenReply,
    onCloseReply,
    editingCommentId,
    onStartEdit,
    onCancelEdit,
}: CommentThreadItemProps) {
    const user = useAtomValue(userAtom);
    const token = useAtomValue(accessTokenAtom);
    const queryClient = useQueryClient();
    const [isMounted, setIsMounted] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isAuthor = isMounted && user && String(user.id) === reply.authorId;
    const isReplyFormOpen = openReplyToId === reply.id;
    const isEditing = editingCommentId === reply.id;

    const [editContent, setEditContent] = useState(reply.content);

    const deleteMutation = useMutation({
        mutationFn: () => {
            if (!token) throw new Error('로그인이 필요합니다.');
            return deleteComment(reply.id, token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        },
        onError: (error: unknown) => {
            const apiError = error as { message?: string };
            toast.error(apiError.message ?? '댓글 삭제에 실패했습니다.');
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    const editMutation = useMutation({
        mutationFn: () => {
            if (!token) throw new Error('로그인이 필요합니다.');
            const trimmed = editContent.trim();
            if (!trimmed) throw new Error('댓글 내용을 입력해주세요.');
            return editComment(reply.id, { content: trimmed }, token);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
            onCancelEdit();
        },
        onError: (error: unknown) => {
            const apiError = error as { message?: string };
            toast.error(apiError.message ?? '댓글 수정에 실패했습니다.');
        },
    });

    const handleStartEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (reply.isDeleted) {
            toast.error('삭제된 댓글은 수정할 수 없습니다.');
            return;
        }
        setEditContent(reply.content);
        onStartEdit(reply.id);
    };

    const handleSaveEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        editMutation.mutate();
    };

    const handleCancelEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCancelEdit();
        setEditContent(reply.content);
    };

    return (
        <div className='py-3 pl-4 border-l-2 border-muted ml-2'>
            <div className='flex-1 min-w-0'>
                <div className='mb-1'>
                    <span className='text-sm font-medium'>{reply.author.nickname}</span>
                </div>
                {reply.isDeleted ? (
                    <p className='text-sm text-muted-foreground italic'>삭제된 댓글입니다.</p>
                ) : isEditing ? (
                    <>
                        <textarea
                            aria-label='댓글 수정'
                            className='mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[1px] focus-visible:ring-ring/50'
                            rows={3}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div className='flex items-center justify-between mt-2'>
                            <span className='text-xs text-muted-foreground'>
                                {formatCommentDate(reply.createdAt)}
                            </span>
                            <div className='flex items-center gap-2'>
                                <button
                                    type='button'
                                    onClick={handleCancelEdit}
                                    disabled={editMutation.isPending}
                                    className='text-xs text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50 py-2 -my-1'
                                >
                                    취소
                                </button>
                                <button
                                    type='button'
                                    onClick={handleSaveEdit}
                                    disabled={!editContent.trim() || editMutation.isPending}
                                    className='text-xs font-medium text-foreground hover:text-foreground/70 cursor-pointer disabled:opacity-50 py-2 -my-1'
                                >
                                    {editMutation.isPending ? '수정 중...' : '수정 완료'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-sm whitespace-pre-wrap break-words'>
                            {reply.replyToUser && (
                                <span className='text-sky-600 dark:text-sky-400 font-medium mr-1'>
                                    @{reply.replyToUser.nickname}
                                </span>
                            )}
                            {reply.content}
                        </p>
                        <div className='flex items-center gap-2 mt-1'>
                            <span className='text-xs text-muted-foreground'>
                                {formatCommentDate(reply.createdAt)}
                            </span>
                            <button
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenReply(reply.id);
                                }}
                                className='text-xs text-muted-foreground hover:text-foreground cursor-pointer py-2 -my-1'
                            >
                                답글쓰기
                            </button>
                            {isAuthor && !reply.isDeleted && (
                                <>
                                    <button
                                        type='button'
                                        onClick={handleStartEdit}
                                        className='text-xs text-muted-foreground hover:text-foreground cursor-pointer py-2 -my-1'
                                    >
                                        수정
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setDeleteDialogOpen(true)}
                                        disabled={deleteMutation.isPending}
                                        className='text-xs text-muted-foreground hover:text-destructive cursor-pointer disabled:opacity-50 py-2 -my-1'
                                    >
                                        삭제
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>댓글을 삭제하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>
                            삭제된 댓글은 복구할 수 없습니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='cursor-pointer'>취소</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className='cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        >
                            삭제
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {isReplyFormOpen && (
                <ReplyForm postId={postId} parentId={reply.id} onClose={onCloseReply} />
            )}
        </div>
    );
}
