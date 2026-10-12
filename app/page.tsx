import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "$3.25M+", label: "ARR driven at Interview Kickstart" },
  { value: "$650M", label: "scaled from zero at BrightCHAMPS" },
  { value: "5+ yrs", label: "operating in high-growth startups" },
  { value: "15+", label: "countries shipped into" },
];

const nav = [
  { href: "#about", label: "About", num: "01" },
  { href: "#experience", label: "Experience", num: "02" },
  { href: "#projects", label: "Projects", num: "03" },
  { href: "#skills", label: "Skills", num: "04" },
  { href: "#education", label: "Education", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

const experience = [
  {
    company: "Interview Kickstart",
    domain: "interviewkickstart.com",
    role: "Growth & Strategy",
    location: "Remote",
    period: "Nov 2025 – present",
    blurb: "Advanced tech upskilling and FAANG+ interview prep for engineers globally.",
    bullets: [
      "Launched & scaled an India live-masterclass program to $750K+ ARR at 6x RoAS; lifted webinar attendance 12% via optimized email, AI bot calling, and end-to-end content + sales handoff.",
      "Delivered $2.5M+ ARR at 5x RoAS on the US lead-magnet + masterclass funnel; lifted webinar attendance 9%.",
      "Improved sales conversion 15% by deploying a post-registration AI qualification bot that scores leads Hot/Warm/Cold and pushes structured summaries to CRM.",
    ],
    tags: ["Masterclasses", "Lead magnets", "AI bots", "Funnel ops"],
  },
  {
    company: "BrightCHAMPS",
    domain: "brightchamps.com",
    role: "Growth & Strategy",
    location: "Bengaluru",
    period: "Oct 2020 – Oct 2025",
    blurb: "Live learning for K-12 students globally. Part of the journey from $0 to $650M.",
    bullets: [
      "Piloted and scaled a hybrid learning center in Ho Chi Minh City, onboarding 800+ students in 6 months, leading a team of 18 → $600K ARR.",
      "Drove 25% of monthly demos and $800K ARR via segmented email/WhatsApp campaigns, cohort automation and A/B testing (+15% CTR).",
      "Launched and scaled a Shopify e-commerce funnel for short courses → $200K ARR.",
      "Lifted Trustpilot rating 3.9 → 4.8, contributing $400K ARR uplift.",
      "Ran Indonesia influencer program → $80K revenue, −11% paid CAC.",
      "Launched international team competition + 2-day global certification bootcamp across 15+ countries → $500K ARR.",
    ],
    tags: ["Email", "E-commerce", "CX", "Market expansion", "Influencer"],
  },
  {
    company: "Career Crucible",
    domain: null,
    role: "Founding Team Member",
    location: "Hyderabad",
    period: "Nov 2016 – Jun 2018",
    blurb: "Peer-to-peer platform connecting college aspirants with senior consultants.",
    bullets: [
      "Built a telephonic platform connecting 10,000+ aspirants with 500+ consultants; generated $6K+ revenue in the first cycle.",
    ],
    tags: ["0→1", "Marketplace"],
  },
];

const projects = [
  {
    name: "AI Qualification Bot",
    year: "2025",
    tag: "In production @ IK",
    description:
      "Post-registration voice bot that qualifies leads in real time and writes structured Hot/Warm/Cold summaries to CRM.",
    metric: "+15% sales conversion",
    emoji: "🤖",
    gradient: "from-orange-200 via-rose-200 to-pink-200",
  },
  {
    name: "Masterclass Automation Tool",
    year: "2025",
    tag: "Internal · BigQuery + Cloud Run",
    description:
      "Three-tab operator console (Create Event, Leads, Attendance) replacing manual data pulls for the masterclass program.",
    metric: "Hours saved weekly",
    emoji: "⚙️",
    gradient: "from-amber-200 via-orange-200 to-rose-200",
  },
  {
    name: "Fifthstar / Reviewly",
    year: "2025",
    tag: "Side project · Next.js",
    description:
      "Review-collection SaaS that helps small businesses capture Google reviews on autopilot.",
    metric: "Live in distribution",
    emoji: "⭐",
    gradient: "from-yellow-200 via-amber-200 to-orange-200",
    link: "https://fifthstar-app.vercel.app",
  },
];

const skills = [
  {
    heading: "Growth",
    items: ["GTM strategy", "Funnel optimization", "Market expansion", "Email / lifecycle", "A/B testing", "CX"],
  },
  {
    heading: "Tools",
    items: ["BigQuery", "SQL", "HubSpot", "MoEngage", "Shopify", "Google & Meta Ads"],
  },
  {
    heading: "Building with AI",
    items: ["Claude Code", "Next.js", "Vercel", "Cloud Run", "Python", "React"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="#top" className="font-serif text-lg italic text-accent">
            UG.
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-foreground/70 hover:text-accent transition flex items-center gap-1.5"
              >
                <span className="text-[10px] font-mono text-muted">{n.num}</span>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href="https://cal.com/utkarsh-gupta/30min"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium hover:bg-accent transition"
          >
            Book a call →
          </Link>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24 flex-1">
        {/* HERO — 2 column */}
        <section className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 fade-up">
          <div className="lg:col-span-8">
            <p className="font-serif italic text-accent text-lg mb-4">— Hello, I&rsquo;m</p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
              Utkarsh
              <br />
              <span className="italic text-accent">Gupta.</span>
            </h1>
            <p className="mt-8 text-xl sm:text-2xl text-foreground/80 leading-snug font-serif max-w-xl">
              A Growth & Strategy operator who builds acquisition funnels —{" "}
              <span className="italic text-accent">and the AI tools that run them.</span>
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Based in Bengaluru · available for conversations</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink href="https://cal.com/utkarsh-gupta/30min" external>
                Book a 1:1 call →
              </PrimaryLink>
              <GhostLink href="mailto:ug4672@gmail.com">
                <MailIcon /> Email
              </GhostLink>
              <GhostLink href="https://www.linkedin.com/in/gupta-utkarsh/" external>
                <LinkedInIcon /> LinkedIn
              </GhostLink>
            </div>
          </div>

          {/* Right: Photo */}
          <aside className="lg:col-span-4 lg:mt-6 flex justify-center lg:justify-start">
            <div className="relative w-56 sm:w-64 lg:w-full lg:max-w-[18rem]">
              <div className="absolute -inset-3 bg-gradient-to-br from-amber-200/50 via-orange-200/40 to-rose-200/30 rounded-full blur-2xl" />
              <div className="relative aspect-square rounded-full overflow-hidden border border-border shadow-xl">
                <Image
                  src="/utkarsh.jpg"
                  alt="Utkarsh Gupta"
                  fill
                  priority
                  sizes="(min-width: 1024px) 288px, 256px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 rounded-full bg-card border border-border px-3 py-1.5 shadow-md flex items-center gap-2 text-xs">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Open to chats</span>
              </div>
            </div>
          </aside>
        </section>

        {/* Stats strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border mb-10 fade-up">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6 text-center">
              <div className="font-serif text-3xl sm:text-4xl text-accent leading-none">{s.value}</div>
              <div className="mt-3 text-xs text-muted leading-tight">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Brand strip */}
        <section className="mb-24">
          <p className="text-[11px] font-mono text-muted uppercase tracking-widest text-center mb-5">
            — Previously at —
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-80">
            {experience.map((job) => (
              <div key={job.company} className="flex items-center gap-2.5 grayscale hover:grayscale-0 transition">
                <CompanyLogo domain={job.domain} name={job.company} size="md" />
                <span className="font-serif text-lg text-foreground/80">{job.company}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" eyebrow="01" title="About" subtitle="Operator-builder from Bengaluru">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-foreground/85">
              <p>
                I&rsquo;m a Growth & Strategy operator with 5+ years in high-growth startups. Currently at{" "}
                <Highlight>Interview Kickstart</Highlight>, where I own alternative acquisition funnels — live
                masterclasses, lead magnets, and the AI tooling behind them — driving{" "}
                <Highlight>$3.25M+ ARR</Highlight> across India and the US.
              </p>
              <p>
                Before IK, I was part of <Highlight>BrightCHAMPS&rsquo;</Highlight> journey from{" "}
                <Highlight>$0 to $650M</Highlight> — running email marketing, e-commerce, market expansion
                (including a hybrid learning center in Vietnam) and customer experience.
              </p>
            </div>
            <aside className="lg:col-span-5">
              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-border p-6">
                <p className="text-[11px] font-mono text-muted uppercase tracking-widest mb-5">
                  — Companies I&rsquo;ve helped build —
                </p>
                <ul className="space-y-4">
                  {experience.map((job) => (
                    <li
                      key={job.company}
                      className="flex items-center gap-3 pb-4 last:pb-0 border-b border-border/60 last:border-0"
                    >
                      <CompanyLogo domain={job.domain} name={job.company} size="md" />
                      <div className="min-w-0">
                        <p className="font-serif text-lg leading-tight">{job.company}</p>
                        <p className="text-xs text-muted mt-0.5">{job.period}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" eyebrow="02" title="Experience" subtitle="Where I&rsquo;ve shipped">
          <div className="space-y-10">
            {experience.map((job) => (
              <article
                key={job.company}
                className="grid lg:grid-cols-12 gap-6 lg:gap-10 rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-accent/40 transition-colors"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-3">
                    <CompanyLogo domain={job.domain} name={job.company} />
                    <div>
                      <p className="text-accent font-medium leading-tight">{job.company}</p>
                      <p className="text-[11px] text-muted">{job.location}</p>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-muted mb-2">{job.period}</p>
                  <h3 className="font-serif text-2xl">{job.role}</h3>
                  <p className="text-sm text-muted italic mt-3 leading-relaxed">{job.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-wider bg-background-2 border border-border rounded-full px-2 py-0.5 text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="lg:col-span-8 space-y-3">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="pl-5 relative text-foreground/85 leading-relaxed">
                      <span className="absolute left-0 top-[0.7rem] block h-1.5 w-1.5 rounded-full bg-accent/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" eyebrow="03" title="Projects" subtitle="The I-build-with-AI layer">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.name}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col"
              >
                <div className={`h-32 bg-gradient-to-br ${p.gradient} relative flex items-center justify-center overflow-hidden`}>
                  <span className="text-5xl drop-shadow-sm">{p.emoji}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <header className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-serif text-xl">
                      {p.link ? (
                        <Link
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="group-hover:text-accent transition"
                        >
                          {p.name} <span className="text-sm">↗</span>
                        </Link>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <span className="text-xs text-muted font-mono">{p.year}</span>
                  </header>
                  <p className="text-[10px] uppercase tracking-wider text-accent mb-3 font-medium">
                    {p.tag}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed flex-1">{p.description}</p>
                  <p className="mt-4 pt-4 border-t border-border text-xs font-mono text-foreground/70">
                    → {p.metric}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" eyebrow="04" title="Skills" subtitle="How I actually work">
          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((group) => (
              <div
                key={group.heading}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-serif text-2xl mb-4 text-accent">{group.heading}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li
                      key={s}
                      className="text-xs bg-background-2 border border-border rounded-full px-3 py-1.5 text-foreground/80"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" eyebrow="05" title="Education">
          <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-5 max-w-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.google.com/s2/favicons?domain=bits-pilani.ac.in&sz=128"
              alt="BITS Pilani logo"
              width={56}
              height={56}
              className="rounded-xl border border-border bg-white object-contain flex-shrink-0"
              style={{ width: 56, height: 56 }}
            />
            <div>
              <h3 className="font-serif text-xl">BE, Electrical & Electronics Engineering</h3>
              <p className="text-muted text-sm mt-1">BITS Pilani, Hyderabad Campus · 2016–2020</p>
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" eyebrow="06" title="Get in touch">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-rose-300/20 blur-3xl" />
            <p className="relative font-serif text-3xl sm:text-4xl mb-4 leading-tight max-w-2xl mx-auto">
              Working on something at the intersection of{" "}
              <span className="italic text-accent">growth and AI?</span>
            </p>
            <p className="relative text-muted mb-8">I&rsquo;m happy to chat — pick a time or drop a line.</p>
            <div className="relative flex flex-wrap gap-3 justify-center">
              <PrimaryLink href="https://cal.com/utkarsh-gupta/30min" external>
                Book a 1:1 call →
              </PrimaryLink>
              <GhostLink href="mailto:ug4672@gmail.com">
                <MailIcon /> ug4672@gmail.com
              </GhostLink>
              <GhostLink href="https://www.linkedin.com/in/gupta-utkarsh/" external>
                <LinkedInIcon /> LinkedIn
              </GhostLink>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border mt-10">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-wrap gap-3 justify-between text-xs text-muted">
          <span>© 2026 Utkarsh Gupta</span>
          <span className="italic">Built with Next.js + Claude Code · Bengaluru → World</span>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-24 scroll-mt-24">
      <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          {eyebrow && (
            <p className="text-xs text-muted font-mono tracking-widest mb-1">— {eyebrow}</p>
          )}
          <h2 className="font-serif text-4xl sm:text-5xl">{title}</h2>
          {subtitle && <p className="text-sm text-muted mt-2 italic">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-1.5 inline-block flex-shrink-0"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      className="mr-1.5 inline-block flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CompanyLogo({
  domain,
  name,
  size = "sm",
}: {
  domain: string | null;
  name: string;
  size?: "sm" | "md";
}) {
  const dim = size === "md" ? 36 : 28;
  const monogram = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  if (!domain) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-lg bg-accent/10 text-accent font-serif flex-shrink-0"
        style={{ width: dim, height: dim, fontSize: size === "md" ? 14 : 12 }}
      >
        {monogram}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
      alt={`${name} logo`}
      width={dim}
      height={dim}
      className="rounded-lg border border-border bg-white flex-shrink-0 object-contain"
      style={{ width: dim, height: dim }}
    />
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-foreground bg-accent/10 px-1.5 py-0.5 rounded">
      {children}
    </span>
  );
}

function PrimaryLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-accent hover:scale-105 transition-all duration-200 shadow-sm"
    >
      {children}
    </Link>
  );
}

function GhostLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center rounded-full border border-border bg-card/80 backdrop-blur px-6 py-3 text-sm hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
    >
      {children}
    </Link>
  );
}
