
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Post, PrayerRequest, Testimonial } from "@/types/social";
import { Heart, MessageCircle, Book } from "lucide-react";
import { PostCard } from "./PostCard";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  posts: Post[];
  prayerRequests: PrayerRequest[];
  testimonials: Testimonial[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

export const ProfileTabs = ({
  activeTab,
  setActiveTab,
  posts,
  prayerRequests,
  testimonials,
  onLike,
  onComment,
  onShare,
}: ProfileTabsProps) => {
  return (
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
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
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
  );
};
