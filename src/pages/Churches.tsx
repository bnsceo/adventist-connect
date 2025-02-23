
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { Church } from "@/types/social";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

<lov-add-dependency>maplibre-gl@latest</lov-add-dependency>

const Churches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapKey, setMapKey] = useState("");
  
  // Temporary mock data - will be replaced with actual data from backend
  const churches: Church[] = [
    {
      id: "1",
      name: "Central Adventist Church",
      description: "A welcoming community of believers in the heart of the city.",
      location: "123 Faith Street, Los Angeles, CA",
      coordinates: [-118.2437, 34.0522], // Los Angeles coordinates
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
      coordinates: [-122.4194, 37.7749], // San Francisco coordinates
      serviceTimes: [
        { day: "Saturday", time: "9:00 AM", type: "Sabbath School" },
        { day: "Saturday", time: "10:30 AM", type: "Worship Service" }
      ],
      adminUserId: "2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    // Initialize map
    if (!mapContainer.current || map.current) return;

    const initializeMap = () => {
      if (!mapKey) {
        // For development, you can input your token here
        const token = prompt("Please enter your MapTiler API key for development:");
        if (token) {
          setMapKey(token);
        }
        return;
      }

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${mapKey}`,
        center: [-98.5795, 39.8283], // Center of USA
        zoom: 3
      });

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      // Add markers for each church
      churches.forEach((church) => {
        if (church.coordinates) {
          const markerElement = document.createElement('div');
          markerElement.className = 'church-marker';
          markerElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M18 6h.5A2.5 2.5 0 0 1 21 8.5v0A2.5 2.5 0 0 1 18.5 11h-13A2.5 2.5 0 0 1 3 8.5v0A2.5 2.5 0 0 1 5.5 6H6"/><path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"/><path d="M10 11v4"/><path d="M14 11v4"/><path d="M12 11v4"/><path d="M6 11h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8Z"/></svg>`;

          const marker = new maplibregl.Marker({element: markerElement})
            .setLngLat(church.coordinates)
            .setPopup(
              new maplibregl.Popup({ offset: 25 })
                .setHTML(
                  `<h3 class="font-semibold">${church.name}</h3>
                   <p class="text-sm">${church.location}</p>
                   <p class="text-sm mt-2">Services:<br/>
                   ${church.serviceTimes.map(service => 
                     `${service.type}: ${service.day} at ${service.time}`
                   ).join('<br/>')}</p>`
                )
            )
            .addTo(map.current);
        }
      });

      // Add event listener for when the map style is loaded
      map.current.on('style.load', () => {
        if (map.current) {
          map.current.addSource('churches', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: churches.map(church => ({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: church.coordinates || [0, 0]
                },
                properties: {
                  name: church.name,
                  location: church.location
                }
              }))
            }
          });
        }
      });
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapKey]);

  const handleChurchClick = (church: Church) => {
    if (map.current && church.coordinates) {
      map.current.flyTo({
        center: church.coordinates,
        zoom: 14,
        essential: true
      });
    }
  };

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
                {filteredChurches.map((church) => (
                  <Card 
                    key={church.id} 
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleChurchClick(church)}
                  >
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
              <div ref={mapContainer} className="h-full rounded-lg" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Churches;
