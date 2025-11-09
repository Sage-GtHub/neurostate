import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import Resources from "./pages/Resources";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/learning-path/:id" element={<LearningPathDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/guides" element={<HowToUse />} />
          <Route path="/ambassador" element={<Ambassador />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin/update-descriptions" element={<ProductDescriptionUpdater />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
