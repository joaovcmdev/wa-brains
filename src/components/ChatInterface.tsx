import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o WA-Brains, seu assistente de WhatsApp com RAG. Como posso ajudá-lo hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Obrigado pela sua mensagem! Estou processando sua solicitação usando nossa base de conhecimento RAG...",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-card border-primary/20">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
          Chat WA-Brains
          <Badge variant="secondary" className="ml-auto">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3 group",
                  message.sender === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div className="flex-shrink-0">
                  {message.sender === "bot" ? (
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-secondary/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl p-4 relative group transition-all duration-200",
                    message.sender === "user"
                      ? "bg-gradient-primary text-white shadow-glow"
                      : "bg-muted/50 text-muted-foreground border border-border/50 backdrop-blur-sm"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className={cn(
                    "text-xs opacity-70 mt-2 block",
                    message.sender === "user" ? "text-white/80" : "text-muted-foreground/80"
                  )}>
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-3">
            <Input
              placeholder="Digite sua mensagem..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-background/50 border-primary/20 focus:border-primary/50 backdrop-blur-sm"
            />
            <Button 
              type="submit"
              size="icon" 
              variant="premium"
              className="shrink-0 shadow-glow"
              disabled={!inputMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Powered by WA-Brains RAG ✨
          </p>
        </div>
      </CardContent>
    </Card>
  );
};