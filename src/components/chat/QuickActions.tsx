
import { Button } from "@/components/ui/button";
import { FileText, Video, Bell, Calendar, BarChart2, Shield, Clock, Map, UserCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export function QuickActions() {
  const actions = [
    { icon: FileText, text: "Download Last 24h Report" },
    { icon: Video, text: "Live Feed from All Cameras" },
    { icon: Bell, text: "View Recent Alerts" },
    { icon: Calendar, text: "Schedule Security Patrols" },
    { icon: BarChart2, text: "Security Analytics" },
    { icon: Clock, text: "Access History" },
    { icon: Map, text: "Location Overview" },
    { icon: UserCheck, text: "Staff Check-in" },
    { icon: AlertTriangle, text: "Critical Events" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {actions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-gradient-to-r from-guardai-lightgray/5 to-transparent hover:from-guardai-red/5 hover:to-guardai-black/5 border-guardai-gray/20 hover:border-guardai-red/30 text-sm px-4 py-3 h-auto transition-all duration-300 rounded-lg group"
          >
            <action.icon size={18} className="text-guardai-red transition-colors group-hover:text-guardai-red" />
            <span className="text-xs font-medium text-guardai-darkgray group-hover:text-guardai-black">
              {action.text}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
