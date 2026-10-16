"use client";

import { useState, useEffect, FormEvent, ReactNode } from "react";
import Link from "next/link";

export const ANSWER = "issyk kul";
export const STORAGE_KEY = "ug-drafts-unlocked";

export function useUnlocked() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
      setUnlocked(true);
    }
    setReady(true);
  }, []);
  return {
    unlocked,
    ready,
    unlock: () => {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    },
    lock: () => {
      localStorage.removeItem(STORAGE_KEY);
      setUnlocked(false);
    },
  };
}

export function Gate({ children }: { children: ReactNode }) {
  const { unlocked, ready, unlock, lock } = useUnlocked();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === ANSWER) {
      unlock();
      setError(false);
    } else {
      setError(true);
    }
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
            type="password"
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
    <>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/drafts"
          className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-border bg-card text-xs text-muted hover:text-accent hover:border-accent transition"
        >
          ← drafts
        </Link>
        <button
          onClick={lock}
          aria-label="Lock"
          title="Lock"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card text-muted hover:text-accent hover:border-accent transition"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </button>
      </div>
      {children}
    </>
  );
}
