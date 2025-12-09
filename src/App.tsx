import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { FloatingNovaButton } from "@/components/FloatingNovaButton";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import Shop from "./pages/Shop";
import Bundles from "./pages/Bundles";
import Nova from "./pages/Nova";
import NovaChat from "./pages/NovaChat";
import NovaProtocols from "./pages/NovaProtocols";
import ProtocolDetail from "./pages/ProtocolDetail";
import NovaInsights from "./pages/NovaInsights";
import NovaDevices from "./pages/NovaDevices";
import NovaProtocolOptimization from "./pages/NovaProtocolOptimization";
import NovaOverview from "./pages/NovaOverview";
import NovaHistoricalTrends from "./pages/NovaHistoricalTrends";

import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import HowToUse from "./pages/HowToUse";
import Ambassador from "./pages/Ambassador";
import Partnerships from "./pages/Partnerships";
import Subscriptions from "./pages/Subscriptions";
import ProductDescriptionUpdater from "./pages/ProductDescriptionUpdater";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import LearningPathDetail from "./pages/LearningPathDetail";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard";
import ProgramOverview from "./pages/ProgramOverview";
import SportsOverview from "./pages/SportsOverview";
import HealthClubsOverview from "./pages/HealthClubsOverview";
import EnterpriseIntegrations from "./pages/EnterpriseIntegrations";
import EnterprisePricing from "./pages/EnterprisePricing";
import EnterpriseOverview from "./pages/EnterpriseOverview";
import EnterpriseCaseStudies from "./pages/EnterpriseCaseStudies";
import SportsIntegrations from "./pages/SportsIntegrations";
import SportsPricing from "./pages/SportsPricing";
import SportsCaseStudies from "./pages/SportsCaseStudies";
import HealthClubsIntegrations from "./pages/HealthClubsIntegrations";
import HealthClubsPricing from "./pages/HealthClubsPricing";
import HealthClubsCaseStudies from "./pages/HealthClubsCaseStudies";

const queryClient = new QueryClient();

// Analytics tracking component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AnalyticsTracker />
        <FloatingNovaButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/learning-path/:id" element={<LearningPathDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/guides" element={<HowToUse />} />
          <Route path="/ambassador" element={<Ambassador />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/admin/update-descriptions" element={<ProductDescriptionUpdater />} />
          <Route path="/nova/overview" element={<NovaOverview />} />
          <Route path="/nova/chat" element={<ProtectedRoute><NovaChat /></ProtectedRoute>} />
          <Route path="/nova" element={<ProtectedRoute><Nova /></ProtectedRoute>} />
          <Route path="/nova/protocols" element={<ProtectedRoute><NovaProtocols /></ProtectedRoute>} />
          <Route path="/nova/protocols/:id" element={<ProtectedRoute><ProtocolDetail /></ProtectedRoute>} />
          <Route path="/nova/insights" element={<ProtectedRoute><NovaInsights /></ProtectedRoute>} />
          <Route path="/nova/devices" element={<ProtectedRoute><NovaDevices /></ProtectedRoute>} />
          <Route path="/nova/optimisation" element={<ProtectedRoute><NovaProtocolOptimization /></ProtectedRoute>} />
          <Route path="/nova/trends" element={<ProtectedRoute><NovaHistoricalTrends /></ProtectedRoute>} />
          {/* Enterprise Overview */}
          <Route path="/enterprise/overview" element={<EnterpriseOverview />} />
          
          {/* Corporate Wellness Routes */}
          <Route path="/enterprise/corporate/overview" element={<ProgramOverview />} />
          <Route path="/enterprise/corporate/overview" element={<ProgramOverview />} />
          <Route path="/enterprise/corporate/integrations" element={<EnterpriseIntegrations />} />
          <Route path="/enterprise/corporate/pricing" element={<EnterprisePricing />} />
          <Route path="/enterprise/corporate/cases" element={<EnterpriseCaseStudies />} />
          
          {/* Sports Organisations Routes */}
          <Route path="/enterprise/sports/overview" element={<SportsOverview />} />
          <Route path="/enterprise/sports/integrations" element={<SportsIntegrations />} />
          <Route path="/enterprise/sports/pricing" element={<SportsPricing />} />
          <Route path="/enterprise/sports/cases" element={<SportsCaseStudies />} />
          
          {/* Health Clubs & Studios Routes */}
          <Route path="/enterprise/health-clubs/overview" element={<HealthClubsOverview />} />
          <Route path="/enterprise/health-clubs/integrations" element={<HealthClubsIntegrations />} />
          <Route path="/enterprise/health-clubs/pricing" element={<HealthClubsPricing />} />
          <Route path="/enterprise/health-clubs/cases" element={<HealthClubsCaseStudies />} />
          
          {/* Legacy enterprise routes */}
          <Route path="/enterprise/integrations" element={<EnterpriseIntegrations />} />
          <Route path="/enterprise/pricing" element={<EnterprisePricing />} />
          <Route path="/enterprise/cases" element={<EnterpriseCaseStudies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
