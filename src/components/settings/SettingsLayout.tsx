
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  KeyRound,
  Link as LinkIcon,
  Shield,
  Bell,
  Layout,
  MessageSquare,
  Lock,
  Palette,
  Database,
  BadgePercent,
  AlertTriangle
} from "lucide-react";
import { SettingsNavItem } from "@/types/settings";

const navItems: SettingsNavItem[] = [
  {
    title: "Login & Security",
    href: "/settings/security",
    icon: KeyRound,
    description: "Manage your password and security preferences"
  },
  {
    title: "Connected Accounts",
    href: "/settings/connected-accounts",
    icon: LinkIcon,
    description: "Manage your connected social accounts and apps"
  },
  {
    title: "Privacy",
    href: "/settings/privacy",
    icon: Shield,
    description: "Control your privacy and data sharing preferences"
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
    description: "Customize your notification preferences"
  },
  {
    title: "Feed Preferences",
    href: "/settings/feed",
    icon: Layout,
    description: "Customize what you see in your feed"
  },
  {
    title: "Messaging",
    href: "/settings/messaging",
    icon: MessageSquare,
    description: "Control your messaging preferences"
  },
  {
    title: "Security",
    href: "/settings/system-security",
    icon: Lock,
    description: "Manage system-level security settings"
  },
  {
    title: "Display & Accessibility",
    href: "/settings/display",
    icon: Palette,
    description: "Customize your display preferences"
  },
  {
    title: "Data & Storage",
    href: "/settings/data",
    icon: Database,
    description: "Manage your data and storage usage"
  },
  {
    title: "Ad Preferences",
    href: "/settings/ads",
    icon: BadgePercent,
    description: "Customize your advertising preferences"
  },
  {
    title: "Content Moderation",
    href: "/settings/moderation",
    icon: AlertTriangle,
    description: "Manage content moderation settings"
  }
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const location = useLocation();

  return (
    <div className="container max-w-7xl relative mx-auto flex flex-col space-y-6 px-8 py-8 md:flex-row md:space-y-0 md:space-x-8">
      <aside className="md:w-1/4">
        <div className="sticky top-8">
          <div className="flex items-center mb-6">
            <Settings className="mr-2 h-5 w-5" />
            <h2 className="text-2xl font-semibold">Settings</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start",
                    location.pathname === item.href &&
                      "bg-muted font-medium text-primary"
                  )}
                >
                  {item.icon && (
                    <item.icon className="mr-2 h-4 w-4" />
                  )}
                  {item.title}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>
      <main className="flex-1 md:max-w-2xl">
        <div className="space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
