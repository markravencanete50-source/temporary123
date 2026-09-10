import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

import { equipmentContextText, equipmentEntries } from "@/lib/ai-catalog-context";

const Input = z.object({ description: z.string().min(10).max(4000) });

const Suggestion = z.object({
  summary: z.string().default(""),
  questions: z.array(z.string()).default([]),
  equipment: z
    .array(
      z.object({
        path: z.string(),
        reason: z.string().default(""),
      }),
    )
    .default([]),
});

export type QuoteSuggestion = {
  summary: string;
  questions: string[];
  equipment: { path: string; title: string; reason: string }[];
};

function parseJsonBlock(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced?.[1] ?? text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in model output.");
  return JSON.parse(candidate.slice(start, end + 1));
}

export const suggestEquipment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<QuoteSuggestion> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured.");

    const { createLovableAiGatewayProvider } = await import("@/lib/ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);

    const prompt = `A customer described a temporary kitchen / facility rental job. Choose the units they should request.

Customer description:
"""
${data.description}
"""

Reply with JSON only, no prose and no code fences, in exactly this shape:
{"summary":"string","questions":["string"],"equipment":[{"path":"string","reason":"string"}]}

Rules:
- Pick between 1 and 8 items, only from the list below, using their exact paths.
- Never invent specifications, capacities, dimensions, prices or lead times.
- "summary": at most 3 sentences restating the job in our terms.
- "questions": up to 3 short questions we still need answered to quote accurately.
- "reason": one short sentence each.

Available units (path — title):
${equipmentContextText()}`;

    const result = streamText({
      model: gateway("google/gemini-3.8-flash"),
      prompt,
    });
    const text = await result.text;

    const output = Suggestion.parse(parseJsonBlock(text));
    const entries = equipmentEntries();

    const equipment = output.equipment
      .map((item) => {
        const match = entries.find((entry) => entry.path === item.path);
        return match ? { path: match.path, title: match.title, reason: item.reason } : null;
      })
      .filter((item): item is QuoteSuggestion["equipment"][number] => item !== null)
      .slice(0, 8);

    return {
      summary: output.summary,
      questions: output.questions.slice(0, 3),
      equipment,
    };
  });
