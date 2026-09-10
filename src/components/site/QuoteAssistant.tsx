import { useServerFn } from "@tanstack/react-start";
import { Sparkles } from "lucide-react";
import { useState } from "react";

import { SiteLink } from "@/components/site/SiteLink";
import { suggestEquipment, type QuoteSuggestion } from "@/lib/quote-assistant.functions";

export function QuoteAssistant({ onSuggest }: { onSuggest: (paths: string[]) => void }) {
  const run = useServerFn(suggestEquipment);
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<QuoteSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const text = description.trim();
    if (text.length < 10) {
      setError("Add a little more detail about the job first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const suggestion = await run({ data: { description: text } });
      setResult(suggestion);
      onSuggest(suggestion.equipment.map((item) => item.path));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The assistant is unavailable.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-line bg-card p-5">
      <p className="label-mono flex items-center gap-2 text-accent">
        <Sparkles className="size-4" aria-hidden="true" />
        Quote Assistant
      </p>
      <p className="mt-2 font-display text-xl font-bold uppercase tracking-wide">
        Describe the job, we tick the boxes
      </p>
      <p className="mt-2 text-sm text-steel text-pretty">
        Write it in your own words. We will suggest the units to request and tick them below.
        Specifications and pricing are always confirmed on the quote.
      </p>

      <label htmlFor="assistant-description" className="sr-only">
        Describe your job
      </label>
      <textarea
        id="assistant-description"
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Feeding 120 workers three meals a day on a remote pipeline site for 8 months. No mains water or drainage."
        className="mt-4 w-full border border-line bg-background px-3 py-2.5 text-base outline-none focus:border-accent"
      />
      <button
        type="button"
        onClick={() => void submit()}
        disabled={busy}
        className="mt-3 bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
      >
        {busy ? "Working…" : "Suggest Equipment"}
      </button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-sm text-steel text-pretty">{result.summary}</p>

          {result.equipment.length > 0 && (
            <ul className="mt-4 divide-y divide-line border-t border-b border-line">
              {result.equipment.map((item) => (
                <li key={item.path} className="py-2.5">
                  <SiteLink href={item.path} className="font-medium hover:text-accent">
                    {item.title} ›
                  </SiteLink>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </li>
              ))}
            </ul>
          )}

          {result.questions.length > 0 && (
            <div className="mt-4">
              <p className="label-mono text-steel">Still need to know</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-steel">
                {result.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
