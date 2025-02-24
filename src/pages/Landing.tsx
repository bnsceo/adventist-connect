import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Users, Church, Calendar, Heart, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const Landing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleJoinCommunity = () => {
    if (user) {
      navigate("/feed");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="pt-24 pb-16 px-4 bg-gradient-to-br from-social-primary/10 to-social-secondary/10 relative" // Added relative positioning
        style={{
          backgroundImage: 'url("output (9).jpg")', // Added background image
          backgroundSize: "cover", // Adjust as needed (cover, contain, etc.)
          backgroundPosition: "center", // Adjust as needed
          backgroundRepeat: "no-repeat", //prevent image from repeating
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div> {/*optional overlay to darken the image*/}
        <div className="container max-w-6xl mx-auto text-center relative z-10"> {/*added relative z-10 to put text above the image and overlay*/}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Connect with your Adventist Community
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join a thriving community of believers. Share your faith journey,
            connect with local churches, and participate in meaningful
            discussions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-social-primary hover:bg-social-secondary"
              onClick={handleJoinCommunity}
            >
              <Users className="w-5 h-5 mr-2" />
              {user ? "Go to Community" : "Join Community"}
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/learn-more">
                <BookOpen className="w-5 h-5 mr-2" />
                Learn More
              </Link>
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
              <p className="text-gray-600">
                Build meaningful relationships with fellow believers worldwide
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Church className="w-6 h-6 text-social-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Churches</h3>
              <p className="text-gray-600">
                Discover and connect with local Adventist churches near you
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-social-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Events</h3>
              <p className="text-gray-600">
                Stay updated with church events and community gatherings
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-social-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-social-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Faith</h3>
              <p className="text-gray-600">
                Share your testimonies and grow together in faith
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
