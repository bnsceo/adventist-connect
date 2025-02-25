import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChurchCard } from "@/components/churches/ChurchCard";
import { Church } from "@/types/social";

<form
  action="https://www.google.com/search"
  method="get"
  target="_blank"
  className="mt-2"
>
  <input
    type="text"
    name="q"
    placeholder="Search Google"
    className="border rounded p-2 w-full"
  />
  <button
    type="submit"
    className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
  >
    Search Google
  </button>
</form>
// SearchBar component implementation
const SearchBar = ({
  value,
  onChange,
  placeholder
}) => {
  return <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="pl-10" />
    </div>;
};
const Churches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const churches: Church[] = [{
    id: "1",
    name: "Bethel French SDA Church",
    description: "A welcoming Seventh-day Adventist church in Orlando.",
    location: "5431 S Rio Grande Ave, Orlando, FL",
    contactPhone: "(407) 812-9334",
    coordinates: [-81.34, 28.54],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "international",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 812-9334"
  }, {
    id: "2",
    name: "MT Sinai Seventh Day Adventist Church",
    description: "A community focused on spreading the love of Christ.",
    location: "2610 Orange Center Blvd, Orlando, FL",
    contactPhone: "(407) 298-7877",
    coordinates: [-81.39, 28.54],
    serviceTimes: [{
      day: "Saturday",
      time: "9:00 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "10:30 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 298-7877"
  }, {
    id: "3",
    name: "University Seventh-Day Adventist Church – School & Office",
    description: "A church integrated with educational and administrative ministries.",
    location: "9191 University Blvd, Orlando, FL",
    contactPhone: "(407) 657-4696",
    coordinates: [-81.30, 28.55],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 657-4696"
  }, {
    id: "4",
    name: "Seventh-day Adventist Church",
    description: "A traditional SDA church serving its community.",
    location: "30 E Evans St, Orlando, FL",
    contactPhone: "(407) 894-6213",
    coordinates: [-81.38, 28.54],
    serviceTimes: [{
      day: "Saturday",
      time: "9:45 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:15 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 894-6213"
  }, {
    id: "5",
    name: "Vietnamese Seventh Day Adventist Church",
    description: "A church serving the Vietnamese community in Orlando.",
    location: "4417 N Powers Dr, Orlando, FL",
    contactPhone: "(407) 298-1119",
    coordinates: [-81.40, 28.55],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "international",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 298-1119"
  }, {
    id: "6",
    name: "Guilgal Seventh Day Adventist Church",
    description: "A vibrant church community in Orlando.",
    location: "2909 N Pine Hills Rd, Orlando, FL",
    contactPhone: "(407) 578-1488",
    coordinates: [-81.42, 28.56],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 578-1488"
  }, {
    id: "7",
    name: "Lake Buena Vista Spanish SDA Church",
    description: "A Spanish-speaking Seventh-day Adventist church in Orlando.",
    location: "3979 S Orange Blossom Trl, Orlando, FL",
    contactPhone: "(407) 704-3068",
    coordinates: [-81.45, 28.47],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "international",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 704-3068"
  }, {
    id: "8",
    name: "Beracah Seventh Day Adventist Church",
    description: "A dedicated SDA congregation in Orlando.",
    location: "6330 Moore St, Orlando, FL",
    contactPhone: "(407) 295-6035",
    coordinates: [-81.30, 28.52],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 295-6035"
  }, {
    id: "9",
    name: "Pine Hills Seventh Day Adventist Church – Hall",
    description: "Located in the Pine Hills community of Orlando.",
    location: "4955 Rose Ave, Orlando, FL",
    contactPhone: "(407) 523-3486",
    coordinates: [-81.30, 28.54],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 523-3486"
  }, {
    id: "10",
    name: "Lake Buena Vista SDA Church",
    description: "A community church in the Lake Buena Vista area of Orlando.",
    location: "11414 S Apopka Vineland Rd, Orlando, FL",
    contactPhone: "(407) 791-6266",
    coordinates: [-81.50, 28.45],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 791-6266"
  }, {
    id: "11",
    name: "Bethel Seventh-Day Adventist Church",
    description: "Serving the community with faith and fellowship.",
    location: "2809 Forest City Tr, Orlando, FL",
    contactPhone: "(407) 291-4850",
    coordinates: [-81.35, 28.55],
    serviceTimes: [{
      day: "Saturday",
      time: "9:45 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:15 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 291-4850"
  }, {
    id: "12",
    name: "Filipino-American Seventh Day Adventist Church",
    description: "A culturally rich SDA church serving the Filipino community.",
    location: "1425 Davidson St, Orlando, FL",
    contactPhone: "(407) 422-5747",
    coordinates: [-81.37, 28.57],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "international",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 422-5747"
  }, {
    id: "13",
    name: "Brazilian Community Church",
    description: "A vibrant church with a Brazilian community in Orlando.",
    location: "7528 Universal Blvd, Orlando, FL",
    contactPhone: "(407) 903-9053",
    coordinates: [-81.28, 28.53],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "international",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 903-9053"
  }, {
    id: "14",
    name: "Beraca 1 Church",
    description: "A dedicated SDA church fostering spiritual growth.",
    location: "1517 Mercy Dr, Orlando, FL",
    contactPhone: "(407) 704-7967",
    coordinates: [-81.36, 28.56],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 704-7967"
  }, {
    id: "15",
    name: "Pine Hills Seventh Day Adventist Church",
    description: "Another branch of the Pine Hills SDA community.",
    location: "4955 Rose Ave, Orlando, FL",
    contactPhone: "(407) 291-4816",
    coordinates: [-81.29, 28.54],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 291-4816"
  }, {
    id: "16",
    name: "Emmanuel Church of 7th Day Adventis",
    description: "A church dedicated to spreading the Gospel in Orlando.",
    location: "6424 Arundel Dr, Orlando, FL",
    contactPhone: "(407) 299-9483",
    coordinates: [-81.32, 28.55],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:10 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 299-9483"
  }, {
    id: "17",
    name: "South Orlando Seventh Day Adventist Church",
    description: "Serving the South Orlando community with faith and unity.",
    location: "1112 W Oak Ridge Rd, Orlando, FL",
    contactPhone: "(407) 855-8722",
    coordinates: [-81.45, 28.50],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 855-8722"
  }, {
    id: "18",
    name: "Emmanuel Seventh Day Adventist Church",
    description: "A church committed to community and spiritual growth.",
    location: "6350 Arundel Dr, Orlando, FL",
    contactPhone: "(407) 704-7905",
    coordinates: [-81.33, 28.55],
    serviceTimes: [{
      day: "Saturday",
      time: "9:45 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:15 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 704-7905"
  }, {
    id: "19",
    name: "Beryl Wisdom Seven Day Adventists School",
    description: "A church focused on educating and nurturing future generations.",
    location: "4955 Rose Ave, Orlando, FL",
    contactPhone: "(407) 291-3073",
    coordinates: [-81.30, 28.54],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 291-3073"
  }, {
    id: "20",
    name: "Pine Hills Seventh Day Adventist Community Center",
    description: "A community center fostering fellowship and spiritual growth.",
    location: "4955 Rose Ave, Orlando, FL",
    contactPhone: "(407) 299-8704",
    coordinates: [-81.30, 28.54],
    serviceTimes: [{
      day: "Saturday",
      time: "9:30 AM",
      type: "Sabbath School"
    }, {
      day: "Saturday",
      time: "11:00 AM",
      type: "Worship Service"
    }],
    category: "english",
    missionStatement: "",
    contactEmail: "",
    websiteUrl: "",
    phone: "(407) 299-8704"
  }];
  const categories = {
    all: churches,
    english: churches.filter(church => church.category === "english"),
    international: churches.filter(church => church.category === "international")
  };
  const filteredChurches = categories[selectedFilter].filter(church => church.name.toLowerCase().includes(searchQuery.toLowerCase()) || church.location.toLowerCase().includes(searchQuery.toLowerCase()) || church.contactPhone && church.contactPhone.toLowerCase().includes(searchQuery.toLowerCase()));
  const QuickFilter = ({
    label,
    count,
    isActive,
    onClick
  }) => <Button variant={isActive ? "default" : "outline"} className="flex items-center gap-2" onClick={onClick}>
      {label}
      <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-sm">
        {count}
      </span>
    </Button>;
  return <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seventh Day Adventist Church Directory</h1>
          <p className="text-gray-600">Find Seventh-day Adventist churches in your area.</p>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by name, location, or phone..." />
            
            <div className="mt-4 flex flex-wrap gap-2">
              <QuickFilter label="All Churches" count={categories.all.length} isActive={selectedFilter === "all"} onClick={() => setSelectedFilter("all")} />
              <QuickFilter label="English" count={categories.english.length} isActive={selectedFilter === "english"} onClick={() => setSelectedFilter("english")} />
              <QuickFilter label="International" count={categories.international.length} isActive={selectedFilter === "international"} onClick={() => setSelectedFilter("international")} />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {filteredChurches.length} Churches Found
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredChurches.map(church => <ChurchCard key={church.id} church={church} />)}
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default Churches;
