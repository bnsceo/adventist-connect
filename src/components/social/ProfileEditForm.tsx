
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/social";
import { supabase } from "@/integrations/supabase/client";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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
    ministries: user.ministries || [],
  });
  const [newMinistry, setNewMinistry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          ministry_roles: formData.ministries,
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

  const addMinistry = () => {
    if (newMinistry.trim() && !formData.ministries.includes(newMinistry.trim())) {
      setFormData({
        ...formData,
        ministries: [...formData.ministries, newMinistry.trim()]
      });
      setNewMinistry("");
    }
  };

  const removeMinistry = (ministry: string) => {
    setFormData({
      ...formData,
      ministries: formData.ministries.filter(m => m !== ministry)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 mb-6">
        <ProfileImageUpload type="avatar" />
        <ProfileImageUpload type="banner" />
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
        <label htmlFor="ministries" className="block text-sm font-medium text-gray-700">
          Ministries
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.ministries.map((ministry) => (
            <Badge key={ministry} variant="secondary" className="flex items-center gap-1">
              {ministry}
              <button
                type="button"
                onClick={() => removeMinistry(ministry)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newMinistry}
            onChange={(e) => setNewMinistry(e.target.value)}
            placeholder="Add a ministry"
            disabled={isLoading}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addMinistry();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={addMinistry}
            disabled={isLoading || !newMinistry.trim()}
          >
            Add
          </Button>
        </div>
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
