
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Calendar, BarChart2, Shield, TrendingUp, CircleAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function InsightsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 max-w-6xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-1">
        <Shield size={28} className="text-guardai-red" />
        <h1 className="text-2xl font-semibold text-guardai-darkgray">Insights</h1>
      </motion.div>
      <motion.p variants={itemVariants} className="text-guardai-gray mb-6 ml-9">
        AI-generated insights across all your cameras and locations.
      </motion.p>
      
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-guardai-red hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-guardai-gray">Total Events Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-guardai-darkgray">42</div>
                <div className="text-guardai-red text-sm flex items-center gap-1">
                  <TrendingUp size={14} />
                  <span>+12% from yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-guardai-red hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-guardai-gray">Unusual Activity Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-guardai-darkgray">3</div>
                <div className="text-guardai-red text-sm flex items-center gap-1">
                  <CircleAlert size={14} />
                  <span>Requires attention</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-guardai-gray">Top Active Cameras</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-guardai-red" />
                    <span>Warehouse Entrance</span>
                  </div>
                  <span className="text-guardai-gray">28 events</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-guardai-red" />
                    <span>Loading Dock</span>
                  </div>
                  <span className="text-guardai-gray">19 events</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-guardai-red" />
                    <span>Parking Gate</span>
                  </div>
                  <span className="text-guardai-gray">14 events</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar size={18} className="text-guardai-red" />
                <span>Time-wise Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end">
                {/* Time heatmap placeholder */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 mx-[1px] rounded-t-sm transition-all duration-300 hover:opacity-100" 
                    style={{ 
                      height: `${Math.max(15, Math.min(100, Math.random() * 100))}%`,
                      backgroundColor: i >= 8 && i <= 18 ? '#ea384c' : '#8E9196',
                      opacity: Math.max(0.3, Math.min(0.9, Math.random()))
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-guardai-gray">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>12 AM</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart2 size={18} className="text-guardai-red" />
                <span>Location-wise Incidents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Warehouse</span>
                    <span className="text-sm text-guardai-gray">65%</span>
                  </div>
                  <div className="w-full bg-guardai-lightgray rounded-full h-2.5">
                    <div className="bg-guardai-red h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Office Building</span>
                    <span className="text-sm text-guardai-gray">25%</span>
                  </div>
                  <div className="w-full bg-guardai-lightgray rounded-full h-2.5">
                    <div className="bg-guardai-red h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Parking Lot</span>
                    <span className="text-sm text-guardai-gray">10%</span>
                  </div>
                  <div className="w-full bg-guardai-lightgray rounded-full h-2.5">
                    <div className="bg-guardai-red h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <div className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Shield size={16} className="text-guardai-red" />
            <span>Ask follow-up questions:</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1 text-guardai-gray hover:text-guardai-red hover:bg-guardai-lightgray/60"
            >
              Which cameras were idle this morning?
              <ArrowRight size={14} />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1 text-guardai-gray hover:text-guardai-red hover:bg-guardai-lightgray/60"
            >
              Why was Camera 4 flagged?
              <ArrowRight size={14} />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1 text-guardai-gray hover:text-guardai-red hover:bg-guardai-lightgray/60"
            >
              Show analysis for office building cameras
              <ArrowRight size={14} />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1 text-guardai-gray hover:text-guardai-red hover:bg-guardai-lightgray/60"
            >
              When did the person in red enter the building?
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
