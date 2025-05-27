
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, AlertTriangle, CheckCircle, XCircle, Clock, Users, Video, Shield, Settings, FileText, TrendingUp, TrendingDown, Activity, Camera, Zap, Target, Eye, Bell } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Dashboard Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-guardai-red/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-guardai-red to-red-600 rounded-xl shadow-lg">
                    <Shield className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Security & Operations Dashboard
                    </h1>
                    <p className="text-lg text-gray-600">Real-time facility monitoring and intelligence</p>
                  </div>
                </div>
                <div className="ml-14 space-y-2">
                  <h2 className="text-xl font-bold text-gray-800">Bisleri Bottling Plant, Uttar Pradesh</h2>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Report Period: June 01, 2024 - June 07, 2024
                    </span>
                    <Badge variant="outline" className="font-mono bg-blue-50 text-blue-700 border-blue-200">
                      BSL-OP-001
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={onClose} variant="outline" className="border-gray-300 hover:bg-gray-50">
                  Close Dashboard
                </Button>
                <Button onClick={handleExportPDF} className="bg-gradient-to-r from-guardai-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">24/7</div>
                  <div className="text-sm font-medium text-blue-600">Active Monitoring</div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600">Live</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Eye className="text-white w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-red-700 mb-1">3</div>
                  <div className="text-sm font-medium text-red-600">Critical Alerts</div>
                  <div className="flex items-center gap-1 mt-2">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">Immediate Action</span>
                  </div>
                </div>
                <div className="p-3 bg-red-500 rounded-xl">
                  <Bell className="text-white w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-700 mb-1">89%</div>
                  <div className="text-sm font-medium text-green-600">Efficiency Rate</div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Above Target</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-xl">
                  <Target className="text-white w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-700 mb-1">37</div>
                  <div className="text-sm font-medium text-purple-600">Personnel Active</div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-purple-600">82% Capacity</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Users className="text-white w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executive Summary Dashboard */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-guardai-red to-red-600 rounded-lg">
                <FileText className="text-white w-5 h-5" />
              </div>
              Executive Intelligence Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-blue-700 mb-2">1,247</div>
                <div className="text-sm font-semibold text-blue-600 mb-1">Security Events</div>
                <div className="flex items-center justify-center gap-1 text-xs text-blue-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>↑ 12% from last week</span>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-orange-700 mb-2">3h 40m</div>
                <div className="text-sm font-semibold text-orange-600 mb-1">Equipment Downtime</div>
                <div className="flex items-center justify-center gap-1 text-xs text-orange-500">
                  <Clock className="w-3 h-3" />
                  <span>15% above baseline</span>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-yellow-700 mb-2">7</div>
                <div className="text-sm font-semibold text-yellow-600 mb-1">Safety Violations</div>
                <div className="flex items-center justify-center gap-1 text-xs text-green-500">
                  <TrendingDown className="w-3 h-3" />
                  <span>Down from 12 last week</span>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-green-700 mb-2">100%</div>
                <div className="text-sm font-semibold text-green-600 mb-1">Camera Uptime</div>
                <div className="flex items-center justify-center gap-1 text-xs text-green-500">
                  <CheckCircle className="w-3 h-3" />
                  <span>All systems active</span>
                </div>
              </div>
            </div>
            
            {/* Visual Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-green-800">Personnel Capacity</h4>
                  <div className="text-2xl font-bold text-green-700">82%</div>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="text-sm text-green-600">37 of 45 personnel active</div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-purple-800">Overall Efficiency</h4>
                  <div className="text-2xl font-bold text-purple-700">89%</div>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <div className="text-sm text-purple-600">Above target of 85%</div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-blue-800">Security Score</h4>
                  <div className="text-2xl font-bold text-blue-700">94%</div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <div className="text-sm text-blue-600">Excellent security posture</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Operations Analysis */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Settings className="text-white w-5 h-5" />
              </div>
              Production & Operations Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Equipment Status Visual Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {machineData.map((machine, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 text-sm">{machine.name}</h4>
                    <div className={`p-2 rounded-lg ${machine.efficiency >= 90 ? 'bg-green-100' : machine.efficiency >= 85 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      {machine.efficiency >= 90 ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : machine.efficiency >= 85 ? (
                        <Clock className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Efficiency</span>
                      <span className={`font-bold ${machine.efficiency >= 90 ? 'text-green-600' : machine.efficiency >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {machine.efficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${machine.efficiency >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' : machine.efficiency >= 85 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                        style={{ width: `${machine.efficiency}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div>
                        <div className="text-gray-500">Productive</div>
                        <div className="font-semibold text-green-600">{machine.productive}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Idle</div>
                        <div className={`font-semibold ${machine.idle.includes("1h") ? 'text-red-600' : 'text-gray-600'}`}>{machine.idle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Operations Table */}
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold text-gray-800">Equipment</TableHead>
                    <TableHead className="font-semibold text-gray-800">Productive Time</TableHead>
                    <TableHead className="font-semibold text-gray-800">Idle Time</TableHead>
                    <TableHead className="font-semibold text-gray-800">Personnel</TableHead>
                    <TableHead className="font-semibold text-gray-800">Loading Ops</TableHead>
                    <TableHead className="font-semibold text-gray-800">Unloading Ops</TableHead>
                    <TableHead className="font-semibold text-gray-800">Efficiency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machineData.map((machine, index) => (
                    <TableRow key={index} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                      <TableCell className="font-medium text-gray-900">{machine.name}</TableCell>
                      <TableCell className="text-green-700 font-semibold">{machine.productive}</TableCell>
                      <TableCell className={machine.idle.includes("1h") ? "text-red-600 font-semibold" : "text-gray-600"}>{machine.idle}</TableCell>
                      <TableCell className="font-medium">{machine.workers}</TableCell>
                      <TableCell className="font-medium">{machine.loading}</TableCell>
                      <TableCell className="font-medium">{machine.unloading}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={machine.efficiency >= 90 ? "text-green-600 font-bold" : machine.efficiency >= 85 ? "text-yellow-600 font-bold" : "text-red-600 font-bold"}>
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
            
            {/* Critical Alerts Section */}
            <div className="mt-8 space-y-4">
              <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Critical Operational Alerts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-red-100 rounded-r-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-500 w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-bold text-red-800 mb-1">High Downtime Alert</div>
                      <div className="text-red-700 text-sm">Production Line 2 idle for 1h 10m - 40% above baseline</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-r-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="text-yellow-500 w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-bold text-yellow-800 mb-1">Safety Concern</div>
                      <div className="text-yellow-700 text-sm">Worker using mobile device near Production Line 1</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-red-100 rounded-r-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <XCircle className="text-red-500 w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-bold text-red-800 mb-1">Safety Incident</div>
                      <div className="text-red-700 text-sm">Worker safety breach in conveyor area</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Security & Access Control */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <Shield className="text-white w-5 h-5" />
              </div>
              Security & Access Control Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Security Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {accessData.map((access, index) => (
                <div key={index} className={`p-6 rounded-xl border-2 ${access.status === 'Breach' ? 'border-red-200 bg-gradient-to-br from-red-50 to-red-100' : access.status === 'Alert' ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100' : 'border-green-200 bg-gradient-to-br from-green-50 to-green-100'} hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800">{access.zone}</h4>
                    <Badge className={getStatusColor(access.status)}>
                      {access.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Authorized</div>
                      <div className="text-2xl font-bold text-green-600">{access.authorized}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Unauthorized</div>
                      <div className={`text-2xl font-bold ${access.unauthorized > 0 ? 'text-red-600' : 'text-gray-400'}`}>{access.unauthorized}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Risk Level</span>
                      <span className={`font-bold ${getRiskColor(access.risk)}`}>
                        {access.risk}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Access Table */}
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 mb-8">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold text-gray-800">Security Zone</TableHead>
                    <TableHead className="font-semibold text-gray-800">Authorized Access</TableHead>
                    <TableHead className="font-semibold text-gray-800">Unauthorized Attempts</TableHead>
                    <TableHead className="font-semibold text-gray-800">Access Times</TableHead>
                    <TableHead className="font-semibold text-gray-800">Status</TableHead>
                    <TableHead className="font-semibold text-gray-800">Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessData.map((access, index) => (
                    <TableRow key={index} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                      <TableCell className="font-medium text-gray-900">{access.zone}</TableCell>
                      <TableCell className="text-green-600 font-bold">{access.authorized}</TableCell>
                      <TableCell className={access.unauthorized > 0 ? "text-red-600 font-bold" : "text-gray-600"}>{access.unauthorized}</TableCell>
                      <TableCell className="font-mono text-sm bg-gray-50 rounded px-2 py-1">{access.times}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(access.status)}>
                          {access.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${getRiskColor(access.risk)}`}>
                          {access.risk}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Security Incidents */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-500" />
                Security Incidents & Alerts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-red-100 rounded-r-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-500 w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-bold text-red-800 mb-1">Suspicious Activity</div>
                      <div className="text-red-700 text-sm">Unusual movement detected at Loading Dock - video evidence captured</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 rounded-r-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="text-orange-500 w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-bold text-orange-800 mb-1">After-Hours Access</div>
                      <div className="text-orange-700 text-sm">Personnel in restricted storage area during off-hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Compliance Monitoring */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
              Safety & Compliance Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Compliance Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {complianceData.map((item, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 ${item.status === 'Compliant' ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100' : item.status.includes('Non-Compliant') || item.status.includes('Violation') ? 'border-red-200 bg-gradient-to-br from-red-50 to-red-100' : 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100'} hover:shadow-lg transition-all duration-300`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${item.score >= 90 ? 'text-green-600' : item.score >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {item.score}%
                    </div>
                    <div className="text-xs font-medium text-gray-700 mb-2">{item.area}</div>
                    <Badge className={`${getStatusColor(item.status)} text-xs`}>
                      {item.status}
                    </Badge>
                    <div className="mt-2 flex items-center justify-center">
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Compliance Table */}
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold text-gray-800">Compliance Area</TableHead>
                    <TableHead className="font-semibold text-gray-800">Status</TableHead>
                    <TableHead className="font-semibold text-gray-800">Violations</TableHead>
                    <TableHead className="font-semibold text-gray-800">Score</TableHead>
                    <TableHead className="font-semibold text-gray-800">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                      <TableCell className="font-medium text-gray-900">{item.area}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={item.violations > 0 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>{item.violations}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className={item.score >= 90 ? "text-green-600 font-bold text-lg" : item.score >= 75 ? "text-yellow-600 font-bold text-lg" : "text-red-600 font-bold text-lg"}>
                            {item.score}%
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.score >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' : item.score >= 75 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
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
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                <Users className="text-white w-5 h-5" />
              </div>
              Personnel & Resource Utilization Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Personnel Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 text-center">
                <div className="text-4xl font-bold text-indigo-700 mb-2">37</div>
                <div className="text-sm font-semibold text-indigo-600">Total Active</div>
                <div className="text-xs text-indigo-500 mt-1">of 45 capacity</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">9</div>
                <div className="text-sm font-semibold text-green-600">Production Ops</div>
                <div className="text-xs text-green-500 mt-1">75% utilization</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">4</div>
                <div className="text-sm font-semibold text-blue-600">Maintenance</div>
                <div className="text-xs text-blue-500 mt-1">67% utilization</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 text-center">
                <div className="text-4xl font-bold text-purple-700 mb-2">3</div>
                <div className="text-sm font-semibold text-purple-600">Supervisors</div>
                <div className="text-xs text-purple-500 mt-1">75% utilization</div>
              </div>
            </div>

            {/* Detailed Personnel Table */}
            <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold text-gray-800">Role Category</TableHead>
                    <TableHead className="font-semibold text-gray-800">Current</TableHead>
                    <TableHead className="font-semibold text-gray-800">Capacity</TableHead>
                    <TableHead className="font-semibold text-gray-800">Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manpowerData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                      <TableCell className={index === 0 ? "font-bold text-gray-900 text-lg" : "font-medium text-gray-800"}>{item.role}</TableCell>
                      <TableCell className={index === 0 ? "font-bold text-2xl text-indigo-700" : "font-semibold text-lg"}>{item.count}</TableCell>
                      <TableCell className="text-gray-600 font-medium">{item.capacity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className={item.utilization >= 80 ? "text-green-600 font-bold" : item.utilization >= 60 ? "text-yellow-600 font-bold" : "text-red-600 font-bold"}>
                            {item.utilization}%
                          </span>
                          <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.utilization >= 80 ? "bg-gradient-to-r from-green-400 to-green-600" : item.utilization >= 60 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" : "bg-gradient-to-r from-red-400 to-red-600"}`}
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

        {/* Enhanced Video Evidence Section */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                <Video className="text-white w-5 h-5" />
              </div>
              Video Evidence & AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Security Incident - Loading Bay", time: "15:19", duration: "2:34", severity: "high", type: "Security Breach" },
                { title: "After Hours Access - Administration", time: "22:43", duration: "1:12", severity: "medium", type: "Access Violation" },
                { title: "PPE Violation - Bottling Unit B", time: "09:15", duration: "0:45", severity: "medium", type: "Safety Violation" },
                { title: "Safety Breach - Production Line 1", time: "13:05", duration: "1:28", severity: "high", type: "Safety Incident" }
              ].map((video, index) => (
                <div key={index} className={`p-6 border-2 rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300 ${video.severity === "high" ? "border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:border-red-300" : "border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:border-yellow-300"}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">{video.title}</div>
                      <div className="text-sm text-gray-600 mb-2">{video.type}</div>
                      <div className="text-xs text-gray-500">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">{video.time}</span>
                        <span className="ml-2">Duration: {video.duration}</span>
                      </div>
                    </div>
                    <Badge className={video.severity === "high" ? "bg-red-100 text-red-800 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}>
                      {video.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <Video className="w-4 h-4 text-gray-500" />
                    </div>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      View Analysis
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recommendations Section */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                <Zap className="text-white w-5 h-5" />
              </div>
              AI-Powered Recommendations & Action Items
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-red-800 text-lg mb-6 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Immediate Actions Required
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <XCircle className="text-white w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-red-800 mb-1">Enhanced Access Controls</div>
                      <div className="text-red-700 text-sm mb-2">Implement stricter protocols for administrative areas</div>
                      <div className="text-xs text-red-600 bg-red-200 px-2 py-1 rounded-full inline-block">Priority: High</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <AlertTriangle className="text-white w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-red-800 mb-1">Safety Training</div>
                      <div className="text-red-700 text-sm mb-2">Mandatory PPE compliance refresher for all staff</div>
                      <div className="text-xs text-red-600 bg-red-200 px-2 py-1 rounded-full inline-block">Priority: High</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-blue-800 text-lg mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Operational Improvements
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Settings className="text-white w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-blue-800 mb-1">Equipment Optimization</div>
                      <div className="text-blue-700 text-sm mb-2">Review Production Line 2 efficiency metrics</div>
                      <div className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full inline-block">Priority: Medium</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Eye className="text-white w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-blue-800 mb-1">Proactive Monitoring</div>
                      <div className="text-blue-700 text-sm mb-2">Schedule regular safety and hygiene inspections</div>
                      <div className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full inline-block">Priority: Medium</div>
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
