
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { Post } from "@/types/social";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

export const PostCard = ({ post, onLike, onComment, onShare }: PostCardProps) => {
  const [saved, setSaved] = useState(false);
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-social-border p-4 mb-4 animate-fade-in">
      <div className="flex items-start space-x-3">
        <UserAvatar user={post.author} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <Link to={`/profile/${post.author.id}`} className="hover:underline">
                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">
                {post.author.role} at {post.author.church}
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(post.timestamp), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report Post</DropdownMenuItem>
                <DropdownMenuItem>Hide Post</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
            {post.images && post.images.length > 0 && (
              <div className="mt-3 rounded-lg overflow-hidden">
                <img src={post.images[0]} alt="" className="w-full h-auto rounded-lg" />
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-b border-gray-100 py-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center space-x-2",
                post.hasLiked && "text-social-primary"
              )}
              onClick={() => onLike(post.id)}
            >
              <Heart className={cn("h-4 w-4", post.hasLiked && "fill-current")} />
              <span>{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => onComment(post.id)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => onShare(post.id)}
            >
              <Share2 className="h-4 w-4" />
              <span>{post.shares}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center space-x-2",
                saved && "text-social-primary"
              )}
              onClick={handleSave}
            >
              <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
