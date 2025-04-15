
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const placeholders = [
    "What happened near Gate 2 this morning?",
    "Show me visitor footage from today.",
    "Generate a report of alerts last week.",
    "What did Camera 6 record yesterday night?",
    "List all flagged events from today.",
    "When did the person in a red t-shirt enter the office?",
    "Were there any suspicious activities after hours?",
    "Who accessed the server room last night?",
    "Show me all delivery trucks that arrived today"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-white">
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholders[placeholderIndex]}
        className="flex-1 py-3 placeholder:opacity-50 placeholder:text-guardai-gray/70 focus-visible:ring-guardai-red/30"
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full border-guardai-gray/30 hover:bg-guardai-lightgray hover:border-guardai-red/30"
        >
          <Mic size={18} className="text-guardai-gray hover:text-guardai-red" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          type="submit" 
          className="bg-guardai-red hover:bg-guardai-red/90 gap-2"
        >
          <Send size={16} />
          <span>Send</span>
        </Button>
      </motion.div>
    </form>
  );
}
