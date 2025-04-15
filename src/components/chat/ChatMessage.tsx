
import { cn } from "@/lib/utils";

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
    <div className={cn("mb-4", isUser ? "flex justify-end" : "flex justify-start")}>
      <div className={isUser ? "chat-bubble-user" : "chat-bubble-ai"}>
        {isUser ? (
          <p>{message}</p>
        ) : (
          <p dangerouslySetInnerHTML={highlightKeywords(message)} />
        )}
      </div>
    </div>
  );
}
