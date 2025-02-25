
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/social";
import { Link } from "react-router-dom";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  linkToProfile?: boolean;
}

export const UserAvatar = ({ user, size = "md", linkToProfile = true }: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  const avatar = (
    <Avatar className={`${sizeClasses[size]} ring-2 ring-white`}>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback className="bg-social-primary text-white">
        {user.name.split(" ").map(n => n[0]).join("")}
      </AvatarFallback>
    </Avatar>
  );

  if (linkToProfile) {
    return (
      <Link to={`/profile/${user.id}`} className="hover:opacity-80 transition-opacity">
        {avatar}
      </Link>
    );
  }

  return avatar;
};
