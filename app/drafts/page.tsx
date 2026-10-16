"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

const ANSWER = "issyk kul";
const STORAGE_KEY = "ug-drafts-unlocked";

const drafts = [
  {
    title: "Know Where You Stand for Any Role",
    body: "Paste a job description, or choose a role from IK's analysis of 10,000+ US job postings. See how your resume scores, where the gaps are, and leave with an interview plan and a study plan to close them.",
  },
  {
    title: "A Cover Letter for Every Application",
    body: "Paste a job description and get a tailored draft that sounds like you. Reuse the generator for each role you apply to.",
  },
];

export default function Drafts() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
      setUnlocked(true);
    }
    setReady(true);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === ANSWER) {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  function lock() {
    localStorage.removeItem(STORAGE_KEY);
    setUnlocked(false);
    setInput("");
  }

  if (!ready) return null;

  if (!unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-sm"
        >
          <p className="font-serif italic text-accent text-sm mb-2">— Private</p>
          <h1 className="font-serif text-3xl mb-6 leading-tight">
            One quick question.
          </h1>
          <label className="block text-sm text-foreground/80 mb-2">
            Favourite lake?
          </label>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            placeholder="Type your answer"
          />
          {error && (
            <p className="mt-2 text-xs text-red-600">Not quite. Try again.</p>
          )}
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-accent transition"
          >
            Enter
          </button>
          <p className="mt-5 text-xs text-muted text-center">
            <Link href="/" className="hover:text-accent">← back to portfolio</Link>
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12 flex items-start justify-between gap-4">
        <div>
          <p className="font-serif italic text-accent text-sm mb-2">— Private drafts</p>
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight">
            Ideas in progress.
          </h1>
          <p className="mt-3 text-muted text-sm">
            Rough product/content notes · only visible to you
          </p>
        </div>
        <button
          onClick={lock}
          aria-label="Lock"
          title="Lock"
          className="mt-3 inline-flex items-center justify-center h-9 w-9 rounded-full border border-border text-muted hover:text-accent hover:border-accent transition flex-shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </button>
      </header>

      <div className="space-y-8">
        {drafts.map((d) => (
          <article
            key={d.title}
            className="rounded-2xl border border-border bg-card p-7 sm:p-8"
          >
            <h2 className="font-serif text-2xl sm:text-3xl mb-3">{d.title}</h2>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/85">
              {d.body}
            </p>
          </article>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-border text-xs text-muted">
        <Link href="/" className="hover:text-accent">← back to portfolio</Link>
      </footer>
    </main>
  );
}
