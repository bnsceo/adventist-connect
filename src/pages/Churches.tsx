

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Church } from "@/types/social";
import { ChurchCard } from "@/components/churches/ChurchCard";
import { SearchBar } from "@/components/churches/SearchBar";
import { useChurchMap } from "@/hooks/useChurchMap";
import { Clock, MapPin, Phone, Users } from "lucide-react";
import 'maplibre-gl/dist/maplibre-gl.css';




interface ChurchesProps {
  initialChurches?: Church[];
}

const defaultChurches: Church[] = [
  {
    id: "1",
    name: "Bethel French SDA Church",
    description: "A welcoming French-speaking congregation",
    location: "5431 S Rio Grande Ave, Orlando, FL",
    phone: "(407) 812-9334",
    coordinates: [-81.34, 28.54],
    serviceTimes: [
      { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
      { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
    ],
    category: "international"
  },
  {
    id: "2",
    name: "MT Sinai Seventh Day Adventist Church",
    description: "Community-focused ministry",
    location: "2610 Orange Center Blvd, Orlando, FL",
    phone: "(407) 298-7877",
    coordinates: [-81.39, 28.54],
    serviceTimes: [
      { day: "Saturday", time: "9:00 AM", type: "Sabbath School" },
      { day: "Saturday", time: "10:30 AM", type: "Worship Service" }
    ],
    category: "english"
  }
];




const Churches: React.FC<ChurchesProps> = ({ initialChurches = defaultChurches }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  const { mapContainer, flyToChurch } = useChurchMap(initialChurches);

  


  const categories = {
    all: initialChurches,
    english: initialChurches.filter(church => church.category === "english"),
    international: initialChurches.filter(church => church.category === "international")
  };

  const filteredChurches = categories[selectedFilter].filter(church =>
    church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Orlando SDA Church Directory
          </h1>
          <p className="text-gray-600">
            Find Seventh-day Adventist churches in the greater Orlando area
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            <Card className="p-4">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, location, or phone..."
              />
              
              <div className="mt-4 space-x-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("all")}
                  className="flex items-center gap-2"
                >
                  All Churches
                  <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-sm">
                    {categories.all.length}
                  </span>
                </Button>
                
                <Button
                  variant={selectedFilter === "english" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("english")}
                  className="flex items-center gap-2"
                >
                  English
                  <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-sm">
                    {categories.english.length}
                  </span>
                </Button>
                
                <Button
                  variant={selectedFilter === "international" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("international")}
                  className="flex items-center gap-2"
                >
                  International
                  <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-sm">
                    {categories.international.length}
                  </span>
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {filteredChurches.length} Churches Found
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className="md:hidden"
                  >
                    Map
                  </Button>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredChurches.map((church) => (
                  <div
                    key={church.id}
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => flyToChurch(church)}
                  >
                    <h3 className="font-semibold text-lg mb-2">{church.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{church.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{church.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{church.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          {church.serviceTimes.map((service, index) => (
                            <div key={index} className="text-sm">
                              {service.type}: {service.time}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className={`w-full md:w-2/3 ${viewMode === "map" ? "" : "hidden md:block"}`}>
            <Card className="h-[700px] p-4">
              <div ref={mapContainer} className="h-full rounded-lg" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Churches;
