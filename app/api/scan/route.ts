import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { resumeAsText } from "@/app/data/resume";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a senior recruiter + resume coach for growth/strategy and product-adjacent roles. You're reviewing Utkarsh Gupta's resume against a specific job description.

Return STRICT JSON only. No prose outside JSON.

The JSON shape must be:
{
  "role": "detected role title",
  "company": "detected company (or null)",
  "overall_score": 0-100,
  "verdict": "one-line call: strong fit / stretch / likely pass / wrong fit",
  "breakdown": {
    "skills_match": { "score": 0-100, "note": "one-line" },
    "experience_match": { "score": 0-100, "note": "one-line" },
    "domain_match": { "score": 0-100, "note": "one-line" },
    "seniority_match": { "score": 0-100, "note": "one-line" }
  },
  "strengths": ["3-5 bullets of what makes the resume compelling for THIS JD"],
  "gaps": ["3-5 bullets of what's missing or weak vs the JD, ranked by importance"],
  "tailoring_suggestions": [
    {
      "action": "rewrite|add|emphasize|reframe",
      "where": "which bullet or section",
      "suggestion": "concrete change to make — specific words/phrasing when possible"
    }
  ],
  "keywords_to_add": ["5-10 ATS-relevant keywords from the JD that should appear in the tailored resume"],
  "red_flags": ["things that might get the resume rejected by ATS or recruiter — can be empty"]
}

Be honest. If the fit is bad, say so. If the resume is strong, say so. No hedging.`;

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
      temperature: 0.2,
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
