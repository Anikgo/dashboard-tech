
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Search, Filter, Eye, X, CheckCircle, AlertTriangle, Clock, Camera, Calendar, Settings, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AlertsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved'>('all');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const alerts = [
    {
      id: 1,
      type: "Motion Detection",
      location: "Warehouse Entrance",
      camera: "CAM-01",
      timestamp: "Today, 10:23 AM",
      status: "active",
      priority: "high",
      description: "Unexpected movement detected in restricted area"
    },
    {
      id: 2,
      type: "Line Crossing",
      location: "Loading Dock",
      camera: "CAM-03",
      timestamp: "Today, 09:47 AM",
      status: "active",
      priority: "medium",
      description: "Person crossed security boundary line"
    },
    {
      id: 3,
      type: "Sound Alert",
      location: "Office Front Door",
      camera: "CAM-05",
      timestamp: "Today, 08:15 AM",
      status: "resolved",
      priority: "low",
      description: "Loud noise detected outside normal hours"
    },
    {
      id: 4,
      type: "Camera Tampering",
      location: "Parking Gate",
      camera: "CAM-02",
      timestamp: "Yesterday, 11:30 PM",
      status: "resolved",
      priority: "high",
      description: "Camera angle was adjusted by unknown person"
    },
    {
      id: 5,
      type: "Object Removal",
      location: "Inventory Room",
      camera: "CAM-07",
      timestamp: "Yesterday, 08:42 PM",
      status: "active",
      priority: "high",
      description: "Monitored item removed from designated area"
    }
  ];

  const filteredAlerts = filterStatus === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.status === filterStatus);

  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-guardai-red text-white';
      case 'medium': return 'bg-amber-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-1">
        <Bell size={28} className="text-guardai-red" />
        <h1 className="text-2xl font-semibold text-guardai-darkgray">Alerts & Flags</h1>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-guardai-gray mb-6 ml-9">
        Motion, sound, and line-crossing alerts from all monitoring cameras.
      </motion.p>

      <motion.div variants={itemVariants} className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-guardai-gray pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-guardai-red/20 focus:border-guardai-red"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-guardai-gray">Status:</span>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "border-guardai-gray/30", 
              filterStatus === 'all' && "bg-guardai-lightgray text-guardai-red"
            )}
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "border-guardai-gray/30", 
              filterStatus === 'active' && "bg-guardai-lightgray text-guardai-red"
            )}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "border-guardai-gray/30", 
              filterStatus === 'resolved' && "bg-guardai-lightgray text-guardai-red"
            )}
            onClick={() => setFilterStatus('resolved')}
          >
            Resolved
          </Button>
        </div>

        <Button variant="outline" className="border-guardai-gray/30 flex items-center gap-2">
          <Filter size={16} />
          <span>More Filters</span>
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="p-4 bg-gray-50 border-b flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle size={18} className="text-guardai-red" />
              <span>Alert Feed</span>
            </CardTitle>
            <div className="text-sm text-guardai-gray">
              Showing <span className="font-medium">{filteredAlerts.length}</span> alerts
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredAlerts.length > 0 ? (
              <div className="divide-y">
                {filteredAlerts.map(alert => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className={cn("p-2 rounded-md", getPriorityClass(alert.priority))}>
                          <AlertTriangle size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{alert.type}</h3>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              alert.status === 'active' 
                                ? "bg-guardai-red/10 text-guardai-red" 
                                : "bg-green-100 text-green-800"
                            )}>
                              {alert.status === 'active' ? 'Active' : 'Resolved'}
                            </span>
                          </div>
                          <p className="text-sm text-guardai-gray">{alert.description}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-guardai-gray">
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {alert.timestamp}
                            </div>
                            <div className="flex items-center">
                              <Camera size={12} className="mr-1" />
                              {alert.camera}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {alert.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Button variant="outline" size="sm" className="border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red">
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                      {alert.status === 'active' ? (
                        <Button variant="outline" size="sm" className="border-guardai-gray/30 hover:bg-green-50 hover:text-green-700 hover:border-green-200">
                          <CheckCircle size={14} className="mr-1" />
                          Resolve
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red">
                          <X size={14} className="mr-1" />
                          Dismiss
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Bell size={24} className="text-guardai-gray" />
                </div>
                <h3 className="text-lg font-medium mb-1">No alerts found</h3>
                <p className="text-guardai-gray">Change your filters or check back later</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar size={18} className="text-guardai-red" />
                <span>Alert History</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Today</div>
                  <div className="font-medium">8 alerts</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>Yesterday</div>
                  <div className="font-medium">12 alerts</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>This week</div>
                  <div className="font-medium">47 alerts</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>This month</div>
                  <div className="font-medium">132 alerts</div>
                </div>
              </div>
              <Button variant="link" className="text-guardai-red p-0 h-auto mt-4">
                View full history
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings size={18} className="text-guardai-red" />
                <span>Alert Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-guardai-gray mb-4">
                Customize alert thresholds and notification preferences.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Motion sensitivity</div>
                  <div className="text-sm font-medium">Medium</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Sound detection</div>
                  <div className="text-sm font-medium">High</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Email notifications</div>
                  <div className="text-sm font-medium text-green-600">Enabled</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">SMS alerts</div>
                  <div className="text-sm font-medium text-guardai-gray">Disabled</div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red">
                Manage Alert Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
