import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Church } from "@/types/social";
import { ChurchCard } from "@/components/churches/ChurchCard";
import { SearchBar } from "@/components/churches/SearchBar";
import { useChurchMap } from "@/hooks/useChurchMap";
import 'maplibre-gl/dist/maplibre-gl.css';

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // List of Seventh-day Adventist churches in Orlando, FL
  const churches: Church[] = [
    {
      id: "1",
      name: "Bethel French SDA Church",
      description: "A welcoming Seventh-day Adventist church in Orlando.",
      location: "5431 S Rio Grande Ave, Orlando, FL",
      coordinates: [-81.34, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "MT Sinai Seventh Day Adventist Church",
      description: "A community focused on spreading the love of Christ.",
      location: "2610 Orange Center Blvd, Orlando, FL",
      coordinates: [-81.39, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:00 AM", type: "Sabbath School" },
        { day: "Saturday", time: "10:30 AM", type: "Worship Service" }
      ],
      adminUserId: "admin2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      name: "University Seventh-Day Adventist Church – School & Office",
      description: "A church integrated with educational and administrative ministries.",
      location: "9191 University Blvd, Orlando, FL",
      coordinates: [-81.30, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin3",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "4",
      name: "Seventh-day Adventist Church",
      description: "A traditional SDA church serving its community.",
      location: "30 E Evans St, Orlando, FL",
      coordinates: [-81.38, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:45 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:15 AM", type: "Worship Service" }
      ],
      adminUserId: "admin4",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "5",
      name: "Vietnamese Seventh Day Adventist Church",
      description: "A church serving the Vietnamese community in Orlando.",
      location: "4417 N Powers Dr, Orlando, FL",
      coordinates: [-81.40, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin5",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "6",
      name: "Guilgal Seventh Day Adventist Church",
      description: "A vibrant church community in Orlando.",
      location: "2909 N Pine Hills Rd, Orlando, FL",
      coordinates: [-81.42, 28.56],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin6",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "7",
      name: "Lake Buena Vista Spanish SDA Church",
      description: "A Spanish-speaking Seventh-day Adventist church in Orlando.",
      location: "3979 S Orange Blossom Trl, Orlando, FL",
      coordinates: [-81.45, 28.47],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin7",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "8",
      name: "Beracah Seventh Day Adventist Church",
      description: "A dedicated SDA congregation in Orlando.",
      location: "6330 Moore St, Orlando, FL",
      coordinates: [-81.30, 28.52],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin8",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "9",
      name: "Pine Hills Seventh Day Adventist Church – Hall",
      description: "Located in the Pine Hills community of Orlando.",
      location: "4955 Rose Ave, Orlando, FL",
      coordinates: [-81.30, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin9",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "10",
      name: "Lake Buena Vista SDA Church",
      description: "A community church in the Lake Buena Vista area of Orlando.",
      location: "11414 S Apopka Vineland Rd, Orlando, FL",
      coordinates: [-81.50, 28.45],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin10",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "11",
      name: "Bethel Seventh-Day Adventist Church",
      description: "Serving the community with faith and fellowship.",
      location: "2809 Forest City Tr, Orlando, FL",
      coordinates: [-81.35, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:45 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:15 AM", type: "Worship Service" }
      ],
      adminUserId: "admin11",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "12",
      name: "Filipino-American Seventh Day Adventist Church",
      description: "A culturally rich SDA church serving the Filipino community.",
      location: "1425 Davidson St, Orlando, FL",
      coordinates: [-81.37, 28.57],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin12",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "13",
      name: "Brazilian Community Church",
      description: "A vibrant church with a Brazilian community in Orlando.",
      location: "7528 Universal Blvd, Orlando, FL",
      coordinates: [-81.28, 28.53],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin13",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "14",
      name: "Beraca 1 Church",
      description: "A dedicated SDA church fostering spiritual growth.",
      location: "1517 Mercy Dr, Orlando, FL",
      coordinates: [-81.36, 28.56],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin14",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "15",
      name: "Pine Hills Seventh Day Adventist Church",
      description: "Another branch of the Pine Hills SDA community.",
      location: "4955 Rose Ave, Orlando, FL",
      coordinates: [-81.29, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin15",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "16",
      name: "Emmanuel Church of 7th Day Adventis",
      description: "A church dedicated to spreading the Gospel in Orlando.",
      location: "6424 Arundel Dr, Orlando, FL",
      coordinates: [-81.32, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:10 AM", type: "Worship Service" }
      ],
      adminUserId: "admin16",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "17",
      name: "South Orlando Seventh Day Adventist Church",
      description: "Serving the South Orlando community with faith and unity.",
      location: "1112 W Oak Ridge Rd, Orlando, FL",
      coordinates: [-81.45, 28.50],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin17",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "18",
      name: "Emmanuel Seventh Day Adventist Church",
      description: "A church committed to community and spiritual growth.",
      location: "6350 Arundel Dr, Orlando, FL",
      coordinates: [-81.33, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:45 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:15 AM", type: "Worship Service" }
      ],
      adminUserId: "admin18",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "19",
      name: "Beryl Wisdom Seven Day Adventists School",
      description: "A church focused on educating and nurturing future generations.",
      location: "4955 Rose Ave, Orlando, FL",
      coordinates: [-81.30, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin19",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "20",
      name: "Pine Hills Seventh Day Adventist Community Center",
      description: "A community center fostering fellowship and spiritual growth.",
      location: "4955 Rose Ave, Orlando, FL",
      coordinates: [-81.30, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      adminUserId: "admin20",
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
