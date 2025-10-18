import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
