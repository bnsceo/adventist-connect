import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Phone, Search } from "lucide-react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Define Church type directly in the component
type ServiceTime = {
  day: string;
  time: string;
  type: string;
};

type Church = {
  id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  coordinates: [number, number];
  serviceTimes: ServiceTime[];
  category: string;
};

// SearchBar component implementation
const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
};

// Custom hook implementation
const useChurchMap = (churches) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-81.38, 28.54], // Orlando, FL
      zoom: 11
    });

    // Add navigation control
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
  }, []);

  // Add markers when map is loaded and churches data is available
  useEffect(() => {
    if (!map.current || !churches.length) return;

    // Wait for map to load
    map.current.on('load', () => {
      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Add markers for each church
      churches.forEach(church => {
        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
          `<strong>${church.name}</strong><br>
           ${church.location}<br>
           ${church.phone}`
        );

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = '#3b82f6';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.border = '2px solid white';

        const marker = new maplibregl.Marker(el)
          .setLngLat(church.coordinates)
          .setPopup(popup)
          .addTo(map.current);
        
        markers.current.push(marker);
      });
    });
  }, [churches]);

  const flyToChurch = (church) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: church.coordinates,
      zoom: 14,
      essential: true
    });

    // Find and open the popup for this church
    markers.current.forEach(marker => {
      if (marker._lngLat.lng === church.coordinates[0] && 
          marker._lngLat.lat === church.coordinates[1]) {
        marker.togglePopup();
      }
    });
  };

  return { mapContainer, flyToChurch };
};

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  // Complete church data with phone numbers
  const churches: Church[] = [
    {
      id: "1",
      name: "Bethel French SDA Church",
      description: "A welcoming Seventh-day Adventist church in Orlando.",
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
      description: "A community focused on spreading the love of Christ.",
      location: "2610 Orange Center Blvd, Orlando, FL",
      phone: "(407) 298-7877",
      coordinates: [-81.39, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:00 AM", type: "Sabbath School" },
        { day: "Saturday", time: "10:30 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "3",
      name: "University Seventh-Day Adventist Church – School & Office",
      description: "A church integrated with educational and administrative ministries.",
      location: "9191 University Blvd, Orlando, FL",
      phone: "(407) 657-4696",
      coordinates: [-81.30, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "4",
      name: "Seventh-day Adventist Church",
      description: "A traditional SDA church serving its community.",
      location: "30 E Evans St, Orlando, FL",
      phone: "(407) 894-6213",
      coordinates: [-81.38, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:45 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:15 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "5",
      name: "Vietnamese Seventh Day Adventist Church",
      description: "A church serving the Vietnamese community in Orlando.",
      location: "4417 N Powers Dr, Orlando, FL",
      phone: "(407) 298-1119",
      coordinates: [-81.40, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "international"
    },
    {
      id: "6",
      name: "Guilgal Seventh Day Adventist Church",
      description: "A vibrant church community in Orlando.",
      location: "2909 N Pine Hills Rd, Orlando, FL",
      phone: "(407) 578-1488",
      coordinates: [-81.42, 28.56],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "7",
      name: "Lake Buena Vista Spanish SDA Church",
      description: "A Spanish-speaking Seventh-day Adventist church in Orlando.",
      location: "3979 S Orange Blossom Trl, Orlando, FL",
      phone: "(407) 704-3068",
      coordinates: [-81.45, 28.47],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "international"
    },
    {
      id: "8",
      name: "Beracah Seventh Day Adventist Church",
      description: "A dedicated SDA congregation in Orlando.",
      location: "6330 Moore St, Orlando, FL",
      phone: "(407) 295-6035",
      coordinates: [-81.30, 28.52],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "9",
      name: "Pine Hills Seventh Day Adventist Church – Hall",
      description: "Located in the Pine Hills community of Orlando.",
      location: "4955 Rose Ave, Orlando, FL",
      phone: "(407) 523-3486",
      coordinates: [-81.30, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "10",
      name: "Lake Buena Vista SDA Church",
      description: "A community church in the Lake Buena Vista area of Orlando.",
      location: "11414 S Apopka Vineland Rd, Orlando, FL",
      phone: "(407) 791-6266",
      coordinates: [-81.50, 28.45],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "11",
      name: "Bethel Seventh-Day Adventist Church",
      description: "Serving the community with faith and fellowship.",
      location: "2809 Forest City Tr, Orlando, FL",
      phone: "(407) 291-4850",
      coordinates: [-81.35, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:45 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:15 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "12",
      name: "Filipino-American Seventh Day Adventist Church",
      description: "A culturally rich SDA church serving the Filipino community.",
      location: "1425 Davidson St, Orlando, FL",
      phone: "(407) 422-5747",
      coordinates: [-81.37, 28.57],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "international"
    },
    {
      id: "13",
      name: "Brazilian Community Church",
      description: "A vibrant church with a Brazilian community in Orlando.",
      location: "7528 Universal Blvd, Orlando, FL",
      phone: "(407) 903-9053",
      coordinates: [-81.28, 28.53],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "international"
    },
    {
      id: "14",
      name: "Beraca 1 Church",
      description: "A dedicated SDA church fostering spiritual growth.",
      location: "1517 Mercy Dr, Orlando, FL",
      phone: "(407) 704-7967",
      coordinates: [-81.36, 28.56],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "15",
      name: "Pine Hills Seventh Day Adventist Church",
      description: "Another branch of the Pine Hills SDA community.",
      location: "4955 Rose Ave, Orlando, FL",
      phone: "(407) 291-4816",
      coordinates: [-81.29, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "16",
      name: "Emmanuel Church of 7th Day Adventis",
      description: "A church dedicated to spreading the Gospel in Orlando.",
      location: "6424 Arundel Dr, Orlando, FL",
      phone: "(407) 299-9483",
      coordinates: [-81.32, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:10 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "17",
      name: "South Orlando Seventh Day Adventist Church",
      description: "Serving the South Orlando community with faith and unity.",
      location: "1112 W Oak Ridge Rd, Orlando, FL",
      phone: "(407) 855-8722",
      coordinates: [-81.45, 28.50],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "18",
      name: "Emmanuel Seventh Day Adventist Church",
      description: "A church committed to community and spiritual growth.",
      location: "6350 Arundel Dr, Orlando, FL",
      phone: "(407) 704-7905",
      coordinates: [-81.33, 28.55],
      serviceTimes: [
        { day: "Saturday", time: "9:45 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:15 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "19",
      name: "Beryl Wisdom Seven Day Adventists School",
      description: "A church focused on educating and nurturing future generations.",
      location: "4955 Rose Ave, Orlando, FL",
      phone: "(407) 291-3073",
      coordinates: [-81.30, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    },
    {
      id: "20",
      name: "Pine Hills Seventh Day Adventist Community Center",
      description: "A community center fostering fellowship and spiritual growth.",
      location: "4955 Rose Ave, Orlando, FL",
      phone: "(407) 299-8704",
      coordinates: [-81.30, 28.54],
      serviceTimes: [
        { day: "Saturday", time: "9:30 AM", type: "Sabbath School" },
        { day: "Saturday", time: "11:00 AM", type: "Worship Service" }
      ],
      category: "english"
    }
  ];

  const { mapContainer, flyToChurch } = useChurchMap(churches);

  // Filter churches based on category and search query
  const categories = {
    all: churches,
    english: churches.filter(church => church.category === "english"),
    international: churches.filter(church => church.category === "international")
  };

  const filteredChurches = categories[selectedFilter].filter(church =>
    church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Quick filter component for categories
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
            Orlando SDA Church Directory
          </h1>
          <p className="text-gray-600">
            Find Seventh-day Adventist churches in the greater Orlando area
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            {/* Search and Filters */}
            <Card className="p-4">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, location, or phone..."
              />
              
              <div className="mt-4 flex flex-wrap gap-2">
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

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredChurches.map((church) => (
                  <div
                    key={church.id}
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => flyToChurch(church)}
                  >
                    <h3 className="font-semibold text-lg mb-2">{church.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{church.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <span>{church.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{church.phone}</span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
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
