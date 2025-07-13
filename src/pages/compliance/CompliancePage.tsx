import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HardHat, Phone, Trash, Flame, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CompliancePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  type PPEViolation = {
    id: string;
    name: string;
    time: string;
    violation: string;
    zone: string;
    status: string;
    camera_id: string;
    person_id: string;
    frame_timestamp: string;
    image_id: string;
    logged_at: string;
    violation_type: string;
  };

  const [ppeViolations, setPpeViolations] = useState<PPEViolation[]>([]);

  useEffect(() => {
    const fetchPPEAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/alerts/ppe-compliance");
        console.log("Fetched PPE alerts:", res.data);
        setPpeViolations(res.data);
      } catch (err) {
        console.error("Failed to fetch PPE alerts:", err);
      }
    };

    fetchPPEAlerts();
    const interval = setInterval(fetchPPEAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

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
      status: ppeViolations.length > 0 ? "warning" : "active",
      count: ppeViolations.length,
      data: {
        violations: ppeViolations,
        summary: {
          totalChecked: 156,
          violations: ppeViolations.length,
          complianceRate: `${Math.round(100 - (ppeViolations.length / 156) * 100)}%`,
          lastViolation: ppeViolations.at(-1)?.time || "N/A"
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

  return (
    <div className="h-screen flex flex-col">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-6 flex-shrink-0"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-1">
          <HardHat size={28} className="text-guardai-red" />
          <h1 className="text-2xl font-semibold text-guardai-darkgray">Compliance Dashboard</h1>
        </motion.div>
        <motion.p variants={itemVariants} className="text-guardai-gray mb-4 ml-9">
          Monitor safety compliance, hygiene standards, and regulatory requirements in real-time.
        </motion.p>
      </motion.div>

      <ScrollArea className="flex-1 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 pb-6"
        >
          {complianceFeatures.map((feature) => (
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
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {Object.entries(feature.data.summary).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-white/60 rounded border">
                        <div className="text-lg font-bold text-guardai-red">{value}</div>
                        <div className="text-xs text-guardai-gray">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PPE Table with Image View */}
                  <div className="border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold">Employee</TableHead>
                          <TableHead className="text-xs font-semibold">Violation</TableHead>
                          <TableHead className="text-xs font-semibold">Time</TableHead>
                          <TableHead className="text-xs font-semibold">Zone</TableHead>
                          <TableHead className="text-xs font-semibold">Image</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feature.data.violations.map((item, index) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="text-xs font-medium">{item.person_id}</TableCell>
                            <TableCell className="text-xs">Hairnet missing</TableCell>
                            <TableCell className="text-xs">
                              {new Date(item.logged_at).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TableCell>
                            <TableCell className="text-xs">{item.camera_id}</TableCell>
                            <TableCell className="text-xs">
                              <a
                                href={`http://localhost:3001/api/alerts/image/${item.image_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-guardai-red underline text-xs"
                              >
                                View
                              </a>
                            </TableCell>
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
