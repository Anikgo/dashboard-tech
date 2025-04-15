
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  MessageCircle, BarChart2, Video, FolderDot, FileText, 
  Bell, Camera, Users, Settings, MapPin
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  route: string;
  description: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Guard.AI Chat", icon: MessageCircle, route: "/", description: "Natural language interface to query camera footage" },
  { name: "Insights", icon: BarChart2, route: "/insights", description: "AI-powered analytics and summaries" },
  { name: "Live View", icon: Video, route: "/live-view", description: "Real-time camera feeds" },
  { name: "My Projects", icon: MapPin, route: "/projects", description: "Monitored locations and sites" },
  { name: "Reports", icon: FileText, route: "/reports", description: "Generated activity reports" },
  { name: "Alerts & Flags", icon: Bell, route: "/alerts", description: "Security and motion alerts" },
  { name: "Manage Cameras", icon: Camera, route: "/cameras", description: "Camera configuration" },
  { name: "Manage Users", icon: Users, route: "/users", description: "Access control and roles" },
  { name: "Settings", icon: Settings, route: "/settings", description: "System configuration" },
];

export function Sidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Set active item based on current route
  const getActiveItemFromPath = (path: string) => {
    if (path === "/") return "Guard.AI Chat";
    if (path === "/insights") return "Insights";
    if (path === "/live-view") return "Live View";
    if (path === "/projects") return "My Projects";
    if (path === "/reports") return "Reports";
    if (path === "/alerts") return "Alerts & Flags";
    if (path === "/cameras") return "Manage Cameras";
    if (path === "/users") return "Manage Users";
    if (path === "/settings") return "Settings";
    return "Guard.AI Chat";
  };
  
  const [activeItem, setActiveItem] = useState(getActiveItemFromPath(location.pathname));
  
  // Update active item when route changes
  useEffect(() => {
    setActiveItem(getActiveItemFromPath(location.pathname));
  }, [location.pathname]);
  
  // Auto-hide on mobile
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-all duration-300",
      !mobileOpen && isMobile && "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-guardai-darkgray">Guard.AI</h1>
        </div>
        
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.route}
              className="relative block"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                location.pathname === item.route 
                  ? "bg-guardai-lightgray text-guardai-red" 
                  : "text-gray-600 hover:bg-gray-100"
              )}>
                <item.icon 
                  size={20} 
                  className={cn(
                    "transition-colors",
                    location.pathname === item.route 
                      ? "text-guardai-red" 
                      : "text-gray-500 group-hover:text-guardai-red",
                    hoveredItem === item.name && "text-guardai-red"
                  )} 
                />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
