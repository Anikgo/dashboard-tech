import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, AlertTriangle, CheckCircle, XCircle, Clock, Users, Video, Shield, Settings, FileText, TrendingUp, TrendingDown, Activity } from "lucide-react";
import jsPDF from 'jspdf';

interface DetailedReportViewProps {
  onClose: () => void;
}

export function DetailedReportView({ onClose }: DetailedReportViewProps) {
  const machineData = [
    { name: "Production Line 1", productive: "7h 15m", idle: "45m", workers: 2, loading: 3, unloading: 2, efficiency: 94 },
    { name: "Production Line 2", productive: "6h 05m", idle: "1h 10m", workers: 1, loading: 2, unloading: 1, efficiency: 84 },
    { name: "Bottling Unit A", productive: "7h 45m", idle: "15m", workers: 3, loading: 5, unloading: 4, efficiency: 97 },
    { name: "Bottling Unit B", productive: "6h 30m", idle: "1h 30m", workers: 2, loading: 1, unloading: 2, efficiency: 81 }
  ];

  const accessData = [
    { zone: "Main Gate", authorized: 12, unauthorized: 0, times: "09:00-18:00", status: "Normal", risk: "Low" },
    { zone: "Administration Block", authorized: 2, unauthorized: 2, times: "22:40", status: "Breach", risk: "High" },
    { zone: "Loading Bay", authorized: 5, unauthorized: 1, times: "15:19", status: "Alert", risk: "Medium" }
  ];

  const complianceData = [
    { area: "Personal Protective Equipment", status: "Non-Compliant", violations: 4, score: 65, trend: "down" },
    { area: "Mobile Device Usage", status: "Caution Required", violations: 2, score: 78, trend: "stable" },
    { area: "Hygiene Standards", status: "Compliant", violations: 0, score: 95, trend: "up" },
    { area: "Restricted Area Access", status: "Violation", violations: 1, score: 72, trend: "down" },
    { area: "Standard Operating Procedures", status: "Partial Compliance", violations: 3, score: 82, trend: "up" }
  ];

  const manpowerData = [
    { role: "Total Personnel On-Site", count: 37, capacity: 45, utilization: 82 },
    { role: "Production Operators", count: 9, capacity: 12, utilization: 75 },
    { role: "Maintenance Staff", count: 4, capacity: 6, utilization: 67 },
    { role: "Supervisors", count: 3, capacity: 4, utilization: 75 },
    { role: "Material Handlers", count: 5, capacity: 8, utilization: 63 },
    { role: "Technical Staff", count: 4, capacity: 5, utilization: 80 },
    { role: "Visitors", count: 1, capacity: 10, utilization: 10 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant": return "bg-green-100 text-green-800 border-green-200";
      case "Non-Compliant": case "Violation": return "bg-red-100 text-red-800 border-red-200";
      case "Caution Required": case "Partial Compliance": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Normal": return "bg-green-100 text-green-800 border-green-200";
      case "Breach": return "bg-red-100 text-red-800 border-red-200";
      case "Alert": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleExportPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;
    
    // Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SECURITY & OPERATIONS REPORT', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    pdf.setFontSize(16);
    pdf.text('Bisleri Bottling Plant, Uttar Pradesh', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Report Period: June 01, 2024 - June 07, 2024', pageWidth / 2, yPosition, { align: 'center' });
    pdf.text('Report ID: BSL-OP-001', pageWidth / 2, yPosition + 5, { align: 'center' });
    
    yPosition += 20;
    
    // Executive Summary
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXECUTIVE SUMMARY', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const summaryData = [
      'Security Events: 1,247 (↑ 12% from last week)',
      'Critical Incidents: 3 (Requires immediate action)',
      'Equipment Downtime: 3h 40m (15% above baseline)',
      'Safety Violations: 7 (Down from 12 last week)',
      'Personnel Capacity: 37/45 (82% utilization)',
      'Overall Efficiency: 89% (Above target of 85%)'
    ];
    
    summaryData.forEach((item) => {
      pdf.text(`• ${item}`, 25, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
    
    // Operations Analysis
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PRODUCTION & OPERATIONS ANALYSIS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Equipment', 20, yPosition);
    pdf.text('Productive', 70, yPosition);
    pdf.text('Idle', 100, yPosition);
    pdf.text('Workers', 120, yPosition);
    pdf.text('Efficiency', 150, yPosition);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    machineData.forEach((machine) => {
      pdf.text(machine.name, 20, yPosition);
      pdf.text(machine.productive, 70, yPosition);
      pdf.text(machine.idle, 100, yPosition);
      pdf.text(machine.workers.toString(), 120, yPosition);
      pdf.text(`${machine.efficiency}%`, 150, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
    
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Security & Access Control
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SECURITY & ACCESS CONTROL', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Zone', 20, yPosition);
    pdf.text('Authorized', 70, yPosition);
    pdf.text('Unauthorized', 110, yPosition);
    pdf.text('Status', 150, yPosition);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    accessData.forEach((access) => {
      pdf.text(access.zone, 20, yPosition);
      pdf.text(access.authorized.toString(), 70, yPosition);
      pdf.text(access.unauthorized.toString(), 110, yPosition);
      pdf.text(access.status, 150, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
    
    // Compliance Monitoring
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SAFETY & COMPLIANCE MONITORING', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Compliance Area', 20, yPosition);
    pdf.text('Status', 100, yPosition);
    pdf.text('Violations', 130, yPosition);
    pdf.text('Score', 160, yPosition);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    complianceData.forEach((item) => {
      pdf.text(item.area, 20, yPosition);
      pdf.text(item.status, 100, yPosition);
      pdf.text(item.violations.toString(), 130, yPosition);
      pdf.text(`${item.score}%`, 160, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
    
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Critical Alerts
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CRITICAL ALERTS & RECOMMENDATIONS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const alerts = [
      'HIGH PRIORITY: Production Line 2 idle for 1h 10m - 40% above baseline',
      'SAFETY CONCERN: Worker using mobile device near Production Line 1',
      'SECURITY BREACH: Unauthorized access in Administration Block at 22:40',
      'COMPLIANCE: 4 PPE violations detected - immediate training required'
    ];
    
    alerts.forEach((alert) => {
      pdf.text(`• ${alert}`, 25, yPosition);
      yPosition += 8;
    });
    
    yPosition += 10;
    
    // Footer
    pdf.setFontSize(8);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, pageHeight - 15);
    pdf.text('Confidential - Bisleri Bottling Plant', pageWidth - 20, pageHeight - 15, { align: 'right' });
    
    // Save the PDF
    pdf.save(`Bisleri_Security_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    
    console.log("PDF report exported successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Professional Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-guardai-red/10 rounded-lg">
                  <Shield className="text-guardai-red w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Security & Operations Report</h1>
                  <p className="text-sm text-gray-600">Comprehensive facility monitoring and compliance analysis</p>
                </div>
              </div>
              <div className="ml-12 space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">Bisleri Bottling Plant, Uttar Pradesh</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Report Period: June 01, 2024 - June 07, 2024</span>
                  <Badge variant="outline" className="font-mono">BSL-OP-001</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={onClose} variant="outline" className="border-gray-300">
                Close Report
              </Button>
              <Button onClick={handleExportPDF} className="bg-guardai-red hover:bg-guardai-red/90 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Executive Summary with Enhanced KPIs */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="text-guardai-red w-5 h-5" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-700 mb-1">1,247</div>
                <div className="text-sm font-medium text-blue-600">Security Events</div>
                <div className="text-xs text-gray-500 mt-1">↑ 12% from last week</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="text-2xl font-bold text-red-700 mb-1">3</div>
                <div className="text-sm font-medium text-red-600">Critical Incidents</div>
                <div className="text-xs text-gray-500 mt-1">Requires immediate action</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="text-2xl font-bold text-orange-700 mb-1">3h 40m</div>
                <div className="text-sm font-medium text-orange-600">Equipment Downtime</div>
                <div className="text-xs text-gray-500 mt-1">15% above baseline</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="text-2xl font-bold text-yellow-700 mb-1">7</div>
                <div className="text-sm font-medium text-yellow-600">Safety Violations</div>
                <div className="text-xs text-gray-500 mt-1">Down from 12 last week</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="text-xl font-bold text-green-700 mb-1">37/45</div>
                <div className="text-sm font-medium text-green-600">Personnel Capacity</div>
                <div className="text-xs text-gray-500 mt-1">82% utilization rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="text-xl font-bold text-purple-700 mb-1">89%</div>
                <div className="text-sm font-medium text-purple-600">Overall Efficiency</div>
                <div className="text-xs text-gray-500 mt-1">Above target (85%)</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="text-lg font-semibold text-green-700 mb-1">All Systems Active</div>
                <div className="text-sm font-medium text-green-600">Camera Network</div>
                <div className="text-xs text-gray-500 mt-1">100% uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operations Analysis with Better Layout */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="text-guardai-red w-5 h-5" />
              Production & Operations Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Equipment</TableHead>
                    <TableHead className="font-semibold">Productive Time</TableHead>
                    <TableHead className="font-semibold">Idle Time</TableHead>
                    <TableHead className="font-semibold">Personnel</TableHead>
                    <TableHead className="font-semibold">Loading Ops</TableHead>
                    <TableHead className="font-semibold">Unloading Ops</TableHead>
                    <TableHead className="font-semibold">Efficiency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machineData.map((machine, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{machine.name}</TableCell>
                      <TableCell className="text-green-700 font-medium">{machine.productive}</TableCell>
                      <TableCell className={machine.idle.includes("1h") ? "text-red-600 font-semibold" : "text-gray-600"}>{machine.idle}</TableCell>
                      <TableCell>{machine.workers}</TableCell>
                      <TableCell>{machine.loading}</TableCell>
                      <TableCell>{machine.unloading}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={machine.efficiency >= 90 ? "text-green-600 font-semibold" : machine.efficiency >= 85 ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold"}>
                            {machine.efficiency}%
                          </span>
                          {machine.efficiency >= 90 && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {machine.efficiency < 85 && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-800 mb-3">Critical Operational Alerts</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                  <AlertTriangle className="text-red-500 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-semibold text-red-800">High Downtime Alert</div>
                    <div className="text-red-700">Production Line 2 idle for 1h 10m - 40% above operational baseline</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                  <Clock className="text-yellow-500 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-semibold text-yellow-800">Safety Concern</div>
                    <div className="text-yellow-700">Worker observed using mobile device near Production Line 1</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-semibold text-red-800">Safety Incident</div>
                    <div className="text-red-700">Worker safety breach detected in conveyor area (video evidence available)</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Security & Access Control */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="text-guardai-red w-5 h-5" />
              Security & Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Security Zone</TableHead>
                    <TableHead className="font-semibold">Authorized Access</TableHead>
                    <TableHead className="font-semibold">Unauthorized Attempts</TableHead>
                    <TableHead className="font-semibold">Access Times</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessData.map((access, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{access.zone}</TableCell>
                      <TableCell className="text-green-600 font-medium">{access.authorized}</TableCell>
                      <TableCell className={access.unauthorized > 0 ? "text-red-600 font-semibold" : "text-gray-600"}>{access.unauthorized}</TableCell>
                      <TableCell className="font-mono text-sm">{access.times}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(access.status)}>
                          {access.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getRiskColor(access.risk)}`}>
                          {access.risk}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-800 mb-3">Security Incidents</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                  <AlertTriangle className="text-red-500 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-semibold text-red-800">Suspicious Activity</div>
                    <div className="text-red-700">Unusual movement detected at Loading Dock - video evidence captured</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                  <Clock className="text-orange-500 w-5 h-5 mt-0.5" />
                  <div>
                    <div className="font-semibold text-orange-800">After-Hours Access</div>
                    <div className="text-orange-700">Personnel detected in restricted storage area during off-hours</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Compliance Monitoring */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="text-guardai-red w-5 h-5" />
              Safety & Compliance Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Compliance Area</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Violations</TableHead>
                    <TableHead className="font-semibold">Score</TableHead>
                    <TableHead className="font-semibold">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.area}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={item.violations > 0 ? "text-red-600 font-semibold" : "text-green-600"}>{item.violations}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={item.score >= 90 ? "text-green-600 font-semibold" : item.score >= 75 ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold"}>
                            {item.score}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(item.trend)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Personnel Summary */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="text-guardai-red w-5 h-5" />
              Personnel & Resource Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Role Category</TableHead>
                    <TableHead className="font-semibold">Current</TableHead>
                    <TableHead className="font-semibold">Capacity</TableHead>
                    <TableHead className="font-semibold">Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manpowerData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className={index === 0 ? "font-bold text-gray-900" : "font-medium"}>{item.role}</TableCell>
                      <TableCell className={index === 0 ? "font-bold text-lg" : ""}>{item.count}</TableCell>
                      <TableCell className="text-gray-600">{item.capacity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={item.utilization >= 80 ? "text-green-600 font-semibold" : item.utilization >= 60 ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold"}>
                            {item.utilization}%
                          </span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.utilization >= 80 ? "bg-green-500" : item.utilization >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${item.utilization}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Video Evidence */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Video className="text-guardai-red w-5 h-5" />
              Video Evidence & Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Security Incident - Loading Bay", time: "15:19", duration: "2:34", severity: "high" },
                { title: "After Hours Access - Administration", time: "22:43", duration: "1:12", severity: "medium" },
                { title: "PPE Violation - Bottling Unit B", time: "09:15", duration: "0:45", severity: "medium" },
                { title: "Safety Breach - Production Line 1", time: "13:05", duration: "1:28", severity: "high" }
              ].map((video, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{video.title}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-mono">{video.time}</span> • Duration: {video.duration}
                      </div>
                    </div>
                    <Badge className={video.severity === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}>
                      {video.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Recommendations */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="text-guardai-red w-5 h-5" />
              Recommended Actions & Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-800 mb-3">Immediate Actions Required</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <XCircle className="text-red-500 w-5 h-5 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-red-800">Enhanced Access Controls</div>
                      <div className="text-red-700">Implement stricter protocols for administrative areas</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="text-red-500 w-5 h-5 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-red-800">Safety Training</div>
                      <div className="text-red-700">Mandatory PPE compliance refresher for all staff</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Operational Improvements</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="text-blue-500 w-5 h-5 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">Equipment Optimization</div>
                      <div className="text-blue-700">Review Production Line 2 efficiency metrics</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="text-blue-500 w-5 h-5 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">Proactive Monitoring</div>
                      <div className="text-blue-700">Schedule regular safety and hygiene inspections</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
