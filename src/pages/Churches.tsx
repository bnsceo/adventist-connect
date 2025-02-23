
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { Church } from "@/types/social";

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Temporary mock data - will be replaced with actual data from backend
  const churches: Church[] = [
    {
      id: "1",
      name: "Central Adventist Church",
      description: "A welcoming community of believers in the heart of the city.",
      location: "123 Faith Street, Los Angeles, CA",
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Search and List Section */}
          <div className="w-full md:w-1/3">
            <Card className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search churches..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                {churches.map((church) => (
                  <Card key={church.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-semibold text-lg mb-2">{church.name}</h3>
                    <div className="flex items-start gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mt-1 shrink-0" />
                      <span>{church.location}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {church.serviceTimes.map((service, index) => (
                        <div key={index}>
                          {service.type}: {service.day} at {service.time}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-2/3">
            <Card className="h-[600px] p-4">
              <div className="h-full bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Google Maps integration coming soon...</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Churches;
