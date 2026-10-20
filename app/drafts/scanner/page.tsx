"use client";

import { useState } from "react";
import { Gate } from "../_gate";

type Breakdown = { score: number; note: string };
type Suggestion = { action: string; where: string; suggestion: string };
type ScanResult = {
  role: string;
  company: string | null;
  overall_score: number;
  verdict: string;
  breakdown: {
    skills_match: Breakdown;
    experience_match: Breakdown;
    domain_match: Breakdown;
    seniority_match: Breakdown;
  };
  strengths: string[];
  gaps: string[];
  tailoring_suggestions: Suggestion[];
  keywords_to_add: string[];
  red_flags: string[];
};

export default function ScannerPage() {
  return (
    <Gate>
      <Scanner />
    </Gate>
  );
}

function Scanner() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/scan", {
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

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <header className="mb-10">
        <p className="font-serif italic text-accent text-sm mb-2">— Private tool</p>
        <h1 className="font-serif text-5xl sm:text-6xl leading-tight">
          Know where <span className="italic text-accent">you stand.</span>
        </h1>
        <p className="mt-3 text-muted text-sm">
          Paste a JD → match score against your resume + how to tailor it.
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
            {loading ? "Analyzing…" : "Analyze →"}
          </button>
        </div>
      </section>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/40 p-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {result && <Results r={result} />}
    </main>
  );
}

function Results({ r }: { r: ScanResult }) {
  return (
    <section className="mt-10 space-y-6">
      {/* Score hero */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/15 dark:to-orange-900/10 p-6 sm:p-8 flex items-center gap-6 flex-wrap">
        <ScoreCircle score={r.overall_score} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-mono text-muted uppercase tracking-widest mb-1">
            {r.company ? `${r.role} · ${r.company}` : r.role}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight">
            {r.verdict}
          </h2>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(
          [
            ["Skills", r.breakdown.skills_match],
            ["Experience", r.breakdown.experience_match],
            ["Domain", r.breakdown.domain_match],
            ["Seniority", r.breakdown.seniority_match],
          ] as [string, Breakdown][]
        ).map(([label, b]) => (
          <div key={label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
            <p className="font-serif text-2xl text-accent mt-1">{b.score}</p>
            <p className="text-xs text-foreground/75 mt-1 leading-snug">{b.note}</p>
          </div>
        ))}
      </div>

      {/* Strengths + Gaps */}
      <div className="grid md:grid-cols-2 gap-5">
        <Card title="Strengths" tone="good">
          <ul className="space-y-2">
            {r.strengths.map((s, i) => (
              <Bullet key={i} tone="good">{s}</Bullet>
            ))}
          </ul>
        </Card>
        <Card title="Gaps" tone="warn">
          <ul className="space-y-2">
            {r.gaps.map((s, i) => (
              <Bullet key={i} tone="warn">{s}</Bullet>
            ))}
          </ul>
        </Card>
      </div>

      {/* Tailoring suggestions */}
      <Card title="How to tailor your resume for this JD">
        <ul className="space-y-4">
          {r.tailoring_suggestions.map((s, i) => (
            <li key={i} className="border-l-2 border-accent/50 pl-4">
              <p className="text-[10px] uppercase tracking-wider text-accent font-medium">
                {s.action}
              </p>
              <p className="text-sm font-medium text-foreground/80 mt-0.5">{s.where}</p>
              <p className="text-sm text-foreground/85 mt-1 leading-relaxed">{s.suggestion}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* Keywords */}
      {r.keywords_to_add.length > 0 && (
        <Card title="Keywords to add (ATS)">
          <div className="flex flex-wrap gap-2">
            {r.keywords_to_add.map((k) => (
              <span
                key={k}
                className="text-xs bg-background-2 border border-border rounded-full px-3 py-1.5 text-foreground/80"
              >
                {k}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Red flags */}
      {r.red_flags.length > 0 && (
        <Card title="Red flags" tone="warn">
          <ul className="space-y-2">
            {r.red_flags.map((s, i) => (
              <Bullet key={i} tone="warn">{s}</Bullet>
            ))}
          </ul>
        </Card>
      )}
    </section>
  );
}

function Card({
  title,
  tone,
  children,
}: {
  title: string;
  tone?: "good" | "warn";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "good"
      ? "border-emerald-200/70"
      : tone === "warn"
      ? "border-amber-200/70"
      : "border-border";
  return (
    <div className={`rounded-2xl border ${toneClass} bg-card p-5 sm:p-6`}>
      <h3 className="font-serif text-xl mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Bullet({ children, tone }: { children: React.ReactNode; tone?: "good" | "warn" }) {
  const dot = tone === "good" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-accent";
  return (
    <li className="pl-5 relative text-sm text-foreground/85 leading-relaxed">
      <span className={`absolute left-0 top-[0.5rem] block h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </li>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
  const color =
    pct >= 75 ? "text-emerald-600" : pct >= 50 ? "text-amber-600" : "text-rose-600";
  return (
    <div className="relative h-24 w-24 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="42" strokeWidth="8" className="stroke-border fill-none" />
        <circle
          cx="50"
          cy="50"
          r="42"
          strokeWidth="8"
          strokeLinecap="round"
          className={`fill-none ${color}`}
          stroke="currentColor"
          strokeDasharray={`${(pct / 100) * 264} 264`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-serif text-2xl ${color}`}>{pct}</span>
      </div>
    </div>
  );
}
