import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, AlertTriangle, CheckCircle, XCircle, Clock, Users, Video, Shield, Settings, FileText, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DetailedReportViewProps {
  onClose: () => void;
}

export function DetailedReportView({ onClose }: DetailedReportViewProps) {
  const machineData = [
    { name: "Production Line 1", productive: "7h 15m", idle: "45m", efficiency: 94.1, workers: 2, loading: 3, unloading: 2, status: "optimal" },
    { name: "Production Line 2", productive: "6h 05m", idle: "1h 10m", efficiency: 84.0, workers: 1, loading: 2, unloading: 1, status: "attention" },
    { name: "Bottling Unit A", productive: "7h 45m", idle: "15m", efficiency: 96.9, workers: 3, loading: 5, unloading: 4, status: "excellent" },
    { name: "Bottling Unit B", productive: "6h 30m", idle: "1h 30m", efficiency: 81.3, workers: 2, loading: 1, unloading: 2, status: "concern" }
  ];

  const getEfficiencyIcon = (efficiency: number) => {
    if (efficiency >= 95) return <TrendingUp className="text-green-600" size={16} />;
    if (efficiency >= 85) return <Minus className="text-yellow-600" size={16} />;
    return <TrendingDown className="text-red-600" size={16} />;
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return "text-green-600";
    if (efficiency >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const accessData = [
    { zone: "Main Gate", authorized: 12, unauthorized: 0, riskLevel: "low", lastIncident: "None", avgDaily: 15 },
    { zone: "Administration Block", authorized: 2, unauthorized: 2, riskLevel: "high", lastIncident: "2 hours ago", avgDaily: 8 },
    { zone: "Loading Bay", authorized: 5, unauthorized: 1, riskLevel: "medium", lastIncident: "4 hours ago", avgDaily: 12 }
  ];

  const getRiskBadge = (level: string) => {
    const styles = {
      low: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
      high: "bg-red-100 text-red-800 border-red-200"
    };
    return <Badge className={`${styles[level as keyof typeof styles]} border`}>{level.toUpperCase()}</Badge>;
  };

  const complianceData = [
    { area: "Personal Protective Equipment", score: 72, violations: 4, trend: "down", priority: "high" },
    { area: "Mobile Device Usage", score: 85, violations: 2, trend: "stable", priority: "medium" },
    { area: "Hygiene Standards", score: 98, violations: 0, trend: "up", priority: "low" },
    { area: "Restricted Area Access", score: 88, violations: 1, trend: "down", priority: "high" },
    { area: "Standard Operating Procedures", score: 91, violations: 3, trend: "up", priority: "medium" }
  ];

  const getComplianceColor = (score: number) => {
    if (score >= 95) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="text-green-600" size={14} />;
    if (trend === "down") return <TrendingDown className="text-red-600" size={14} />;
    return <Minus className="text-gray-600" size={14} />;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <Shield className="text-red-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Security & Operations Report</h1>
                <p className="text-gray-600">Comprehensive facility analysis and insights</p>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Bisleri Bottling Plant, Uttar Pradesh</h2>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-gray-600">Period: June 01, 2024 - June 07, 2024</p>
                <Badge variant="outline" className="text-xs">7 Days Analysis</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200">Report ID: BSL-OP-001</Badge>
            <Button onClick={onClose} variant="outline" className="border-gray-300">
              Close Report
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Download size={16} className="mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Executive Summary - Enhanced */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-1 bg-blue-50 rounded">
              <FileText className="text-blue-600" size={20} />
            </div>
            Executive Summary
          </CardTitle>
          <p className="text-gray-600 text-sm">Key performance indicators and critical insights</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-1">1,247</div>
              <div className="text-sm text-blue-600 font-medium">Security Events</div>
              <div className="text-xs text-blue-500 mt-1">+12% from last week</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
              <div className="text-3xl font-bold text-red-700 mb-1">3</div>
              <div className="text-sm text-red-600 font-medium">Critical Incidents</div>
              <div className="text-xs text-red-500 mt-1">Requires immediate action</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="text-3xl font-bold text-orange-700 mb-1">3h 40m</div>
              <div className="text-sm text-orange-600 font-medium">Total Idle Time</div>
              <div className="text-xs text-orange-500 mt-1">15% above target</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="text-3xl font-bold text-yellow-700 mb-1">89%</div>
              <div className="text-sm text-yellow-600 font-medium">Overall Compliance</div>
              <div className="text-xs text-yellow-500 mt-1">7 violations detected</div>
            </div>
          </div>
          
          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-600" size={20} />
                <span className="font-semibold text-green-800">Operational Highlights</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Bottling Unit A: 96.9% efficiency</li>
                <li>• 37 personnel safely on-site</li>
                <li>• All cameras operational</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-red-600" size={20} />
                <span className="font-semibold text-red-800">Critical Issues</span>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Production Line 2: High idle time</li>
                <li>• 4 PPE violations detected</li>
                <li>• 2 unauthorized access attempts</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-blue-600" size={20} />
                <span className="font-semibold text-blue-800">Performance Trends</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Hygiene compliance: 98%</li>
                <li>• Loading efficiency improved</li>
                <li>• Security response time: 2.3min</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Operations Analysis */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-1 bg-green-50 rounded">
              <Settings className="text-green-600" size={20} />
            </div>
            Production & Operations Analysis
          </CardTitle>
          <p className="text-gray-600 text-sm">Real-time equipment performance and operational insights</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Equipment</TableHead>
                  <TableHead className="font-semibold">Efficiency</TableHead>
                  <TableHead className="font-semibold">Productive Hours</TableHead>
                  <TableHead className="font-semibold">Idle Time</TableHead>
                  <TableHead className="font-semibold">Staff</TableHead>
                  <TableHead className="font-semibold">Load/Unload</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machineData.map((machine, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{machine.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getEfficiencyIcon(machine.efficiency)}
                        <span className={`font-semibold ${getEfficiencyColor(machine.efficiency)}`}>
                          {machine.efficiency}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-green-700 font-medium">{machine.productive}</TableCell>
                    <TableCell className={machine.efficiency < 85 ? "text-red-600 font-semibold" : "text-gray-700"}>
                      {machine.idle}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-gray-500" />
                        <span>{machine.workers}</span>
                      </div>
                    </TableCell>
                    <TableCell>{machine.loading} / {machine.unloading}</TableCell>
                    <TableCell>
                      <Badge variant={machine.status === "excellent" ? "default" : machine.status === "concern" ? "destructive" : "secondary"}>
                        {machine.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-gray-800">Operational Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="text-red-600" size={16} />
                  <span className="font-semibold text-red-800">Efficiency Alert</span>
                </div>
                <p className="text-sm text-red-700">Production Line 2 operating at 84% efficiency - investigate maintenance needs</p>
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="font-semibold text-green-800">High Performer</span>
                </div>
                <p className="text-sm text-green-700">Bottling Unit A exceeding targets with 96.9% efficiency</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Security & Access */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-1 bg-purple-50 rounded">
              <Shield className="text-purple-600" size={20} />
            </div>
            Security & Access Control
          </CardTitle>
          <p className="text-gray-600 text-sm">Access monitoring and security incident analysis</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto mb-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Security Zone</TableHead>
                  <TableHead className="font-semibold">Risk Level</TableHead>
                  <TableHead className="font-semibold">Authorized</TableHead>
                  <TableHead className="font-semibold">Unauthorized</TableHead>
                  <TableHead className="font-semibold">Last Incident</TableHead>
                  <TableHead className="font-semibold">Daily Average</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessData.map((access, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{access.zone}</TableCell>
                    <TableCell>{getRiskBadge(access.riskLevel)}</TableCell>
                    <TableCell className="text-green-700 font-medium">{access.authorized}</TableCell>
                    <TableCell className={access.unauthorized > 0 ? "text-red-600 font-semibold" : "text-gray-700"}>
                      {access.unauthorized}
                    </TableCell>
                    <TableCell className={access.lastIncident !== "None" ? "text-orange-600" : "text-gray-500"}>
                      {access.lastIncident}
                    </TableCell>
                    <TableCell className="text-gray-600">{access.avgDaily}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="text-red-600" size={16} />
                <span className="font-semibold text-red-800">Critical Alert</span>
              </div>
              <p className="text-sm text-red-700">Unauthorized access to Administration Block detected at 22:40</p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-orange-600" size={16} />
                <span className="font-semibold text-orange-800">Investigation Required</span>
              </div>
              <p className="text-sm text-orange-700">Suspicious activity at Loading Bay - video evidence captured</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-600" size={16} />
                <span className="font-semibold text-blue-800">Pattern Analysis</span>
              </div>
              <p className="text-sm text-blue-700">Extended presence patterns identified in administrative areas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Compliance Monitoring */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-1 bg-orange-50 rounded">
              <CheckCircle className="text-orange-600" size={20} />
            </div>
            Safety & Compliance Analysis
          </CardTitle>
          <p className="text-gray-600 text-sm">Comprehensive safety compliance scoring and trend analysis</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Compliance Area</TableHead>
                  <TableHead className="font-semibold">Score</TableHead>
                  <TableHead className="font-semibold">Violations</TableHead>
                  <TableHead className="font-semibold">Trend</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Action Required</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.area}</TableCell>
                    <TableCell>
                      <span className={`font-bold text-lg ${getComplianceColor(item.score)}`}>
                        {item.score}%
                      </span>
                    </TableCell>
                    <TableCell className={item.violations > 0 ? "text-red-600 font-semibold" : "text-green-600"}>
                      {item.violations}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className="text-sm capitalize">{item.trend}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "secondary" : "default"}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.score < 85 ? (
                        <Badge variant="destructive" className="text-xs">Immediate</Badge>
                      ) : item.score < 95 ? (
                        <Badge variant="secondary" className="text-xs">Monitor</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 text-xs">Maintain</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Manpower Summary */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-1 bg-indigo-50 rounded">
              <Users className="text-indigo-600" size={20} />
            </div>
            Personnel Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-700">37</div>
              <div className="text-sm text-indigo-600">Total On-Site</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">9</div>
              <div className="text-sm text-blue-600">Operators</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">7</div>
              <div className="text-sm text-green-600">Support Staff</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">3</div>
              <div className="text-sm text-purple-600">Supervisors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Evidence */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-1 bg-gray-50 rounded">
              <Video className="text-gray-600" size={20} />
            </div>
            Video Evidence & Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer border-red-200 bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-red-600" size={16} />
                <span className="font-medium text-red-800">Critical Incident - Loading Bay</span>
              </div>
              <div className="text-sm text-red-700">Timestamp: 15:19 | Duration: 2:34</div>
              <div className="text-xs text-red-600 mt-1">Unauthorized material removal detected</div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer border-orange-200 bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-orange-600" size={16} />
                <span className="font-medium text-orange-800">After Hours Access</span>
              </div>
              <div className="text-sm text-orange-700">Timestamp: 22:43 | Duration: 1:12</div>
              <div className="text-xs text-orange-600 mt-1">Administration block entry</div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer border-yellow-200 bg-yellow-50">
              <div className="font-medium text-yellow-800">PPE Violation - Bottling Unit B</div>
              <div className="text-sm text-yellow-700">Timestamp: 09:15 | Duration: 0:45</div>
              <div className="text-xs text-yellow-600 mt-1">Missing safety gloves detected</div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer border-blue-200 bg-blue-50">
              <div className="font-medium text-blue-800">Safety Training Session</div>
              <div className="text-sm text-blue-700">Timestamp: 13:05 | Duration: 1:28</div>
              <div className="text-xs text-blue-600 mt-1">Documented safety briefing</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recommended Actions */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-1 bg-yellow-50 rounded">
              <AlertTriangle className="text-yellow-600" size={20} />
            </div>
            Strategic Recommendations
          </CardTitle>
          <p className="text-gray-600 text-sm">Priority actions to improve safety, security, and operational efficiency</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="text-red-600 mt-0.5" size={18} />
              <div>
                <div className="font-semibold text-red-800">Immediate Action Required</div>
                <div className="text-sm text-red-700 mt-1">Implement enhanced access controls for administrative areas and conduct security protocol review</div>
                <div className="text-xs text-red-600 mt-1">Priority: Critical | Timeline: Within 24 hours</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="text-orange-600 mt-0.5" size={18} />
              <div>
                <div className="font-semibold text-orange-800">Safety Enhancement</div>
                <div className="text-sm text-orange-700 mt-1">Mandatory PPE verification system at all facility entry points</div>
                <div className="text-xs text-orange-600 mt-1">Priority: High | Timeline: Within 48 hours</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Clock className="text-blue-600 mt-0.5" size={18} />
              <div>
                <div className="font-semibold text-blue-800">Operational Optimization</div>
                <div className="text-sm text-blue-700 mt-1">Review Production Line 2 maintenance schedule to reduce idle time and improve efficiency</div>
                <div className="text-xs text-blue-600 mt-1">Priority: Medium | Timeline: Within 1 week</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="text-green-600 mt-0.5" size={18} />
              <div>
                <div className="font-semibold text-green-800">Continuous Improvement</div>
                <div className="text-sm text-green-700 mt-1">Schedule regular safety briefings and implement mid-shift compliance inspections</div>
                <div className="text-xs text-green-600 mt-1">Priority: Standard | Timeline: Ongoing</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
