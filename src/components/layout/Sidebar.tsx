
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
import { useLanguage } from "@/contexts/LanguageContext";

type SidebarItem = {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  path: string;
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  const sidebarItems: SidebarItem[] = [
    {
      id: "overview",
      labelKey: "dashboard",
      icon: <Home size={20} />,
      path: "/"
    },
    {
      id: "licenses",
      labelKey: "licenses",
      icon: <Key size={20} />,
      path: "/licenses"
    },
    {
      id: "products",
      labelKey: "products",
      icon: <Package size={20} />,
      path: "/products"
    },
    {
      id: "users",
      labelKey: "users",
      icon: <Users size={20} />,
      path: "/users"
    },
    {
      id: "orders",
      labelKey: "orders",
      icon: <ShoppingCart size={20} />,
      path: "/orders"
    },
    {
      id: "settings",
      labelKey: "settings",
      icon: <Settings size={20} />,
      path: "/settings"
    },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 flex flex-col dark:bg-gray-900 dark:border-gray-800", 
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-800">
        <FileKey className="h-6 w-6 text-primary flex-shrink-0" />
        {!collapsed && <span className="font-bold truncate">{t("licenseManager")}</span>}
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Link 
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm group hover:bg-gray-200 dark:hover:bg-gray-800",
                (currentPath === item.path || 
                 (item.path === "/" && currentPath === "") || 
                 (item.path !== "/" && currentPath.startsWith(item.path))) 
                  ? "bg-gray-200 text-primary font-medium dark:bg-gray-800 dark:text-gray-200" 
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              <div className="text-gray-500 group-hover:text-primary flex-shrink-0 dark:text-gray-400 dark:group-hover:text-gray-200">
                {item.icon}
              </div>
              {!collapsed && <span>{t(item.labelKey)}</span>}
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
