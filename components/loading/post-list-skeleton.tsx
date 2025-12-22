import { PostCardSkeleton } from './post-card-skeleton';

interface PostListSkeletonProps {
    count?: number;
}

export function PostListSkeleton({ count = 3 }: PostListSkeletonProps) {
    return (
        <div className="space-y-4">
            {[...Array(count)].map((_, i) => (
                <PostCardSkeleton key={i} />
            ))}
        </div>
    );
}

