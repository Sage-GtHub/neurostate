import { NavLink } from "@/components/NavLink";

export const NovaNav = () => {
  return (
    <nav className="border-b border-border/50 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="flex gap-1 sm:gap-6 py-2 sm:py-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <NavLink
            to="/nova"
            end
            className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-3 py-2 sm:px-2 sm:py-0 rounded-full sm:rounded-none bg-muted/30 sm:bg-transparent min-h-[36px] sm:min-h-0 flex items-center"
            activeClassName="text-foreground bg-foreground/10 sm:bg-transparent sm:border-b-2 sm:border-primary sm:pb-4"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/nova/chat"
            className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-3 py-2 sm:px-2 sm:py-0 rounded-full sm:rounded-none bg-muted/30 sm:bg-transparent min-h-[36px] sm:min-h-0 flex items-center"
            activeClassName="text-foreground bg-foreground/10 sm:bg-transparent sm:border-b-2 sm:border-primary sm:pb-4"
          >
            Chat
          </NavLink>
          <NavLink
            to="/nova/protocols"
            className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-3 py-2 sm:px-2 sm:py-0 rounded-full sm:rounded-none bg-muted/30 sm:bg-transparent min-h-[36px] sm:min-h-0 flex items-center"
            activeClassName="text-foreground bg-foreground/10 sm:bg-transparent sm:border-b-2 sm:border-primary sm:pb-4"
          >
            Protocols
          </NavLink>
          <NavLink
            to="/nova/insights"
            className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-3 py-2 sm:px-2 sm:py-0 rounded-full sm:rounded-none bg-muted/30 sm:bg-transparent min-h-[36px] sm:min-h-0 flex items-center"
            activeClassName="text-foreground bg-foreground/10 sm:bg-transparent sm:border-b-2 sm:border-primary sm:pb-4"
          >
            Insights
          </NavLink>
          <NavLink
            to="/nova/optimization"
            className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-3 py-2 sm:px-2 sm:py-0 rounded-full sm:rounded-none bg-muted/30 sm:bg-transparent min-h-[36px] sm:min-h-0 flex items-center"
            activeClassName="text-foreground bg-foreground/10 sm:bg-transparent sm:border-b-2 sm:border-primary sm:pb-4"
          >
            Optimise
          </NavLink>
          <NavLink
            to="/nova/devices"
            className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground transition-all hover:text-foreground whitespace-nowrap px-3 py-2 sm:px-2 sm:py-0 rounded-full sm:rounded-none bg-muted/30 sm:bg-transparent min-h-[36px] sm:min-h-0 flex items-center"
            activeClassName="text-foreground bg-foreground/10 sm:bg-transparent sm:border-b-2 sm:border-primary sm:pb-4"
          >
            Devices
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
