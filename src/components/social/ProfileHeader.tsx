
import { User } from "@/types/social";
import { UserAvatar } from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, MapPin, Users, Loader2 } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onFollow?: () => void;
  isFollowing?: boolean;
  isUpdatingFollow?: boolean;
}

export const ProfileHeader = ({ 
  user, 
  isOwnProfile, 
  onEditProfile,
  onFollow,
  isFollowing,
  isUpdatingFollow
}: ProfileHeaderProps) => {
  return (
    <Card className="relative mb-6 overflow-hidden animate-fade-in">
      {/* Cover Image */}
      <div className="h-48 bg-social-primary/10">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Profile Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* Profile Info */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="relative -mt-20">
              <UserAvatar user={user} size="lg" />
            </div>
            <div className="mt-2">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-social-primary font-medium">{user.role}</p>
              <p className="text-gray-600">{user.church}</p>
              {user.location && (
                <div className="flex items-center gap-1 text-gray-500 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
            </div>
          </div>
          
          {isOwnProfile ? (
            <Button onClick={onEditProfile} variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <Button 
              onClick={onFollow}
              variant={isFollowing ? "outline" : "default"}
              className="min-w-[100px]"
              disabled={isUpdatingFollow}
            >
              {isUpdatingFollow ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isFollowing ? (
                "Following"
              ) : (
                "Follow"
              )}
            </Button>
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-4 text-gray-600 whitespace-pre-wrap">{user.bio}</p>
        )}

        {/* Stats */}
        <div className="flex gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-social-primary" />
            <div>
              <p className="font-semibold">{user.followers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">{user.following.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>

        {/* Ministries */}
        {user.ministries && user.ministries.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {user.ministries.map((ministry, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-social-light rounded-full text-sm text-social-primary"
              >
                {ministry}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
