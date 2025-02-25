
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

  useEffect(() => {
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

        if (profile) {
          const userData: User = {
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
          };
          setUser(userData);
        }

        // Fetch posts with authors
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
            images: post.attachment_urls as string[],
            likes: post.like_count,
            comments: 0,
            shares: 0,
            hasLiked: false,
            author: {
              id: post.profiles.id,
              name: post.profiles.full_name,
              role: post.profiles.church_role,
              church: post.profiles.church_name,
              avatar: post.profiles.avatar_url,
              followers: 0,
              following: 0
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

    fetchProfile();
  }, [userId, toast]);

  return { user, isOwnProfile, posts, isLoading, error };
};
