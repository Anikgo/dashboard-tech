
import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";

interface Message {
  text: string;
  isUser: boolean;
}

export function ChatCommandCenter() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmptyState, setShowEmptyState] = useState(true);

  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setShowEmptyState(false);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      let response = "I'm processing your request...";
      
      // Simple pattern matching for demo purposes
      if (text.toLowerCase().includes("yesterday evening") || text.toLowerCase().includes("unusual")) {
        response = "Detected 3 motion alerts at 'Warehouse B' between 5:30 PM and 8 PM. Want the clips?";
      } else if (text.toLowerCase().includes("camera 6")) {
        response = "Camera 6 recorded normal activity yesterday night. There were 2 authorized personnel entries at 11:45 PM and 2:30 AM.";
      } else if (text.toLowerCase().includes("report")) {
        response = "Generating report... I've compiled all alert data from last week across all locations. There were 17 motion alerts, 5 line crossing events, and 2 unidentified person alerts.";
      } else if (text.toLowerCase().includes("gate")) {
        response = "Activity near Gate 2 this morning: Delivery truck arrived at 8:15 AM, departed at 8:45 AM. No unusual events detected.";
      }
      
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 1500);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[400px] text-center">
      <div className="max-w-md">
        <h3 className="text-xl font-medium mb-4 text-guardai-darkgray">Ask anything like:</h3>
        <ul className="space-y-3 text-guardai-gray">
          <li className="p-2 bg-guardai-lightgray/50 rounded-md">'Show me what happened near the loading dock yesterday'</li>
          <li className="p-2 bg-guardai-lightgray/50 rounded-md">'Summarise alerts from last night'</li>
          <li className="p-2 bg-guardai-lightgray/50 rounded-md">'Generate a weekly report of suspicious activity'</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto fade-in">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-1 text-guardai-darkgray">Guard.AI Command Center</h1>
        <p className="text-guardai-gray mb-6 max-w-3xl">
          Ask anything about your locations, camera events, or reports. I'll help you in seconds.
        </p>
        
        <QuickActions />
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 h-[60vh] md:h-[500px] overflow-y-auto">
            {showEmptyState && messages.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessage 
                    key={index} 
                    message={msg.text} 
                    isUser={msg.isUser} 
                  />
                ))}
              </div>
            )}
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
