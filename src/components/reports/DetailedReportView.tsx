
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, AlertTriangle, CheckCircle, XCircle, Clock, Users, Video, Shield, Settings, FileText } from "lucide-react";

interface DetailedReportViewProps {
  onClose: () => void;
}

export function DetailedReportView({ onClose }: DetailedReportViewProps) {
  const machineData = [
    { name: "Production Line 1", productive: "7h 15m", idle: "45m", workers: 2, loading: 3, unloading: 2 },
    { name: "Production Line 2", productive: "6h 05m", idle: "1h 10m", workers: 1, loading: 2, unloading: 1 },
    { name: "Bottling Unit A", productive: "7h 45m", idle: "15m", workers: 3, loading: 5, unloading: 4 },
    { name: "Bottling Unit B", productive: "6h 30m", idle: "1h 30m", workers: 2, loading: 1, unloading: 2 }
  ];

  const accessData = [
    { zone: "Main Gate", authorized: 12, unauthorized: 0, times: "09:00-18:00", notes: "Normal Operations" },
    { zone: "Administration Block", authorized: 2, unauthorized: 2, times: "22:40", notes: "After Hours Breach" },
    { zone: "Loading Bay", authorized: 5, unauthorized: 1, times: "15:19", notes: "Suspicious Activity Detected" }
  ];

  const complianceData = [
    { area: "Personal Protective Equipment", status: "Non-Compliant", remarks: "4 violations detected: 3 missing gloves, 1 missing helmet" },
    { area: "Mobile Device Usage", status: "Caution Required", remarks: "2 incidents near machinery affecting productivity" },
    { area: "Hygiene Standards", status: "Compliant", remarks: "Cleaning protocols followed, sanitization at 10:00 AM" },
    { area: "Restricted Area Access", status: "Violation", remarks: "1 incident: Forklift operated in restricted zone" },
    { area: "Standard Operating Procedures", status: "Partial Compliance", remarks: "Some workers observed outside designated pathways" }
  ];

  const manpowerData = [
    { role: "Total Personnel On-Site", count: 37 },
    { role: "Production Operators", count: 9 },
    { role: "Maintenance Staff", count: 4 },
    { role: "Supervisors", count: 3 },
    { role: "Material Handlers", count: 5 },
    { role: "Technical Staff", count: 4 },
    { role: "Visitors", count: 1 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="flex items-center gap-3">
            <Shield className="text-guardai-red" size={32} />
            <h1 className="text-2xl font-bold">SECURITY & OPERATIONS REPORT</h1>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold">Bisleri Bottling Plant, Uttar Pradesh</h2>
            <p className="text-guardai-gray">Reporting Period: June 01, 2024 - June 07, 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-gray-100 text-gray-800">Report ID: BSL-OP-001</Badge>
          <Button onClick={onClose} variant="outline">Close Report</Button>
          <Button className="bg-guardai-red hover:bg-guardai-red/90">
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-guardai-red" size={20} />
            EXECUTIVE SUMMARY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-guardai-gray">Security Events</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-guardai-gray">Unauthorized Incidents</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3h 40m</div>
              <div className="text-sm text-guardai-gray">Total Machine Idle Time</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">7</div>
              <div className="text-sm text-guardai-gray">Safety Violations</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">37</div>
              <div className="text-sm text-guardai-gray">Personnel on Site</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">11</div>
              <div className="text-sm text-guardai-gray">Loading/Unloading Events</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-600">System Operational</div>
              <div className="text-sm text-guardai-gray">All Cameras Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operations Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="text-guardai-red" size={20} />
            PRODUCTION & OPERATIONS ANALYSIS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-semibold mb-3">Equipment Performance Overview</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment Name</TableHead>
                  <TableHead>Productive Hours</TableHead>
                  <TableHead>Idle Time</TableHead>
                  <TableHead>Workers Present</TableHead>
                  <TableHead>Loading Operations</TableHead>
                  <TableHead>Unloading Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machineData.map((machine, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{machine.name}</TableCell>
                    <TableCell>{machine.productive}</TableCell>
                    <TableCell className={machine.idle === "1h 10m" || machine.idle === "1h 30m" ? "text-red-600 font-semibold" : ""}>{machine.idle}</TableCell>
                    <TableCell>{machine.workers}</TableCell>
                    <TableCell>{machine.loading}</TableCell>
                    <TableCell>{machine.unloading}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Operational Alerts</h4>
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={16} />
                <span className="font-semibold">High Idle Time Alert:</span>
                <span>Production Line 2 idle for 1h 10m - 40% above operational baseline</span>
              </div>
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              <span className="font-semibold">Safety Concern:</span> Worker observed using mobile device near Production Line 1
            </div>
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              <span className="font-semibold">Safety Incident:</span> Worker safety breach detected in conveyor area (video evidence available)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Access Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-guardai-red" size={20} />
            SECURITY & ACCESS CONTROL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-semibold mb-3">Access Control Log</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Security Zone</TableHead>
                  <TableHead>Authorized Access</TableHead>
                  <TableHead>Unauthorized Attempts</TableHead>
                  <TableHead>Access Times</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessData.map((access, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{access.zone}</TableCell>
                    <TableCell>{access.authorized}</TableCell>
                    <TableCell className={access.unauthorized > 0 ? "text-red-600 font-semibold" : ""}>{access.unauthorized}</TableCell>
                    <TableCell>{access.times}</TableCell>
                    <TableCell>{access.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Security Alerts</h4>
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              Suspicious movement detected at Loading Dock - video evidence captured
            </div>
            <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
              Personnel detected in restricted storage area during after-hours
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              Extended presence in administrative area beyond shift hours
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-guardai-red" size={20} />
            SAFETY & COMPLIANCE MONITORING
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-3">Compliance Assessment</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Compliance Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.area}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Compliant" ? "default" : item.status === "Non-Compliant" ? "destructive" : "secondary"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Manpower Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="text-guardai-red" size={20} />
            PERSONNEL SUMMARY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-3">Personnel Distribution</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Category</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {manpowerData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className={index === 0 ? "font-bold" : ""}>{item.role}</TableCell>
                  <TableCell className={index === 0 ? "font-bold text-lg" : ""}>{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Video Evidence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="text-guardai-red" size={20} />
            VIDEO EVIDENCE & DOCUMENTATION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">Security Incident - Loading Bay</div>
              <div className="text-sm text-guardai-gray">Timestamp: 15:19 | Duration: 2:34</div>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">After Hours Access - Administration</div>
              <div className="text-sm text-guardai-gray">Timestamp: 22:43 | Duration: 1:12</div>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">PPE Violation - Bottling Unit B</div>
              <div className="text-sm text-guardai-gray">Timestamp: 09:15 | Duration: 0:45</div>
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="font-medium">Safety Breach - Production Line 1</div>
              <div className="text-sm text-guardai-gray">Timestamp: 13:05 | Duration: 1:28</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-guardai-red" size={20} />
            RECOMMENDED ACTIONS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>Conduct comprehensive safety briefing for production staff</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="text-red-500" size={16} />
              <span>Implement enhanced access controls for administrative areas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>Mandatory PPE verification at facility entry points</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-500" size={16} />
              <span>Schedule mid-shift safety and hygiene inspections</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-orange-500" size={16} />
              <span>Review and optimize production line efficiency to reduce idle time</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
