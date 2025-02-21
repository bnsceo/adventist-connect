
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { User } from "@/types/social";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Video, Link } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CreatePostProps {
  user: User;
  onPost: (content: string) => void;
}

export const CreatePost = ({ user, onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent("");
    }
  };

  return (
    <Card className="p-4 mb-6 border border-social-border bg-white animate-fade-in">
      <div className="flex space-x-3">
        <UserAvatar user={user} />
        <div className="flex-1">
          <Textarea
            placeholder="Share something with the community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-social-border focus:ring-social-primary"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-social-primary">
                <Image className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-social-primary">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-social-primary">
                <Link className="h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handlePost}
              className="bg-social-primary hover:bg-social-secondary text-white transition-colors"
              disabled={!content.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
