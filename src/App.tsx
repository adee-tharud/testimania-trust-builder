
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from './hooks/redux';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import TestimonialsPage from './pages/TestimonialsPage';
import CreateFormPage from './pages/CreateFormPage';
import WidgetPage from './pages/WidgetPage';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/widget" element={<WidgetPage />} />
            <Route path="/analytics" element={<div className="text-center py-12"><h2 className="text-xl font-semibold">Analytics Coming Soon</h2></div>} />
            <Route path="/settings" element={<div className="text-center py-12"><h2 className="text-xl font-semibold">Settings Coming Soon</h2></div>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
