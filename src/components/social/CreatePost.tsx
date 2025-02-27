
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { User } from "@/types/social";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image, Video, Link, Smile, MapPin, Loader2 } from "lucide-react";
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
      <div className="flex items-center space-x-3 mb-4">
        <UserAvatar user={user} />
        <div className="bg-social-hover rounded-full flex-1 px-4 py-2 text-gray-500">
          <button 
            className="w-full text-left"
            onClick={() => document.getElementById('post-content')?.focus()}
          >
            What's on your mind, {user.name.split(' ')[0]}?
          </button>
        </div>
      </div>
      
      <Textarea
        id="post-content"
        placeholder="Share something with the community..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] resize-none border-social-border focus:ring-social-primary mt-2"
      />
      
      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map((url, index) => (
            <div key={index} className="relative group">
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
                className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
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
            className="flex-1"
          />
          <Button onClick={handleAddLink}>Add</Button>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <div className="flex space-x-1">
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
            className="text-gray-500 hover:bg-social-hover rounded-full p-2 h-9 w-9"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Image className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-social-hover rounded-full p-2 h-9 w-9"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-social-hover rounded-full p-2 h-9 w-9"
            onClick={() => setShowLinkInput(!showLinkInput)}
          >
            <Link className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-social-hover rounded-full p-2 h-9 w-9"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-social-hover rounded-full p-2 h-9 w-9"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
        <Button
          onClick={handlePost}
          className="bg-social-primary hover:bg-social-secondary text-white transition-colors rounded-full px-5"
          disabled={(!content.trim() && attachments.length === 0) || isUploading}
        >
          {isUploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
          Post
        </Button>
      </div>
    </Card>
  );
};
