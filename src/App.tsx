
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Church from "./pages/Church";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navigation />
        <main className="pt-16"> {/* Add padding to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/feed" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/church/:id" element={<Church />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
