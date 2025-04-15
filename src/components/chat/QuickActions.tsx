
import { Button } from "@/components/ui/button";
import { FileText, Video, Bell } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-start">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/30 transition-all text-sm md:text-base px-3 py-1.5 h-auto group"
      >
        <FileText size={16} className="group-hover:text-guardai-red transition-colors" />
        <span>Download Last 24h Report</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/30 transition-all text-sm md:text-base px-3 py-1.5 h-auto group"
      >
        <Video size={16} className="group-hover:text-guardai-red transition-colors" />
        <span>Live Feed from All Cameras</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red hover:border-guardai-red/30 transition-all text-sm md:text-base px-3 py-1.5 h-auto group"
      >
        <Bell size={16} className="group-hover:text-guardai-red transition-colors" />
        <span>View Recent Alerts</span>
      </Button>
    </div>
  );
}
