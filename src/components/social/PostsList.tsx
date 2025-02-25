
import { Post } from "@/types/social";
import { PostCard } from "./PostCard";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface PostsListProps {
  posts: Post[];
  isLoading: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

export const PostsList = ({ posts, isLoading, onLike, onComment, onShare }: PostsListProps) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
        />
      ))}
    </div>
  );
};
