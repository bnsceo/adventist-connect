
import { useState } from "react";
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

const profileUser: User = {
  id: "1",
  name: "Anderson Paulino",
  role: "Platform Founder",
  church: "Adventist.com",
  avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  followers: 245,
  following: 188,
  bio: "As the founder of the Adventist.com app, I'm deeply committed to creating a digital space that strengthens our global Seventh-day Adventist community. My vision was to develop a comprehensive platform that not only connects us through shared faith but also empowers each user with a personalized and secure experience. This app is designed to be more than just a resource; it's a tool for spiritual growth, community engagement, and accessible information. I believe in the power of technology to enhance our connection to God and each other, and I'm dedicated to continuously improving Adventist.com to meet the evolving needs of our worldwide family. \n\n📖 Currently studying the Book of Daniel\n🎵 Worship team leader\n🌱 Mentoring young adults",
  location: "Orlando, FL",
  ministries: ["Youth Ministry", "Worship Team", "Bible Study", "Community Outreach"],
  coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
};

const userPosts: Post[] = [
  {
    id: "1",
    author: profileUser,
    content: "Just finished our morning Bible study on the Book of Daniel. So grateful for the meaningful discussions and insights shared by our youth group. Looking forward to next week's session! 📖✨",
    likes: 15,
    comments: 3,
    shares: 1,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    hasLiked: true
  }
];

const prayerRequests: PrayerRequest[] = [
  {
    id: "1",
    content: "Please pray for our upcoming youth retreat. Praying for God's guidance in planning and that it will be a transformative experience for all attendees.",
    author: profileUser,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    prayerCount: 12,
    isPrivate: false
  }
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    content: "God has been so faithful in guiding our youth ministry. Seeing young people grow in their faith and take leadership roles in the church has been incredibly inspiring.",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Ministry"
  }
];

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [user, setUser] = useState(profileUser);

  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = (updatedUser: User) => {
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
          isOwnProfile={true}
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
            {userPosts.map((post) => (
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
