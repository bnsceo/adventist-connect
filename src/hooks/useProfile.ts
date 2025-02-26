
import { useState, useEffect } from "react";
import { User, Post } from "@/types/social";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useProfile = (userId?: string) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data: session } = await supabase.auth.getSession();
      const currentUserId = session?.session?.user?.id;
      const profileId = userId || currentUserId;

      if (!profileId) {
        throw new Error("No profile ID provided");
      }

      setIsOwnProfile(currentUserId === profileId);

      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();

      if (profileError) throw profileError;

      // Check if current user is following this profile
      if (currentUserId && !isOwnProfile) {
        const { data: followData } = await supabase
          .from('follows')
          .select('*')
          .eq('follower_id', currentUserId)
          .eq('following_id', profileId)
          .single();
        
        setIsFollowing(!!followData);
      }

      // Get profile stats
      const { data: stats } = await supabase
        .rpc('get_profile_stats')
        .eq('id', profileId)
        .single();

      if (profile) {
        const userData: User = {
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
        };
        setUser(userData);
      }

      // Fetch posts
      const { data: userPosts, error: postsError } = await supabase
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
        .eq('user_id', profileId)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (userPosts) {
        const formattedPosts: Post[] = userPosts.map(post => ({
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
            followers: stats?.followers_count || 0,
            following: stats?.following_count || 0
          }
        }));
        setPosts(formattedPosts);
      }

    } catch (err) {
      const error = err as Error;
      setError(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId, toast]);

  return { 
    user, 
    isOwnProfile, 
    posts, 
    isLoading, 
    error,
    isFollowing,
    refetchProfile: fetchProfile 
  };
};
