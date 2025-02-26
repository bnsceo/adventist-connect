import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Heart, MessageCircle, Book, Users } from 'lucide-react';

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
  programs?: string;
}

const CHURCHES: Church[] = [
  {
    id: "1",
    name: "Bethel French SDA Church",
    address: "5431 S Rio Grande Ave, Orlando, FL",
    description:
      "A vibrant French-speaking Seventh-day Adventist community in Orlando. Our updated website now highlights our weekly Bible study sessions, youth programs, and community outreach initiatives.",
    missionStatement:
      "To serve and share the love of Christ with our community through culturally relevant worship and ministry.",
    location: "Orlando, FL",
    contactEmail: "bethelfrench@sda.org",
    contactPhone: "(555) 123-4567",
    websiteUrl: "https://bethelfrench.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
    programs:
      "In addition to our regular services, we offer weekly Bible study sessions, youth fellowship, and various community outreach programs. Visit our website for the full schedule.",
  },
  {
    id: "2",
    name: "MT Sinai Seventh Day Adventist Church",
    address: "2610 Orange Center Blvd, Orlando, FL",
    description:
      "A community focused on spreading the love of Christ with dynamic worship and a commitment to community service.",
    missionStatement:
      "To uplift and serve our community through faith, interactive Bible studies, and compassionate outreach.",
    location: "Orlando, FL",
    contactEmail: "mtsinai@sda.org",
    contactPhone: "(407) 298-7877",
    websiteUrl: "https://mtsinai.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:00 AM" },
      { type: "Worship Service", day: "Saturday", time: "10:30 AM" },
    ],
    programs:
      "Our church hosts engaging worship sessions, in-depth Bible studies, and community service projects throughout the week. Check our website for upcoming programs.",
  },
  {
    id: "3",
    name: "University Seventh-Day Adventist Church",
    address: "9191 University Blvd, Orlando, FL",
    description:
      "A church integrated with educational and administrative ministries.",
    missionStatement:
      "To educate, serve, and inspire through the love of God.",
    location: "Orlando, FL",
    contactEmail: "universitychurch@sda.org",
    contactPhone: "(407) 657-4696",
    websiteUrl: "https://universitychurch.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "4",
    name: "Seventh-day Adventist Church Orlando",
    address: "30 E Evans St, Orlando, FL",
    description:
      "A traditional SDA church serving its community with faith and dedication.",
    missionStatement:
      "To spread the gospel and serve our community with love and compassion.",
    location: "Orlando, FL",
    contactEmail: "orlandochurch@sda.org",
    contactPhone: "(407) 894-6213",
    websiteUrl: "https://orlandochurch.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:45 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:15 AM" },
    ],
  },
  {
    id: "5",
    name: "Vietnamese Seventh Day Adventist Church",
    address: "4417 N Powers Dr, Orlando, FL",
    description:
      "A church serving the Vietnamese community in Orlando with faith and cultural connection.",
    missionStatement:
      "To nurture faith and community among Vietnamese believers in Orlando.",
    location: "Orlando, FL",
    contactEmail: "vietnamese@sda.org",
    contactPhone: "(407) 298-1119",
    websiteUrl: "https://vietnamese.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "6",
    name: "Guilgal Seventh Day Adventist Church",
    address: "2909 N Pine Hills Rd, Orlando, FL",
    description:
      "A vibrant church community in Orlando, fostering spiritual growth and fellowship.",
    missionStatement:
      "To be a beacon of hope and love in the Pine Hills community.",
    location: "Orlando, FL",
    contactEmail: "guilgal@sda.org",
    contactPhone: "(407) 578-1488",
    websiteUrl: "https://guilgal.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "7",
    name: "Lake Buena Vista Spanish SDA Church",
    address: "3979 S Orange Blossom Trl, Orlando, FL",
    description:
      "A Spanish-speaking Seventh-day Adventist church in Orlando, serving the Hispanic community.",
    missionStatement:
      "To spread the gospel in Spanish and serve our community with cultural sensitivity.",
    location: "Orlando, FL",
    contactEmail: "lakebuenavista@sda.org",
    contactPhone: "(407) 704-3068",
    websiteUrl: "https://lakebuenavista.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "8",
    name: "Beracah Seventh Day Adventist Church",
    address: "6330 Moore St, Orlando, FL",
    description:
      "A dedicated SDA congregation in Orlando, committed to spiritual growth and community service.",
    missionStatement:
      "To nurture faith and serve our community with dedication and love.",
    location: "Orlando, FL",
    contactEmail: "beracah@sda.org",
    contactPhone: "(407) 295-6035",
    websiteUrl: "https://beracah.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "9",
    name: "Pine Hills Seventh Day Adventist Church",
    address: "4955 Rose Ave, Orlando, FL",
    description:
      "Located in the Pine Hills community of Orlando, serving with faith and community spirit.",
    missionStatement:
      "To be a spiritual home and community resource in Pine Hills.",
    location: "Orlando, FL",
    contactEmail: "pinehills@sda.org",
    contactPhone: "(407) 523-3486",
    websiteUrl: "https://pinehills.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "10",
    name: "Lake Buena Vista SDA Church",
    address: "11414 S Apopka Vineland Rd, Orlando, FL",
    description:
      "A community church in the Lake Buena Vista area of Orlando, welcoming all with open arms.",
    missionStatement:
      "To provide a welcoming spiritual home in the Lake Buena Vista community.",
    location: "Orlando, FL",
    contactEmail: "lakebuenavistacommunity@sda.org",
    contactPhone: "(407) 791-6266",
    websiteUrl: "https://lakebuenavistacommunity.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "11",
    name: "Bethel Seventh-Day Adventist Church",
    address: "2809 ForestCity Tr, Orlando, FL",
    description:
      "Serving the community with faith and fellowship, fostering a sense of belonging.",
    missionStatement:
      "To foster a community of faith and fellowship in Orlando.",
    location: "Orlando, FL",
    contactEmail: "bethelcommunity@sda.org",
    contactPhone: "(407) 293-4850",
    websiteUrl: "https://bethelcommunity.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:45 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:15 AM" },
    ],
  },
  {
    id: "12",
    name: "Filipino-American Seventh Day Adventist Church",
    address: "1425 Davidson St, Orlando, FL",
    description:
      "A culturally rich SDA church serving the Filipino community in Orlando.",
    missionStatement:
      "To unite and serve the Filipino-American community through faith.",
    location: "Orlando, FL",
    contactEmail: "filipinoamerican@sda.org",
    contactPhone: "(407) 422-5747",
    websiteUrl: "https://filipinoamerican.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "13",
    name: "Brazilian Community Church",
    address: "7528 Universal Blvd, Orlando, FL",
    description:
      "A vibrant church with a strong Brazilian community in Orlando, celebrating faith and culture.",
    missionStatement:
      "To celebrate our Brazilian heritage and faith in Orlando.",
    location: "Orlando, FL",
    contactEmail: "braziliancommunity@sda.org",
    contactPhone: "(407) 903-9053",
    websiteUrl: "https://braziliancommunity.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "14",
    name: "Beraca 1 Church",
    address: "1517 Mercy Dr, Orlando, FL",
    description:
      "A dedicated SDA church fostering spiritual growth and community connection.",
    missionStatement:
      "To foster spiritual growth and community in Orlando.",
    location: "Orlando, FL",
    contactEmail: "beraca1@sda.org",
    contactPhone: "(407) 704-7967",
    websiteUrl: "https://beraca1.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "15",
    name: "Pine Hills Seventh Day Adventist Church Center",
    address: "4955 Rose Ave, Orlando, FL",
    description:
      "Another branch of the Pine Hills SDA community, focusing on community outreach and service.",
    missionStatement:
      "To serve and uplift the Pine Hills community.",
    location: "Orlando, FL",
    contactEmail: "pinehillscommunity@sda.org",
    contactPhone: "(407) 291-4816",
    websiteUrl: "https://pinehillscommunity.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "16",
    name: "Emmanuel Church of 7th Day Adventists",
    address: "6424 Arundel Dr, Orlando, FL",
    description:
      "A church dedicated to spreading the Gospel and serving the community in Orlando.",
    missionStatement:
      "To spread the Gospel and serve our community with love.",
    location: "Orlando, FL",
    contactEmail: "emmanuel@sda.org",
    contactPhone: "(407) 299-9483",
    websiteUrl: "https://emmanuel.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:10 AM" },
    ],
  },
  {
    id: "17",
    name: "South Orlando Seventh Day Adventist Church",
    address: "1112 W Oak Ridge Rd, Orlando, FL",
    description:
      "Serving the South Orlando community with faith, unity, and a welcoming spirit.",
    missionStatement:
      "To serve the South Orlando community with faith and unity.",
    location: "Orlando, FL",
    contactEmail: "southorlando@sda.org",
    contactPhone: "(407) 855-8722",
    websiteUrl: "https://southorlando.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "18",
    name: "Emmanuel Seventh Day Adventist Church",
    address: "6350 Arundel Dr, Orlando, FL",
    description:
      "A church committed to community and spiritual growth in the heart of Orlando.",
    missionStatement:
      "To foster community and spiritual growth in Orlando.",
    location: "Orlando, FL",
    contactEmail: "emmanuelcommunity@sda.org",
    contactPhone: "(407) 704-7905",
    websiteUrl: "https://emmanuelcommunity.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:45 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:15 AM" },
    ],
  },
  {
    id: "19",
    name: "Beryl Wisdom Seven Day Adventists School",
    address: "4955 Rose Ave, Orlando, FL",
    description:
      "A church focused on educating and nurturing future generations with faith and wisdom.",
    missionStatement:
      "To educate and nurture future generations with faith and wisdom.",
    location: "Orlando, FL",
    contactEmail: "berylwisdom@sda.org",
    contactPhone: "(407) 291-3073",
    websiteUrl: "https://berylwisdom.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
  {
    id: "20",
    name: "Pine Hills Seventh Day Adventist Community Center",
    address: "4955 Rose Ave, Orlando, FL",
    description:
      "A community center fostering fellowship, spiritual growth, and outreach in Pine Hills.",
    missionStatement:
      "To foster fellowship and spiritual growth in the Pine Hills community.",
    location: "Orlando, FL",
    contactEmail: "pinehillscommunitycenter@sda.org",
    contactPhone: "(407) 299-8704",
    websiteUrl: "https://pinehillscommunitycenter.sda.org",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" },
    ],
  },
] as Church[];

const ChurchPage = () => {
  const { id } = useParams();
  const [activeChurch, setActiveChurch] = useState<Church | null>(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (id) {
      const foundChurch = CHURCHES.find((church) => church.id === id);
      if (foundChurch) {
        setActiveChurch({
          ...foundChurch,
          serviceTimes: [...foundChurch.serviceTimes]
        });
      } else {
        setActiveChurch(null);
      }
    }
  }, [id]);

  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  if (!activeChurch) {
    return <p>Church not found.</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
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
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Programs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {activeChurch.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">Location</h3>
                <p className="text-gray-600">{activeChurch.address}</p>
              </div>

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

              {activeChurch.description && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">About Us</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activeChurch.description}
                  </p>
                </div>
              )}

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

        <TabsContent value="events">
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Upcoming Events
                </h3>
                <p className="text-gray-500">
                  Visit our website or check back soon for updated event details.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MessageCircle className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Church Announcements
                </h3>
                <p className="text-gray-500">
                  Check our website regularly for the latest announcements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs">
          <Card className="mt-4">
            <CardContent className="pt-6">
              {activeChurch.programs ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Ministries &amp; Programs
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activeChurch.programs}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Additional Programs
                  </h3>
                  <p className="text-gray-500">
                    For more details on our ministries and community programs, please visit our website.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChurchPage;
