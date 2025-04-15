
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const placeholders = [
    "When did the person in red t-shirt enter my office?",
    "Show me any suspicious activity near loading bay from yesterday",
    "How many employees accessed restricted area between 8-10 PM?",
    "Did anyone stay in conference room after hours?",
    "Generate report of all security breaches this week",
    "Show me footage of unattended packages in lobby",
    "List all unauthorized access attempts today"
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
        className="flex-1 py-3 placeholder:opacity-80 placeholder:text-guardai-gray/70 placeholder-animation"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full hover:bg-guardai-lightgray hover:text-guardai-red transition-colors"
      >
        <Mic size={18} />
      </Button>
      <Button 
        type="submit" 
        className="bg-guardai-red hover:bg-guardai-red/90 transition-colors"
      >
        Send
      </Button>
    </form>
  );
}
