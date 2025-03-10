
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ProductsList from "@/components/products/ProductsList";
import ProductDetail from "@/components/products/ProductDetail";
import NotFound from "@/components/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="*"
                  element={
                    <>
                      <Header />
                      <div className="flex">
                        <Sidebar />
                        <main className="flex-1 p-6">
                          <div className="container mx-auto max-w-7xl">
                            <Routes>
                              <Route path="/" element={<DashboardOverview />} />
                              <Route path="/products" element={<ProductsList />} />
                              <Route path="/products/:productId" element={<ProductDetail />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </div>
                        </main>
                      </div>
                    </>
                  }
                />
              </Routes>
              <Toaster />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
