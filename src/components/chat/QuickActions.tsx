
import { Button } from "@/components/ui/button";
import { FileText, Video, Bell } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-start">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray text-sm md:text-base px-3 py-1.5 h-auto"
      >
        <FileText size={16} />
        <span>Download Last 24h Report</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray text-sm md:text-base px-3 py-1.5 h-auto"
      >
        <Video size={16} />
        <span>Live Feed from All Cameras</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-guardai-gray/30 hover:bg-guardai-lightgray text-sm md:text-base px-3 py-1.5 h-auto"
      >
        <Bell size={16} />
        <span>View Recent Alerts</span>
      </Button>
    </div>
  );
}
