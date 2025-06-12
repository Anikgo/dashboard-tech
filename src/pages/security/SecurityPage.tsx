
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Eye, Flame, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SecurityPage() {
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
      },
      data: {
        sensors: [
          { id: "PS001", location: "Main Gate", status: "Active", lastCheck: "2 mins ago", battery: "98%" },
          { id: "PS002", location: "Loading Bay", status: "Active", lastCheck: "1 min ago", battery: "95%" },
          { id: "PS003", location: "Perimeter Wall", status: "Active", lastCheck: "3 mins ago", battery: "97%" },
          { id: "PS004", location: "Emergency Exit", status: "Active", lastCheck: "1 min ago", battery: "99%" }
        ]
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
      },
      data: {
        inspections: [
          { id: "QC001", product: "Bottle Cap", result: "Passed", time: "11:30 AM", inspector: "QC-Bot-01" },
          { id: "QC002", product: "Label Alignment", result: "Failed", time: "11:25 AM", inspector: "QC-Bot-02" },
          { id: "QC003", product: "Fill Level", result: "Passed", time: "11:20 AM", inspector: "QC-Bot-01" },
          { id: "QC004", product: "Bottle Integrity", result: "Failed", time: "11:15 AM", inspector: "QC-Bot-03" }
        ]
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
      },
      data: {
        sensors: [
          { id: "FW001", location: "Production Line 1", type: "Fire", status: "Active", lastTest: "Yesterday" },
          { id: "FW002", location: "Packaging Area", type: "Water", status: "Active", lastTest: "Yesterday" },
          { id: "FW003", location: "Storage Room", type: "Smoke", status: "Active", lastTest: "Yesterday" },
          { id: "FW004", location: "Loading Bay", type: "Fire", status: "Active", lastTest: "Yesterday" }
        ]
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
    <div className="h-screen flex flex-col">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 flex-shrink-0"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-1">
          <Shield size={28} className="text-guardai-red" />
          <h1 className="text-2xl font-semibold text-guardai-darkgray">Security Dashboard</h1>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-guardai-gray mb-4 ml-9">
          Comprehensive security monitoring including perimeter protection, quality control, and hazard detection.
        </motion.p>
      </motion.div>

      <ScrollArea className="flex-1 px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 pb-6"
        >
          {securityFeatures.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <Card className={cn(
                "border-2 shadow-lg w-full",
                getStatusColor(feature.status)
              )}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon size={24} className="text-guardai-red" />
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      getCountColor(feature.status)
                    )}>
                      {feature.count}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  <p className="text-sm text-guardai-gray">{feature.description}</p>
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-guardai-red" />
                    <span className="text-xs text-guardai-gray">
                      {feature.status === "critical" ? "Critical" : 
                       feature.status === "warning" ? "Warning" : "Active"}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {Object.entries(feature.details).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-white/60 rounded border">
                        <div className="text-lg font-bold text-guardai-red">{value}</div>
                        <div className="text-xs text-guardai-gray">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Data Table */}
                  <div className="border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          {feature.id === "perimeter-security" && (
                            <>
                              <TableHead className="text-xs font-semibold">Sensor ID</TableHead>
                              <TableHead className="text-xs font-semibold">Location</TableHead>
                              <TableHead className="text-xs font-semibold">Status</TableHead>
                              <TableHead className="text-xs font-semibold">Battery</TableHead>
                            </>
                          )}
                          {feature.id === "quality-control" && (
                            <>
                              <TableHead className="text-xs font-semibold">Inspection ID</TableHead>
                              <TableHead className="text-xs font-semibold">Product</TableHead>
                              <TableHead className="text-xs font-semibold">Result</TableHead>
                              <TableHead className="text-xs font-semibold">Time</TableHead>
                            </>
                          )}
                          {feature.id === "fire-water-detection" && (
                            <>
                              <TableHead className="text-xs font-semibold">Sensor ID</TableHead>
                              <TableHead className="text-xs font-semibold">Location</TableHead>
                              <TableHead className="text-xs font-semibold">Type</TableHead>
                              <TableHead className="text-xs font-semibold">Status</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(feature.data.sensors || feature.data.inspections || []).map((item: any, index: number) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            {feature.id === "perimeter-security" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.id}</TableCell>
                                <TableCell className="text-xs">{item.location}</TableCell>
                                <TableCell className="text-xs">
                                  <Badge variant="default" className="text-xs bg-green-500">
                                    {item.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs">{item.battery}</TableCell>
                              </>
                            )}
                            {feature.id === "quality-control" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.id}</TableCell>
                                <TableCell className="text-xs">{item.product}</TableCell>
                                <TableCell className="text-xs">
                                  <Badge variant={item.result === "Passed" ? "default" : "destructive"} className="text-xs">
                                    {item.result}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs">{item.time}</TableCell>
                              </>
                            )}
                            {feature.id === "fire-water-detection" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.id}</TableCell>
                                <TableCell className="text-xs">{item.location}</TableCell>
                                <TableCell className="text-xs">{item.type}</TableCell>
                                <TableCell className="text-xs">
                                  <Badge variant="default" className="text-xs bg-green-500">
                                    {item.status}
                                  </Badge>
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Summary Stats */}
          <motion.div variants={itemVariants}>
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
      </ScrollArea>
    </div>
  );
}
