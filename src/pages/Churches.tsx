import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Church } from "@/types/social";
import { ChurchCard } from "@/components/churches/ChurchCard";
import { SearchBar } from "@/components/churches/SearchBar";
import { useChurchMap } from "@/hooks/useChurchMap";
import { Clock, Globe, MapPin, Users } from "lucide-react";
import 'maplibre-gl/dist/maplibre-gl.css';

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  // Your existing churches data array here
  const churches: Church[] = [/* ... existing churches data ... */];

  const { mapContainer, flyToChurch } = useChurchMap(churches);

  // Categorize churches
  const categories = {
    all: churches,
    english: churches.filter(church => 
      !church.name.toLowerCase().includes("spanish") &&
      !church.name.toLowerCase().includes("vietnamese") &&
      !church.name.toLowerCase().includes("french") &&
      !church.name.toLowerCase().includes("brazilian") &&
      !church.name.toLowerCase().includes("filipino")),
    international: churches.filter(church =>
      church.name.toLowerCase().includes("spanish") ||
      church.name.toLowerCase().includes("vietnamese") ||
      church.name.toLowerCase().includes("french") ||
      church.name.toLowerCase().includes("brazilian") ||
      church.name.toLowerCase().includes("filipino"))
  };

  const filteredChurches = categories[selectedFilter].filter(church =>
    church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const QuickFilter = ({ label, count, isActive, onClick }) => (
    <Button
      variant={isActive ? "default" : "outline"}
      className="flex items-center gap-2"
      onClick={onClick}
    >
      {label}
      <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-sm">
        {count}
      </span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Church Home
          </h1>
          <p className="text-gray-600">
            Discover Seventh-day Adventist churches in Orlando, FL
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            {/* Search and Filters */}
            <Card className="p-4">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name or location..."
              />
              
              <div className="mt-4 space-x-2">
                <QuickFilter 
                  label="All Churches"
                  count={categories.all.length}
                  isActive={selectedFilter === "all"}
                  onClick={() => setSelectedFilter("all")}
                />
                <QuickFilter 
                  label="English"
                  count={categories.english.length}
                  isActive={selectedFilter === "english"}
                  onClick={() => setSelectedFilter("english")}
                />
                <QuickFilter 
                  label="International"
                  count={categories.international.length}
                  isActive={selectedFilter === "international"}
                  onClick={() => setSelectedFilter("international")}
                />
              </div>
            </Card>

            {/* Church List */}
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
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
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
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          {church.serviceTimes.map((service, index) => (
                            <div key={index}>
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

          {/* Map Section */}
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
