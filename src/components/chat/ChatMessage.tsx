
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
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
            newParts.push(`<span class="text-[#7E69AB] font-medium">${splitPart[i + 1]}</span>`);
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
      <div 
        className={cn(
          "p-4 max-w-[80%] shadow-sm",
          isUser 
            ? "chat-bubble-user bg-gradient-to-r from-[#9b87f5] to-[#6E59A5] text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl" 
            : "chat-bubble-ai bg-gradient-to-r from-[#E5DEFF]/70 to-[#E5DEFF]/40 text-[#403E43] rounded-tl-xl rounded-tr-xl rounded-br-xl"
        )}
      >
        {isUser ? (
          <p>{message}</p>
        ) : (
          <p dangerouslySetInnerHTML={highlightKeywords(message)} />
        )}
      </div>
    </div>
  );
}
