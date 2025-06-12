
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Factory, Clock, Users, Truck, TrendingUp, Activity } from "lucide-react";
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
      status: "active",
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
          { id: "EMP001", name: "John Smith", department: "Production", checkIn: "08:00 AM", status: "Present" },
          { id: "EMP002", name: "Maria Garcia", department: "Quality Control", checkIn: "08:15 AM", status: "Present" },
          { id: "EMP003", name: "David Chen", department: "Packaging", checkIn: "08:30 AM", status: "Present" },
          { id: "EMP004", name: "Lisa Wang", department: "Assembly", checkIn: "08:45 AM", status: "Break" }
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
          { id: "TR001", type: "Loading", truck: "MH-12-AB-1234", bay: "Bay 1", startTime: "10:30 AM", status: "In Progress" },
          { id: "TR002", type: "Unloading", truck: "UP-32-CD-5678", bay: "Bay 3", startTime: "11:00 AM", status: "Completed" },
          { id: "TR003", type: "Loading", truck: "DL-01-EF-9012", bay: "Bay 2", startTime: "11:15 AM", status: "Waiting" },
          { id: "TR004", type: "Unloading", truck: "RJ-14-GH-3456", bay: "Bay 4", startTime: "09:45 AM", status: "In Progress" }
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

  const getBadgeVariant = (status: string) => {
    if (status.includes("Above")) return "default";
    if (status.includes("Below")) return "destructive";
    if (status === "Present" || status === "Active" || status === "Completed") return "default";
    if (status === "Idle" || status === "Waiting") return "secondary";
    return "outline";
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
          {operationsFeatures.map((feature) => (
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
                          {feature.id === "machine-idle" && (
                            <>
                              <TableHead className="text-xs font-semibold">Machine ID</TableHead>
                              <TableHead className="text-xs font-semibold">Status</TableHead>
                              <TableHead className="text-xs font-semibold">Idle Duration</TableHead>
                              <TableHead className="text-xs font-semibold">Location</TableHead>
                            </>
                          )}
                          {feature.id === "employee-access" && (
                            <>
                              <TableHead className="text-xs font-semibold">Employee ID</TableHead>
                              <TableHead className="text-xs font-semibold">Name</TableHead>
                              <TableHead className="text-xs font-semibold">Department</TableHead>
                              <TableHead className="text-xs font-semibold">Status</TableHead>
                            </>
                          )}
                          {feature.id === "loading-unloading" && (
                            <>
                              <TableHead className="text-xs font-semibold">Operation ID</TableHead>
                              <TableHead className="text-xs font-semibold">Type</TableHead>
                              <TableHead className="text-xs font-semibold">Truck</TableHead>
                              <TableHead className="text-xs font-semibold">Status</TableHead>
                            </>
                          )}
                          {feature.id === "productivity-analytics" && (
                            <>
                              <TableHead className="text-xs font-semibold">Metric</TableHead>
                              <TableHead className="text-xs font-semibold">Current</TableHead>
                              <TableHead className="text-xs font-semibold">Target</TableHead>
                              <TableHead className="text-xs font-semibold">Status</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(feature.data.machines || feature.data.employees || feature.data.operations || feature.data.metrics || []).map((item: any, index: number) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            {feature.id === "machine-idle" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.id}</TableCell>
                                <TableCell className="text-xs">
                                  <Badge variant={getBadgeVariant(item.status)} className="text-xs">
                                    {item.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs">{item.duration}</TableCell>
                                <TableCell className="text-xs">{item.location}</TableCell>
                              </>
                            )}
                            {feature.id === "employee-access" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.id}</TableCell>
                                <TableCell className="text-xs">{item.name}</TableCell>
                                <TableCell className="text-xs">{item.department}</TableCell>
                                <TableCell className="text-xs">
                                  <Badge variant={getBadgeVariant(item.status)} className="text-xs">
                                    {item.status}
                                  </Badge>
                                </TableCell>
                              </>
                            )}
                            {feature.id === "loading-unloading" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.id}</TableCell>
                                <TableCell className="text-xs">{item.type}</TableCell>
                                <TableCell className="text-xs">{item.truck}</TableCell>
                                <TableCell className="text-xs">
                                  <Badge variant={getBadgeVariant(item.status)} className="text-xs">
                                    {item.status}
                                  </Badge>
                                </TableCell>
                              </>
                            )}
                            {feature.id === "productivity-analytics" && (
                              <>
                                <TableCell className="text-xs font-medium">{item.metric}</TableCell>
                                <TableCell className="text-xs">{item.current}</TableCell>
                                <TableCell className="text-xs">{item.target}</TableCell>
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
          ))}

          {/* Summary Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">3</div>
                  <div className="text-sm text-guardai-gray">Idle Machines</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">156</div>
                  <div className="text-sm text-guardai-gray">Active Employees</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">12</div>
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
