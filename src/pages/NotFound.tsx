import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/neurostate-icon.svg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO title="Page Not Found | NeuroState®" description="The page you're looking for doesn't exist. Return to NeuroState to explore cognitive performance tools for your organisation." noindex={true} />
      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        {/* Subtle background orb */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <img src={logoIcon} alt="NeuroState" className="h-6 w-6 transition-all duration-300 group-hover:scale-110" />
            <span className="text-sm font-medium tracking-tight text-foreground">NeuroState<sup className="text-[6px]">®</sup></span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-6 relative z-10">
          <div className="text-center max-w-md space-y-6">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Error 404</p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground leading-[1.1]">
              Page not found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link to="/">
                <Button className="h-11 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                  <Home className="w-4 h-4 mr-2" />
                  Back to home
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full">
                  Get in touch
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 px-6 py-8 text-center">
          <p className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} NeuroState<sup className="text-[6px]">®</sup>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;