import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/lib/notion";
import { SiteHeader } from "../../_header";

export const instant = false;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Travel`,
    description: post.summary || `Travel notes from ${post.location}`,
    openGraph: post.cover ? { images: [post.cover] } : undefined,
  };
}

function formatDate(d: string | null): string {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function TravelPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {post.cover && (
          <div className="relative w-full aspect-[21/9] max-h-[70vh] bg-background-2 overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/0 to-transparent" />
          </div>
        )}

        <article className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
          <header className="mb-10">
            <div className="flex items-baseline gap-2 text-sm text-muted mb-3">
              {post.location && <span>{post.location}</span>}
              {post.location && post.date && <span>·</span>}
              {post.date && <span>{formatDate(post.date)}</span>}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              {post.title}
            </h1>
            {post.summary && (
              <p className="mt-5 text-xl text-foreground/80 font-serif italic leading-snug">
                {post.summary}
              </p>
            )}
          </header>

          <div className="prose-travel">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2 className="font-serif text-3xl mt-10 mb-4">{children}</h2>
                ),
                h2: ({ children }) => (
                  <h2 className="font-serif text-2xl mt-10 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl mt-8 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-[17px] text-foreground/85 leading-[1.75] mb-5">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent/60 pl-5 my-6 font-serif italic text-lg text-foreground/80">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-5 space-y-2 text-[17px] text-foreground/85 leading-[1.65] marker:text-accent">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-5 space-y-2 text-[17px] text-foreground/85 leading-[1.65] marker:text-accent">
                    {children}
                  </ol>
                ),
                img: ({ src, alt }) =>
                  src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src.toString()}
                      alt={alt ?? ""}
                      className="rounded-xl my-8 w-full"
                    />
                  ) : null,
                code: ({ children }) => (
                  <code className="bg-background-2 border border-border rounded px-1.5 py-0.5 text-sm font-mono">
                    {children}
                  </code>
                ),
                hr: () => <hr className="my-10 border-border" />,
              }}
            >
              {post.markdown}
            </ReactMarkdown>
          </div>

          <footer className="mt-16 pt-8 border-t border-border text-sm">
            <Link href="/travel" className="text-muted hover:text-accent">
              ← all travel
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
