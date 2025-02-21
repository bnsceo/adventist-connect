
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Book, Heart } from "lucide-react";
import { Church, Event, Post } from "@/types/social";
import { useToast } from "@/components/ui/use-toast";

const ChurchPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");

  // Temporary sample data
  const church: Church = {
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
    updatedAt: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl py-8">
        {/* Church Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600" />
          <div className="p-6 -mt-16">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900">{church.name}</h1>
              <p className="mt-2 text-gray-600">{church.description}</p>
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

        {/* Church Content */}
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
  );
};

export default ChurchPage;
