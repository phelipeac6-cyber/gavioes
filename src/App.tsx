import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Settings from "./pages/Settings";
import Socio from "./pages/Socio";
import HealthData from "./pages/HealthData";
import Address from "./pages/Address";
import SocialMedia from "./pages/SocialMedia";
import EmergencyCard from "./pages/EmergencyCard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/news" element={<News />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/socio" element={<Socio />} />
          <Route path="/health" element={<HealthData />} />
          <Route path="/address" element={<Address />} />
          <Route path="/social" element={<SocialMedia />} />
          <Route path="/emergency-card" element={<EmergencyCard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;