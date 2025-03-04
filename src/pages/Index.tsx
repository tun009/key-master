
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LicensesList from "@/components/licenses/LicensesList";
import ProductsList from "@/components/products/ProductsList";
import UsersList from "@/components/users/UsersList";
import OrdersList from "@/components/orders/OrdersList";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="flex h-screen bg-gray-50">
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
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
