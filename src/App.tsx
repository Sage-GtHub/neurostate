import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackPageView } from "@/lib/analytics";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CursorGlow } from "@/components/CursorGlow";
import { AuthProvider } from "@/contexts/AuthContext";
import { CommandPalette } from "@/components/nova/CommandPalette";
import { FloatingContactHub } from "@/components/FloatingContactHub";
import { useNudgeNotifications } from "@/hooks/useNudgeNotifications";
import { Loader2 } from "lucide-react";

// ─── Loading Fallback ────────────────────────────────────────────────
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Loading page">
    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
  </div>
);

// ─── Lazy-loaded Pages ───────────────────────────────────────────────
const Index = lazy(() => import("./pages/Index"));
const Nova = lazy(() => import("./pages/Nova"));
const NovaChat = lazy(() => import("./pages/NovaChat"));
const NovaProtocols = lazy(() => import("./pages/NovaProtocols"));
const ProtocolDetail = lazy(() => import("./pages/ProtocolDetail"));
const NovaInsights = lazy(() => import("./pages/NovaInsights"));
const NovaDevices = lazy(() => import("./pages/NovaDevices"));
const NovaProtocolOptimization = lazy(() => import("./pages/NovaProtocolOptimization"));
const NovaOverview = lazy(() => import("./pages/NovaOverview"));
const NovaHistoricalTrends = lazy(() => import("./pages/NovaHistoricalTrends"));
const NovaSettings = lazy(() => import("./pages/NovaSettings"));
const NovaGoals = lazy(() => import("./pages/NovaGoals"));
const NovaSettingsAdvanced = lazy(() => import("./pages/NovaSettingsAdvanced"));
const NovaPersonalDashboard = lazy(() => import("./pages/NovaPersonalDashboard"));
const MobileChat = lazy(() => import("./pages/MobileChat"));

const FAQ = lazy(() => import("./pages/FAQ"));
const Ambassador = lazy(() => import("./pages/Ambassador"));
const Partnerships = lazy(() => import("./pages/Partnerships"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const Rewards = lazy(() => import("./pages/Rewards"));
const LearningPathDetail = lazy(() => import("./pages/LearningPathDetail"));
const Terms = lazy(() => import("./pages/Terms"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Install = lazy(() => import("./pages/Install"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const ProgramOverview = lazy(() => import("./pages/ProgramOverview"));
const SportsOverview = lazy(() => import("./pages/SportsOverview"));
const HealthClubsOverview = lazy(() => import("./pages/HealthClubsOverview"));
const HealthcareOverview = lazy(() => import("./pages/HealthcareOverview"));
const HospitalityOverview = lazy(() => import("./pages/HospitalityOverview"));
const FinancialServicesOverview = lazy(() => import("./pages/FinancialServicesOverview"));
const InformationTechnologyOverview = lazy(() => import("./pages/InformationTechnologyOverview"));
const InformationTechnologyIntegrations = lazy(() => import("./pages/InformationTechnologyIntegrations"));
const InformationTechnologyPricing = lazy(() => import("./pages/InformationTechnologyPricing"));
const FinancialServicesIntegrations = lazy(() => import("./pages/FinancialServicesIntegrations"));
const FinancialServicesPricing = lazy(() => import("./pages/FinancialServicesPricing"));
const HealthcareIntegrations = lazy(() => import("./pages/HealthcareIntegrations"));
const HealthcarePricing = lazy(() => import("./pages/HealthcarePricing"));
const HospitalityIntegrations = lazy(() => import("./pages/HospitalityIntegrations"));
const HospitalityPricing = lazy(() => import("./pages/HospitalityPricing"));
const EnterpriseIntegrations = lazy(() => import("./pages/EnterpriseIntegrations"));
const EnterprisePricing = lazy(() => import("./pages/EnterprisePricing"));
const EnterpriseOverview = lazy(() => import("./pages/EnterpriseOverview"));
const EnterpriseCaseStudies = lazy(() => import("./pages/EnterpriseCaseStudies"));
const SportsIntegrations = lazy(() => import("./pages/SportsIntegrations"));
const SportsPricing = lazy(() => import("./pages/SportsPricing"));
const SportsCaseStudies = lazy(() => import("./pages/SportsCaseStudies"));
const HealthClubsIntegrations = lazy(() => import("./pages/HealthClubsIntegrations"));
const HealthClubsPricing = lazy(() => import("./pages/HealthClubsPricing"));
const HealthClubsCaseStudies = lazy(() => import("./pages/HealthClubsCaseStudies"));
const TeamDashboard = lazy(() => import("./pages/TeamDashboard"));
const JoinOrganisation = lazy(() => import("./pages/JoinOrganisation"));
const TeamSettings = lazy(() => import("./pages/TeamSettings"));
const TeamSettingsMembers = lazy(() => import("./pages/TeamSettingsMembers"));

// Industry Pages
const SaaSHighGrowth = lazy(() => import("./pages/industries/SaaSHighGrowth"));
const SaaSEnterprise = lazy(() => import("./pages/industries/SaaSEnterprise"));
const FinancialServicesIndustry = lazy(() => import("./pages/industries/FinancialServices"));
const ProfessionalServices = lazy(() => import("./pages/industries/ProfessionalServices"));
const HealthcareIndustry = lazy(() => import("./pages/industries/Healthcare"));
const ResearchLifeSciences = lazy(() => import("./pages/industries/ResearchLifeSciences"));
const GovernmentDefence = lazy(() => import("./pages/industries/GovernmentDefence"));
const AdvancedTechnology = lazy(() => import("./pages/industries/AdvancedTechnology"));

// Solutions Pages
const SolutionsHub = lazy(() => import("./pages/solutions/SolutionsHub"));
const CognitiveDataLayer = lazy(() => import("./pages/solutions/CognitiveDataLayer"));
const CognitiveStateEngine = lazy(() => import("./pages/solutions/CognitiveStateEngine"));
const PredictionSimulation = lazy(() => import("./pages/solutions/PredictionSimulation"));
const ActionControlLayer = lazy(() => import("./pages/solutions/ActionControlLayer"));
const CommandSurfaces = lazy(() => import("./pages/solutions/CommandSurfaces"));
const ROILayer = lazy(() => import("./pages/solutions/ROILayer"));

// Industries Hub
const Industries = lazy(() => import("./pages/Industries"));

const queryClient = new QueryClient();

// Analytics tracking + global notifications
const AnalyticsTracker = () => {
  const location = useLocation();
  useNudgeNotifications();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
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
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="main"
          >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/learning-path/:id" element={<LearningPathDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ambassador" element={<Ambassador />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Navigate to="/nova/dashboard" replace />} />
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
      </Suspense>
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
          <FloatingContactHub />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
