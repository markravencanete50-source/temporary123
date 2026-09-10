import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteAssistant } from "@/components/site/QuoteAssistant";
import { SectionHeading } from "@/components/site/Sections";
import { catalog } from "@/data/catalog";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/get-a-quote")({
  head: () => ({
    ...pageMeta({
      title: "Get a Quote",
      description:
        "Request a quote for mobile kitchen trailers, support and sanitation trailers, or temporary facilities. Tell us your site, headcount and dates.",
      path: "/get-a-quote",
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Get a Quote", path: "/get-a-quote" },
        ]),
      ),
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const equipmentGroups = catalog.filter((c) =>
    ["mobile-kitchens", "support-facility-trailers", "temporary-facilities"].includes(c.slug),
  );
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) =>
    setSelected((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );

  const applySuggestions = (paths: string[]) => {
    const matches = new Set<string>();
    for (const group of equipmentGroups) {
      for (const child of group.children ?? []) {
        const value = `${group.slug}/${child.slug}`;
        if (paths.some((path) => path.startsWith(`/${value}`))) matches.add(value);
      }
    }
    setSelected((current) => Array.from(new Set([...current, ...matches])));
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Get a Quote", path: "/get-a-quote" }]} />

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <p className="label-mono text-accent">(a) / Quote Request</p>
        <h1 className="mt-4 max-w-[26ch] text-5xl font-bold leading-[0.95] text-balance md:text-6xl">
          Request a quote
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-steel text-pretty">
          The more we know about the site, the tighter the quote. Equipment, utilities and servicing
          are all confirmed in writing before anything is dispatched.
        </p>

        <form className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12" aria-label="Quote request">
          <div className="lg:col-span-7">
            <SectionHeading kicker="(b) / Your Details" title="Contact" />
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full name" name="name" />
              <Field label="Company" name="company" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
            </div>

            <div className="mt-12">
              <SectionHeading kicker="(c) / The Project" title="Site and schedule" />
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Site location" name="location" />
                <Field label="Headcount or covers per service" name="headcount" />
                <Field label="Required on site" name="start" type="date" />
                <Field label="Rental duration" name="duration" />
              </div>
              <div className="mt-5">
                <label htmlFor="notes" className="label-mono block text-steel">
                  Site notes, access constraints, utilities available
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={5}
                  className="mt-2 w-full border border-line bg-card px-3 py-2.5 text-base outline-none focus:border-accent"
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-primary px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Submit Request
              </button>
              <p className="mt-3 label-mono text-muted-foreground">
                Form delivery is not connected yet — add a backend to receive submissions.
              </p>
            </div>
          </div>

          <fieldset className="lg:col-span-5">
            <legend className="label-mono text-accent">(d) / Equipment Needed</legend>
            <div className="mt-4">
              <QuoteAssistant onSuggest={applySuggestions} />
            </div>
            <div className="mt-8 space-y-8">
              {equipmentGroups.map((group) => (
                <div key={group.slug}>
                  <p className="font-display text-lg font-bold uppercase tracking-wide">
                    {group.title}
                  </p>
                  <ul className="mt-2 divide-y divide-line border-t border-b border-line">
                    {(group.children ?? []).map((child) => (
                      <li key={child.slug} className="py-2.5">
                        <label className="flex items-center gap-3 text-sm text-steel">
                          <input
                            type="checkbox"
                            name="equipment"
                            value={`${group.slug}/${child.slug}`}
                            checked={selected.includes(`${group.slug}/${child.slug}`)}
                            onChange={() => toggle(`${group.slug}/${child.slug}`)}
                            className="size-4 accent-accent"
                          />
                          {child.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="label-mono block text-steel">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-2 w-full border border-line bg-card px-3 py-2.5 text-base outline-none focus:border-accent"
      />
    </div>
  );
}
