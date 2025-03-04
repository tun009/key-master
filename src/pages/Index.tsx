
import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LicensesList from "@/components/licenses/LicensesList";
import ProductsList from "@/components/products/ProductsList";
import UsersList from "@/components/users/UsersList";
import OrdersList from "@/components/orders/OrdersList";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === "/") {
      setActiveTab("overview");
    } else if (path === "/licenses") {
      setActiveTab("licenses");
    } else if (path === "/products") {
      setActiveTab("products");
    } else if (path === "/users") {
      setActiveTab("users");
    } else if (path === "/orders") {
      setActiveTab("orders");
    } else if (path === "/settings") {
      setActiveTab("settings");
    }
  }, [location]);
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview">
              <DashboardOverview />
            </TabsContent>
            
            <TabsContent value="licenses">
              <LicensesList />
            </TabsContent>
            
            <TabsContent value="products">
              <ProductsList />
            </TabsContent>
            
            <TabsContent value="users">
              <UsersList />
            </TabsContent>
            
            <TabsContent value="orders">
              <OrdersList />
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <p>Settings content will be implemented here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
