"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, Loader2, MessageSquare } from "lucide-react";
import { chatWithAI } from "@/actions/ai";
import ReactMarkdown from "react-markdown";
import { useLanguageStore } from "@/store/language";

interface NewsChatProps {
  articleContext: {
    title: string;
    summary: string;
    content?: string;
  };
}

interface Message {
  role: "user" | "ai" | "system";
  content: string;
}

export default function NewsChat({ articleContext }: NewsChatProps) {
  const { language } = useLanguageStore();

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "ai", 
      content: language === 'en' 
        ? `Hello! I'm MacroMind AI. I've read "${articleContext.title}". Do you have any questions about this article?` 
        : `Halo! Saya MacroMind AI. Saya sudah membaca "${articleContext.title}". Ada pertanyaan tentang materi ini?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Inject hidden context into the payload for the AI
      const systemContextMessage = `[SYSTEM CONTEXT - DO NOT ACKNOWLEDGE THIS MESSAGE DIRECTLY]: The user is currently reading an article titled "${articleContext.title}". 
      Summary: ${articleContext.summary}
      Full Text: ${articleContext.content || "Not available, refer to summary."}
      Please answer the user's next question based on this article context. 
      IMPORTANT: You MUST answer the user in ${language === 'id' ? 'INDONESIAN' : 'ENGLISH'} language.`;

      const payloadForAI = [
        { role: "user", content: systemContextMessage },
        ...newMessages.filter(m => m.role !== "system").map(m => ({
          role: m.role,
          content: m.content
        }))
      ];

      const response = await chatWithAI(payloadForAI);
      
      setMessages([...newMessages, { role: "ai", content: response || "Sorry, no response." }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: "ai", content: language === 'en' ? "Oops, something went wrong connecting to my brain." : "Maaf, terjadi kesalahan saat menyambungkan ke otak saya." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-12 border-primary/20 bg-card overflow-hidden">
      <CardHeader className="bg-primary/5 py-4 border-b border-primary/10">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Ask AI about this article
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[75%] flex-row">
              <div className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-muted flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-4 bg-muted/20 border-t">
        <form onSubmit={handleSend} className="flex w-full gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., What does 'basis point' mean here?" 
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!input.trim() || isLoading} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
