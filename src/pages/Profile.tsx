
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/social/ProfileHeader";
import { PostCard } from "@/components/social/PostCard";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Post, User } from "@/types/social";
import { PrayerRequest, Testimonial } from "@/types/social";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Book } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfileEditForm } from "@/components/social/ProfileEditForm";
import { supabase } from "@/integrations/supabase/client";

const defaultUser: User = {
  id: "1",
  name: "Anderson Paulino",
  role: "Platform Founder",
  church: "Adventist.com",
  avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  followers: 245,
  following: 188,
  bio: "As the founder of the Adventist.com app, I'm deeply committed to creating a digital space that strengthens our global Seventh-day Adventist community.",
  location: "Orlando, FL",
  ministries: ["Youth Ministry", "Worship Team", "Bible Study", "Community Outreach"],
  coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
};

const Profile = () => {
  const { toast } = useToast();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        const currentUserId = session?.session?.user?.id;
        const profileId = userId || currentUserId;

        if (!profileId) {
          toast({
            title: "Error",
            description: "No profile ID provided",
            variant: "destructive",
          });
          return;
        }

        setIsOwnProfile(currentUserId === profileId);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single();

        if (error) throw error;

        if (profile) {
          const userData: User = {
            id: profile.id,
            name: profile.full_name || "Anonymous",
            role: profile.church_role || "",
            church: profile.church_name || "",
            avatar: profile.avatar_url || "",
            followers: 0, // You might want to fetch this from a separate table
            following: 0, // You might want to fetch this from a separate table
            bio: profile.bio,
            location: profile.location,
            ministries: profile.ministry_roles || [],
          };
          setUser(userData);
        }

        // Fetch posts
        const { data: userPosts, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', profileId)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        setPosts(userPosts || []);

        // You can add similar fetches for prayer requests and testimonials here

      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, [userId, toast]);

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = async (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditDialogOpen(false);
    toast({
      description: "Profile updated successfully",
    });
  };

  const handleLike = (postId: string) => {
    toast({
      description: "Post liked successfully",
    });
  };

  const handleComment = (postId: string) => {
    toast({
      description: "Comments feature coming soon!",
    });
  };

  const handleShare = (postId: string) => {
    toast({
      description: "Share feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-social-light">
      <div className="container max-w-4xl py-8">
        <ProfileHeader 
          user={user} 
          isOwnProfile={isOwnProfile}
          onEditProfile={handleEditProfile}
        />

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <ProfileEditForm
              user={user}
              onClose={() => setIsEditDialogOpen(false)}
              onSave={handleSaveProfile}
            />
          </DialogContent>
        </Dialog>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="bg-white border border-social-border">
            <TabsTrigger value="posts" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="prayer" className="gap-2">
              <Heart className="w-4 h-4" />
              Prayer Requests
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <Heart className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Book className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            ))}
          </TabsContent>

          <TabsContent value="prayer">
            <Card className="p-6">
              {prayerRequests.map((prayer) => (
                <div 
                  key={prayer.id}
                  className="border-b border-social-border last:border-0 pb-4 mb-4 last:mb-0"
                >
                  <p className="text-gray-800 whitespace-pre-wrap">{prayer.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{new Date(prayer.timestamp).toLocaleDateString()}</span>
                    <span>🙏 {prayer.prayerCount} prayers</span>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card className="p-6">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="border-b border-social-border last:border-0 pb-4 mb-4 last:mb-0"
                >
                  <p className="text-gray-800 whitespace-pre-wrap">{testimonial.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{new Date(testimonial.timestamp).toLocaleDateString()}</span>
                    <span className="text-social-primary">{testimonial.category}</span>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="p-6">
              <p className="text-gray-500 text-center py-8">
                Activity timeline coming soon!
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
