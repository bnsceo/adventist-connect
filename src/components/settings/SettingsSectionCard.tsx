
import { Card } from "@/components/ui/card";

interface SettingsSectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsSectionCard({
  title,
  description,
  children
}: SettingsSectionCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </Card>
  );
}
