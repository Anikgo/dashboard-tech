
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Flame, Activity, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SecurityPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

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

  const securityFeatures = [
    {
      id: "perimeter-security",
      title: "Perimeter Security",
      description: "External security and intrusion detection",
      icon: Shield,
      status: "active",
      count: 0,
      details: {
        intrusionAttempts: 0,
        camerasCovered: "100%",
        lastIncident: "None today",
        securityLevel: "High",
        activeSensors: 32,
        batteryStatus: "98%"
      }
    },
    {
      id: "quality-control",
      title: "Quality Control",
      description: "Product quality and defect detection",
      icon: Eye,
      status: "active",
      count: 2,
      details: {
        defectsToday: 2,
        qualityRate: "98.5%",
        inspections: 145,
        rejectedItems: 3,
        passedItems: 2447,
        lastInspection: "11:30 AM"
      }
    },
    {
      id: "fire-water-detection",
      title: "Fire & Water Detection",
      description: "Environmental hazard and leak monitoring",
      icon: Flame,
      status: "active",
      count: 0,
      details: {
        fireAlerts: 0,
        waterLeaks: 0,
        smokeDetected: 0,
        systemHealth: "100%",
        sensorsActive: 28,
        emergencyProtocol: "Ready"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "border-red-500 bg-red-50";
      case "warning": return "border-yellow-500 bg-yellow-50";
      case "active": return "border-green-500 bg-green-50";
      default: return "border-gray-300 bg-white";
    }
  };

  const getCountColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500 text-white";
      case "warning": return "bg-yellow-500 text-white";
      case "active": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
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
        <Shield size={28} className="text-guardai-red" />
        <h1 className="text-2xl font-semibold text-guardai-darkgray">Security Dashboard</h1>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-guardai-gray mb-6 ml-9">
        Comprehensive security monitoring including perimeter protection, quality control, and hazard detection.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Features Grid */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature) => (
              <Card 
                key={feature.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                  getStatusColor(feature.status),
                  selectedFeature === feature.id ? "ring-2 ring-guardai-red" : ""
                )}
                onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <feature.icon size={24} className="text-guardai-red" />
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      getCountColor(feature.status)
                    )}>
                      {feature.count}
                    </div>
                  </div>
                  <CardTitle className="text-sm font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-guardai-gray">{feature.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Activity size={12} className="text-guardai-red" />
                    <span className="text-xs text-guardai-gray">
                      {feature.status === "critical" ? "Critical" : 
                       feature.status === "warning" ? "Warning" : "Active"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <motion.div variants={itemVariants}>
          <Card className="border border-gray-200 bg-white shadow-sm h-fit sticky top-6">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle size={18} className="text-guardai-red" />
                <span>Security Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {selectedFeature ? (
                (() => {
                  const feature = securityFeatures.find(f => f.id === selectedFeature);
                  if (!feature) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <feature.icon size={20} className="text-guardai-red" />
                        <h3 className="font-semibold">{feature.title}</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {Object.entries(feature.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-sm text-guardai-gray capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                            <span className="text-sm font-medium">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t">
                        <Button 
                          variant="outline" 
                          className="w-full border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red"
                        >
                          View Security Report
                        </Button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-8">
                  <Shield size={48} className="text-guardai-gray mx-auto mb-4" />
                  <p className="text-guardai-gray">
                    Click on any security module to view detailed information and monitoring status.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div variants={itemVariants} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">0</div>
              <div className="text-sm text-guardai-gray">Security Breaches</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">98.5%</div>
              <div className="text-sm text-guardai-gray">Quality Rate</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">60</div>
              <div className="text-sm text-guardai-gray">Active Sensors</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-guardai-red">High</div>
              <div className="text-sm text-guardai-gray">Security Level</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
