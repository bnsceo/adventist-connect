
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Church } from "@/types/social";

interface ChurchCardProps {
  church: Church;
  onClick: (church: Church) => void;
}

export const ChurchCard = ({ church, onClick }: ChurchCardProps) => {
  return (
    <Card 
      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onClick(church)}
    >
      <h3 className="font-semibold text-lg mb-2">{church.name}</h3>
      <div className="flex items-start gap-2 text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mt-1 shrink-0" />
        <span>{church.location}</span>
      </div>
      <div className="text-sm text-gray-500">
        {church.serviceTimes.map((service, index) => (
          <div key={index}>
            {service.type}: {service.day} at {service.time}
          </div>
        ))}
      </div>
    </Card>
  );
};
