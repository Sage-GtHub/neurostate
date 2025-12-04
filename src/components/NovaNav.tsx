import { NavLink } from "@/components/NavLink";

export const NovaNav = () => {
  return (
    <nav className="border-b border-border/50 bg-background overflow-x-auto">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="flex gap-6 sm:gap-8 py-4 min-w-max sm:min-w-0">
          <NavLink
            to="/nova/overview"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-foreground border-b-2 border-primary pb-4"
          >
            Overview
          </NavLink>
          <NavLink
            to="/nova/chat"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-foreground border-b-2 border-primary pb-4"
          >
            Chat
          </NavLink>
          <NavLink
            to="/nova"
            end
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-foreground border-b-2 border-primary pb-4"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/nova/protocols"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-foreground border-b-2 border-primary pb-4"
          >
            Protocols
          </NavLink>
          <NavLink
            to="/nova/insights"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-foreground border-b-2 border-primary pb-4"
          >
            Insights
          </NavLink>
          <NavLink
            to="/nova/devices"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-foreground border-b-2 border-primary pb-4"
          >
            Devices
          </NavLink>
        </div>
      </div>
    </nav>
  );
};