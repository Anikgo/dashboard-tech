import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Eye, Flame, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type FireSmokeAlert = {
  id: string;
  camera_id: string;
  frame_timestamp: string;
  logged_at: string;
  image_id: string;
  box_count: number;
  violation_type: string;
};

export default function SecurityPage() {
  const [fireSmokeAlerts, setFireSmokeAlerts] = useState<FireSmokeAlert[]>([]);

  useEffect(() => {
    const fetchFireSmokeAlerts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/alerts/fire-smoke");
        const data = await res.json();
        setFireSmokeAlerts(data);
      } catch (err) {
        console.error("Failed to fetch fire/smoke alerts", err);
      }
    };

    fetchFireSmokeAlerts();
    const interval = setInterval(fetchFireSmokeAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

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
      id: "fire-water-detection",
      title: "Fire & Smoke Detection",
      description: "Environmental hazard and leak monitoring",
      icon: Flame,
      status: fireSmokeAlerts.length > 0 ? "warning" : "active",
      count: fireSmokeAlerts.length,
      details: {
        fireAlerts: fireSmokeAlerts.length,
        smokeAlerts: 0,
        smokeDetected: 0,
        systemHealth: "100%",
        cameraActive: 19,
        emergencyProtocol: "Ready"
      },
      data: {
        alerts: fireSmokeAlerts
      }
    }
  ];

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
              <Card className={cn("border-2 shadow-lg w-full", getStatusColor(feature.status))}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon size={24} className="text-guardai-red" />
                    <div className={cn("text-xs px-2 py-1 rounded-full font-medium", getCountColor(feature.status))}>
                      {feature.count}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  <p className="text-sm text-guardai-gray">{feature.description}</p>
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-guardai-red" />
                    <span className="text-xs text-guardai-gray">
                      {feature.status === "critical" ? "Critical" : feature.status === "warning" ? "Warning" : "Active"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
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

                  <div className="border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          {feature.id === "perimeter-security" && (
                            <>
                              <TableHead className="text-xs font-semibold">Check</TableHead>
                              <TableHead className="text-xs font-semibold">Location</TableHead>
                              <TableHead className="text-xs font-semibold">Status</TableHead>
                              <TableHead className="text-xs font-semibold">Battery</TableHead>
                            </>
                          )}
                          {feature.id === "fire-water-detection" && (
                            <>
                              <TableHead className="text-xs font-semibold">Camera</TableHead>
                              <TableHead className="text-xs font-semibold">Time</TableHead>
                              <TableHead className="text-xs font-semibold">Detections</TableHead>
                              <TableHead className="text-xs font-semibold">Image</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(feature.data.sensors || feature.data.alerts || []).map((item: any, index: number) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            {feature.id === "perimeter-security" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.id}</TableCell>
                                <TableCell className="text-xs">{item.location}</TableCell>
                                <TableCell className="text-xs">
                                  <Badge variant="default" className="text-xs bg-green-500">{item.status}</Badge>
                                </TableCell>
                                <TableCell className="text-xs">{item.battery}</TableCell>
                              </>
                            )}
                            {feature.id === "fire-water-detection" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.camera_id}</TableCell>
                                <TableCell className="text-xs">{new Date(item.logged_at).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                <TableCell className="text-xs">{item.violation_type}</TableCell>
                                <TableCell className="text-xs">
                                  <a
                                    href={`http://localhost:3001/api/alerts/image/${item.image_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    View
                                  </a>
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
        </motion.div>
      </ScrollArea>
    </div>
  );
}
