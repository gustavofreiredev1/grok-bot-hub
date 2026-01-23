import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { WhatsAppConfigProvider } from "@/hooks/useWhatsAppConfig";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "./components/Layout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Bots from "./pages/Bots";
import Messages from "./pages/Messages";
import FileUpload from "./pages/FileUpload";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import FlowEditor from "./pages/FlowEditor";
import FlowsLibrary from "./pages/FlowsLibrary";
import UserGuide from "./pages/UserGuide";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Tools with simplified names
import AIAttendant from "./pages/tools/AIAttendant";
import Validator from "./pages/tools/Validator";
import GroupExtractor from "./pages/tools/GroupExtractor";
import ContactCapture from "./pages/tools/ContactCapture";
import ChatExtractor from "./pages/tools/ChatExtractor";
import UnknownScanner from "./pages/tools/UnknownScanner";
import MassSender from "./pages/tools/MassSender";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WhatsAppConfigProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bots" element={<Bots />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/flows" element={<FlowsLibrary />} />
                <Route path="/flow-editor" element={<FlowEditor />} />
                <Route path="/guide" element={<UserGuide />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Tools with new simplified routes */}
                <Route path="/tools/ai-attendant" element={<AIAttendant />} />
                <Route path="/tools/validator" element={<Validator />} />
                <Route path="/tools/group-extractor" element={<GroupExtractor />} />
                <Route path="/tools/contact-capture" element={<ContactCapture />} />
                <Route path="/tools/chat-extractor" element={<ChatExtractor />} />
                <Route path="/tools/unknown-scanner" element={<UnknownScanner />} />
                <Route path="/tools/mass-sender" element={<MassSender />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WhatsAppConfigProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
