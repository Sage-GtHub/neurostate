import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Watch, 
  Settings,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/nova/dashboard' },
  { icon: MessageSquare, label: 'Chat', path: '/nova' },
  { icon: Target, label: 'Protocols', path: '/nova/protocols' },
  { icon: TrendingUp, label: 'Insights', path: '/nova/insights' },
  { icon: Watch, label: 'Devices', path: '/nova/devices' },
];

export const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  // Check if current path starts with nav item path
  const isActive = (path: string) => {
    if (path === '/nova') {
      return location.pathname === '/nova' || location.pathname === '/nova/chat';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 pt-safe md:hidden"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-14 px-2" role="tablist">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200",
                "touch-manipulation active:scale-95",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-2 -bottom-px h-0.5 bg-primary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
              
              <motion.div
                animate={{ 
                  scale: active ? 1.1 : 1,
                  y: active ? -2 : 0
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  active && "text-primary"
                )} />
              </motion.div>
              
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                active && "text-primary"
              )}>
                {item.label}
              </span>
              
              {item.badge && (
                <span className="absolute top-1 right-1/4 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

// Floating action button for quick Nova chat access
export const NovaFloatingButton = ({ onClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide on Nova pages
  if (location.pathname.startsWith('/nova')) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigate('/nova');
        }
      }}
      className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center md:bottom-6"
    >
      <Sparkles className="w-6 h-6" />
    </motion.button>
  );
};

export default MobileBottomNav;
