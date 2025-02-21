
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/social";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

export const UserAvatar = ({ user, size = "md" }: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  return (
    <Avatar className={`${sizeClasses[size]} ring-2 ring-white`}>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback className="bg-social-primary text-white">
        {user.name.split(" ").map(n => n[0]).join("")}
      </AvatarFallback>
    </Avatar>
  );
};
