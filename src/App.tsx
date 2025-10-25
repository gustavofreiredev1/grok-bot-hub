import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Bots from "./pages/Bots";
import Messages from "./pages/Messages";
import FileUpload from "./pages/FileUpload";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import FlowEditor from "./pages/FlowEditor";
import UserGuide from "./pages/UserGuide";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AIAttendant from "./pages/tools/AIAttendant";
import WhatsFilter from "./pages/tools/WhatsFilter";
import ExporterGroup from "./pages/tools/ExporterGroup";
import SDExporter from "./pages/tools/SDExporter";
import ExporterChat from "./pages/tools/ExporterChat";
import SDExporterUI from "./pages/tools/SDExporterUI";
import WhatsAppOS from "./pages/tools/WhatsAppOS";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/flow-editor" element={<FlowEditor />} />
            <Route path="/guide" element={<UserGuide />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tools/ai-attendant" element={<AIAttendant />} />
            <Route path="/tools/whatsfilter" element={<WhatsFilter />} />
            <Route path="/tools/exporter-group" element={<ExporterGroup />} />
            <Route path="/tools/sdexporter" element={<SDExporter />} />
            <Route path="/tools/exporter-chat" element={<ExporterChat />} />
            <Route path="/tools/sdexporter-ui" element={<SDExporterUI />} />
            <Route path="/tools/whatsappos" element={<WhatsAppOS />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
