
export interface SettingsNavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface SecuritySession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface NotificationPreference {
  id: string;
  type: 'email' | 'push' | 'inApp';
  category: string;
  enabled: boolean;
  description: string;
}

export interface ConnectedAccount {
  id: string;
  provider: string;
  email: string;
  connected: boolean;
  lastUsed?: string;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  dataSharing: boolean;
  activityTracking: boolean;
  personalization: boolean;
}
