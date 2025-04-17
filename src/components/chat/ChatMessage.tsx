
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  // Function to highlight keywords in AI responses
  const highlightKeywords = (text: string) => {
    // Examples of keywords to highlight (camera names, times, locations)
    const keywords = ['Warehouse', 'Camera', 'Gate', 'PM', 'AM', 'motion', 'alerts'];
    
    // Split the text and wrap keywords in spans
    let parts = [text];
    
    keywords.forEach(keyword => {
      const newParts: string[] = [];
      
      parts.forEach(part => {
        const regex = new RegExp(`(${keyword}\\s\\d+|\\d+\\s${keyword}|${keyword})`, 'gi');
        const splitPart = part.split(regex);
        
        for (let i = 0; i < splitPart.length; i++) {
          newParts.push(splitPart[i]);
          if (i < splitPart.length - 1 && splitPart[i + 1].match(regex)) {
            newParts.push(`<span class="text-guardai-red font-medium">${splitPart[i + 1]}</span>`);
            i++;
          }
        }
      });
      
      parts = newParts;
    });
    
    return { __html: parts.join('') };
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("mb-4", isUser ? "flex justify-end" : "flex justify-start")}
    >
      <div className="flex items-start gap-2">
        {!isUser && (
          <div className="mt-2 p-1.5 rounded-full bg-guardai-red/10">
            <Bot size={16} className="text-guardai-red" />
          </div>
        )}
        <div className={cn(
          "relative",
          isUser ? "chat-bubble-user shimmer" : "chat-bubble-ai glass-morphism"
        )}>
          {isUser ? (
            <p>{message}</p>
          ) : (
            <p dangerouslySetInnerHTML={highlightKeywords(message)} />
          )}
        </div>
        {isUser && (
          <div className="mt-2 p-1.5 rounded-full bg-guardai-black/10">
            <User size={16} className="text-guardai-black" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
