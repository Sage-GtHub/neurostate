import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NovaBreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  "/nova": "Home",
  "/nova/chat": "Chat",
  "/nova/devices": "Devices",
  "/nova/insights": "Insights",
  "/nova/protocols": "Protocols",
  "/nova/goals": "Goals",
  "/nova/trends": "Trends",
  "/nova/settings": "Settings",
  "/nova/settings/advanced": "Advanced",
};

export function NovaBreadcrumb({ items, className }: NovaBreadcrumbProps) {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from current path if not provided
  const breadcrumbs = items || (() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbItem[] = [];
    
    let currentPath = "";
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath];
      if (label) {
        crumbs.push({
          label,
          href: currentPath === location.pathname ? undefined : currentPath,
        });
      }
    }
    
    return crumbs;
  })();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center gap-1.5 text-[11px]", className)}
    >
      <Link
        to="/nova"
        className="flex items-center gap-1 text-foreground/40 hover:text-foreground transition-colors"
      >
        <Home className="w-3 h-3" />
      </Link>
      
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-foreground/20" />
          {item.href ? (
            <Link
              to={item.href}
              className="text-foreground/40 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
