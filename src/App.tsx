import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { RouteGuard } from "./components/RouteGuard";
import { PwaInstallPrompt } from "./components/PwaInstallPrompt";
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
import EmergencyContactForm from "./pages/EmergencyContactForm";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import EventConfirmation from "./pages/EventConfirmation";
import Tickets from "./pages/Tickets";
import TicketDetail from "./pages/TicketDetail";
import TicketCheckout from "./pages/TicketCheckout";
import TicketConfirmation from "./pages/TicketConfirmation";
import Polls from "./pages/Polls";
import Estatuto from "./pages/Estatuto";
import Historia from "./pages/Historia";
import Channels from "./pages/Channels";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/Login";
import Torcedores from "./pages/admin/Torcedores";
import MyInfo from "./pages/MyInfo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EditSocialMedia from "./pages/EditSocialMedia";
import EditAddress from "./pages/EditAddress";
import EditHealthData from "./pages/EditHealthData";
import EditEmergencyContact from "./pages/EditEmergencyContact";
import Notifications from "./pages/Notifications";
import Cadastros from "./pages/admin/Cadastros";
import Analytics from "./pages/admin/Analytics";
import Pagamentos from "./pages/admin/Pagamentos";
import Saude from "./pages/admin/Saude";
import Campanhas from "./pages/admin/Campanhas";
import Produtos from "./pages/admin/Produtos";
import Eventos from "./pages/admin/Eventos";
import Ingressos from "./pages/admin/Ingressos";
import SubSedes from "./pages/admin/SubSedes";
import Config from "./pages/admin/Config";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";
import PrivacySettings from "./pages/PrivacySettings";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <PwaInstallPrompt />
            <RouteGuard>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/id=:pulseiraId/:fullName" element={<Profile />} />
                <Route path="/news" element={<News />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/socio" element={<Socio />} />
                <Route path="/health" element={<HealthData />} />
                <Route path="/address" element={<Address />} />
                <Route path="/social" element={<SocialMedia />} />
                <Route path="/emergency-card/id=:pulseiraId/:fullName" element={<EmergencyCard />} />
                <Route path="/emergency-contact-form" element={<EmergencyContactForm />} />
                <Route path="/store" element={<Store />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/event-confirmation/:id" element={<EventConfirmation />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/ticket/:id" element={<TicketDetail />} />
                <Route path="/ticket-checkout" element={<TicketCheckout />} />
                <Route path="/ticket-confirmation" element={<TicketConfirmation />} />
                <Route path="/polls" element={<Polls />} />
                <Route path="/estatuto" element={<Estatuto />} />
                <Route path="/historia" element={<Historia />} />
                <Route path="/channels" element={<Channels />} />
                <Route path="/chat/:id" element={<Chat />} />
                <Route path="/chat-list" element={<ChatList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/login" element={<AdminLogin />} />
                <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
                <Route path="/dashboard/torcedores" element={<Torcedores />} />
                <Route path="/dashboard/cadastros" element={<Cadastros />} />
                <Route path="/dashboard/analytics" element={<Analytics />} />
                <Route path="/dashboard/pagamentos" element={<Pagamentos />} />
                <Route path="/dashboard/saude" element={<Saude />} />
                <Route path="/dashboard/campanhas" element={<Campanhas />} />
                <Route path="/dashboard/produtos" element={<Produtos />} />
                <Route path="/dashboard/eventos" element={<Eventos />} />
                <Route path="/dashboard/ingressos" element={<Ingressos />} />
                <Route path="/dashboard/sub-sedes" element={<SubSedes />} />
                <Route path="/dashboard/config" element={<Config />} />
                <Route path="/settings/my-info" element={<MyInfo />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/settings/edit-social" element={<EditSocialMedia />} />
                <Route path="/settings/edit-address" element={<EditAddress />} />
                <Route path="/settings/edit-health" element={<EditHealthData />} />
                <Route path="/settings/edit-emergency-contact" element={<EditEmergencyContact />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/privacy-settings" element={<PrivacySettings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RouteGuard>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;