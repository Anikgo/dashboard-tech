import { useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  text: string;
  isUser: boolean;
}

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

    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      setIsLoading(false);
      let response = "I'm processing your request...";

      // Pattern matching for demo purposes
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

  const EmptyState = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center h-[400px] text-center bg-gradient-to-b from-black/5 to-transparent rounded-lg p-8"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-guardai-red" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-guardai-red to-black bg-clip-text text-transparent">
          Guard.AI Assistant
        </h2>
      </motion.div>
      <div className="max-w-md">
        <motion.h3 
          variants={itemVariants} 
          className="text-xl font-medium mb-4 text-guardai-darkgray"
        >
          Ask anything like:
        </motion.h3>
        <motion.ul variants={itemVariants} className="space-y-3">
          {[
            'Show me what happened near the loading dock yesterday',
            'When did the person in a red t-shirt enter the office?',
            'Were there any suspicious activities after hours?',
            "Show me today's visitor log at the front entrance",
            'Generate a weekly report of unauthorized access attempts'
          ].map((suggestion, index) => (
            <li 
              key={index}
              className="p-3 bg-gradient-to-r from-black/5 to-transparent hover:from-guardai-red/10 hover:to-transparent transition-all duration-300 cursor-pointer rounded-lg text-guardai-darkgray hover:text-guardai-red border border-transparent hover:border-guardai-red/20"
            >
              {suggestion}
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full max-w-5xl mx-auto"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-1">
          <Shield className="w-8 h-8 text-guardai-red" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-guardai-red to-black bg-clip-text text-transparent">
            Guard.AI Command Center
          </h1>
        </div>
        <p className="text-guardai-gray mb-6 ml-11">
          Ask anything about your locations, camera events, or reports. I'll help you in seconds.
        </p>
        
        <QuickActions />
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:border-guardai-red/20 transition-colors duration-300">
          <div className="p-4 h-[60vh] md:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-guardai-red/20 scrollbar-track-transparent">
            {showEmptyState && messages.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                ))}
                {isLoading && (
                  <div className="flex space-x-2 p-3 max-w-[80%] mr-auto bg-gradient-to-r from-black/5 to-transparent rounded-lg animate-pulse">
                    <div className="h-3 w-3 bg-guardai-red/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-3 w-3 bg-guardai-red/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-3 w-3 bg-guardai-red/40 rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            )}
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </motion.div>
  );
}
