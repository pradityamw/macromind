"use client";

import Link from "next/link";
import { Newspaper, BookOpen, Bookmark, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/store/language";

export function Sidebar() {
  const pathname = usePathname();
  const { language } = useLanguageStore();

  const navItems = [
    { href: `/dashboard?lang=${language}`, label: language === 'en' ? "My Feed" : "Beritaku", icon: Newspaper },
    { href: `/learn?lang=${language}`, label: language === 'en' ? "Learn" : "Belajar", icon: BookOpen },
    { href: `/saved?lang=${language}`, label: language === 'en' ? "Saved" : "Tersimpan", icon: Bookmark },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-background hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary font-heading">MacroMind</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium gap-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href.split('?')[0]);
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-foreground hover:bg-accent/50 ${isActive ? 'bg-accent text-foreground' : 'text-muted-foreground'}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 mt-auto">
          <Link 
            href="/settings" 
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-foreground hover:bg-accent/50 ${pathname.startsWith("/settings") ? 'bg-accent text-foreground' : 'text-muted-foreground'}`}
          >
            <Settings className="h-4 w-4" />
            {language === 'en' ? 'Settings' : 'Pengaturan'}
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/60 flex items-center justify-around px-2 h-16 safe-area-pb">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href.split('?')[0]);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${pathname.startsWith("/settings") ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Settings className={`h-5 w-5 ${pathname.startsWith("/settings") ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] font-medium">{language === 'en' ? 'Settings' : 'Setelan'}</span>
        </Link>
      </nav>
    </>
  );
}

