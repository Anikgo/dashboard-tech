
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HardHat, Phone, Trash, Flame, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CompliancePage() {
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

  const complianceFeatures = [
    {
      id: "ppe-compliance",
      title: "PPE Compliance",
      description: "Personal protective equipment monitoring",
      icon: HardHat,
      status: "warning",
      count: 12,
      data: {
        violations: [
          { id: "EMP001", name: "John Smith", time: "10:45 AM", violation: "Missing Hairnet", zone: "Production Line 1", status: "Present" },
          { id: "EMP003", name: "David Chen", time: "11:20 AM", violation: "Missing Mask", zone: "Packaging Area", status: "Present" },
          { id: "EMP007", name: "Lisa Wang", time: "09:15 AM", violation: "Missing Gloves", zone: "Quality Control", status: "Present" },
          { id: "EMP012", name: "Mike Johnson", time: "10:30 AM", violation: "Missing Safety Vest", zone: "Loading Bay", status: "Present" },
          { id: "EMP015", name: "Sarah Wilson", time: "11:45 AM", violation: "Missing Hairnet", zone: "Production Line 2", status: "Present" }
        ],
        summary: {
          totalChecked: 156,
          violations: 12,
          complianceRate: "87%",
          lastViolation: "11:45 AM"
        }
      }
    },
    {
      id: "mobile-usage",
      title: "Mobile Usage Detection",
      description: "Monitor employee phone usage during work",
      icon: Phone,
      status: "warning",
      count: 8,
      data: {
        violations: [
          { id: "EMP002", name: "Maria Garcia", time: "10:15 AM", duration: "8 min", zone: "Assembly Line", status: "Present" },
          { id: "EMP005", name: "Robert Kim", time: "11:30 AM", duration: "12 min", zone: "Packaging Area", status: "Present" },
          { id: "EMP009", name: "Jennifer Lee", time: "09:45 AM", duration: "5 min", zone: "Quality Control", status: "Present" },
          { id: "EMP014", name: "Carlos Rodriguez", time: "10:50 AM", duration: "15 min", zone: "Production Line 1", status: "Present" }
        ],
        summary: {
          totalDetections: 23,
          violations: 8,
          avgUsageTime: "12 min",
          productivityImpact: "-15%"
        }
      }
    },
    {
      id: "hygiene-compliance",
      title: "Hygiene & Cleanliness",
      description: "Monitor factory cleanliness and pathway blockages",
      icon: Trash,
      status: "warning",
      count: 4,
      data: {
        issues: [
          { zone: "Production Line 1", issue: "Blocked Pathway", detected: "09:30 AM", severity: "Critical", status: "Pending" },
          { zone: "Packaging Area", issue: "Dirty Floor", detected: "10:45 AM", severity: "Warning", status: "In Progress" },
          { zone: "Loading Bay", issue: "Material Misplacement", detected: "11:15 AM", severity: "Warning", status: "Pending" },
          { zone: "Quality Control", issue: "Blocked Emergency Exit", detected: "08:30 AM", severity: "Critical", status: "Resolved" }
        ],
        summary: {
          totalAreas: 12,
          cleanAreas: 8,
          issuesFound: 4,
          lastInspection: "2 hrs ago"
        }
      }
    },
    {
      id: "fire-smoke-detection",
      title: "Fire & Smoke Detection",
      description: "Environmental hazard monitoring",
      icon: Flame,
      status: "active",
      count: 0,
      data: {
        sensors: [
          { id: "FS001", location: "Production Line 1", status: "Active", lastTest: "Yesterday", battery: "98%" },
          { id: "FS002", location: "Packaging Area", status: "Active", lastTest: "Yesterday", battery: "95%" },
          { id: "FS003", location: "Loading Bay", status: "Active", lastTest: "Yesterday", battery: "92%" },
          { id: "FS004", location: "Quality Control", status: "Active", lastTest: "Yesterday", battery: "97%" }
        ],
        summary: {
          totalSensors: 24,
          activeSensors: 24,
          fireAlerts: 0,
          systemHealth: "100%"
        }
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

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "Warning": return "secondary";
      case "Active": return "default";
      default: return "outline";
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
        <HardHat size={28} className="text-guardai-red" />
        <h1 className="text-2xl font-semibold text-guardai-darkgray">Compliance Dashboard</h1>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-guardai-gray mb-6 ml-9">
        Monitor safety compliance, hygiene standards, and regulatory requirements in real-time.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceFeatures.map((feature) => (
          <motion.div key={feature.id} variants={itemVariants}>
            <Card className={cn(
              "border-2 shadow-lg",
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
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.entries(feature.data.summary).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-white/60 rounded border">
                      <div className="text-lg font-bold text-guardai-red">{value}</div>
                      <div className="text-xs text-guardai-gray">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Data Table */}
                <div className="max-h-64 overflow-y-auto border rounded">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        {feature.id === "ppe-compliance" && (
                          <>
                            <TableHead className="text-xs font-semibold">Employee</TableHead>
                            <TableHead className="text-xs font-semibold">Violation</TableHead>
                            <TableHead className="text-xs font-semibold">Time</TableHead>
                            <TableHead className="text-xs font-semibold">Zone</TableHead>
                          </>
                        )}
                        {feature.id === "mobile-usage" && (
                          <>
                            <TableHead className="text-xs font-semibold">Employee</TableHead>
                            <TableHead className="text-xs font-semibold">Duration</TableHead>
                            <TableHead className="text-xs font-semibold">Time</TableHead>
                            <TableHead className="text-xs font-semibold">Zone</TableHead>
                          </>
                        )}
                        {feature.id === "hygiene-compliance" && (
                          <>
                            <TableHead className="text-xs font-semibold">Zone</TableHead>
                            <TableHead className="text-xs font-semibold">Issue</TableHead>
                            <TableHead className="text-xs font-semibold">Severity</TableHead>
                            <TableHead className="text-xs font-semibold">Status</TableHead>
                          </>
                        )}
                        {feature.id === "fire-smoke-detection" && (
                          <>
                            <TableHead className="text-xs font-semibold">Sensor ID</TableHead>
                            <TableHead className="text-xs font-semibold">Location</TableHead>
                            <TableHead className="text-xs font-semibold">Status</TableHead>
                            <TableHead className="text-xs font-semibold">Battery</TableHead>
                          </>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(feature.data.violations || feature.data.issues || feature.data.sensors || []).map((item: any, index: number) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          {feature.id === "ppe-compliance" && (
                            <>
                              <TableCell className="text-xs font-medium">{item.id}</TableCell>
                              <TableCell className="text-xs">{item.violation}</TableCell>
                              <TableCell className="text-xs">{item.time}</TableCell>
                              <TableCell className="text-xs">{item.zone}</TableCell>
                            </>
                          )}
                          {feature.id === "mobile-usage" && (
                            <>
                              <TableCell className="text-xs font-medium">{item.id}</TableCell>
                              <TableCell className="text-xs">{item.duration}</TableCell>
                              <TableCell className="text-xs">{item.time}</TableCell>
                              <TableCell className="text-xs">{item.zone}</TableCell>
                            </>
                          )}
                          {feature.id === "hygiene-compliance" && (
                            <>
                              <TableCell className="text-xs font-medium">{item.zone}</TableCell>
                              <TableCell className="text-xs">{item.issue}</TableCell>
                              <TableCell className="text-xs">
                                <Badge variant={getBadgeVariant(item.severity)} className="text-xs">
                                  {item.severity}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs">{item.status}</TableCell>
                            </>
                          )}
                          {feature.id === "fire-smoke-detection" && (
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div variants={itemVariants} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">24</div>
              <div className="text-sm text-guardai-gray">Total Violations</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">12</div>
              <div className="text-sm text-guardai-gray">PPE Violations</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">87%</div>
              <div className="text-sm text-guardai-gray">Compliance Rate</div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">0</div>
              <div className="text-sm text-guardai-gray">Safety Incidents</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
