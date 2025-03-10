import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Index from "@/components/dashboard/Index";
import ProductsList from "@/components/products/ProductsList";
import ProductDetail from "@/components/products/ProductDetail";
import NotFound from "@/components/NotFound";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              <div className="container mx-auto max-w-7xl">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<ProductsList />} />
                  <Route path="/products/:productId" element={<ProductDetail />} />
                  {/* Keep other routes */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
          <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
