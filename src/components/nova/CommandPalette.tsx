import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  MessageCircle,
  LayoutDashboard,
  Activity,
  Zap,
  Smartphone,
  Settings,
  Users,
  Target,
  TrendingUp,
  Brain,
  LogOut,
  User,
  Moon,
  Bell,
  HelpCircle,
  Search,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
  group: 'navigation' | 'nova' | 'actions' | 'settings';
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, isAuthenticated } = useAuth();

  // Keyboard shortcut to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const navigationItems: CommandItem[] = [
    { id: 'home', label: 'Home', icon: LayoutDashboard, action: () => navigate('/nova'), keywords: ['dashboard', 'main'], group: 'navigation' },
    { id: 'team', label: 'Team Dashboard', icon: Users, action: () => navigate('/team-dashboard'), keywords: ['organisation', 'members'], group: 'navigation' },
    { id: 'dashboard', label: 'Personal Dashboard', icon: User, action: () => navigate('/dashboard'), keywords: ['account', 'profile'], group: 'navigation' },
  ];

  const novaItems: CommandItem[] = [
    { id: 'chat', label: 'Chat with Nova', icon: MessageCircle, action: () => navigate('/nova/chat'), keywords: ['ai', 'conversation', 'ask'], group: 'nova' },
    { id: 'insights', label: 'View Insights', icon: Zap, action: () => navigate('/nova/insights'), keywords: ['analytics', 'data', 'trends'], group: 'nova' },
    { id: 'protocols', label: 'Protocols & Goals', icon: Activity, action: () => navigate('/nova/protocols'), keywords: ['routines', 'habits', 'targets'], group: 'nova' },
    { id: 'devices', label: 'Connected Devices', icon: Smartphone, action: () => navigate('/nova/devices'), keywords: ['wearables', 'sync', 'oura', 'whoop'], group: 'nova' },
  ];

  const actionItems: CommandItem[] = [
    { id: 'new-protocol', label: 'Create New Protocol', icon: Target, action: () => navigate('/nova/protocols?new=true'), keywords: ['add', 'routine'], group: 'actions' },
    { id: 'generate-insights', label: 'Generate AI Insights', icon: Brain, action: () => navigate('/nova/insights?generate=true'), keywords: ['analyze', 'predict'], group: 'actions' },
    { id: 'sync-devices', label: 'Sync Devices', icon: TrendingUp, action: () => navigate('/nova/devices?sync=true'), keywords: ['refresh', 'update'], group: 'actions' },
  ];

  const settingsItems: CommandItem[] = [
    { id: 'settings', label: 'Nova Settings', icon: Settings, action: () => navigate('/nova/settings'), keywords: ['preferences', 'config'], group: 'settings' },
    { id: 'notifications', label: 'Notification Settings', icon: Bell, action: () => navigate('/nova/settings#notifications'), keywords: ['alerts', 'push'], group: 'settings' },
    { id: 'profile', label: 'Edit Profile', icon: User, action: () => navigate('/profile'), keywords: ['account', 'personal'], group: 'settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, action: () => navigate('/faq'), keywords: ['faq', 'questions'], group: 'settings' },
    { id: 'signout', label: 'Sign Out', icon: LogOut, action: signOut, keywords: ['logout', 'exit'], group: 'settings' },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Trigger button for mobile */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 md:hidden z-50 w-12 h-12 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.action)}
                className="gap-3"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Nova AI">
            {novaItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.action)}
                className="gap-3"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Actions">
            {actionItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.action)}
                className="gap-3"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            {settingsItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.action)}
                className="gap-3"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
