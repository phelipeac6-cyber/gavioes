import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;