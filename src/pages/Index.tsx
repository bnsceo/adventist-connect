
import { useState } from "react";
import { CreatePost } from "@/components/social/CreatePost";
import { PostCard } from "@/components/social/PostCard";
import { Post, User } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";

const currentUser: User = {
  id: "1",
  name: "Sarah Johnson",
  role: "Youth Leader",
  church: "Central Adventist Church",
  avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  followers: 245,
  following: 188
};

const initialPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "2",
      name: "David Chen",
      role: "Pastor",
      church: "Hope Adventist Church",
      avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      followers: 1200,
      following: 300
    },
    content: "Excited to share our upcoming youth retreat! Join us for a weekend of spiritual growth, fellowship, and outdoor activities. \n\n🏕️ Theme: 'Growing in Grace'\n📅 Date: Next weekend\n📍 Location: Mountain View Camp\n\nDM for registration details!",
    images: ["https://images.unsplash.com/photo-1517022812141-23620dba5c23"],
    likes: 24,
    comments: 5,
    shares: 3,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    hasLiked: false
  },
  {
    id: "2",
    author: currentUser,
    content: "Just finished our morning Bible study on the Book of Daniel. So grateful for the meaningful discussions and insights shared by our youth group. Looking forward to next week's session! 📖✨",
    likes: 15,
    comments: 3,
    shares: 1,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    hasLiked: true
  }
];

const Index = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { toast } = useToast();

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: String(Date.now()),
      author: currentUser,
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      hasLiked: false
    };

    setPosts([newPost, ...posts]);
    toast({
      title: "Post created",
      description: "Your post has been shared with the community.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    toast({
      title: "Comments",
      description: "Comments feature coming soon!",
    });
  };

  const handleShare = (postId: string) => {
    toast({
      title: "Share",
      description: "Share feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-social-light">
      <div className="container max-w-2xl py-8">
        <CreatePost user={currentUser} onPost={handleCreatePost} />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
