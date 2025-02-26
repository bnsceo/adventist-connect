
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { User } from "@/types/social";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Video, Link, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CreatePostProps {
  user: User;
  onPost: (content: string, attachments?: string[]) => void;
}

export const CreatePost = ({ user, onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newAttachments: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('post_attachments')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        if (data) {
          const { data: { publicUrl } } = supabase.storage
            .from('post_attachments')
            .getPublicUrl(filePath);
          newAttachments.push(publicUrl);
        }
      }

      setAttachments([...attachments, ...newAttachments]);
      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddLink = () => {
    if (linkUrl) {
      setAttachments([...attachments, linkUrl]);
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const handlePost = () => {
    if (content.trim() || attachments.length > 0) {
      onPost(content, attachments);
      setContent("");
      setAttachments([]);
      setLinkUrl("");
      setShowLinkInput(false);
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
          
          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((url, index) => (
                <div key={index} className="relative">
                  {url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img src={url} alt="" className="rounded-lg max-h-[200px] object-cover" />
                  ) : url.match(/\.(mp4|webm)$/i) ? (
                    <video src={url} controls className="rounded-lg max-h-[200px]" />
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-social-primary hover:underline">
                      {url}
                    </a>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          {showLinkInput && (
            <div className="mt-3 flex space-x-2">
              <Input
                type="url"
                placeholder="Enter URL..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Button onClick={handleAddLink}>Add</Button>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex space-x-2">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-social-primary"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Image className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-social-primary"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isUploading}
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-social-primary"
                onClick={() => setShowLinkInput(!showLinkInput)}
              >
                <Link className="h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handlePost}
              className="bg-social-primary hover:bg-social-secondary text-white transition-colors"
              disabled={(!content.trim() && attachments.length === 0) || isUploading}
            >
              {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
