import { NavLink } from "@/components/NavLink";

export const NovaNav = () => {
  return (
    <nav className="bg-gradient-to-b from-ivory to-pearl/10 overflow-x-auto">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="flex gap-8 sm:gap-12 py-6 min-w-max sm:min-w-0">
          <NavLink
            to="/nova"
            end
            className="text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-ash/70 transition-all hover:text-carbon whitespace-nowrap"
            activeClassName="text-carbon font-semibold pb-1"
          >
            Chat
          </NavLink>
          <NavLink
            to="/nova/protocols"
            className="text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-ash/70 transition-all hover:text-carbon whitespace-nowrap"
            activeClassName="text-carbon font-semibold pb-1"
          >
            Protocols
          </NavLink>
          <NavLink
            to="/nova/insights"
            className="text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-ash/70 transition-all hover:text-carbon whitespace-nowrap"
            activeClassName="text-carbon font-semibold pb-1"
          >
            Insights
          </NavLink>
          <NavLink
            to="/nova/optimization"
            className="text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-ash/70 transition-all hover:text-carbon whitespace-nowrap"
            activeClassName="text-carbon font-semibold pb-1"
          >
            Optimisation
          </NavLink>
          <NavLink
            to="/nova/devices"
            className="text-[0.6875rem] sm:text-[0.75rem] uppercase tracking-[0.15em] text-ash/70 transition-all hover:text-carbon whitespace-nowrap"
            activeClassName="text-carbon font-semibold pb-1"
          >
            Devices
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
