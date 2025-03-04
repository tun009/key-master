
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Users, Package, ShoppingCart, Key, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts";

const DashboardOverview = () => {
  // Mock data for initial UI development
  const stats = useMemo(() => [
    { 
      title: "Total Licenses", 
      value: "246", 
      description: "Active licenses", 
      change: "+12%",
      changeType: "positive",
      icon: <Key className="h-5 w-5 text-primary" />
    },
    { 
      title: "Active Users", 
      value: "187", 
      description: "Registered accounts", 
      change: "+5%",
      changeType: "positive",
      icon: <Users className="h-5 w-5 text-primary" /> 
    },
    { 
      title: "Products", 
      value: "8", 
      description: "Available products", 
      change: "+1",
      changeType: "positive",
      icon: <Package className="h-5 w-5 text-primary" /> 
    },
    { 
      title: "Recent Orders", 
      value: "32", 
      description: "Last 30 days", 
      change: "-3%",
      changeType: "negative",
      icon: <ShoppingCart className="h-5 w-5 text-primary" /> 
    },
  ], []);

  const licenseData = useMemo(() => [
    { name: 'Jan', count: 18 },
    { name: 'Feb', count: 25 },
    { name: 'Mar', count: 30 },
    { name: 'Apr', count: 28 },
    { name: 'May', count: 32 },
    { name: 'Jun', count: 40 },
    { name: 'Jul', count: 48 },
    { name: 'Aug', count: 52 },
    { name: 'Sep', count: 60 },
    { name: 'Oct', count: 68 },
    { name: 'Nov', count: 72 },
    { name: 'Dec', count: 76 },
  ], []);

  const revenueData = useMemo(() => [
    { name: 'Jan', amount: 5000 },
    { name: 'Feb', amount: 8500 },
    { name: 'Mar', amount: 7800 },
    { name: 'Apr', amount: 9200 },
    { name: 'May', amount: 11000 },
    { name: 'Jun', amount: 10200 },
    { name: 'Jul', amount: 12800 },
    { name: 'Aug', amount: 14500 },
    { name: 'Sep', amount: 16200 },
    { name: 'Oct', amount: 15800 },
    { name: 'Nov', amount: 17500 },
    { name: 'Dec', amount: 19200 },
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
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className={`flex items-center text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.changeType === 'positive' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>License Growth</CardTitle>
            <CardDescription>Monthly license creation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={licenseData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
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
                <div key={i} className="flex items-center gap-3 p-3 border rounded-md text-sm hover:bg-muted">
                  <Key className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">LICENSE-{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">Product {i+1} • Created {i+1} days ago</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Active</span>
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
                <div key={i} className="flex items-center gap-3 p-3 border rounded-md text-sm hover:bg-muted">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">ORDER-{Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">User {i+1} • ${Math.floor(Math.random() * 100) + 50}.99 • {i} days ago</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    i % 3 === 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}>
                    {i % 3 === 0 ? "Pending" : "Completed"}
                  </span>
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
