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

  const kpiData = [
    { title: "Security Events", value: "1,247", trend: "↑ 12% from last week", color: "blue" },
    { title: "Critical Incidents", value: "3", trend: "Requires immediate action", color: "red" },
    { title: "Equipment Downtime", value: "3h 40m", trend: "15% above baseline", color: "orange" },
    { title: "Safety Violations", value: "7", trend: "Down from 12 last week", color: "yellow" },
    { title: "Personnel Capacity", value: "37/45", trend: "82% utilization rate", color: "green" },
    { title: "Overall Efficiency", value: "89%", trend: "Above target (85%)", color: "purple" },
    { title: "Camera Network", value: "All Systems Active", trend: "100% uptime", color: "green" }
  ];

  const videoEvidence = [
    { title: "Security Incident - Loading Bay", time: "15:19", duration: "2:34", severity: "high" },
    { title: "After Hours Access - Administration", time: "22:43", duration: "1:12", severity: "medium" },
    { title: "PPE Violation - Bottling Unit B", time: "09:15", duration: "0:45", severity: "medium" },
    { title: "Safety Breach - Production Line 1", time: "13:05", duration: "1:28", severity: "high" }
  ];

  const criticalAlerts = [
    { type: "HIGH PRIORITY", message: "Production Line 2 idle for 1h 10m - 40% above baseline", severity: "high" },
    { type: "SAFETY CONCERN", message: "Worker using mobile device near Production Line 1", severity: "medium" },
    { type: "SECURITY BREACH", message: "Unauthorized access in Administration Block at 22:40", severity: "high" },
    { type: "COMPLIANCE", message: "4 PPE violations detected - immediate training required", severity: "high" }
  ];

  const immediateActions = [
    { title: "Enhanced Access Controls", description: "Implement stricter protocols for administrative areas" },
    { title: "Safety Training", description: "Mandatory PPE compliance refresher for all staff" }
  ];

  const operationalImprovements = [
    { title: "Equipment Optimization", description: "Review Production Line 2 efficiency metrics" },
    { title: "Proactive Monitoring", description: "Schedule regular safety and hygiene inspections" }
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
    const margin = 15;
    
    // Enhanced color palette
    const colors = {
      primary: [234, 56, 76],      // guardai-red
      primaryLight: [254, 226, 226], // red-100
      dark: [31, 41, 55],          // gray-800
      medium: [75, 85, 99],        // gray-600
      light: [156, 163, 175],      // gray-400
      background: [249, 250, 251], // gray-50
      white: [255, 255, 255],
      success: [34, 197, 94],      // green-500
      warning: [251, 191, 36],     // yellow-500
      danger: [239, 68, 68],       // red-500
      info: [59, 130, 246],        // blue-500
      purple: [147, 51, 234],      // purple-600
      orange: [249, 115, 22]       // orange-500
    };

    // Helper functions
    const addNewPageIfNeeded = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 25) {
        pdf.addPage();
        yPosition = 25;
        return true;
      }
      return false;
    };

    const drawGradientBox = (x: number, y: number, width: number, height: number, color1: number[], color2: number[]) => {
      const steps = 10;
      const stepHeight = height / steps;
      for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1);
        const r = Math.round(color1[0] * (1 - ratio) + color2[0] * ratio);
        const g = Math.round(color1[1] * (1 - ratio) + color2[1] * ratio);
        const b = Math.round(color1[2] * (1 - ratio) + color2[2] * ratio);
        pdf.setFillColor(r, g, b);
        pdf.rect(x, y + i * stepHeight, width, stepHeight, 'F');
      }
    };

    const drawShadowBox = (x: number, y: number, width: number, height: number, mainColor: number[]) => {
      // Shadow
      pdf.setFillColor(0, 0, 0, 0.05);
      pdf.rect(x + 1, y + 1, width, height, 'F');
      // Main box
      pdf.setFillColor(mainColor[0], mainColor[1], mainColor[2]);
      pdf.rect(x, y, width, height, 'F');
    };

    // Start directly with content - no cover page
    
    // Report Header
    drawGradientBox(0, yPosition, pageWidth, 25, colors.primary, [200, 40, 60]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BISLERI SECURITY & OPERATIONS REPORT', margin, yPosition + 10);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Comprehensive Facility Analysis - June 01-07, 2024', margin, yPosition + 18);
    yPosition += 35;
    
    // Executive Summary KPIs with enhanced visual design
    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXECUTIVE SUMMARY & KEY METRICS', margin, yPosition);
    yPosition += 10;
    
    // Enhanced KPI Cards Grid (4x2 layout)
    const kpiCardWidth = (pageWidth - 2 * margin - 15) / 4;
    const kpiCardHeight = 28;
    
    kpiData.forEach((kpi, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const x = margin + col * (kpiCardWidth + 5);
      const y = yPosition + row * (kpiCardHeight + 5);
      
      if (row > 0 && col === 0) addNewPageIfNeeded(kpiCardHeight + 10);
      
      // Enhanced card design with shadows
      drawShadowBox(x, y, kpiCardWidth, kpiCardHeight, colors.white);
      
      // Color accent bar
      const colorMap: { [key: string]: number[] } = {
        blue: colors.info, red: colors.danger, orange: colors.orange, 
        yellow: colors.warning, green: colors.success, purple: colors.purple
      };
      const accentColor = colorMap[kpi.color] || colors.light;
      pdf.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      pdf.rect(x, y, kpiCardWidth, 3, 'F');
      
      // KPI Value
      pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(kpi.value, x + 3, y + 12);
      
      // KPI Title
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
      pdf.text(kpi.title, x + 3, y + 18);
      
      // Trend
      pdf.setFontSize(6);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.light[0], colors.light[1], colors.light[2]);
      const trendLines = pdf.splitTextToSize(kpi.trend, kpiCardWidth - 6);
      pdf.text(trendLines, x + 3, y + 23);
    });
    
    yPosition += Math.ceil(kpiData.length / 4) * (kpiCardHeight + 5) + 15;
    
    // Critical Alerts Section
    addNewPageIfNeeded(50);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.danger, [255, 100, 120]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CRITICAL OPERATIONAL ALERTS', margin, yPosition + 8);
    yPosition += 20;
    
    criticalAlerts.forEach((alert, index) => {
      addNewPageIfNeeded(18);
      const alertColor = alert.severity === 'high' ? colors.danger : colors.warning;
      
      // Alert card with enhanced design
      drawShadowBox(margin, yPosition, pageWidth - 2 * margin, 15, colors.white);
      
      // Severity indicator
      pdf.setFillColor(alertColor[0], alertColor[1], alertColor[2]);
      pdf.rect(margin, yPosition, 3, 15, 'F');
      
      // Alert content
      pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(alert.type, margin + 6, yPosition + 6);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      const messageLines = pdf.splitTextToSize(alert.message, pageWidth - 2 * margin - 35);
      pdf.text(messageLines, margin + 6, yPosition + 10);
      
      // Severity badge
      pdf.setFillColor(alertColor[0], alertColor[1], alertColor[2], 0.2);
      pdf.rect(pageWidth - 35, yPosition + 2, 20, 6, 'F');
      pdf.setTextColor(alertColor[0], alertColor[1], alertColor[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text(alert.severity.toUpperCase(), pageWidth - 32, yPosition + 6);
      
      yPosition += 20;
    });
    
    // Production Analysis Section
    addNewPageIfNeeded(60);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.info, [80, 150, 255]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PRODUCTION & OPERATIONS ANALYSIS', margin, yPosition + 8);
    yPosition += 20;
    
    // Enhanced Production Table
    const tableHeaders = ['Equipment', 'Productive', 'Idle', 'Workers', 'Loading', 'Unload', 'Efficiency'];
    const colWidths = [45, 22, 18, 15, 15, 15, 20];
    let tableX = margin;
    
    // Table header
    drawGradientBox(tableX, yPosition, colWidths.reduce((a, b) => a + b, 0), 8, colors.background, colors.white);
    pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.rect(tableX, yPosition, colWidths.reduce((a, b) => a + b, 0), 8);
    
    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    
    tableHeaders.forEach((header, i) => {
      pdf.text(header, tableX + 2, yPosition + 6);
      tableX += colWidths[i];
    });
    yPosition += 8;
    
    // Table rows
    machineData.forEach((machine, index) => {
      tableX = margin;
      const rowHeight = 7;
      
      if (index % 2 === 0) {
        pdf.setFillColor(colors.background[0], colors.background[1], colors.background[2]);
        pdf.rect(tableX, yPosition, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
      }
      
      pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
      pdf.rect(tableX, yPosition, colWidths.reduce((a, b) => a + b, 0), rowHeight);
      
      const rowData = [
        machine.name, machine.productive, machine.idle, 
        machine.workers.toString(), machine.loading.toString(), 
        machine.unloading.toString(), `${machine.efficiency}%`
      ];
      
      pdf.setFontSize(8);
      rowData.forEach((data, i) => {
        if (i === 6) { // Efficiency column
          const effColor = machine.efficiency >= 90 ? colors.success : 
                          machine.efficiency >= 85 ? colors.warning : colors.danger;
          pdf.setTextColor(effColor[0], effColor[1], effColor[2]);
          pdf.setFont('helvetica', 'bold');
        } else if (i === 0) {
          pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
          pdf.setFont('helvetica', 'normal');
        }
        pdf.text(data, tableX + 2, yPosition + 5);
        tableX += colWidths[i];
      });
      yPosition += rowHeight;
    });
    
    yPosition += 15;
    
    // Security Section
    addNewPageIfNeeded(60);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.purple, [170, 80, 255]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SECURITY & ACCESS CONTROL ANALYSIS', margin, yPosition + 8);
    yPosition += 20;
    
    // Access Control Table
    const accessHeaders = ['Security Zone', 'Authorized', 'Unauthorized', 'Times', 'Status', 'Risk'];
    const accessColWidths = [40, 20, 20, 22, 22, 15];
    tableX = margin;
    
    // Table header
    drawGradientBox(tableX, yPosition, accessColWidths.reduce((a, b) => a + b, 0), 8, colors.background, colors.white);
    pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.rect(tableX, yPosition, accessColWidths.reduce((a, b) => a + b, 0), 8);
    
    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    
    accessHeaders.forEach((header, i) => {
      pdf.text(header, tableX + 2, yPosition + 6);
      tableX += accessColWidths[i];
    });
    yPosition += 8;
    
    // Access data rows
    accessData.forEach((access, index) => {
      tableX = margin;
      const rowHeight = 8;
      
      if (index % 2 === 0) {
        pdf.setFillColor(colors.background[0], colors.background[1], colors.background[2]);
        pdf.rect(tableX, yPosition, accessColWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
      }
      
      pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
      pdf.rect(tableX, yPosition, accessColWidths.reduce((a, b) => a + b, 0), rowHeight);
      
      const accessRowData = [
        access.zone, access.authorized.toString(), access.unauthorized.toString(),
        access.times, access.status, access.risk
      ];
      
      pdf.setFontSize(7);
      accessRowData.forEach((data, i) => {
        if (i === 4) { // Status
          const statusColor = access.status === 'Normal' ? colors.success : 
                            access.status === 'Breach' ? colors.danger : colors.warning;
          pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
          pdf.setFont('helvetica', 'bold');
        } else if (i === 5) { // Risk
          const riskColor = access.risk === 'Low' ? colors.success : 
                           access.risk === 'High' ? colors.danger : colors.warning;
          pdf.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
          pdf.setFont('helvetica', 'normal');
        }
        pdf.text(data, tableX + 2, yPosition + 6);
        tableX += accessColWidths[i];
      });
      yPosition += rowHeight;
    });
    
    yPosition += 15;
    
    // Compliance Section
    addNewPageIfNeeded(60);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.orange, [255, 140, 60]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SAFETY & COMPLIANCE MONITORING', margin, yPosition + 8);
    yPosition += 20;
    
    // Compliance Table
    const complianceHeaders = ['Compliance Area', 'Status', 'Violations', 'Score', 'Trend'];
    const complianceColWidths = [50, 30, 20, 18, 15];
    tableX = margin;
    
    drawGradientBox(tableX, yPosition, complianceColWidths.reduce((a, b) => a + b, 0), 8, colors.background, colors.white);
    pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.rect(tableX, yPosition, complianceColWidths.reduce((a, b) => a + b, 0), 8);
    
    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    
    complianceHeaders.forEach((header, i) => {
      pdf.text(header, tableX + 2, yPosition + 6);
      tableX += complianceColWidths[i];
    });
    yPosition += 8;
    
    complianceData.forEach((item, index) => {
      tableX = margin;
      const rowHeight = 8;
      
      if (index % 2 === 0) {
        pdf.setFillColor(colors.background[0], colors.background[1], colors.background[2]);
        pdf.rect(tableX, yPosition, complianceColWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
      }
      
      pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
      pdf.rect(tableX, yPosition, complianceColWidths.reduce((a, b) => a + b, 0), rowHeight);
      
      const complianceRowData = [
        item.area, item.status, item.violations.toString(), `${item.score}%`, item.trend
      ];
      
      pdf.setFontSize(7);
      complianceRowData.forEach((data, i) => {
        if (i === 1) { // Status
          const statusColor = item.status === 'Compliant' ? colors.success : 
                            item.status.includes('Non-Compliant') || item.status === 'Violation' ? colors.danger : colors.warning;
          pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
          pdf.setFont('helvetica', 'bold');
        } else if (i === 3) { // Score
          const scoreColor = item.score >= 90 ? colors.success : 
                           item.score >= 75 ? colors.warning : colors.danger;
          pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
          pdf.setFont('helvetica', 'normal');
        }
        pdf.text(data, tableX + 2, yPosition + 6);
        tableX += complianceColWidths[i];
      });
      yPosition += rowHeight;
    });
    
    yPosition += 15;
    
    // Personnel Utilization
    addNewPageIfNeeded(60);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.success, [60, 220, 110]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PERSONNEL & RESOURCE UTILIZATION', margin, yPosition + 8);
    yPosition += 20;
    
    // Personnel Table
    const personnelHeaders = ['Role Category', 'Current', 'Capacity', 'Utilization'];
    const personnelColWidths = [60, 20, 20, 30];
    tableX = margin;
    
    drawGradientBox(tableX, yPosition, personnelColWidths.reduce((a, b) => a + b, 0), 8, colors.background, colors.white);
    pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
    pdf.rect(tableX, yPosition, personnelColWidths.reduce((a, b) => a + b, 0), 8);
    
    pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    
    personnelHeaders.forEach((header, i) => {
      pdf.text(header, tableX + 2, yPosition + 6);
      tableX += personnelColWidths[i];
    });
    yPosition += 8;
    
    manpowerData.forEach((item, index) => {
      tableX = margin;
      const rowHeight = 8;
      
      if (index % 2 === 0) {
        pdf.setFillColor(colors.background[0], colors.background[1], colors.background[2]);
        pdf.rect(tableX, yPosition, personnelColWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
      }
      
      pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
      pdf.rect(tableX, yPosition, personnelColWidths.reduce((a, b) => a + b, 0), rowHeight);
      
      const personnelRowData = [
        item.role, item.count.toString(), item.capacity.toString(), `${item.utilization}%`
      ];
      
      pdf.setFontSize(7);
      personnelRowData.forEach((data, i) => {
        if (i === 0 && index === 0) { // Total Personnel
          pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
          pdf.setFont('helvetica', 'bold');
        } else if (i === 3) { // Utilization
          const utilColor = item.utilization >= 80 ? colors.success : 
                           item.utilization >= 60 ? colors.warning : colors.danger;
          pdf.setTextColor(utilColor[0], utilColor[1], utilColor[2]);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
          pdf.setFont('helvetica', 'normal');
        }
        pdf.text(data, tableX + 2, yPosition + 6);
        tableX += personnelColWidths[i];
      });
      yPosition += rowHeight;
    });
    
    yPosition += 15;
    
    // Video Evidence Section
    addNewPageIfNeeded(40);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.info, [80, 150, 255]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('VIDEO EVIDENCE & DOCUMENTATION', margin, yPosition + 8);
    yPosition += 20;
    
    videoEvidence.forEach((video, index) => {
      addNewPageIfNeeded(15);
      const severityColor = video.severity === 'high' ? colors.danger : colors.warning;
      
      drawShadowBox(margin, yPosition, pageWidth - 2 * margin, 12, colors.white);
      
      // Severity indicator
      pdf.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
      pdf.rect(margin, yPosition, 3, 12, 'F');
      
      pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(video.title, margin + 6, yPosition + 6);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text(`Time: ${video.time} | Duration: ${video.duration}`, margin + 6, yPosition + 10);
      
      // Severity badge
      pdf.setFillColor(severityColor[0], severityColor[1], severityColor[2], 0.2);
      pdf.rect(pageWidth - 30, yPosition + 2, 15, 6, 'F');
      pdf.setTextColor(severityColor[0], severityColor[1], severityColor[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text(video.severity.toUpperCase(), pageWidth - 27, yPosition + 6);
      
      yPosition += 17;
    });
    
    // Insights Section
    addNewPageIfNeeded(60);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.purple, [170, 80, 255]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('OPERATIONAL INSIGHTS & ANALYTICS', margin, yPosition + 8);
    yPosition += 20;
    
    const insights = [
      "Production Line 2 shows consistent underperformance with 84% efficiency vs target 90%",
      "Security breach pattern indicates vulnerability in administration area access controls",
      "PPE compliance requires immediate attention with 4 violations detected this week",
      "Personnel utilization at 82% suggests optimal staffing levels across most departments",
      "After-hours incidents increased by 25% compared to previous reporting period"
    ];
    
    insights.forEach((insight, index) => {
      addNewPageIfNeeded(12);
      drawShadowBox(margin, yPosition, pageWidth - 2 * margin, 10, colors.background);
      
      pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`• ${insight}`, margin + 3, yPosition + 6);
      
      yPosition += 12;
    });
    
    yPosition += 10;
    
    // Recommendations Section
    addNewPageIfNeeded(80);
    drawGradientBox(0, yPosition, pageWidth, 12, colors.success, [60, 220, 110]);
    pdf.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('STRATEGIC RECOMMENDATIONS & ACTION PLAN', margin, yPosition + 8);
    yPosition += 20;
    
    // Immediate Actions
    pdf.setTextColor(colors.danger[0], colors.danger[1], colors.danger[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IMMEDIATE ACTIONS (24-48 HOURS)', margin, yPosition);
    yPosition += 8;
    
    immediateActions.forEach((action, index) => {
      addNewPageIfNeeded(15);
      drawShadowBox(margin, yPosition, pageWidth - 2 * margin, 12, [255, 245, 245]);
      
      pdf.setTextColor(colors.danger[0], colors.danger[1], colors.danger[2]);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(action.title, margin + 3, yPosition + 6);
      
      pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(action.description, margin + 3, yPosition + 10);
      
      yPosition += 15;
    });
    
    yPosition += 5;
    
    // Long-term Improvements
    pdf.setTextColor(colors.info[0], colors.info[1], colors.info[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('OPERATIONAL IMPROVEMENTS (1-4 WEEKS)', margin, yPosition);
    yPosition += 8;
    
    operationalImprovements.forEach((improvement, index) => {
      addNewPageIfNeeded(15);
      drawShadowBox(margin, yPosition, pageWidth - 2 * margin, 12, [245, 250, 255]);
      
      pdf.setTextColor(colors.info[0], colors.info[1], colors.info[2]);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(improvement.title, margin + 3, yPosition + 6);
      
      pdf.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text(improvement.description, margin + 3, yPosition + 10);
      
      yPosition += 15;
    });
    
    // Enhanced Footer
    const addFooter = () => {
      const footerY = pageHeight - 15;
      drawGradientBox(0, footerY, pageWidth, 15, colors.background, colors.white);
      pdf.setDrawColor(colors.light[0], colors.light[1], colors.light[2]);
      pdf.line(0, footerY, pageWidth, footerY);
      
      pdf.setTextColor(colors.light[0], colors.light[1], colors.light[2]);
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, footerY + 6);
      pdf.text('CONFIDENTIAL - Bisleri Bottling Plant Security Report', pageWidth - margin, footerY + 6, { align: 'right' });
      pdf.text(`Page ${pdf.getNumberOfPages()}`, pageWidth / 2, footerY + 11, { align: 'center' });
    };
    
    // Add footer to all pages
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter();
    }
    
    // Save with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    pdf.save(`Bisleri_Complete_Security_Report_${timestamp}.pdf`);
    
    console.log("Enhanced comprehensive PDF report exported successfully");
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
