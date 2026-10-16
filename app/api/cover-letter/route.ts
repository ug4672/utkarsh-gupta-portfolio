import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { resumeAsText } from "@/app/data/resume";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You write cover letters for Utkarsh Gupta — a Growth & Strategy operator who ships internal AI tools despite a non-engineering background.

Voice:
- Direct, confident, metric-driven. Mirror the voice of his resume bullets.
- Specific, not generic. Reference concrete numbers from his resume ($3.25M+ ARR, $650M scale, 15+ countries, etc.) when relevant.
- Lead with the strongest match between him and the role in the first 2 sentences.
- Short: 180–240 words. 3 tight paragraphs max. No corporate filler. No "I am writing to express my interest."
- First-person, warm but not sycophantic. Avoid cliché openings.
- Close with a single clear next-step line.

Structure:
- Para 1: Hook — why this role fits him specifically (name a 1-2 concrete overlap with the JD).
- Para 2: 1-2 proof points from his resume that map to the JD's biggest requirements. Use real numbers.
- Para 3: Signal fit for the company / culture / mission + close.

Return STRICT JSON only:
{
  "role": "detected role title",
  "company": "detected company (or 'the team')",
  "cover_letter": "the full letter text with \\n\\n paragraph breaks",
  "opening_hook_note": "one line explaining the hook you picked and why"
}`;

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY not configured" },
      { status: 500 }
    );
  }

  let jd = "";
  try {
    const body = await req.json();
    jd = (body?.jd ?? "").toString().trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (jd.length < 50) {
    return NextResponse.json(
      { error: "JD too short — paste the full job description." },
      { status: 400 }
    );
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `RESUME:\n${resumeAsText()}\n\nJOB DESCRIPTION:\n${jd}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
