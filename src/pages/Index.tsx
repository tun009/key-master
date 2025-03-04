
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { License, LicenseKey, KeyIcon, Package, Users, ShoppingCart } from "lucide-react";
import LicensesList from "@/components/licenses/LicensesList";
import ProductsList from "@/components/products/ProductsList";
import UsersList from "@/components/users/UsersList";
import OrdersList from "@/components/orders/OrdersList";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <License className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">License Manager</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <License className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="licenses" className="flex items-center gap-2">
              <KeyIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Licenses</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
          </TabsList>
          
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
  );
};

export default Index;
