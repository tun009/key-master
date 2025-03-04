
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { License, Users, Package, ShoppingCart } from "lucide-react";
import { useMemo } from "react";

const DashboardOverview = () => {
  // Mock data for initial UI development
  const stats = useMemo(() => [
    { 
      title: "Total Licenses", 
      value: "246", 
      description: "Active licenses", 
      change: "+12% from last month",
      icon: <License className="h-5 w-5 text-primary" />
    },
    { 
      title: "Active Users", 
      value: "187", 
      description: "Registered accounts", 
      change: "+5% from last month",
      icon: <Users className="h-5 w-5 text-primary" /> 
    },
    { 
      title: "Products", 
      value: "8", 
      description: "Available products", 
      change: "+1 new product",
      icon: <Package className="h-5 w-5 text-primary" /> 
    },
    { 
      title: "Recent Orders", 
      value: "32", 
      description: "Last 30 days", 
      change: "+18% from previous period",
      icon: <ShoppingCart className="h-5 w-5 text-primary" /> 
    },
  ], []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recently Created Licenses</CardTitle>
            <CardDescription>Last 5 license keys generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 border rounded-md text-sm hover:bg-muted">
                  <License className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">LICENSE-{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">Product {i+1} • Created {i+1} days ago</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Last 5 orders placed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 border rounded-md text-sm hover:bg-muted">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">ORDER-{Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">User {i+1} • ${Math.floor(Math.random() * 100)}.99 • {i} days ago</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
