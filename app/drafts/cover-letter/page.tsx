"use client";

import { useState } from "react";
import { Gate } from "../_gate";

type Result = {
  role: string;
  company: string;
  cover_letter: string;
  opening_hook_note: string;
};

export default function CoverLetterPage() {
  return (
    <Gate>
      <CoverLetter />
    </Gate>
  );
}

function CoverLetter() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  async function run() {
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function copyLetter() {
    if (!result) return;
    await navigator.clipboard.writeText(result.cover_letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <header className="mb-10">
        <p className="font-serif italic text-accent text-sm mb-2">— Private tool</p>
        <h1 className="font-serif text-5xl sm:text-6xl leading-tight">
          A cover letter for <span className="italic text-accent">every application.</span>
        </h1>
        <p className="mt-3 text-muted text-sm">
          Paste a JD → tailored draft in your voice. Edit before you send.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <label className="block text-sm font-medium mb-2">Job description</label>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the full job description here…"
          rows={10}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent resize-y font-mono"
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-muted">{jd.length.toLocaleString()} chars</p>
          <button
            onClick={run}
            disabled={loading || jd.trim().length < 50}
            className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-accent transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Generating…" : "Generate →"}
          </button>
        </div>
      </section>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <section className="mt-8 space-y-5">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-amber-50 to-orange-50 p-5">
            <p className="text-[10px] uppercase tracking-wider text-accent font-medium">
              Opening hook
            </p>
            <p className="text-sm text-foreground/85 mt-1 italic leading-relaxed">
              {result.opening_hook_note}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <header className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-border">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted">
                  Cover letter · {result.role} @ {result.company}
                </p>
                <p className="text-xs text-muted mt-1">
                  {result.cover_letter.trim().split(/\s+/).length} words
                </p>
              </div>
              <button
                onClick={copyLetter}
                className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-xs hover:border-accent hover:text-accent transition flex-shrink-0"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </header>
            <article className="whitespace-pre-wrap leading-relaxed text-foreground/90 text-[15px] font-serif">
              {result.cover_letter}
            </article>
          </div>
        </section>
      )}
    </main>
  );
}
