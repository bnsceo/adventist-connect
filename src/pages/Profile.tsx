
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/social/ProfileHeader";
import { useToast } from "@/components/ui/use-toast";
import { PrayerRequest, Testimonial } from "@/types/social";
import { ProfileTabs } from "@/components/social/ProfileTabs";
import { ProfileEditDialog } from "@/components/social/ProfileEditDialog";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { toast } = useToast();
  const { userId } = useParams();
  const { user, isOwnProfile, posts, isLoading, refetchProfile } = useProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [prayerRequests] = useState<PrayerRequest[]>([]);
  const [testimonials] = useState<Testimonial[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = async (updatedUser) => {
    setIsEditDialogOpen(false);
    toast({
      description: "Profile updated successfully",
    });
  };

  const handleFollow = async () => {
    if (!userId) return;

    try {
      setIsUpdatingFollow(true);

      if (isFollowing) {
        // Unfollow
        await supabase
          .from('follows')
          .delete()
          .match({ 
            follower_id: (await supabase.auth.getSession()).data.session?.user.id,
            following_id: userId 
          });
      } else {
        // Follow
        await supabase
          .from('follows')
          .insert([
            { 
              follower_id: (await supabase.auth.getSession()).data.session?.user.id,
              following_id: userId 
            }
          ]);
      }

      setIsFollowing(!isFollowing);
      await refetchProfile();
      
      toast({
        description: isFollowing ? "Unfollowed successfully" : "Following successfully",
      });
    } catch (error) {
      console.error('Error updating follow status:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingFollow(false);
    }
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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-social-light">
        <div className="container max-w-4xl py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg" />
            <div className="h-32 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-social-light">
      <div className="container max-w-4xl py-8">
        <ProfileHeader 
          user={user} 
          isOwnProfile={isOwnProfile}
          onEditProfile={handleEditProfile}
          onFollow={handleFollow}
          isFollowing={isFollowing}
          isUpdatingFollow={isUpdatingFollow}
        />

        <ProfileEditDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={user}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveProfile}
        />

        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          posts={posts}
          prayerRequests={prayerRequests}
          testimonials={testimonials}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>
    </div>
  );
};

export default Profile;
