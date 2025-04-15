import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import InsightsPage from "./pages/insights/InsightsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/live-view" element={<div className="p-6"><h1 className="text-2xl font-semibold">Live View</h1><p className="text-guardai-gray">Access live CCTV feed from all cameras.</p></div>} />
          <Route path="/projects" element={<div className="p-6"><h1 className="text-2xl font-semibold">My Projects</h1><p className="text-guardai-gray">List of all project locations being monitored.</p></div>} />
          <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-semibold">Reports</h1><p className="text-guardai-gray">Timeline and downloadable activity reports.</p></div>} />
          <Route path="/alerts" element={<div className="p-6"><h1 className="text-2xl font-semibold">Alerts & Flags</h1><p className="text-guardai-gray">Motion/sound/line-cross alerts from cameras.</p></div>} />
          <Route path="/cameras" element={<div className="p-6"><h1 className="text-2xl font-semibold">Manage Cameras</h1><p className="text-guardai-gray">Add/remove/configure individual cameras.</p></div>} />
          <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-semibold">Settings</h1><p className="text-guardai-gray">Org-level and technical configurations.</p></div>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
