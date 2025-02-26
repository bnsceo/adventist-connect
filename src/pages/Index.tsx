
import { useState, useEffect } from "react";
import { CreatePost } from "@/components/social/CreatePost";
import { User } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSetupDialog } from "@/components/social/ProfileSetupDialog";
import { PostsList } from "@/components/social/PostsList";
import { usePosts } from "@/hooks/usePosts";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { posts, isLoading, createPost, likePost } = usePosts();
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

      // Get profile stats using RPC function
      const { data: stats } = await supabase
        .rpc('get_profile_stats')
        .eq('id', session.session.user.id)
        .single();

      if (profile) {
        setCurrentUser({
          id: profile.id,
          name: profile.full_name || "Anonymous",
          role: profile.church_role || "",
          church: profile.church_name || "",
          avatar: profile.avatar_url || "",
          followers: stats?.followers_count || 0,
          following: stats?.following_count || 0,
          bio: profile.bio,
          location: profile.location,
          ministries: profile.ministry_roles || [],
        });
      }
    };

    fetchCurrentUser();
  }, []);

  const handleCreatePost = async (content: string, attachments?: string[]) => {
    if (!currentUser) return;

    try {
      const success = await createPost(content, currentUser.id, attachments);
      if (success) {
        toast({
          title: "Post created",
          description: "Your post has been shared with the community.",
        });
      }
    } catch (error) {
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
      await likePost(postId, currentUser.id);
    } catch (error) {
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
        <PostsList
          posts={posts}
          isLoading={isLoading}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>
      <ProfileSetupDialog />
    </div>
  );
};

export default Index;
