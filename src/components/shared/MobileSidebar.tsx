"use client";

import { useState } from "react";
import Link from "next/link";
import { Newspaper, BookOpen, Bookmark, Settings, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/store/language";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguageStore();

  const navItems = [
    { href: `/dashboard?lang=${language}`, label: language === 'en' ? "My Feed" : "Beritaku", icon: Newspaper },
    { href: `/learn?lang=${language}`, label: language === 'en' ? "Learn" : "Belajar", icon: BookOpen },
    { href: `/saved?lang=${language}`, label: language === 'en' ? "Saved" : "Tersimpan", icon: Bookmark },
    { href: "/settings", label: language === 'en' ? "Settings" : "Pengaturan", icon: Settings },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-border shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <span className="font-bold text-2xl text-primary font-heading">MacroMind</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 p-4 pt-6">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href.split('?')[0]);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
