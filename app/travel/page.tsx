import Link from "next/link";
import Image from "next/image";
import { getPosts, isConfigured } from "@/lib/notion";
import { SiteHeader } from "../_header";

export const instant = false;

export const metadata = {
  title: "Travel — Utkarsh Gupta",
  description: "Notes from trips, cities, and detours.",
};

function formatDate(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function TravelIndex() {
  const configured = isConfigured();
  const posts = configured ? await getPosts() : [];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24 flex-1">
        <header className="mb-14">
          <p className="font-serif italic text-accent text-lg mb-3">— Travel</p>
          <h1 className="font-serif text-6xl sm:text-7xl leading-[0.95] tracking-tight">
            Places I&rsquo;ve been.
            <br />
            <span className="italic text-accent">And loved.</span>
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-2xl leading-relaxed">
            Trip notes, cities, people, and the occasional misadventure. Light on
            logistics, heavy on what stuck.
          </p>
        </header>

        {!configured && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-serif text-xl mb-2">Blog coming online shortly.</p>
            <p className="text-sm text-muted">
              Hooking Notion up to this page — first posts drop soon.
            </p>
          </div>
        )}

        {configured && posts.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-serif text-xl mb-2">First trip loading…</p>
            <p className="text-sm text-muted">
              No published posts yet in Notion. Flip &ldquo;Published&rdquo; on a page
              and it&rsquo;ll show up here within 5 minutes.
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/travel/${p.slug}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/50 hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-background-2 overflow-hidden">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-amber-200/60 via-orange-200/40 to-rose-200/40 dark:brightness-75 flex items-center justify-center text-4xl">
                      ✈️
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-baseline gap-2 text-xs text-muted mb-1">
                    {p.location && <span>{p.location}</span>}
                    {p.location && p.date && <span>·</span>}
                    {p.date && <span>{formatDate(p.date)}</span>}
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl group-hover:text-accent transition">
                    {p.title}
                  </h2>
                  {p.summary && (
                    <p className="mt-2 text-sm text-foreground/80 leading-relaxed line-clamp-3">
                      {p.summary}
                    </p>
                  )}
                  <p className="mt-4 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition">
                    Read →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <footer className="mt-20 pt-8 border-t border-border text-xs text-muted">
          <Link href="/" className="hover:text-accent">← back to portfolio</Link>
        </footer>
      </main>
    </div>
  );
}
