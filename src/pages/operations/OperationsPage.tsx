
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Factory, Clock, Users, Truck, TrendingUp, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

  const operationsFeatures = [
    {
      id: "machine-idle",
      title: "Machine Idle Detection",
      description: "Monitor machinery idle time and operator presence",
      icon: Clock,
      status: "critical",
      count: 3,
      details: {
        currentIdle: "45 min",
        threshold: "15 min",
        alertsSent: 5,
        lastOperator: "None detected",
        shift: "Day Shift",
        totalMachines: 12
      },
      data: {
        machines: [
          { id: "CNC-01", status: "Idle", duration: "45 min", operator: "None", location: "Production Line 1" },
          { id: "Press-02", status: "Idle", duration: "32 min", operator: "None", location: "Assembly Area" },
          { id: "Assembly-03", status: "Idle", duration: "28 min", operator: "None", location: "Production Line 2" },
          { id: "Drill-04", status: "Active", duration: "0 min", operator: "John Smith", location: "Workshop" }
        ]
      }
    },
    {
      id: "employee-access",
      title: "Employee Access & Tracking",
      description: "Face recognition, attendance, and work monitoring",
      icon: Users,
      status: "warning",
      count: 156,
      details: {
        currentShift: 156,
        dayShift: 142,
        nightShift: 89,
        unauthorized: 0,
        avgWorkingHours: "7.5 hrs",
        attendanceRate: "94%"
      },
      data: {
        employees: [
          { id: "EMP001", name: "John Smith", timeIn: "08:00", timeOut: "-", shift: "Day", status: "Present", hoursWorked: "4.5h" },
          { id: "EMP002", name: "Maria Garcia", timeIn: "08:15", timeOut: "-", shift: "Day", status: "Present", hoursWorked: "4.3h" },
          { id: "EMP003", name: "David Chen", timeIn: "-", timeOut: "-", shift: "Day", status: "Absent", hoursWorked: "0h" },
          { id: "EMP004", name: "Sarah Johnson", timeIn: "20:00", timeOut: "-", shift: "Night", status: "Present", hoursWorked: "8.0h" },
          { id: "EMP005", name: "Mike Wilson", timeIn: "19:45", timeOut: "-", shift: "Night", status: "Present", hoursWorked: "8.2h" }
        ]
      }
    },
    {
      id: "loading-unloading",
      title: "Loading & Unloading Operations",
      description: "Track cargo operations and logistics",
      icon: Truck,
      status: "active",
      count: 12,
      details: {
        todayLoaded: 28,
        todayUnloaded: 22,
        pendingTrucks: 3,
        averageTime: "45 min",
        activeBays: 4,
        totalCargo: 1250
      },
      data: {
        operations: [
          { id: "TR001", type: "Loading", truck: "MH-12-AB-1234", bay: "Bay 1", startTime: "10:30 AM", status: "In Progress", cartons: 45 },
          { id: "TR002", type: "Unloading", truck: "UP-32-CD-5678", bay: "Bay 3", startTime: "11:00 AM", status: "Completed", cartons: 38 },
          { id: "TR003", type: "Loading", truck: "DL-01-EF-9012", bay: "Bay 2", startTime: "11:15 AM", status: "Waiting", cartons: 52 },
          { id: "TR004", type: "Unloading", truck: "RJ-14-GH-3456", bay: "Bay 4", startTime: "09:45 AM", status: "In Progress", cartons: 29 }
        ]
      }
    },
    {
      id: "productivity-analytics",
      title: "Productivity Analytics",
      description: "Overall efficiency and performance metrics",
      icon: TrendingUp,
      status: "active",
      count: 0,
      details: {
        efficiency: "92%",
        targetsMet: "8/10",
        dailyOutput: "2,450 units",
        improvement: "+5%",
        downtime: "2.3 hrs",
        oee: "89%"
      },
      data: {
        metrics: [
          { metric: "Production Rate", current: "245 units/hr", target: "250 units/hr", status: "Below Target" },
          { metric: "Quality Rate", current: "98.5%", target: "98%", status: "Above Target" },
          { metric: "Machine Efficiency", current: "92%", target: "90%", status: "Above Target" },
          { metric: "Overall Equipment Effectiveness", current: "89%", target: "85%", status: "Above Target" }
        ]
      }
    }
  ];

  const getBadgeVariant = (status: string) => {
    if (status.includes("Above")) return "default";
    if (status.includes("Below")) return "destructive";
    if (status === "Present" || status === "Active" || status === "Completed") return "default";
    if (status === "Idle" || status === "Waiting") return "secondary";
    return "outline";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "active":
        return "text-green-500";
      default:
        return "text-guardai-gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return AlertTriangle;
      case "warning":
        return AlertTriangle;
      case "active":
        return CheckCircle;
      default:
        return Activity;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "active":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
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
          <Factory size={28} className="text-guardai-red" />
          <h1 className="text-2xl font-semibold text-guardai-darkgray">Operations Dashboard</h1>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-guardai-gray mb-4 ml-9">
          Real-time monitoring of manufacturing operations, machinery, and workforce management.
        </motion.p>
      </motion.div>

      <ScrollArea className="flex-1 px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 pb-6"
        >
          {operationsFeatures.map((feature) => {
            const StatusIcon = getStatusIcon(feature.status);
            
            return (
              <motion.div key={feature.id} variants={itemVariants}>
                <Card className={cn("shadow-lg w-full bg-white", getStatusBg(feature.status))}>
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
                        <StatusIcon size={16} className={getStatusColor(feature.status)} />
                        <span className={cn("text-xs font-medium", getStatusColor(feature.status))}>
                          {feature.status === "critical" ? "Critical" : 
                           feature.status === "warning" ? "Warning" : "Active"}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-guardai-darkgray">{feature.title}</CardTitle>
                    <p className="text-sm text-guardai-gray">{feature.description}</p>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      {Object.entries(feature.details).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-white rounded-lg border border-guardai-lightgray shadow-sm">
                          <div className="text-lg font-bold text-guardai-red">{value}</div>
                          <div className="text-xs text-guardai-darkgray capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Data Table */}
                    <div className="border rounded-lg overflow-hidden bg-white">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-guardai-red/5">
                            {feature.id === "machine-idle" && (
                              <>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Machine ID</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Idle Duration</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Location</TableHead>
                              </>
                            )}
                            {feature.id === "employee-access" && (
                              <>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Employee ID</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Name</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Time In</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Time Out</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Shift</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Hours Worked</TableHead>
                              </>
                            )}
                            {feature.id === "loading-unloading" && (
                              <>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Operation ID</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Type</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Truck</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Cartons</TableHead>
                              </>
                            )}
                            {feature.id === "productivity-analytics" && (
                              <>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Metric</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Current</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Target</TableHead>
                                <TableHead className="text-xs font-semibold text-guardai-darkgray">Status</TableHead>
                              </>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(feature.data.machines || feature.data.employees || feature.data.operations || feature.data.metrics || []).map((item: any, index: number) => (
                            <TableRow key={index} className="hover:bg-guardai-lightgray/30">
                              {feature.id === "machine-idle" && (
                                <>
                                  <TableCell className="text-xs font-medium text-guardai-darkgray">{item.id}</TableCell>
                                  <TableCell className="text-xs">
                                    <Badge variant={getBadgeVariant(item.status)} className="text-xs">
                                      {item.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.duration}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.location}</TableCell>
                                </>
                              )}
                              {feature.id === "employee-access" && (
                                <>
                                  <TableCell className="text-xs font-medium text-guardai-darkgray">{item.id}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.name}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.timeIn}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.timeOut}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.shift}</TableCell>
                                  <TableCell className="text-xs">
                                    <Badge variant={getBadgeVariant(item.status)} className="text-xs">
                                      {item.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.hoursWorked}</TableCell>
                                </>
                              )}
                              {feature.id === "loading-unloading" && (
                                <>
                                  <TableCell className="text-xs font-medium text-guardai-darkgray">{item.id}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.type}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.truck}</TableCell>
                                  <TableCell className="text-xs">
                                    <Badge variant={getBadgeVariant(item.status)} className="text-xs">
                                      {item.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.cartons}</TableCell>
                                </>
                              )}
                              {feature.id === "productivity-analytics" && (
                                <>
                                  <TableCell className="text-xs font-medium text-guardai-darkgray">{item.metric}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.current}</TableCell>
                                  <TableCell className="text-xs text-guardai-darkgray">{item.target}</TableCell>
                                  <TableCell className="text-xs">
                                    <Badge variant={getBadgeVariant(item.status)} className="text-xs">
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
            );
          })}

          {/* Summary Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-guardai-red">3</div>
                  <div className="text-sm text-guardai-gray">Idle Machines</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-guardai-red">156</div>
                  <div className="text-sm text-guardai-gray">Active Employees</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-guardai-red">12</div>
                  <div className="text-sm text-guardai-gray">Loading Operations</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-guardai-red">92%</div>
                  <div className="text-sm text-guardai-gray">Overall Efficiency</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </ScrollArea>
    </div>
  );
}
