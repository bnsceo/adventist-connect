
interface SettingsPageHeaderProps {
  heading: string;
  description?: string;
}

export function SettingsPageHeader({
  heading,
  description
}: SettingsPageHeaderProps) {
  return (
    <div className="space-y-0.5">
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
