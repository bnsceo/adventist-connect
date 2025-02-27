
import { useState, useEffect } from "react";
import { CreatePost } from "@/components/social/CreatePost";
import { User } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSetupDialog } from "@/components/social/ProfileSetupDialog";
import { PostsList } from "@/components/social/PostsList";
import { usePosts } from "@/hooks/usePosts";
import { Card } from "@/components/ui/card";
import { Users, Bookmark, Calendar, Heart, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      <div className="container py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="hidden md:block md:col-span-3">
          <Card className="p-4 mb-4 sticky top-4">
            {currentUser && (
              <div className="flex flex-col items-center p-4">
                <Link to={`/profile/${currentUser.id}`} className="mb-2">
                  <img 
                    src={currentUser.avatar || "https://via.placeholder.com/100"} 
                    alt={currentUser.name} 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                </Link>
                <h3 className="font-bold text-lg mt-2">{currentUser.name}</h3>
                <p className="text-social-primary text-sm">{currentUser.role}</p>
                <p className="text-gray-600 text-sm mb-4">{currentUser.church}</p>
                
                <div className="flex w-full justify-between text-center border-t border-b py-3 mb-4">
                  <div>
                    <p className="font-bold">{currentUser.followers}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="border-l border-r px-3">
                    <p className="font-bold">{currentUser.following}</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                  <div>
                    <p className="font-bold">{posts.filter(post => post.author.id === currentUser.id).length}</p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                </div>
              </div>
            )}
            
            <nav className="mt-2">
              <ul className="space-y-1">
                <li>
                  <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-social-hover text-gray-700 font-medium">
                    <Users size={18} />
                    <span>Community Feed</span>
                  </Link>
                </li>
                <li>
                  <Link to={currentUser ? `/profile/${currentUser.id}` : "/"} className="flex items-center gap-2 p-2 rounded hover:bg-social-hover text-gray-700 font-medium">
                    <UserIcon size={18} />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start p-2 font-medium">
                    <Bookmark size={18} className="mr-2" />
                    <span>Saved Posts</span>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start p-2 font-medium">
                    <Calendar size={18} className="mr-2" />
                    <span>Church Events</span>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start p-2 font-medium">
                    <Heart size={18} className="mr-2" />
                    <span>Prayer Requests</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </Card>
        </div>
        
        {/* Main feed */}
        <div className="col-span-1 md:col-span-6">
          {currentUser && <CreatePost user={currentUser} onPost={handleCreatePost} />}
          <PostsList
            posts={posts}
            isLoading={isLoading}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        </div>
        
        {/* Right sidebar */}
        <div className="hidden md:block md:col-span-3">
          <Card className="p-4 mb-4 sticky top-4">
            <h3 className="font-bold mb-3 text-gray-700">People You May Know</h3>
            <div className="space-y-4">
              {[
                {id: '1', name: 'Sarah Johnson', role: 'Worship Leader', church: 'Grace Community Church', avatar: 'https://i.pravatar.cc/150?img=1'},
                {id: '2', name: 'David Wilson', role: 'Youth Pastor', church: 'Hope Fellowship', avatar: 'https://i.pravatar.cc/150?img=3'},
                {id: '3', name: 'Michelle Lee', role: 'Children\'s Ministry', church: 'Faith Bible Church', avatar: 'https://i.pravatar.cc/150?img=5'}
              ].map(person => (
                <div key={person.id} className="flex items-center gap-3">
                  <Link to={`/profile/${person.id}`}>
                    <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/profile/${person.id}`} className="font-medium text-gray-800 hover:text-social-primary">
                      {person.name}
                    </Link>
                    <p className="text-xs text-gray-500 truncate">{person.role} at {person.church}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-social-primary">Follow</Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold mb-3 text-gray-700">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Prayer', 'Worship', 'Bible Study', 'Mission', 'Community', 'Youth'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-social-hover rounded-full text-sm text-social-primary">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
      <ProfileSetupDialog />
    </div>
  );
};

export default Index;
