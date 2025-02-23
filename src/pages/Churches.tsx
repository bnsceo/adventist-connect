

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Clock, Users } from 'lucide-react';




interface ServiceTime {
  day: string;
  time: string;
  type: string;
}

interface Church {
  id: string;
  name: string;
  description?: string;
  location: string;
  phone: string;
  coordinates: [number, number];
  serviceTimes: ServiceTime[];
  category: 'english' | 'international';
}




const Churches = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'english' | 'international'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

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
    // Additional churches...
  ];




  const categories = {
    all: churches,
    english: churches.filter(church => church.category === "english"),
    international: churches.filter(church => church.category === "international")
  };

  const filteredChurches = categories[selectedFilter].filter(church =>
    church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.location.toLowerCase().includes(searchQuery.toLowerCase())
  );




  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orlando SDA Church Directory</h1>
          <p className="text-gray-600">Find Seventh-day Adventist churches in the greater Orlando area</p>
        </header>

        <main className="grid md:grid-cols-12 gap-6">
          <aside className="md:col-span-3 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <Input
                  type="text"
                  placeholder="Search churches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                
                <div className="space-y-2">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedFilter("all")}
                  >
                    All Churches ({categories.all.length})
                  </Button>
                  
                  <Button
                    variant={selectedFilter === "english" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedFilter("english")}
                  >
                    English ({categories.english.length})
                  </Button>
                  
                  <Button
                    variant={selectedFilter === "international" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedFilter("international")}
                  >
                    International ({categories.international.length})
                  </Button>
                </div>

                <Separator className="my-4" />

                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="map">Map View</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list" className="mt-4">
                    <p className="text-sm text-gray-600">{filteredChurches.length} churches found</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </aside>

          <section className="md:col-span-9 space-y-4">
            <div className="grid gap-4">
              {filteredChurches.map((church) => (
                <Card key={church.id} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <header className="flex flex-col gap-2 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{church.name}</h3>
                      {church.description && (
                        <p className="text-gray-600 text-sm">{church.description}</p>
                      )}
                    </header>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{church.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="font-medium">{church.phone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Service Times:</span>
                        </div>
                        
                        <div className="space-y-1">
                          {church.serviceTimes.map((service, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{service.day} - {service.time} ({service.type})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Churches;
