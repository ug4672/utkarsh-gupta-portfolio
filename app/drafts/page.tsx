"use client";

import Link from "next/link";
import { Gate } from "./_gate";

const tools = [
  {
    href: "/drafts/scanner",
    title: "Know Where You Stand for Any Role",
    body: "Paste a job description. See how your resume scores, where the gaps are, and get concrete tailoring suggestions to improve shortlist odds.",
    cta: "Open scanner →",
    emoji: "🎯",
    gradient: "from-amber-200/50 to-orange-200/40",
  },
  {
    href: "/drafts/cover-letter",
    title: "A Cover Letter for Every Application",
    body: "Paste a job description and get a tailored draft that sounds like you. Reuse the generator for each role you apply to.",
    cta: "Open generator →",
    emoji: "✉️",
    gradient: "from-rose-200/50 to-orange-200/40",
  },
];

export default function Drafts() {
  return (
    <Gate>
      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-12">
          <p className="font-serif italic text-accent text-sm mb-2">— Private drafts</p>
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight">
            Tools, in progress.
          </h1>
          <p className="mt-3 text-muted text-sm">
            Personal tools that use your resume + the Claude/OpenAI API. Only visible to you.
          </p>
        </header>

        <div className="space-y-6">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/50 hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-stretch">
                <div
                  className={`w-20 sm:w-28 bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-3xl sm:text-4xl">{t.emoji}</span>
                </div>
                <div className="p-5 sm:p-7 flex-1">
                  <h2 className="font-serif text-xl sm:text-2xl mb-2">{t.title}</h2>
                  <p className="text-sm text-foreground/80 leading-relaxed">{t.body}</p>
                  <p className="mt-4 text-sm font-medium text-accent group-hover:underline">
                    {t.cta}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-border text-xs text-muted">
          <Link href="/" className="hover:text-accent">← back to portfolio</Link>
        </footer>
      </main>
    </Gate>
  );
}
