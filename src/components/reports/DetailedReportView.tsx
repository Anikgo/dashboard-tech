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
    { name: "Machine 1", productive: "7h 15m", idle: "45m", workers: 2, loading: 3, unloading: 2 },
    { name: "Machine 2", productive: "6h 05m", idle: "1h 10m", workers: 1, loading: 2, unloading: 1 },
    { name: "Line A", productive: "7h 45m", idle: "15m", workers: 3, loading: 5, unloading: 4 },
    { name: "Line B", productive: "6h 30m", idle: "1h 30m", workers: 2, loading: 1, unloading: 2 }
  ];

  const accessData = [
    { zone: "Gate A", authorized: 12, unauthorized: 0, times: "9:00–18:00", notes: "-" },
    { zone: "Office (Post-10 PM)", authorized: 2, unauthorized: 2, times: "10:40 PM", notes: "🚨 Night Breach" },
    { zone: "Loading Bay", authorized: 5, unauthorized: 1, times: "3:19 PM", notes: "🎥 Suspicious removal" }
  ];

  const complianceData = [
    { area: "🧤 PPE Use (Helmets, Gloves)", status: "❌ 4 breaches", remarks: "3 no gloves, 1 no helmet" },
    { area: "📱 Phone Use Near Machines", status: "⚠️ 2 incidents", remarks: "Linked to productivity drop" },
    { area: "🧽 Hygiene & Cleanliness", status: "✅ Clean", remarks: "Mopping observed at 10 AM" },
    { area: "🛑 Unauthorized Zone Presence", status: "❗ 1 incident", remarks: "Forklift in blocked zone" },
    { area: "📝 SOP Adherence", status: "⚠️ Partial", remarks: "Some workers out of marked paths" }
  ];

  const manpowerData = [
    { role: "Total On-Site", count: 37 },
    { role: "Machine Operators", count: 9 },
    { role: "Housekeeping", count: 4 },
    { role: "Supervisors", count: 3 },
    { role: "Loaders / Unloaders", count: 5 },
    { role: "Electricians / Engineers", count: 4 },
    { role: "Visitors", count: 1 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="flex items-center gap-3">
            <Shield className="text-guardai-red" size={32} />
            <h1 className="text-2xl font-bold">PROGRESS REPORT</h1>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold">PROJECT: Sarabhai Campus Vadodara</h2>
            <p className="text-guardai-gray">Period: 01 Jun 24 - 07 Jun 24</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-gray-100 text-gray-800">JOB ID: PAINT3382</Badge>
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
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">182</div>
              <div className="text-sm text-guardai-gray">Total Items</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">0%</div>
              <div className="text-sm text-guardai-gray">Period Progress</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">94.77%</div>
              <div className="text-sm text-guardai-gray">Overall Progress</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-sm font-semibold text-red-600">⏰ Time Status</div>
              <div className="text-xs text-red-600">Project is 10 days over due</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operations Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="text-guardai-red" size={20} />
            OPERATIONS INSIGHTS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-semibold mb-3">🔧 Machine-wise Performance Table:</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine Name</TableHead>
                  <TableHead>⏱️ Productive Hours</TableHead>
                  <TableHead>💤 Idle Time</TableHead>
                  <TableHead>👥 Workers Detected</TableHead>
                  <TableHead>📦 Loading Events</TableHead>
                  <TableHead>📤 Unloading Events</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machineData.map((machine, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{machine.name}</TableCell>
                    <TableCell>{machine.productive}</TableCell>
                    <TableCell className={machine.idle === "1h 10m" ? "text-red-600 font-semibold" : ""}>{machine.idle}</TableCell>
                    <TableCell>{machine.workers}</TableCell>
                    <TableCell>{machine.loading}</TableCell>
                    <TableCell>{machine.unloading}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">📌 Operational Flags:</h4>
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={16} />
                <span className="font-semibold">[Idle Spike Alert]:</span>
                <span>Machine 2 idle for 1h 10m — 40% above average</span>
              </div>
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              <span className="font-semibold">📱 Unsafe Use:</span> Worker seen using mobile near Machine 1
            </div>
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              <span className="font-semibold">🤕 Incident:</span> Worker caught foot in conveyor zone (video clip attached)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Access Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="text-guardai-red" size={20} />
            SECURITY & ACCESS MONITORING
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-semibold mb-3">🚪 Access Log Table:</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>🛑 Zone</TableHead>
                  <TableHead>✅ Authorized Entries</TableHead>
                  <TableHead>🚫 Unauthorized Attempts</TableHead>
                  <TableHead>⏰ Access Times</TableHead>
                  <TableHead>🔍 Notes</TableHead>
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

          <div className="space-y-2">
            <h4 className="font-semibold">🔍 Visual Alerts:</h4>
            <div className="p-3 border-l-4 border-red-500 bg-red-50">
              🔴 Suspicious movement at Loading Dock — clip attached
            </div>
            <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
              🕵️‍♂️ Employee entered restricted store room — after-hours
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              🟡 Long-duration stay in back office after shift
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-guardai-red" size={20} />
            COMPLIANCE MONITORING
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-3">✅ Compliance Checklist:</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.area}</TableCell>
                  <TableCell>{item.status}</TableCell>
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
            MANPOWER SUMMARY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-3">👷 People Present Today:</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>👤 Role</TableHead>
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

      {/* Video Clips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="text-guardai-red" size={20} />
            ATTACHED VIDEO CLIPS & EVENTS SNAPSHOTS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              🔸 Clip 1: 📦 Theft attempt – Loading Bay – 3:19 PM
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              🔸 Clip 2: 🕐 Nighttime Entry – Office – 10:43 PM
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              🔸 Clip 3: 👷 Without Gloves – Line B – 9:15 AM
            </div>
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              🔸 Clip 4: 📱 Unsafe Phone Use – Machine A – 1:05 PM
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>Conduct SOP briefing for assembly line staff</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="text-red-500" size={16} />
              <span>Lock down back office zone post-shift</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>PPE check-in to be enforced at gate</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-500" size={16} />
              <span>Schedule mid-shift hygiene verification</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
