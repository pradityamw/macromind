"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Newspaper, BookOpen, Bookmark, Settings, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/store/language";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguageStore();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/dashboard?lang=${language}`, label: language === 'en' ? "My Feed" : "Beritaku", icon: Newspaper },
    { href: `/learn?lang=${language}`, label: language === 'en' ? "Learn" : "Belajar", icon: BookOpen },
    { href: `/saved?lang=${language}`, label: language === 'en' ? "Saved" : "Tersimpan", icon: Bookmark },
    { href: "/settings", label: language === 'en' ? "Settings" : "Pengaturan", icon: Settings },
  ];

  return (
    <>
      {/* Hamburger Button - mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Full-screen portal overlay + drawer */}
      {isOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, height: "100vh", width: "100vw" }}
        >
          {/* Dark overlay */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", height: "100vh", width: "100vw" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar drawer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "280px",
              backgroundColor: "#111111",
              borderRight: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "8px 0 32px rgba(0,0,0,0.9)",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, fontSize: "22px", color: "hsl(var(--primary))", fontFamily: "var(--font-heading, sans-serif)", textDecoration: "none" }}>
                MacroMind
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                style={{ padding: "8px", borderRadius: "6px", background: "transparent", border: "none", color: "#888", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href.split('?')[0]);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      background: isActive ? "rgba(var(--primary-rgb, 99,102,241), 0.15)" : "transparent",
                      color: isActive ? "hsl(var(--primary))" : "#aaa",
                      border: isActive ? "1px solid rgba(var(--primary-rgb, 99,102,241), 0.3)" : "1px solid transparent",
                      transition: "all 0.15s",
                    }}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
