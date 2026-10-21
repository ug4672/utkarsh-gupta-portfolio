"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const nav = [
  { href: "/#about", label: "About", num: "01" },
  { href: "/#experience", label: "Experience", num: "02" },
  { href: "/#projects", label: "Projects", num: "03" },
  { href: "/travel", label: "Travel", num: "04" },
  { href: "/#contact", label: "Contact", num: "05" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <Link href="#top" className="font-serif text-lg italic text-accent">
          UG.
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="group text-foreground/70 hover:text-accent transition flex items-center gap-1.5 relative"
            >
              <span className="text-[10px] font-mono text-muted group-hover:text-accent transition">{n.num}</span>
              <span className="relative">
                {n.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-accent group-hover:w-full transition-all duration-300 ease-out" />
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="https://cal.com/utkarsh-gupta/30min"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium hover:bg-accent transition"
          >
            Book a 1:1 call →
          </Link>
        </div>
      </div>
    </header>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      title="Toggle theme"
      className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card text-muted hover:text-accent hover:border-accent transition"
    >
      {mounted && theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
