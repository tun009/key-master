
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  FileKey, 
  Key, 
  Package, 
  Users, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Home
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type SidebarItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems: SidebarItem[] = [
    {
      id: "overview",
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/"
    },
    {
      id: "licenses",
      label: "Licenses",
      icon: <Key size={20} />,
      path: "/licenses"
    },
    {
      id: "products",
      label: "Products",
      icon: <Package size={20} />,
      path: "/products"
    },
    {
      id: "users",
      label: "Users",
      icon: <Users size={20} />,
      path: "/users"
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/orders"
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings"
    },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 flex flex-col", 
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <FileKey className="h-6 w-6 text-primary flex-shrink-0" />
        {!collapsed && <span className="font-bold truncate">License Manager</span>}
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Link 
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm group hover:bg-gray-200",
                currentPath === item.path ? "bg-gray-200 text-primary font-medium" : "text-gray-600"
              )}
            >
              <div className="text-gray-500 group-hover:text-primary flex-shrink-0">
                {item.icon}
              </div>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <Button 
        variant="ghost" 
        className="self-end m-2"
        size="icon"
        onClick={() => setCollapsed(prev => !prev)}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </Button>
    </div>
  );
};
