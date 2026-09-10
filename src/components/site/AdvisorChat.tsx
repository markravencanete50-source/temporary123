import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AdvisorChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, status]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    void sendMessage({ text });
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed right-5 bottom-5 z-50 flex items-center gap-2 bg-primary px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <MessageSquare className="size-4" aria-hidden="true" />
          Equipment Advisor
        </button>
      )}

      {open && (
        <div className="fixed right-5 bottom-5 z-50 flex h-[560px] w-[min(94vw,400px)] flex-col border border-line bg-card shadow-xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="label-mono text-accent">Equipment Advisor</p>
              <p className="font-display text-base font-bold uppercase tracking-wide">
                Scope your site
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close advisor"
              className="p-1 text-steel transition-colors hover:text-accent"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <p className="text-sm text-steel text-pretty">
                Tell us the site, how many people you are feeding or housing, how long you need the
                units and what utilities are available. We will suggest which units to request.
                Specifications and pricing are confirmed on the quote.
              </p>
            )}

            {messages.map((message) => {
              const text = message.parts
                .filter((part) => part.type === "text")
                .map((part) => ("text" in part ? part.text : ""))
                .join("");
              if (!text) return null;
              return (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[85%] border border-line bg-secondary px-3 py-2 text-sm whitespace-pre-wrap"
                      : "max-w-[92%] text-sm whitespace-pre-wrap text-steel"
                  }
                >
                  {text}
                </div>
              );
            })}

            {busy && <p className="label-mono text-muted-foreground">Thinking…</p>}
            {error && (
              <p className="border border-line px-3 py-2 text-sm text-destructive">
                {error.message || "The advisor is unavailable right now."}
              </p>
            )}
          </div>

          <form onSubmit={submit} className="flex items-end gap-2 border-t border-line p-3">
            <label htmlFor="advisor-input" className="sr-only">
              Message the equipment advisor
            </label>
            <textarea
              id="advisor-input"
              rows={2}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) submit(event);
              }}
              placeholder="80 crew on a remote site for 6 months…"
              className="flex-1 resize-none border border-line bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={busy}
              aria-label="Send message"
              className="bg-primary p-2.5 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
