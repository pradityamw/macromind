"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguageStore } from "@/store/language";

export function Navbar() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href={`/dashboard?lang=${language}`} className="flex items-center space-x-2 md:hidden">
            <span className="font-bold text-xl text-primary font-heading pl-4">MacroMind</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-4">
            <Link href={`/dashboard?lang=${language}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {language === 'en' ? 'Feed' : 'Berita'}
            </Link>
            <Link href={`/learn?lang=${language}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {language === 'en' ? 'Learn' : 'Belajar'}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleLanguage}
            className="text-xs font-bold h-8"
          >
            {language === 'en' ? 'EN' : 'ID'}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
