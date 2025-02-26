
import { useState, useEffect } from "react";
import { Post } from "@/types/social";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

      // Get user stats
      const { data: userStats } = await supabase
        .from('profile_stats')
        .select('*');

      const statsMap = new Map(userStats?.map(stat => [stat.id, stat]));

      if (postsData) {
        const formattedPosts: Post[] = postsData.map(post => ({
          id: post.id,
          content: post.content,
          timestamp: post.created_at,
          images: post.attachment_urls ? 
            (Array.isArray(post.attachment_urls) ? 
              post.attachment_urls.filter((url): url is string => typeof url === 'string') : 
              []
            ) : [],
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
            followers: statsMap.get(post.profiles.id)?.followers_count || 0,
            following: statsMap.get(post.profiles.id)?.following_count || 0
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

  const createPost = async (content: string, userId: string, attachments: string[] = []) => {
    try {
      const { data: post, error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: userId,
            content,
            title: content.slice(0, 50),
            attachment_urls: attachments
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
          images: post.attachment_urls ? 
            (Array.isArray(post.attachment_urls) ? 
              post.attachment_urls.filter((url): url is string => typeof url === 'string') : 
              []
            ) : [],
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
        return true;
      }
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
    return false;
  };

  const likePost = async (postId: string, userId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return false;

      if (post.hasLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);
      } else {
        await supabase
          .from('likes')
          .insert([
            {
              post_id: postId,
              user_id: userId,
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

      return true;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    isLoading,
    createPost,
    likePost,
  };
};
