
import { useState } from "react";
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { SettingsPageHeader } from "@/components/settings/SettingsPageHeader";
import { SettingsSectionCard } from "@/components/settings/SettingsSectionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { SecuritySession } from "@/types/settings";

const SecuritySettings = () => {
  const { toast } = useToast();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
  const [sessions] = useState<SecuritySession[]>([
    {
      id: "1",
      device: "Chrome on Windows",
      location: "Orlando, FL",
      lastActive: "Active now",
      isCurrent: true
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "Miami, FL",
      lastActive: "2 hours ago",
      isCurrent: false
    }
  ]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
    });
    setIsChangingPassword(false);
  };

  const handleLogoutOtherSessions = () => {
    toast({
      title: "Sessions Terminated",
      description: "All other sessions have been logged out.",
    });
  };

  return (
    <SettingsLayout>
      <SettingsPageHeader
        heading="Login & Security"
        description="Manage your login credentials and enhance your account security."
      />

      <div className="space-y-6">
        <SettingsSectionCard
          title="Change Password"
          description="Update your password to keep your account secure."
        >
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Current Password"
                disabled={!isChangingPassword}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="New Password"
                disabled={!isChangingPassword}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm New Password"
                disabled={!isChangingPassword}
              />
            </div>
            {!isChangingPassword ? (
              <Button 
                type="button" 
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button type="submit">Save Password</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </SettingsSectionCard>

        <SettingsSectionCard
          title="Two-Factor Authentication (2FA)"
          description="Add an extra layer of security to your account."
        >
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div>Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                {is2FAEnabled 
                  ? "2FA is currently enabled" 
                  : "Protect your account with 2FA"}
              </div>
            </div>
            <Switch
              checked={is2FAEnabled}
              onCheckedChange={setIs2FAEnabled}
            />
          </div>
        </SettingsSectionCard>

        <SettingsSectionCard
          title="Active Sessions"
          description="Manage your active sessions across different devices."
        >
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <div className="font-medium">{session.device}</div>
                  <div className="text-sm text-muted-foreground">
                    {session.location} • {session.lastActive}
                    {session.isCurrent && " (Current)"}
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={handleLogoutOtherSessions}
            >
              Log out of all other sessions
            </Button>
          </div>
        </SettingsSectionCard>
      </div>
    </SettingsLayout>
  );
};

export default SecuritySettings;
