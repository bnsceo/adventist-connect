import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Book, Heart, Edit2, Upload } from "lucide-react";
import { Church, Event } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { supabase } from "@/integrations/supabase/client";

const ChurchPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [church, setChurch] = useState<Church>({
    id: "1",
    name: "Central Adventist Church",
    description: "A welcoming community of believers in the heart of the city.",
    missionStatement: "To share God's love and spread the gospel to all nations.",
    location: "123 Faith Street, Cityville",
    contactEmail: "info@centraladventist.org",
    contactPhone: "(555) 123-4567",
    websiteUrl: "https://centraladventist.org",
    serviceTimes: [
      { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
      { day: "Saturday", time: "11:00 AM", type: "Worship Service" },
      { day: "Wednesday", time: "7:00 PM", type: "Prayer Meeting" }
    ],
    adminUserId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bannerImage: "",
    logoImage: ""
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'logo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${church.id}/${type}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('church-assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('church-assets')
        .getPublicUrl(fileName);

      const updateField = type === 'banner' ? 'bannerImage' : 'logoImage';
      const { error: updateError } = await supabase
        .from('churches')
        .update({ [updateField]: publicUrl })
        .eq('id', church.id);

      if (updateError) throw updateError;

      setChurch(prev => ({
        ...prev,
        [updateField]: publicUrl
      }));

      toast({
        title: "Success",
        description: `Church ${type} updated successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to upload ${type} image`,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('churches')
        .update({
          name: church.name,
          description: church.description,
          missionStatement: church.missionStatement,
          location: church.location,
          contactEmail: church.contactEmail,
          contactPhone: church.contactPhone,
          websiteUrl: church.websiteUrl,
          serviceTimes: church.serviceTimes
        })
        .eq('id', church.id);

      if (error) throw error;

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Church information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update church information",
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container max-w-6xl py-8">
          <Card className="mb-8 overflow-hidden relative">
            <div 
              className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative"
              style={church.bannerImage ? {
                backgroundImage: `url(${church.bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : undefined}
            >
              <div className="absolute top-4 right-4 space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <label className="cursor-pointer">
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'banner')}
                    disabled={isUploading}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isUploading}
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Update Banner
                    </span>
                  </Button>
                </label>
              </div>
            </div>
            <div className="p-6 -mt-16">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{church.name}</h1>
                    <p className="mt-2 text-gray-600">{church.description}</p>
                  </div>
                  {church.logoImage && (
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <img src={church.logoImage} alt="Church logo" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">{church.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Contact</h3>
                    <p className="text-gray-600">{church.contactEmail}</p>
                    <p className="text-gray-600">{church.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Church Information</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <Input
                    value={church.name}
                    onChange={(e) => setChurch({ ...church, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    value={church.description}
                    onChange={(e) => setChurch({ ...church, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
                  <Textarea
                    value={church.missionStatement}
                    onChange={(e) => setChurch({ ...church, missionStatement: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <Input
                    value={church.location}
                    onChange={(e) => setChurch({ ...church, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                  <Input
                    type="email"
                    value={church.contactEmail}
                    onChange={(e) => setChurch({ ...church, contactEmail: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                  <Input
                    value={church.contactPhone}
                    onChange={(e) => setChurch({ ...church, contactPhone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website URL</label>
                  <Input
                    type="url"
                    value={church.websiteUrl}
                    onChange={(e) => setChurch({ ...church, websiteUrl: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="about" className="gap-2">
                <Book className="w-4 h-4" />
                About
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2">
                <Heart className="w-4 h-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="announcements" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Announcements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Mission Statement</h2>
                <p className="text-gray-600 mb-6">{church.missionStatement}</p>

                <h2 className="text-xl font-semibold mb-4">Service Times</h2>
                <div className="space-y-3">
                  {church.serviceTimes.map((service, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{service.type}</p>
                        <p className="text-sm text-gray-600">{service.day}</p>
                      </div>
                      <p className="text-gray-900">{service.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card className="p-6">
                <p className="text-gray-500 text-center py-8">
                  Church events coming soon!
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="announcements">
              <Card className="p-6">
                <p className="text-gray-500 text-center py-8">
                  Church announcements coming soon!
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ChurchPage;
