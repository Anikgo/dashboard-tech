import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageCircle, BarChart2, Video, Folder, FileText, Bell, Camera, Settings, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
interface SidebarItem {
  name: string;
  icon: React.ElementType;
  route: string;
}
const sidebarItems: SidebarItem[] = [{
  name: "Guardex.ai Chat",
  icon: MessageCircle,
  route: "/"
}, {
  name: "Insights",
  icon: BarChart2,
  route: "/insights"
}, {
  name: "Live View",
  icon: Video,
  route: "/live-view"
}, {
  name: "My Projects",
  icon: Folder,
  route: "/projects"
}, {
  name: "Reports",
  icon: FileText,
  route: "/reports"
}, {
  name: "Alerts & Flags",
  icon: Bell,
  route: "/alerts"
}, {
  name: "Manage Cameras",
  icon: Camera,
  route: "/cameras"
}, {
  name: "Settings",
  icon: Settings,
  route: "/settings"
}];
export function Sidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Set active item based on current route
  const getActiveItemFromPath = (path: string) => {
    if (path === "/") return "Guardex.ai Chat";
    if (path === "/insights") return "Insights";
    if (path === "/live-view") return "Live View";
    if (path === "/projects") return "My Projects";
    if (path === "/reports") return "Reports";
    if (path === "/alerts") return "Alerts & Flags";
    if (path === "/cameras") return "Manage Cameras";
    if (path === "/settings") return "Settings";
    return "Guardex.ai Chat";
  };
  const [activeItem, setActiveItem] = useState(getActiveItemFromPath(location.pathname));

  // Update active item when route changes
  useEffect(() => {
    setActiveItem(getActiveItemFromPath(location.pathname));
  }, [location.pathname]);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
      setMobileOpen(false);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };
  return <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />}
      
      {/* Mobile menu button */}
      {isMobile && <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden" onClick={toggleSidebar}>
          <Menu size={24} />
        </Button>}
      
      <div className={cn("bg-white h-screen border-r border-gray-200 transition-all duration-300 flex flex-col z-50", isMobile ? mobileOpen ? "fixed left-0 w-[240px]" : "fixed -left-[240px] w-[240px]" : collapsed ? "w-[70px]" : "w-[240px]")}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!collapsed && <div className="flex items-center gap-2">
              <img alt="Guardex.ai" src="/lovable-uploads/437edfc7-1c0a-4d56-abeb-a358613a0a2f.png" className="h-40 object-contain" />
            </div>}
          {collapsed && <img src="/lovable-uploads/4ff77d27-629e-47b3-9ba9-be3f5429c1bd.png" alt="Guardex.ai" className="h-10 mx-auto" />}
          <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleSidebar}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        <div className="flex-grow py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {sidebarItems.map(item => <Link key={item.name} to={item.route} className={cn("flex items-center gap-3 px-3 py-2 rounded-md transition-colors", activeItem === item.name ? "bg-guardai-lightgray text-guardai-red" : "text-gray-600 hover:bg-gray-100")} onClick={() => {
            setActiveItem(item.name);
            if (isMobile) setMobileOpen(false);
          }}>
                <item.icon size={20} className={activeItem === item.name ? "text-guardai-red" : "text-gray-500"} />
                {!collapsed && <span>{item.name}</span>}
              </Link>)}
          </nav>
        </div>
      </div>
    </>;
}