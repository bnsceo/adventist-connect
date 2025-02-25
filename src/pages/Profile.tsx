
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/social/ProfileHeader";
import { useToast } from "@/components/ui/use-toast";
import { PrayerRequest, Testimonial } from "@/types/social";
import { ProfileTabs } from "@/components/social/ProfileTabs";
import { ProfileEditDialog } from "@/components/social/ProfileEditDialog";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const { toast } = useToast();
  const { userId } = useParams();
  const { user, isOwnProfile, posts, isLoading } = useProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [prayerRequests] = useState<PrayerRequest[]>([]);
  const [testimonials] = useState<Testimonial[]>([]);

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

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = async (updatedUser) => {
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
