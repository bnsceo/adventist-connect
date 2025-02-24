
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/social";
import { supabase } from "@/integrations/supabase/client";
import { Camera } from "lucide-react";

interface ProfileEditFormProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export const ProfileEditForm = ({ user, onClose, onSave }: ProfileEditFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    church: user.church,
    bio: user.bio || "",
    location: user.location || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File, type: 'avatar' | 'banner') => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("No authenticated user found");
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.session.user.id}/${type}_${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      if (type === 'avatar') {
        setUploadingAvatar(true);
      } else {
        setUploadingBanner(true);
      }

      const { error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      const updateData = type === 'avatar' 
        ? { avatar_url: publicUrl }
        : { banner_image: publicUrl };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', session.session.user.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Success",
        description: `${type === 'avatar' ? 'Profile' : 'Banner'} image updated successfully`,
      });

    } catch (error) {
      console.error(`Error uploading ${type} image:`, error);
      toast({
        title: "Error",
        description: `Failed to upload ${type} image. Please try again.`,
        variant: "destructive",
      });
    } finally {
      if (type === 'avatar') {
        setUploadingAvatar(false);
      } else {
        setUploadingBanner(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("No authenticated user found");
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          church_role: formData.role,
          church_name: formData.church,
          bio: formData.bio,
          location: formData.location,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.session.user.id);

      if (error) {
        throw error;
      }

      const updatedUser = {
        ...user,
        ...formData
      };

      onSave(updatedUser);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image upload buttons */}
      <div className="flex gap-4 mb-6">
        <div>
          <input
            type="file"
            ref={avatarInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, 'avatar');
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => avatarInputRef.current?.click()}
            disabled={uploadingAvatar}
          >
            <Camera className="w-4 h-4 mr-2" />
            {uploadingAvatar ? "Uploading..." : "Change Profile Picture"}
          </Button>
        </div>

        <div>
          <input
            type="file"
            ref={bannerInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, 'banner');
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => bannerInputRef.current?.click()}
            disabled={uploadingBanner}
          >
            <Camera className="w-4 h-4 mr-2" />
            {uploadingBanner ? "Uploading..." : "Change Banner Image"}
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="church" className="block text-sm font-medium text-gray-700">
          Church
        </label>
        <Input
          id="church"
          value={formData.church}
          onChange={(e) => setFormData({ ...formData, church: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="City, Country"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Tell us about yourself..."
          rows={4}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
