
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Church } from "@/types/social";
import { ChurchCard } from "@/components/churches/ChurchCard";
import { SearchBar } from "@/components/churches/SearchBar";
import { useChurchMap } from "@/hooks/useChurchMap";
import 'maplibre-gl/dist/maplibre-gl.css';

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Temporary mock data - will be replaced with actual data from backend
  const churches: Church[] = [
    {
      id: "1",
      name: "Central Adventist Church",
      description: "A welcoming community of believers in the heart of the city.",
      location: "123 Faith Street, Los Angeles, CA",
      coordinates: [-118.2437, 34.0522],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Mountain View Adventist Church",
      description: "Growing together in faith and fellowship.",
      location: "456 Hope Avenue, San Francisco, CA",
      coordinates: [-122.4194, 37.7749],
      serviceTimes: [
        { day: "Saturday", time: "9:00 AM", type: "Sabbath School" },
        { day: "Saturday", time: "10:30 AM", type: "Worship Service" }
      ],
      adminUserId: "2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const { mapContainer, flyToChurch } = useChurchMap(churches);

  const filteredChurches = churches.filter(church =>
    church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Search and List Section */}
          <div className="w-full md:w-1/3">
            <Card className="p-4">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <div className="space-y-4">
                {filteredChurches.map((church) => (
                  <ChurchCard 
                    key={church.id}
                    church={church}
                    onClick={flyToChurch}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-2/3">
            <Card className="h-[600px] p-4">
              <div ref={mapContainer} className="h-full rounded-lg" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Churches;
