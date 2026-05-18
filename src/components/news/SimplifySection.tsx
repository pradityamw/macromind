"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { simplifyArticle } from "@/actions/ai";

interface SimplifySectionProps {
  originalText: string;
}

export default function SimplifySection({ originalText }: SimplifySectionProps) {
  const [simplifiedText, setSimplifiedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimplify = async () => {
    setIsLoading(true);
    try {
      const result = await simplifyArticle(originalText, "Beginner");
      setSimplifiedText(result ?? null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-4 border-y border-border/50">
        <div className="flex items-center gap-4">
          <Button 
            variant={simplifiedText ? "secondary" : "outline"} 
            size="sm" 
            className="gap-2" 
            onClick={handleSimplify}
            disabled={isLoading || !!simplifiedText}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Bot className="h-4 w-4 text-primary" />}
            {simplifiedText ? "AI Simplified" : "AI Simplify"}
          </Button>
        </div>
      </div>

      {simplifiedText ? (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative">
          <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground p-1.5 rounded-full">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="prose prose-invert prose-lg max-w-none">
            {simplifiedText.split('\n').map((paragraph, idx) => (
              paragraph ? <p key={idx}>{paragraph}</p> : <br key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="prose prose-invert prose-lg max-w-none pb-8">
          {/* We just display the original text here */}
          <p>{originalText}</p>
        </div>
      )}
    </div>
  );
}
