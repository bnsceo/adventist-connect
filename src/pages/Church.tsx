

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'




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
    description: "",
    missionStatement: "",
    location: "Orlando, FL",
    contactEmail: "",
    contactPhone: "",
    websiteUrl: "",
    serviceTimes: [
      { type: "Sabbath School", day: "Saturday", time: "9:30 AM" },
      { type: "Worship Service", day: "Saturday", time: "11:00 AM" }
    ]
  },
  // Additional churches...
];




const ChurchPage = () => {
  const [activeChurch, setActiveChurch] = useState<Church>(CHURCHES[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Church Selection */}
      <select 
        value={activeChurch.name}
        onChange={(e) => setActiveChurch(CHURCHES.find(church => church.name === e.target.value)!)}
        className="mb-4 w-full rounded-md border p-2"
      >
        {CHURCHES.map(church => (
          <option key={church.name} value={church.name}>
            {church.name}
          </option>
        ))}
      </select>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>{activeChurch.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Address:</h3>
                  <p>{activeChurch.address}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Times:</h3>
                  <div className="space-y-2">
                    {activeChurch.serviceTimes.map((service, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{service.type}</p>
                          <p className="text-sm text-gray-600">{service.day}</p>
                        </div>
                        <p className="text-gray-900">{service.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setIsEditing(true)}>
                  Edit Church Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500 text-center py-8">
                Church events coming soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500 text-center py-8">
                Church announcements coming soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Church Details</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                value={activeChurch.name}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Textarea
                value={activeChurch.address}
                onChange={(e) =>
                  setActiveChurch({ ...activeChurch, address: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                value={activeChurch.description}
                onChange={(e) =>
                  setActiveChurch({ ...activeChurch, description: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mission Statement
              </label>
              <Textarea
                value={activeChurch.missionStatement}
                onChange={(e) =>
                  setActiveChurch({ ...activeChurch, missionStatement: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Input
                value={activeChurch.location}
                onChange={(e) =>
                  setActiveChurch({ ...activeChurch, location: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <Input
                type="email"
                value={activeChurch.contactEmail}
                onChange={(e) =>
                  setActiveChurch({ ...activeChurch, contactEmail: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Phone
              </label>
              <Input
                value={activeChurch.contactPhone}
                onChange={(e) =>
                  setActiveChurch({ ...activeChurch, contactPhone: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <Input
                type="url"
                value={activeChurch.websiteUrl}
                onChange={(e) =>
                  setActiveChurch({ ...activeChurch, websiteUrl: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChurchPage;
