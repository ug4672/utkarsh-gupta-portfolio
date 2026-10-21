"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "article";
  className?: string;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    transitionDelay: visible ? `${delay}ms` : "0ms",
  } as React.CSSProperties;

  const base =
    "transition-all duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-[opacity,transform]";
  const state = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={style}
      className={`${base} ${state} ${className}`}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  text: string;
  delay?: number;
  step?: number;
  className?: string;
  italicize?: string[]; // words to italicize
  accent?: string[]; // words to color with accent
};

export function StaggerWords({
  text,
  delay = 0,
  step = 90,
  className = "",
  italicize = [],
  accent = [],
}: StaggerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((w, i) => {
        const clean = w.replace(/[.,!?;:]/g, "");
        const isItalic = italicize.includes(clean);
        const isAccent = accent.includes(clean);
        return (
          <span
            key={`${w}-${i}`}
            style={{
              transitionDelay: mounted ? `${delay + i * step}ms` : "0ms",
            }}
            className={`inline-block transition-all duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-[opacity,transform] ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } ${isItalic ? "italic" : ""} ${isAccent ? "text-accent" : ""}`}
          >
            {w}
            {i < words.length - 1 && <>&nbsp;</>}
          </span>
        );
      })}
    </span>
  );
}

