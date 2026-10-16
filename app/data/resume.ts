export const RESUME = {
  name: "Utkarsh Gupta",
  headline: "Growth & Strategy",
  location: "Bengaluru, India",
  email: "ug4672@gmail.com",
  phone: "+91 7997083827",
  linkedin: "https://www.linkedin.com/in/gupta-utkarsh/",
  yearsOfExperience: 5,

  summary:
    "Growth & Strategy professional with 5+ years in high-growth startups. Currently driving $3.25M+ ARR at Interview Kickstart via alternative acquisition funnels, live masterclasses, and India/US expansion. Previously part of BrightCHAMPS' 0→$650M journey, leading email marketing, e-commerce, market expansion, and customer experience. Known for end-to-end execution, cross-functional leadership, and turning ideas into measurable business outcomes. Non-engineering by trade; ships internal AI tooling.",

  experience: [
    {
      company: "Interview Kickstart",
      role: "Growth & Strategy",
      location: "Remote",
      period: "Nov 2025 – present",
      context:
        "Advanced tech upskilling and FAANG+ interview prep for engineers globally.",
      bullets: [
        "Launched & scaled an India live-masterclass program to $750K+ ARR at 6x RoAS; lifted webinar attendance 12% via optimized email, AI bot calling, and end-to-end ownership of content strategy and sales handoff.",
        "Delivered $2.5M+ ARR at 5x RoAS on US lead-magnet + masterclass funnel; lifted webinar attendance 9% via optimized AI bot calls and email communications.",
        "Improved sales conversion 15% by deploying an AI qualification bot triggered post-registration that scores leads Hot/Warm/Cold and pushes structured CRM summaries.",
      ],
    },
    {
      company: "BrightCHAMPS",
      role: "Growth & Strategy",
      location: "Bengaluru, India",
      period: "Oct 2020 – Oct 2025",
      context: "Live learning for K-12 students globally. Scaled from $0 to $650M.",
      bullets: [
        "Piloted and scaled a hybrid learning center in Ho Chi Minh City (Vietnam), onboarding 800+ students in 6 months, led team of 18 → $600K ARR.",
        "Drove 25% of monthly demos and $800K ARR via segmented email/WhatsApp campaigns, cohort automation, A/B testing, lifecycle journeys (+15% CTR).",
        "Launched and scaled Shopify e-commerce platform for short courses → $200K ARR; expanded course offerings to diversify portfolio.",
        "Boosted Trustpilot rating 3.9 → 4.8 → $400K ARR via feedback loops, social media response optimization, led team of 2.",
        "Indonesia influencer partnerships → $80K revenue, −11% paid ad costs via localized content collaborations.",
        "International team competition for non-paid users + 2-day global certification bootcamp across 15+ countries → $500K ARR; owned end-to-end execution.",
      ],
    },
    {
      company: "Career Crucible",
      role: "Founding Team Member",
      location: "Hyderabad, India",
      period: "Nov 2016 – Jun 2018",
      context:
        "Peer-to-peer platform connecting college aspirants with senior consultants.",
      bullets: [
        "Helped 10,000+ students make informed college/career decisions via a network of 500+ consultants; generated $6K+ revenue in first cycle by building a telephonic platform connecting aspirants with undergraduates.",
      ],
    },
  ],

  education: [
    {
      degree: "BE, Electrical & Electronics Engineering",
      institution: "BITS Pilani, Hyderabad Campus",
      location: "Hyderabad, India",
      period: "2016–2020",
    },
  ],

  skills: {
    growth: [
      "Go-to-Market Strategy",
      "Funnel Optimization",
      "Market Expansion",
      "Email Marketing",
      "Lifecycle Marketing",
      "Customer Experience",
      "A/B Testing",
      "Stakeholder Management",
      "Strategic Planning",
    ],
    tools: [
      "BigQuery",
      "SQL",
      "HubSpot",
      "MoEngage",
      "Shopify",
      "Google Ads",
      "Meta Ads",
      "Data Analytics",
    ],
    building: [
      "Claude Code",
      "Next.js",
      "React",
      "Vercel",
      "Google Cloud Run",
      "Python",
      "AI/LLM tooling",
    ],
  },

  highlights: [
    "$3.25M+ ARR driven at Interview Kickstart",
    "Part of BrightCHAMPS' 0 → $650M journey",
    "Shipped multiple internal AI/ops tools despite non-engineering background",
    "Operated across India, US, Vietnam, Indonesia and 15+ countries",
  ],
} as const;

export function resumeAsText(): string {
  const r = RESUME;
  const lines: string[] = [];
  lines.push(`${r.name} — ${r.headline}`);
  lines.push(`${r.location} · ${r.email} · ${r.linkedin}`);
  lines.push("");
  lines.push("SUMMARY");
  lines.push(r.summary);
  lines.push("");
  lines.push("EXPERIENCE");
  for (const job of r.experience) {
    lines.push(`${job.role} — ${job.company} (${job.location}) · ${job.period}`);
    lines.push(job.context);
    for (const b of job.bullets) lines.push(`  • ${b}`);
    lines.push("");
  }
  lines.push("EDUCATION");
  for (const e of r.education) {
    lines.push(`${e.degree} — ${e.institution} · ${e.period}`);
  }
  lines.push("");
  lines.push("SKILLS");
  lines.push(`Growth: ${r.skills.growth.join(", ")}`);
  lines.push(`Tools: ${r.skills.tools.join(", ")}`);
  lines.push(`Building with AI: ${r.skills.building.join(", ")}`);
  return lines.join("\n");
}
