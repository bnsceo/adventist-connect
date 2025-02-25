

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

  {
    name: "MT Sinai Seventh Day Adventist Church",
    address: "2610 Orange Center Blvd, Orlando, FL",
    description: "A diverse community serving the Orange Center area.",
    missionStatement: "Building faith and serving our community with love.",
    location: "Orlando, FL",
    contactEmail: "mtsinaisda@sda.org",
    contactPhone: "(555) 234-5678",
    websiteUrl: "https://mtsinaisda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:00 AM" },
      { type: "Worship Service", day: "Saturday", time: "10:30 AM" }
    ]
  },
  {
    name: "University Seventh-Day Adventist Church",
    address: "9191 University Blvd, Orlando, FL",
    description: "Serving the university community and beyond.",
    missionStatement: "Educating minds and nurturing spirits.",
    location: "Orlando, FL",
    contactEmail: "universitysda@sda.org",
    contactPhone: "(555) 345-6789",
    websiteUrl: "https://universitysda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Seventh-day Adventist Church",
    address: "30 E Evans St, Orlando, FL",
    description: "A historic Adventist church in downtown Orlando.",
    missionStatement: "Spreading hope and serving our community.",
    location: "Orlando, FL",
    contactEmail: "orlandosda@sda.org",
    contactPhone: "(555) 456-7890",
    websiteUrl: "https://orlandosda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:45 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:15 AM" }
    ]
  },
  {
    name: "Vietnamese Seventh Day Adventist Church",
    address: "4417 N Powers Dr, Orlando, FL",
    description: "A Vietnamese-speaking Adventist community.",
    missionStatement: "Sharing Christ's love in our community.",
    location: "Orlando, FL",
    contactEmail: "vietnamesesda@sda.org",
    contactPhone: "(555) 567-8901",
    websiteUrl: "https://vietnamesesda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Guilgal Seventh Day Adventist Church",
    address: "2909 N Pine Hills Rd, Orlando, FL",
    description: "Serving the Pine Hills community.",
    missionStatement: "Growing in faith, serving with love.",
    location: "Orlando, FL",
    contactEmail: "guilgal@sda.org",
    contactPhone: "(555) 678-9012",
    websiteUrl: "https://guilgal.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Lake Buena Vista Spanish SDA Church",
    address: "3979 S Orange Blossom Trl, Orlando, FL",
    description: "A Spanish-speaking Adventist community.",
    missionStatement: "Serving our Hispanic community with love.",
    location: "Orlando, FL",
    contactEmail: "lbvspansda@sda.org",
    contactPhone: "(555) 789-0123",
    websiteUrl: "https://lbvspansda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Beracah Seventh Day Adventist Church",
    address: "6330 Moore St, Orlando, FL",
    description: "A community of faith in Orlando.",
    missionStatement: "Blessing others through service and worship.",
    location: "Orlando, FL",
    contactEmail: "beracah@sda.org",
    contactPhone: "(555) 890-1234",
    websiteUrl: "https://beracah.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Pine Hills Seventh Day Adventist Church",
    address: "4955 Rose Ave, Orlando, FL",
    description: "Serving the Pine Hills community.",
    missionStatement: "Growing in faith, serving our community.",
    location: "Orlando, FL",
    contactEmail: "pinehills@sda.org",
    contactPhone: "(555) 901-2345",
    websiteUrl: "https://pinehills.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Lake Buena Vista SDA Church",
    address: "11414 S Apopka Vineland Rd, Orlando, FL",
    description: "Serving the Lake Buena Vista area.",
    missionStatement: "Building faith and community together.",
    location: "Orlando, FL",
    contactEmail: "lbv@sda.org",
    contactPhone: "(555) 012-3456",
    websiteUrl: "https://lbv.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Bethel Seventh-Day Adventist Church",
    address: "2809 Forest City Tr, Orlando, FL",
    description: "A historic Adventist church in Orlando.",
    missionStatement: "Serving our community with love and faith.",
    location: "Orlando, FL",
    contactEmail: "bethel@sda.org",
    contactPhone: "(555) 234-5678",
    websiteUrl: "https://bethel.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:45 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:15 AM" }
    ]
  },
  {
    name: "Filipino-American Seventh Day Adventist Church",
    address: "1425 Davidson St, Orlando, FL",
    description: "A Filipino-speaking Adventist community.",
    missionStatement: "Sharing faith and culture together.",
    location: "Orlando, FL",
    contactEmail: "filipino@sda.org",
    contactPhone: "(555) 345-6789",
    websiteUrl: "https://filipino.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Brazilian Community Church",
    address: "7528 Universal Blvd, Orlando, FL",
    description: "A Portuguese-speaking Adventist community.",
    missionStatement: "Serving our Brazilian community with love.",
    location: "Orlando, FL",
    contactEmail: "brazilian@sda.org",
    contactPhone: "(555) 456-7890",
    websiteUrl: "https://brazilian.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Beraca 1 Church",
    address: "1517 Mercy Dr, Orlando, FL",
    description: "A community of faith in Orlando.",
    missionStatement: "Serving with compassion and love.",
    location: "Orlando, FL",
    contactEmail: "beraca1@sda.org",
    contactPhone: "(555) 567-8901",
    websiteUrl: "https://beraca1.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Pine Hills Seventh Day Adventist Community Center",
    address: "4955 Rose Ave, Orlando, FL",
    description: "A community center serving Pine Hills.",
    missionStatement: "Building community through service.",
    location: "Orlando, FL",
    contactEmail: "pinehillscc@sda.org",
    contactPhone: "(555) 678-9012",
    websiteUrl: "https://pinehillscc.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Emmanuel Church of 7th Day Adventis",
    address: "6424 Arundel Dr, Orlando, FL",
    description: "A community of faith in Orlando.",
    missionStatement: "Embracing all with God's love.",
    location: "Orlando, FL",
    contactEmail: "emmanuel@sda.org",
    contactPhone: "(555) 789-0123",
    websiteUrl: "https://emmanuel.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:10 AM" }
    ]
  },
  {
    name: "South Orlando Seventh Day Adventist Church",
    address: "1112 W Oak Ridge Rd, Orlando, FL",
    description: "Serving South Orlando.",
    missionStatement: "Growing in faith, serving our community.",
    location: "Orlando, FL",
    contactEmail: "southorlando@sda.org",
    contactPhone: "(555) 890-1234",
    websiteUrl: "https://southorlando.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  {
    name: "Emmanuel Seventh Day Adventist Church",
    address: "6350 Arundel Dr, Orlando, FL",
    description: "A vibrant Adventist community.",
    missionStatement: "Serving with love and compassion.",
    location: "Orlando, FL",
    contactEmail: "emmanuel2@sda.org",
    contactPhone: "(555) 901-2345",
    websiteUrl: "https://emmanuel2.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:45 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:15 AM" }
    ]
  }
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
