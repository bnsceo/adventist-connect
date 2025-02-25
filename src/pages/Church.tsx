

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Calendar, Heart, MessageCircle, Book } from 'lucide-react'




interface ChurchServiceTime {
  type: string;
  day: string;
  time: string;
}

interface Church {
  id?: string;
  name: string;
  address: string;
  description: string;
  missionStatement: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  serviceTimes: ChurchServiceTime[];
}




const CHURCHES: Church[] = [
  {
    name: "Bethel French SDA Church",
    address: "5431 S Rio Grande Ave, Orlando, FL",
    description: "A vibrant French-speaking Seventh-day Adventist community in Orlando.",
    missionStatement: "To serve and share the love of Christ with our community.",
    location: "Orlando, FL",
    contactEmail: "bethelfrench@sda.org",
    contactPhone: "(555) 123-4567",
    websiteUrl: "https://bethelfrench.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  // Additional churches...
];




const ChurchPage = () => {
  const [activeChurch, setActiveChurch] = useState<Church>(CHURCHES[0]);
  const [activeTab, setActiveTab] = useState("about");

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Church Selection */}
      <select 
        value={activeChurch.name}
        onChange={(e) => setActiveChurch(CHURCHES.find(church => church.name === e.target.value)!)}
        className="mb-6 w-full rounded-md border p-2 bg-white"
      >
        {CHURCHES.map(church => (
          <option key={church.name} value={church.name}>
            {church.name}
          </option>
        ))}
      </select>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-white">
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{activeChurch.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address Section */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">Location</h3>
                <p className="text-gray-600">{activeChurch.address}</p>
              </div>

              {/* Service Times Section */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">Service Times</h3>
                <div className="space-y-3">
                  {activeChurch.serviceTimes.map((service, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{service.type}</p>
                        <p className="text-sm text-gray-600">{service.day}</p>
                      </div>
                      <p className="text-gray-900 font-medium">{service.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">Contact Information</h3>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span>{' '}
                    {formatPhoneNumber(activeChurch.contactPhone)}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span>{' '}
                    <a 
                      href={`mailto:${activeChurch.contactEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {activeChurch.contactEmail}
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Website:</span>{' '}
                    <a 
                      href={activeChurch.websiteUrl}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {activeChurch.websiteUrl}
                    </a>
                  </p>
                </div>
              </div>

              {/* Description */}
              {activeChurch.description && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">About Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activeChurch.description}
                  </p>
                </div>
              )}

              {/* Mission Statement */}
              {activeChurch.missionStatement && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">Mission Statement</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activeChurch.missionStatement}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Upcoming Events
                </h3>
                <p className="text-gray-500">
                  Check back soon for upcoming church events and activities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MessageCircle className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Church Announcements
                </h3>
                <p className="text-gray-500">
                  Check back soon for important church announcements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChurchPage;
