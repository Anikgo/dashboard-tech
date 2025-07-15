"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Factory, Clock, Users, Truck, TrendingUp, Activity, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OperationsPage() {
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

  const [loiteringData, setLoiteringData] = useState([]);
  const [idleMachineryData, setIdleMachineryData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchLoiteringData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/alerts/loitering");
        setLoiteringData(res.data);
      } catch (err) {
        console.error("Failed to fetch loitering data:", err);
      }
    };

    const fetchIdleData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/alerts/idle_machinery");
        setIdleMachineryData(res.data);
      } catch (err) {
        console.error("Failed to fetch idle machinery data:", err);
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/alerts/attendance");
        setAttendanceData(res.data);
      } catch (err) {
        console.error("Failed to fetch attendance data:", err);
      }
    };

    fetchLoiteringData();
    fetchIdleData();
    fetchAttendanceData();

    const interval = setInterval(() => {
      fetchLoiteringData();
      fetchIdleData();
      fetchAttendanceData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const operationsFeatures = [
    {
      id: "loitering-detection",
      title: "Loitering Alerts",
      description: "Detect clusters of people loitering in sensitive zones",
      icon: Users,
      status: "critical",
      count: loiteringData.length,
      details: {
        zonesMonitored: 8,
        activeAlerts: loiteringData.length,
        highestCluster: "Zone A",
        mostFrequentTime: "11:00 AM",
        averageClusterSize: "4.2",
        systemHealth: "98%"
      },
      data: {
        alerts: loiteringData
      }
    },
    {
      id: "machine-idle",
      title: "Machine Idle Detection",
      description: "Monitor machinery idle time and operator presence",
      icon: Clock,
      status: "critical",
      count: idleMachineryData.length,
      details: {
        alertsSent: idleMachineryData.length,
        totalMachines: 12,
        shift: "Day Shift",
        systemHealth: "97%",
        lastUpdate: "10 sec ago",
        monitoredZones: 6
      },
      data: {
        machines: idleMachineryData
      }
    },
    {
      id: "employee-attendance",
      title: "Employee Attendance",
      description: "Face recognition-based real-time attendance tracking",
      icon: Users,
      status: "active",
      count: attendanceData.length,
      details: {
        present: attendanceData.length,
        unauthorized: 0,
        totalEmployees: 180,
        shift: "Day Shift",
        avgCheckInTime: "08:12 AM",
        attendanceRate: "94%"
      },
      data: {
        employees: attendanceData
      }
    }
  ];

  const getFeatureStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500";
      case "warning": return "bg-yellow-500";
      case "active": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-6 flex-shrink-0">
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-1">
          <Factory size={28} className="text-guardai-red" />
          <h1 className="text-2xl font-semibold text-guardai-darkgray">Operations Dashboard</h1>
        </motion.div>
        <motion.p variants={itemVariants} className="text-guardai-gray mb-4 ml-9">
          Real-time monitoring of manufacturing operations, machinery, and workforce management.
        </motion.p>
      </motion.div>

      <ScrollArea className="flex-1 px-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-6">
          {operationsFeatures.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <Card className="border border-gray-200 shadow-lg w-full bg-white">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-guardai-red/10 p-2 rounded-lg">
                        <feature.icon size={24} className="text-guardai-red" />
                      </div>
                      <div className="bg-guardai-red text-white text-sm px-3 py-1 rounded-full font-medium">
                        {feature.count}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", getFeatureStatusColor(feature.status))}></div>
                      <Activity size={12} className="text-guardai-red" />
                      <span className="text-xs text-guardai-gray capitalize">
                        {feature.status === "critical" ? "Critical" : feature.status === "warning" ? "Warning" : "Active"}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-guardai-darkgray">{feature.title}</CardTitle>
                  <p className="text-sm text-guardai-gray">{feature.description}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {Object.entries(feature.details).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-guardai-lightgray/50 rounded-lg border border-guardai-lightgray">
                        <div className="text-lg font-bold text-guardai-red">{value}</div>
                        <div className="text-xs text-guardai-darkgray capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                      </div>
                    ))}
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-guardai-red/5">
                          {feature.id === "loitering-detection" && (
                            <>
                              <TableHead className="text-xs text-guardai-darkgray">Zone</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Location</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray"># People</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray"># Alerts Raised</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Image</TableHead>
                            </>
                          )}
                          {feature.id === "machine-idle" && (
                            <>
                              <TableHead className="text-xs text-guardai-darkgray">Camera ID</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Zone</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Time</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Image</TableHead>
                            </>
                          )}
                          {feature.id === "employee-attendance" && (
                            <>
                              <TableHead className="text-xs text-guardai-darkgray">Employee ID</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Name</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Time In</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Status</TableHead>
                              <TableHead className="text-xs text-guardai-darkgray">Image</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(feature.data.alerts || feature.data.machines || feature.data.employees || []).map((item, idx) => (
                          <TableRow key={idx}>
                            {feature.id === "loitering-detection" && (
                              <>
                                <TableCell className="text-xs">{item.camera_id}</TableCell>
                                <TableCell className="text-xs">Blow Moulding</TableCell>
                                <TableCell className="text-xs">{item.box_count}</TableCell>
                                <TableCell className="text-xs">1</TableCell>
                                <TableCell className="text-xs">
                                  <a className="text-blue-600 underline flex items-center gap-1" href={`http://localhost:3001/api/alerts/image/${item.image_id}`} target="_blank" rel="noreferrer">
                                    <ImageIcon size={14} /> View
                                  </a>
                                </TableCell>
                              </>
                            )}
                            {feature.id === "machine-idle" && (
                              <>
                                <TableCell className="text-xs">{item.camera_id}</TableCell>
                                <TableCell className="text-xs">Filler Room</TableCell>
                                <TableCell className="text-xs">30 minutes</TableCell>
                                <TableCell className="text-xs">
                                  <a className="text-blue-600 underline flex items-center gap-1" href={`http://localhost:3001/api/alerts/image/${item.image_id}`} target="_blank" rel="noreferrer">
                                    <ImageIcon size={14} /> View
                                  </a>
                                </TableCell>
                              </>
                            )}
                            {feature.id === "employee-attendance" && (
                              <>
                                <TableCell className="text-xs">{item.emp_id}</TableCell>
                                <TableCell className="text-xs">{"Aniket Goel"}</TableCell>
                                <TableCell className="text-xs">{item.frame_timestamp}</TableCell>
                                <TableCell className="text-xs">{"Present"}</TableCell>
                                <TableCell className="text-xs">
                                  <a className="text-blue-600 underline flex items-center gap-1" href={`http://localhost:3001/api/alerts/image/${item.image_id}`} target="_blank" rel="noreferrer">
                                    <ImageIcon size={14} /> View
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
