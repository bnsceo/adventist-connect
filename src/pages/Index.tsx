
import { useState, useEffect } from "react";
import { CreatePost } from "@/components/social/CreatePost";
import { PostCard } from "@/components/social/PostCard";
import { Post, User } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSetupDialog } from "@/components/social/ProfileSetupDialog";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.session.user.id)
        .single();

      if (profile) {
        setCurrentUser({
          id: profile.id,
          name: profile.full_name || "Anonymous",
          role: profile.church_role || "",
          church: profile.church_name || "",
          avatar: profile.avatar_url || "",
          followers: 0,
          following: 0,
          bio: profile.bio,
          location: profile.location,
          ministries: profile.ministry_roles || [],
        });
      }
    };

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data: postsData, error } = await supabase
          .from('posts')
          .select(`
            *,
            profiles:user_id (
              id,
              full_name,
              church_role,
              church_name,
              avatar_url
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (postsData) {
          const formattedPosts: Post[] = postsData.map(post => ({
            id: post.id,
            content: post.content,
            timestamp: post.created_at,
            images: post.attachment_urls || [],
            likes: post.like_count || 0,
            comments: 0,
            shares: 0,
            hasLiked: false,
            author: {
              id: post.profiles.id,
              name: post.profiles.full_name || "Anonymous",
              role: post.profiles.church_role || "",
              church: post.profiles.church_name || "",
              avatar: post.profiles.avatar_url || "",
              followers: 0,
              following: 0
            }
          }));
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
    fetchPosts();
  }, [toast]);

  const handleCreatePost = async (content: string) => {
    if (!currentUser) return;

    try {
      const { data: post, error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: currentUser.id,
            content,
            title: content.slice(0, 50), // Using first 50 chars as title
          }
        ])
        .select(`
          *,
          profiles:user_id (
            id,
            full_name,
            church_role,
            church_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      if (post) {
        const newPost: Post = {
          id: post.id,
          content: post.content,
          timestamp: post.created_at,
          images: post.attachment_urls || [],
          likes: 0,
          comments: 0,
          shares: 0,
          hasLiked: false,
          author: {
            id: post.profiles.id,
            name: post.profiles.full_name || "Anonymous",
            role: post.profiles.church_role || "",
            church: post.profiles.church_name || "",
            avatar: post.profiles.avatar_url || "",
            followers: 0,
            following: 0
          }
        };

        setPosts([newPost, ...posts]);
        toast({
          title: "Post created",
          description: "Your post has been shared with the community.",
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) return;

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.hasLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', currentUser.id);
      } else {
        await supabase
          .from('likes')
          .insert([
            {
              post_id: postId,
              user_id: currentUser.id,
            }
          ]);
      }

      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
            hasLiked: !p.hasLiked
          };
        }
        return p;
      }));
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    }
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
        {currentUser && <CreatePost user={currentUser} onPost={handleCreatePost} />}
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 space-y-4 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
      <ProfileSetupDialog />
    </div>
  );
};

export default Index;
