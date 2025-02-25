
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const ProfileSetupDialog = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    church: "",
    bio: "",
    location: "",
  });

  useEffect(() => {
    const checkProfileSetup = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, church_role, church_name')
        .eq('id', session.session.user.id)
        .single();

      if (!profile?.full_name || !profile?.church_role || !profile?.church_name) {
        setIsOpen(true);
      }
    };

    checkProfileSetup();
  }, []);

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

      if (error) throw error;

      toast({
        title: "Profile Setup Complete",
        description: "Welcome to the community!",
      });

      setIsOpen(false);
      navigate('/feed');
    } catch (error) {
      console.error('Error setting up profile:', error);
      toast({
        title: "Error",
        description: "Failed to set up profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing by clicking outside
      if (!open) return;
      setIsOpen(open);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
            <ProfileImageUpload type="avatar" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name*
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isLoading}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Church Role*
            </label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              disabled={isLoading}
              placeholder="e.g., Youth Leader, Pastor, Member"
            />
          </div>

          <div>
            <label htmlFor="church" className="block text-sm font-medium text-gray-700">
              Church Name*
            </label>
            <Input
              id="church"
              value={formData.church}
              onChange={(e) => setFormData({ ...formData, church: e.target.value })}
              required
              disabled={isLoading}
              placeholder="Your church name"
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
              disabled={isLoading}
              placeholder="City, Country"
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Complete Setup"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
