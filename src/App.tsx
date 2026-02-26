import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackPageView } from "@/lib/analytics";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CursorGlow } from "@/components/CursorGlow";
import { AuthProvider } from "@/contexts/AuthContext";
import { CommandPalette } from "@/components/nova/CommandPalette";

import Index from "./pages/Index";
import Nova from "./pages/Nova";
import NovaChat from "./pages/NovaChat";
import NovaProtocols from "./pages/NovaProtocols";
import ProtocolDetail from "./pages/ProtocolDetail";
import NovaInsights from "./pages/NovaInsights";
import NovaDevices from "./pages/NovaDevices";
import NovaProtocolOptimization from "./pages/NovaProtocolOptimization";
import NovaOverview from "./pages/NovaOverview";
import NovaHistoricalTrends from "./pages/NovaHistoricalTrends";
import NovaSettings from "./pages/NovaSettings";
import NovaGoals from "./pages/NovaGoals";
import NovaSettingsAdvanced from "./pages/NovaSettingsAdvanced";
import NovaPersonalDashboard from "./pages/NovaPersonalDashboard";
import MobileChat from "./pages/MobileChat";

import FAQ from "./pages/FAQ";
import Ambassador from "./pages/Ambassador";
import Partnerships from "./pages/Partnerships";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import LearningPathDetail from "./pages/LearningPathDetail";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Install from "./pages/Install";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard";
import ProgramOverview from "./pages/ProgramOverview";
import SportsOverview from "./pages/SportsOverview";
import HealthClubsOverview from "./pages/HealthClubsOverview";
import HealthcareOverview from "./pages/HealthcareOverview";
import HospitalityOverview from "./pages/HospitalityOverview";
import FinancialServicesOverview from "./pages/FinancialServicesOverview";
import InformationTechnologyOverview from "./pages/InformationTechnologyOverview";
import InformationTechnologyIntegrations from "./pages/InformationTechnologyIntegrations";
import InformationTechnologyPricing from "./pages/InformationTechnologyPricing";
import FinancialServicesIntegrations from "./pages/FinancialServicesIntegrations";
import FinancialServicesPricing from "./pages/FinancialServicesPricing";
import HealthcareIntegrations from "./pages/HealthcareIntegrations";
import HealthcarePricing from "./pages/HealthcarePricing";
import HospitalityIntegrations from "./pages/HospitalityIntegrations";
import HospitalityPricing from "./pages/HospitalityPricing";
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
import TeamDashboard from "./pages/TeamDashboard";
import JoinOrganisation from "./pages/JoinOrganisation";
import TeamSettings from "./pages/TeamSettings";
import TeamSettingsMembers from "./pages/TeamSettingsMembers";

// Industry Pages
import SaaSHighGrowth from "./pages/industries/SaaSHighGrowth";
import SaaSEnterprise from "./pages/industries/SaaSEnterprise";
import FinancialServicesIndustry from "./pages/industries/FinancialServices";
import ProfessionalServices from "./pages/industries/ProfessionalServices";
import HealthcareIndustry from "./pages/industries/Healthcare";
import ResearchLifeSciences from "./pages/industries/ResearchLifeSciences";
import GovernmentDefence from "./pages/industries/GovernmentDefence";
import AdvancedTechnology from "./pages/industries/AdvancedTechnology";

// Solutions Pages
import SolutionsHub from "./pages/solutions/SolutionsHub";
import CognitiveDataLayer from "./pages/solutions/CognitiveDataLayer";
import CognitiveStateEngine from "./pages/solutions/CognitiveStateEngine";
import PredictionSimulation from "./pages/solutions/PredictionSimulation";
import ActionControlLayer from "./pages/solutions/ActionControlLayer";
import CommandSurfaces from "./pages/solutions/CommandSurfaces";
import ROILayer from "./pages/solutions/ROILayer";

// Industries Hub
import Industries from "./pages/Industries";

const queryClient = new QueryClient();

// Analytics tracking component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null;
};

// Page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <AnalyticsTracker />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/learning-path/:id" element={<LearningPathDetail />} />
            <Route path="/learning-path/:id" element={<LearningPathDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ambassador" element={<Ambassador />} />
            <Route path="/partnerships" element={<Partnerships />} />
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
            <Route path="/install" element={<Install />} />
            <Route path="/nova/overview" element={<NovaOverview />} />
            <Route path="/nova/chat" element={<ProtectedRoute><NovaChat /></ProtectedRoute>} />
            <Route path="/nova" element={<ProtectedRoute><Nova /></ProtectedRoute>} />
            <Route path="/nova/protocols" element={<ProtectedRoute><NovaProtocols /></ProtectedRoute>} />
            <Route path="/nova/protocols/:id" element={<ProtectedRoute><ProtocolDetail /></ProtectedRoute>} />
            <Route path="/nova/insights" element={<ProtectedRoute><NovaInsights /></ProtectedRoute>} />
            <Route path="/nova/devices" element={<ProtectedRoute><NovaDevices /></ProtectedRoute>} />
            <Route path="/nova/optimisation" element={<ProtectedRoute><NovaProtocolOptimization /></ProtectedRoute>} />
            <Route path="/nova/trends" element={<ProtectedRoute><NovaHistoricalTrends /></ProtectedRoute>} />
            <Route path="/nova/goals" element={<ProtectedRoute><NovaGoals /></ProtectedRoute>} />
            <Route path="/nova/settings" element={<ProtectedRoute><NovaSettings /></ProtectedRoute>} />
            <Route path="/nova/dashboard" element={<ProtectedRoute><NovaPersonalDashboard /></ProtectedRoute>} />
            {/* Enterprise Overview */}
            <Route path="/enterprise/overview" element={<EnterpriseOverview />} />
            
            {/* Corporate Wellness Routes */}
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
            
            {/* Healthcare & Clinical Routes */}
            <Route path="/enterprise/healthcare/overview" element={<HealthcareOverview />} />
            <Route path="/enterprise/healthcare/integrations" element={<HealthcareIntegrations />} />
            <Route path="/enterprise/healthcare/pricing" element={<HealthcarePricing />} />
            
            {/* Hospitality & Spas Routes */}
            <Route path="/enterprise/hospitality/overview" element={<HospitalityOverview />} />
            <Route path="/enterprise/hospitality/integrations" element={<HospitalityIntegrations />} />
            <Route path="/enterprise/hospitality/pricing" element={<HospitalityPricing />} />
            
            {/* Financial Services Routes */}
            <Route path="/enterprise/financial-services/overview" element={<FinancialServicesOverview />} />
            <Route path="/enterprise/financial-services/integrations" element={<FinancialServicesIntegrations />} />
            <Route path="/enterprise/financial-services/pricing" element={<FinancialServicesPricing />} />
            
            {/* Information Technology Routes */}
            <Route path="/enterprise/information-technology/overview" element={<InformationTechnologyOverview />} />
            <Route path="/enterprise/information-technology/integrations" element={<InformationTechnologyIntegrations />} />
            <Route path="/enterprise/information-technology/pricing" element={<InformationTechnologyPricing />} />
            
            {/* Legacy enterprise routes */}
            <Route path="/enterprise/integrations" element={<EnterpriseIntegrations />} />
            <Route path="/enterprise/pricing" element={<EnterprisePricing />} />
            <Route path="/enterprise/cases" element={<EnterpriseCaseStudies />} />
            
            {/* Team Management Routes */}
            <Route path="/team" element={<TeamDashboard />} />
            <Route path="/team-dashboard" element={<TeamDashboard />} />
            <Route path="/join" element={<JoinOrganisation />} />
            <Route path="/join-organisation" element={<JoinOrganisation />} />
            <Route path="/team/settings" element={<TeamSettings />} />
            <Route path="/team/settings/members" element={<TeamSettingsMembers />} />
            <Route path="/team/settings/advanced" element={<NovaSettingsAdvanced />} />
            
            {/* Industry Landing Pages */}
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/saas-high-growth" element={<SaaSHighGrowth />} />
            <Route path="/industries/saas-enterprise" element={<SaaSEnterprise />} />
            <Route path="/industries/financial-services" element={<FinancialServicesIndustry />} />
            <Route path="/industries/professional-services" element={<ProfessionalServices />} />
            <Route path="/industries/healthcare" element={<HealthcareIndustry />} />
            <Route path="/industries/research-life-sciences" element={<ResearchLifeSciences />} />
            <Route path="/industries/government-defence" element={<GovernmentDefence />} />
            <Route path="/industries/advanced-technology" element={<AdvancedTechnology />} />
            
            {/* Solutions Pages */}
            <Route path="/solutions" element={<SolutionsHub />} />
            <Route path="/solutions/data-layer" element={<CognitiveDataLayer />} />
            <Route path="/solutions/state-engine" element={<CognitiveStateEngine />} />
            <Route path="/solutions/prediction" element={<PredictionSimulation />} />
            <Route path="/solutions/action-layer" element={<ActionControlLayer />} />
            <Route path="/solutions/command-surfaces" element={<CommandSurfaces />} />
            <Route path="/solutions/roi-layer" element={<ROILayer />} />
            
            {/* Mobile Chat */}
            <Route path="/mobile-chat" element={<MobileChat />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CursorGlow />
          <CommandPalette />
          <Toaster />
          <Sonner position="top-center" />
          <AnimatedRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
