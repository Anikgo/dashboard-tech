
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
    "What happened near Gate 2 this morning?",
    "Show me visitor footage from today.",
    "Generate a report of alerts last week.",
    "What did Camera 6 record yesterday night?",
    "List all flagged events from today."
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
        className="flex-1 py-3 placeholder:opacity-50 placeholder:text-guardai-gray/70"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <Mic size={18} />
      </Button>
      <Button 
        type="submit" 
        className="bg-guardai-red hover:bg-guardai-red/90"
      >
        Send
      </Button>
    </form>
  );
}
