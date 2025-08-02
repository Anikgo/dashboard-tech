import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Filter, ChevronDown, FileCog, PieChart, BarChart, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { ReportGenerationDialog } from "@/components/reports/ReportGenerationDialog";
import { DetailedReportView } from "@/components/reports/DetailedReportView";
import jsPDF from 'jspdf';

export default function ReportsPage() {
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

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

  const handleGenerateReport = (config: any) => {
    console.log("Generating report with config:", config);
    // Simulate report generation
    setTimeout(() => {
      setShowDetailedReport(true);
    }, 1000);
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setShowDetailedReport(true);
  };

  const handleDownloadReport = (report: any) => {
    // Create empty PDF for now
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add report title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(report.title, pageWidth / 2, 30, { align: 'center' });
    
    // Add report description
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const descriptionLines = pdf.splitTextToSize(report.description, pageWidth - 40);
    pdf.text(descriptionLines, 20, 50);
    
    // Add report details
    pdf.setFontSize(10);
    pdf.text(`Report Type: ${report.type}`, 20, 80);
    pdf.text(`Generated: ${report.date}`, 20, 90);
    pdf.text(`File Size: ${report.size}`, 20, 100);
    
    // Add placeholder content
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Report Content', 20, 120);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This is a placeholder report. Actual content will be generated based on the selected report type.', 20, 130);
    
    // Save with report name
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${report.title.replace(/\s+/g, '_')}_${timestamp}.pdf`;
    pdf.save(filename);
  };

  const reports = [
    {
      id: 1,
      title: "Operational Report",
      description: "Comprehensive analysis of sleep, phone usage, loitering, and idle machinery incidents",
      date: "Today, 6:00 AM",
      type: "Operations",
      size: "3.2 MB",
      icon: BarChart
    },
    {
      id: 2,
      title: "Attendance Report",
      description: "Employee attendance tracking and workforce management analytics",
      date: "Today, 5:30 AM",
      type: "HR",
      size: "1.8 MB",
      icon: LineChart
    },
    {
      id: 3,
      title: "Compliance Dashboard Report",
      description: "PPE compliance monitoring and safety regulation adherence",
      date: "Today, 5:00 AM",
      type: "Compliance",
      size: "2.1 MB",
      icon: PieChart
    },
    {
      id: 4,
      title: "Security Report",
      description: "Perimeter security monitoring and fire & smoke detection analysis",
      date: "Today, 4:30 AM",
      type: "Security",
      size: "4.5 MB",
      icon: FileCog
    }
  ];

  if (showDetailedReport) {
    return <DetailedReportView onClose={() => setShowDetailedReport(false)} report={selectedReport} />;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-1">
        <FileText size={28} className="text-guardai-red" />
        <h1 className="text-2xl font-semibold text-guardai-darkgray">Reports</h1>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-guardai-gray mb-6 ml-9">
        Timeline and downloadable activity reports from all security systems.
      </motion.p>

      <motion.div variants={itemVariants} className="mb-6 flex flex-wrap gap-4 items-center">
        <Button variant="outline" className="border-guardai-gray/30 flex items-center gap-2">
          <Calendar size={16} />
          <span>Date Range</span>
          <ChevronDown size={14} />
        </Button>
        
        <Button variant="outline" className="border-guardai-gray/30 flex items-center gap-2">
          <Filter size={16} />
          <span>Filter Reports</span>
          <ChevronDown size={14} />
        </Button>

        <Button 
          onClick={() => setShowGenerationDialog(true)}
          className="ml-auto bg-guardai-red hover:bg-guardai-red/90 text-white"
        >
          <FileText size={16} className="mr-2" />
          Generate New Report
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="p-4 bg-gray-50 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText size={18} className="text-guardai-red" />
              <span>Available Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {reports.map(report => (
                <div key={report.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 mb-3 md:mb-0">
                    <div className="bg-guardai-lightgray p-2 rounded-md">
                      <report.icon size={20} className="text-guardai-red" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-guardai-gray">{report.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-guardai-gray">
                        <span>{report.date}</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full">{report.type}</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red" onClick={() => handleViewReport(report)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red" onClick={() => handleDownloadReport(report)}>
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar size={18} className="text-guardai-red" />
                <span>Schedule Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-guardai-gray mb-4">
                Set up automatic report generation and delivery to your email.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Daily Summary</div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Active</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Weekly Analytics</div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Active</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Monthly Compliance</div>
                  <div className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Inactive</div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 border-guardai-gray/30 hover:bg-guardai-lightgray hover:text-guardai-red">
                Manage Schedules
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
          <Card className="border border-gray-200 shadow-sm h-full">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart size={18} className="text-guardai-red" />
                <span>Report Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-48 flex items-end justify-between border-b border-l">
                {/* Simple bar chart visualization */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-5/6 bg-guardai-red/80 hover:bg-guardai-red transition-colors rounded-t"
                      style={{ height: `${20 + Math.random() * 80}px` }}
                    />
                    <div className="text-xs text-guardai-gray mt-1">{`${i+1}`}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-xs text-guardai-gray">Reports generated per month (2025)</div>
                <Button variant="link" className="text-xs text-guardai-red p-0 h-auto">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <ReportGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        onGenerateReport={handleGenerateReport}
      />
    </motion.div>
  );
}
