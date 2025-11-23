import { NavLink } from "@/components/NavLink";

export const NovaNav = () => {
  return (
    <nav className="border-b border-mist bg-ivory">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="flex gap-8 py-4">
          <NavLink
            to="/nova"
            end
            className="text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Chat
          </NavLink>
          <NavLink
            to="/nova/protocols"
            className="text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            My Protocols
          </NavLink>
          <NavLink
            to="/nova/insights"
            className="text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Insights & Metrics
          </NavLink>
          <NavLink
            to="/nova/devices"
            className="text-sm uppercase tracking-wider text-ash transition-colors hover:text-carbon"
            activeClassName="text-carbon border-b-2 border-carbon pb-4"
          >
            Devices
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
