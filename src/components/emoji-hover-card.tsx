"use client";

import Link from "next/link";
import { ArrowRight, Copy } from "lucide-react";
import type { Emoji } from "@/lib/emoji";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

interface EmojiHoverCardProps {
  emoji: Emoji;
  onCopy: (emoji: Emoji) => void;
}

export function EmojiHoverCard({ emoji, onCopy }: EmojiHoverCardProps) {
  return (
    <HoverCard delay={200} closeDelay={150}>
      <HoverCardTrigger
        onClick={() => onCopy(emoji)}
        className="group relative flex items-center justify-center text-2xl sm:text-3xl p-2 rounded-lg hover:bg-muted transition-all active:scale-90 cursor-pointer"
      >
        <span className="group-hover:scale-110 transition-transform">
          {emoji.emoji}
        </span>
      </HoverCardTrigger>
      <HoverCardContent 
        side="top" 
        className="w-64 p-4 shadow-xl border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        <div className="flex justify-between items-start space-x-4 mb-4">
          <div className="space-y-1 overflow-hidden">
            <h4 className="text-sm font-semibold capitalize truncate">{emoji.name}</h4>
            <p className="text-xs text-muted-foreground font-mono">
              {emoji.unicode}
            </p>
          </div>
          <div className="text-4xl leading-none flex-shrink-0">
            {emoji.emoji}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 cursor-copy"
            onClick={(e) => {
              e.stopPropagation();
              onCopy(emoji);
            }}
          >
            <Copy className="mr-2 h-3.5 w-3.5" />
            Copy
          </Button>
          <Button 
            asChild 
            variant="default" 
            size="sm" 
            className="flex-1"
          >
            <Link href={`/emoji/${emoji.slug}`}>
              Details
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
