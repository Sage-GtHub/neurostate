import { NavLink } from "@/components/NavLink";

export const NovaNav = () => {
  return (
    <nav className="border-b border-mist bg-ivory overflow-x-auto">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="flex gap-4 sm:gap-8 py-4 min-w-max sm:min-w-0">
          <NavLink
            to="/nova"
            end
            className="text-xs sm:text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Chat
          </NavLink>
          <NavLink
            to="/nova/protocols"
            className="text-xs sm:text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Protocols
          </NavLink>
          <NavLink
            to="/nova/insights"
            className="text-xs sm:text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Insights
          </NavLink>
          <NavLink
            to="/nova/optimization"
            className="text-xs sm:text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Optimisation
          </NavLink>
          <NavLink
            to="/nova/devices"
            className="text-xs sm:text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon whitespace-nowrap px-2 sm:px-0"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Devices
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
