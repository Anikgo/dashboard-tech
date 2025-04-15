
import { Button } from "@/components/ui/button";
import { FileText, Video, Bell, Calendar, BarChart2, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-start">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/50 text-sm md:text-base px-3 py-1.5 h-auto transition-all duration-200"
        >
          <FileText size={16} className="text-guardai-red" />
          <span>Download Last 24h Report</span>
        </Button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/50 text-sm md:text-base px-3 py-1.5 h-auto transition-all duration-200"
        >
          <Video size={16} className="text-guardai-red" />
          <span>Live Feed from All Cameras</span>
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/50 text-sm md:text-base px-3 py-1.5 h-auto transition-all duration-200"
        >
          <Bell size={16} className="text-guardai-red" />
          <span>View Recent Alerts</span>
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/50 text-sm md:text-base px-3 py-1.5 h-auto transition-all duration-200"
        >
          <Calendar size={16} className="text-guardai-red" />
          <span>Schedule Security Patrols</span>
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/50 text-sm md:text-base px-3 py-1.5 h-auto transition-all duration-200"
        >
          <BarChart2 size={16} className="text-guardai-red" />
          <span>Security Analytics</span>
        </Button>
      </motion.div>
    </div>
  );
}
