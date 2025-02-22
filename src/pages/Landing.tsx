
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Church, Calendar, Heart } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-social-primary/10 to-social-secondary/10">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with your Adventist Community
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a thriving community of believers. Share your faith journey, connect with local churches, and participate in meaningful discussions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-social-primary hover:bg-social-secondary">
              <Link to="/register">Join the Community</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-social-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Build meaningful relationships with fellow believers worldwide</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Church className="w-6 h-6 text-social-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Churches</h3>
              <p className="text-gray-600">Discover and connect with local Adventist churches near you</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-social-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Events</h3>
              <p className="text-gray-600">Stay updated with church events and community gatherings</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-social-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Faith</h3>
              <p className="text-gray-600">Share your testimonies and grow together in faith</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
