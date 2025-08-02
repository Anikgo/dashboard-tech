import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, AlertTriangle, CheckCircle, XCircle, Clock, Users, Video, Shield, Settings, FileText, TrendingUp, TrendingDown, Activity } from "lucide-react";
import jsPDF from 'jspdf';

interface DetailedReportViewProps {
  onClose: () => void;
  report?: any;
}

export function DetailedReportView({ onClose, report }: DetailedReportViewProps) {
  // Default report if none provided
  const currentReport = report || {
    title: "Security & Operations Report",
    type: "Operations",
    description: "Comprehensive facility monitoring and compliance analysis"
  };

  const getReportContent = () => {
    switch (currentReport.title) {
      case "Operational Report":
        return {
          title: "Operational Report",
          subtitle: "Sleep, Phone Usage, Loitering & Idle Machinery Analysis",
          sections: [
            {
              title: "Sleep Detection Incidents",
              data: [
                { location: "Production Line 1", count: 3, duration: "45 mins avg" },
                { location: "Bottling Unit A", count: 1, duration: "30 mins" },
                { location: "Warehouse", count: 2, duration: "60 mins avg" }
              ]
            },
            {
              title: "Phone Usage Violations",
              data: [
                { location: "Production Line 2", count: 5, severity: "High" },
                { location: "Loading Bay", count: 2, severity: "Medium" },
                { location: "Office Area", count: 3, severity: "Low" }
              ]
            },
            {
              title: "Loitering Detection",
              data: [
                { zone: "Zone A", people: 4, alerts: 2 },
                { zone: "Zone B", people: 3, alerts: 1 },
                { zone: "Zone C", people: 6, alerts: 3 }
              ]
            },
            {
              title: "Idle Machinery",
              data: [
                { machine: "Production Line 1", idleTime: "30 mins", status: "Resolved" },
                { machine: "Bottling Unit B", idleTime: "45 mins", status: "Active" },
                { machine: "Packaging Line", idleTime: "20 mins", status: "Resolved" }
              ]
            }
          ]
        };
      
      case "Attendance Report":
        return {
          title: "Attendance Report",
          subtitle: "Employee Attendance & Workforce Management",
          sections: [
            {
              title: "Daily Attendance Summary",
              data: [
                { department: "Production", present: 25, absent: 2, late: 1 },
                { department: "Maintenance", present: 8, absent: 0, late: 0 },
                { department: "Quality Control", present: 12, absent: 1, late: 0 },
                { department: "Administration", present: 5, absent: 0, late: 0 }
              ]
            },
            {
              title: "Shift Analysis",
              data: [
                { shift: "Morning (6 AM - 2 PM)", attendance: "95%", total: 30 },
                { shift: "Afternoon (2 PM - 10 PM)", attendance: "92%", total: 28 },
                { shift: "Night (10 PM - 6 AM)", attendance: "88%", total: 15 }
              ]
            }
          ]
        };
      
      case "Compliance Dashboard Report":
        return {
          title: "Compliance Dashboard Report",
          subtitle: "PPE Compliance & Safety Regulation Adherence",
          sections: [
            {
              title: "PPE Compliance Summary",
              data: [
                { item: "Hard Hats", compliance: "98%", violations: 2 },
                { item: "Safety Glasses", compliance: "95%", violations: 5 },
                { item: "Safety Shoes", compliance: "100%", violations: 0 },
                { item: "Hairnets", compliance: "92%", violations: 8 }
              ]
            },
            {
              title: "Safety Violations by Department",
              data: [
                { department: "Production", violations: 8, severity: "Medium" },
                { department: "Maintenance", violations: 3, severity: "Low" },
                { department: "Quality Control", violations: 2, severity: "Low" }
              ]
            }
          ]
        };
      
      case "Security Report":
        return {
          title: "Security Report",
          subtitle: "Perimeter Security & Fire & Smoke Detection",
          sections: [
            {
              title: "Perimeter Security Status",
              data: [
                { sensor: "Main Gate Sensor", status: "Active", battery: "98%" },
                { sensor: "Loading Bay Sensor", status: "Active", battery: "95%" },
                { sensor: "Perimeter Wall Sensor", status: "Active", battery: "97%" },
                { sensor: "Emergency Exit Sensor", status: "Active", battery: "99%" }
              ]
            },
            {
              title: "Fire & Smoke Detection",
              data: [
                { location: "Production Area", alerts: 0, status: "Clear" },
                { location: "Warehouse", alerts: 0, status: "Clear" },
                { location: "Office Area", alerts: 0, status: "Clear" },
                { location: "Loading Bay", alerts: 0, status: "Clear" }
              ]
            }
          ]
        };
      
      default:
        return {
          title: "Security & Operations Report",
          subtitle: "Comprehensive facility analysis",
          sections: [
            {
              title: "Executive Summary",
              data: [
                { metric: "Security Events", value: "1,247", trend: "↑ 12%" },
                { metric: "Critical Incidents", value: "3", trend: "Requires attention" },
                { metric: "Equipment Downtime", value: "3h 40m", trend: "15% above baseline" },
                { metric: "Safety Violations", value: "7", trend: "Down from 12" }
              ]
            }
          ]
        };
    }
  };

  const reportContent = getReportContent();



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
    // Create a simple PDF for the selected report
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add report title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(reportContent.title, pageWidth / 2, 30, { align: 'center' });
    
    // Add report subtitle
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(reportContent.subtitle, pageWidth / 2, 40, { align: 'center' });
    
    // Add report details
    pdf.setFontSize(10);
    pdf.text(`Report Type: ${currentReport.type}`, 20, 60);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 70);
    
    // Add sections
    let yPosition = 90;
    reportContent.sections.forEach((section, sectionIndex) => {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 30;
      }
      
      // Section title
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(section.title, 20, yPosition);
      yPosition += 15;
      
      // Section data
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      section.data.forEach((item, itemIndex) => {
        const itemText = Object.entries(item).map(([key, value]) => `${key}: ${value}`).join(', ');
        pdf.text(itemText, 25, yPosition);
        yPosition += 8;
      });
      
      yPosition += 10;
    });
    
    // Save with report name
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${reportContent.title.replace(/\s+/g, '_')}_${timestamp}.pdf`;
    pdf.save(filename);
    
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
                  <h1 className="text-2xl font-bold text-gray-900">{reportContent.title}</h1>
                  <p className="text-sm text-gray-600">{reportContent.subtitle}</p>
                </div>
              </div>
              <div className="ml-12 space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">Bisleri Bottling Plant, Uttar Pradesh</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Report Period: {new Date().toLocaleDateString()}</span>
                  <Badge variant="outline" className="font-mono">{currentReport.type.toUpperCase()}-{currentReport.id || '001'}</Badge>
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

        {/* Dynamic Report Content */}
        {reportContent.sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="border-0 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="text-guardai-red w-5 h-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      {Object.keys(section.data[0] || {}).map((key) => (
                        <TableHead key={key} className="font-semibold capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {section.data.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        {Object.values(item).map((value, valueIndex) => (
                          <TableCell key={valueIndex} className="text-sm">
                            {typeof value === 'number' ? value.toLocaleString() : String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))}












      </div>
    </div>
  );
}
