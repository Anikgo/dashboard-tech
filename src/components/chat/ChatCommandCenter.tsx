
import { useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { Shield, Bot, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Message {
  text: string;
  isUser: boolean;
}

// Define the animation variants that were missing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export function ChatCommandCenter() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmptyState, setShowEmptyState] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, {
      text,
      isUser: true
    }]);
    setShowEmptyState(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      let response = "I'm processing your request...";

      if (text.toLowerCase().includes("yesterday evening") || text.toLowerCase().includes("unusual")) {
        response = "Detected 3 motion alerts at 'Warehouse B' between 5:30 PM and 8 PM. Want the clips?";
      } else if (text.toLowerCase().includes("camera 6")) {
        response = "Camera 6 recorded normal activity yesterday night. There were 2 authorized personnel entries at 11:45 PM and 2:30 AM.";
      } else if (text.toLowerCase().includes("report")) {
        response = "Generating report... I've compiled all alert data from last week across all locations. There were 17 motion alerts, 5 line crossing events, and 2 unidentified person alerts.";
      } else if (text.toLowerCase().includes("gate")) {
        response = "Activity near Gate 2 this morning: Delivery truck arrived at 8:15 AM, departed at 8:45 AM. No unusual events detected.";
      } else if (text.toLowerCase().includes("red") && (text.toLowerCase().includes("shirt") || text.toLowerCase().includes("tshirt"))) {
        response = "Person wearing a red t-shirt entered the main office at 9:27 AM today through the reception area. They were identified as Alex Peterson, a contractor from BuildTech Solutions. Would you like to see the footage?";
      } else if (text.toLowerCase().includes("suspicious") || text.toLowerCase().includes("unauthorized")) {
        response = "Alert: Detected 1 suspicious activity at the loading dock at 2:45 AM. Unidentified person attempted to access the storage area. Security was notified and responded within 3 minutes. The individual left the premises. Full report available.";
      } else if (text.toLowerCase().includes("visitor") || text.toLowerCase().includes("visitors")) {
        response = "Today's visitor log: 7 registered visitors between 8 AM and 3 PM. All followed standard check-in procedures. Would you like specific visitor details or footage?";
      } else if (text.toLowerCase().includes("after hours") || text.toLowerCase().includes("night")) {
        response = "After-hours activity (8 PM - 6 AM): 3 authorized staff entries using keycards, 1 scheduled cleaning crew at 11 PM, and 1 security patrol at 2 AM. No unauthorized access detected.";
      }
      setMessages(prev => [...prev, {
        text: response,
        isUser: false
      }]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full max-w-5xl mx-auto fade-in"
    >
      <div className="p-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-1"
        >
          <div className="p-2 bg-guardai-red/10 rounded-full pulse-glow">
            <Shield size={24} className="text-guardai-red" />
          </div>
          <h1 className="text-2xl font-semibold text-guardai-darkgray gradient-text-black">Guard.AI Command Center</h1>
        </motion.div>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-guardai-gray mb-6 ml-9"
        >
          Ask anything about your locations, camera events, or reports. I'll help you in seconds.
        </motion.p>
        
        <QuickActions />
        
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden glass-morphism hover-lift">
          <div className="p-4 h-[60vh] md:h-[500px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {showEmptyState && messages.length === 0 ? (
                <EmptyState />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                  ))}
                  {isLoading && (
                    <div className="flex space-x-2 p-3 max-w-[80%] mr-auto bg-guardai-lightgray rounded-tl-xl rounded-tr-xl rounded-br-xl">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex items-center gap-3"
                      >
                        <Bot size={16} className="text-guardai-gray animate-bounce" />
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 bg-guardai-gray/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-3 w-3 bg-guardai-gray/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-3 w-3 bg-guardai-gray/40 rounded-full animate-bounce"></div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </Card>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-4 rounded-lg bg-guardai-red/5 border border-guardai-red/10"
        >
          <div className="flex items-center gap-2 text-sm text-guardai-gray">
            <AlertCircle size={16} className="text-guardai-red" />
            <span>AI-powered security monitoring active. System is analyzing all feeds in real-time.</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const EmptyState = () => <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center h-[400px] text-center">
  <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
    <h2 className="text-2xl font-bold text-guardai-darkgray">Guard.AI Assistant</h2>
  </motion.div>
  <div className="max-w-md">
    <motion.h3 variants={itemVariants} className="text-xl font-medium mb-4 text-guardai-darkgray">Ask anything like:</motion.h3>
    <motion.ul variants={itemVariants} className="space-y-3 text-guardai-gray">
      <li className="p-2 bg-guardai-lightgray/50 hover:bg-guardai-lightgray transition-colors cursor-pointer rounded-md">'Show me what happened near the loading dock yesterday'</li>
      <li className="p-2 bg-guardai-lightgray/50 rounded-md hover:bg-guardai-lightgray transition-colors cursor-pointer">'When did the person in a red t-shirt enter the office?'</li>
      <li className="p-2 bg-guardai-lightgray/50 rounded-md hover:bg-guardai-lightgray transition-colors cursor-pointer">'Were there any suspicious activities after hours?'</li>
      <li className="p-2 bg-guardai-lightgray/50 rounded-md hover:bg-guardai-lightgray transition-colors cursor-pointer">'Show me today's visitor log at the front entrance'</li>
      <li className="p-2 bg-guardai-lightgray/50 rounded-md hover:bg-guardai-lightgray transition-colors cursor-pointer">'Generate a weekly report of unauthorized access attempts'</li>
    </motion.ul>
  </div>
</motion.div>;
