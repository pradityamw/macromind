"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BrainCircuit } from "lucide-react";

interface GlossaryTermProps {
  term: string;
  definition?: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ term, definition, children }: GlossaryTermProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-primary/50 underline-offset-4 cursor-help text-foreground font-medium hover:text-primary transition-colors">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-4 bg-card border-border shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-primary" />
              <strong className="font-heading text-sm text-foreground">{term}</strong>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {definition || "AI definition loading..."}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
