import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Invest from "./pages/Invest";
import InvestSteps from "./pages/InvestSteps";
import InvestFlow from "./pages/InvestFlow";
import UpdatedDashboard from "./pages/UpdatedDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/invest-steps" element={<InvestSteps />} />
            <Route 
              path="/invest" 
              element={
                <ProtectedRoute>
                  <Invest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invest-flow" 
              element={
                <ProtectedRoute>
                  <InvestFlow />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/updated-dashboard" 
              element={
                <ProtectedRoute>
                  <UpdatedDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <UpdatedDashboard />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
