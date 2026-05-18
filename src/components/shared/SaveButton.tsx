"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useStore, SavedItem } from "@/store/useStore";
import { useEffect, useState } from "react";

interface SaveButtonProps {
  item: Omit<SavedItem, "savedAt">;
  variant?: "outline" | "ghost" | "default" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function SaveButton({ item, variant = "outline", size = "sm" }: SaveButtonProps) {
  const { isSaved, saveItem, removeItem } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size={size} disabled className="gap-2">
        <Bookmark className="h-4 w-4" />
        Save
      </Button>
    );
  }

  const saved = isSaved(item.id);

  const toggleSave = () => {
    if (saved) {
      removeItem(item.id);
    } else {
      saveItem(item);
    }
  };

  return (
    <Button 
      variant={saved ? "secondary" : variant} 
      size={size} 
      onClick={toggleSave}
      className="gap-2"
    >
      {saved ? <BookmarkCheck className="h-4 w-4 text-emerald-500" /> : <Bookmark className="h-4 w-4 text-primary" />}
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
