import { Card } from "@/components/ui/card";
import { BookOpen, Users, Church, Calendar, Heart } from "lucide-react";
const LearnMore = () => {
  return <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About 
Adventist.com</h1>
          <p className="text-xl text-gray-600">
            Discover how we're building a digital space for the global Adventist community
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-social-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                <p className="text-gray-600">
                  To create a vibrant online community that connects Seventh-day Adventists worldwide,
                  fostering spiritual growth, fellowship, and mission outreach through meaningful
                  digital interactions and real-world connections.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Users className="w-5 h-5 text-social-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Community Connection</h3>
                  <p className="text-gray-600">Connect with believers who share your faith and values</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Church className="w-5 h-5 text-social-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Church Directory</h3>
                  <p className="text-gray-600">Find local churches and get involved in your area</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-social-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Event Planning</h3>
                  <p className="text-gray-600">Discover and organize church events and activities</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-social-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Faith Sharing</h3>
                  <p className="text-gray-600">Share your testimony and inspire others in their walk with God</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default LearnMore;