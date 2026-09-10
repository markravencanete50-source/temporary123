import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { catalogContextText } from "@/lib/ai-catalog-context";
import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the equipment advisor for Duo Kitchenware, a B2B rental company for temporary kitchens, support/sanitation trailers and temporary facilities.

Your job: understand the customer's site, headcount, duration and utilities, then recommend which of our pages/units to request on a quote.

Rules you must never break:
- Only recommend units that exist in the catalogue list below. Refer to them by their exact page title and path.
- NEVER invent technical specifications, dimensions, capacities, power or water requirements, prices, lead times, certifications or reviews. All specs are confirmed on quote.
- If asked for a spec or price, say it is confirmed on the quote and offer to help scope the request instead.
- Ask at most two short clarifying questions at a time.
- Be concise and practical. Plain text, short paragraphs or short bullet lists. No markdown headings.
- Close by pointing the customer to /get-a-quote when you have enough to scope a request.

Catalogue (path — title):
${catalogContextText()}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "AI is not configured." }, { status: 500 });
        }

        const body = (await request.json()) as { messages?: UIMessage[] };
        const messages = body.messages ?? [];

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(apiKey, initialRunId);

        try {
          const result = streamText({
            model: gateway("google/gemini-3.8-flash"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages),
            abortSignal: request.signal,
          });

          const response = result.toUIMessageStreamResponse({
            headers: getLovableAiGatewayResponseHeaders(undefined, {
              ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
            }),
          });

          return await withLovableAiGatewayRunIdHeader(response, gateway);
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return new Response(null, { status: 499 });
          }
          console.error(error);
          const message = error instanceof Error ? error.message : "AI request failed.";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
