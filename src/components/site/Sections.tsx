import type { ReactNode } from "react";

import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { SitePhoto } from "@/components/site/SitePhoto";
import { SiteLink } from "@/components/site/SiteLink";
import type { Benefit, Faq, PageNode, Spec } from "@/data/catalog";
import { navLabel } from "@/lib/catalog";

export function SectionHeading({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 motion-safe:animate-rise">
      <div>
        <p className="label-mono text-accent">{kicker}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      </div>
      {aside ? <div className="label-mono text-steel">{aside}</div> : null}
    </div>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-[68ch] space-y-4">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)} className="text-lg leading-relaxed text-steel text-pretty">
          {p}
        </p>
      ))}
    </div>
  );
}

export function CardGrid({
  items,
  columns = 4,
  numbered = false,
}: {
  items: { node: PageNode; path: string }[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const cols =
    columns === 2 ? "md:grid-cols-2" : columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4";
  return (
    <div className={`grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 ${cols}`}>
      {items.map((item, i) => (
        <SiteLink
          key={item.path}
          href={item.path}
          className="group bg-background p-6 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-secondary"
        >
          <SitePhoto path={item.path} label={item.node.title} ratio="4/3" />
          <p className="mt-4 label-mono text-steel">
            {numbered ? String(i + 1).padStart(2, "0") : (item.node.kicker ?? "Catalog")}
          </p>
          <h3 className="mt-1 text-xl font-bold tracking-wide">{navLabel(item.node)}</h3>
          <p className="mt-2 text-sm text-steel text-pretty">{item.node.summary}</p>
          <span className="mt-4 inline-block font-display text-sm font-bold uppercase tracking-wider transition-colors group-hover:text-accent">
            Explore ›
          </span>
        </SiteLink>
      ))}
    </div>
  );
}

export function LinkList({
  items,
  heading,
}: {
  items: { node: PageNode; path: string }[];
  heading?: string;
}) {
  if (!items.length) return null;
  return (
    <div>
      {heading ? <p className="label-mono mb-3 text-steel">{heading}</p> : null}
      <ul className="divide-y divide-line border-t border-b border-line">
        {items.map((item) => (
          <li key={item.path}>
            <SiteLink
              href={item.path}
              className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-accent"
            >
              <span className="font-display text-lg font-semibold uppercase tracking-wide">
                {navLabel(item.node)}
              </span>
              <span className="label-mono shrink-0 text-steel">View ›</span>
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BenefitGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
      {benefits.map((b) => (
        <div key={b.title} className="bg-background p-6">
          <h3 className="text-xl font-bold tracking-wide">{b.title}</h3>
          <p className="mt-2 text-sm text-steel text-pretty">{b.description}</p>
        </div>
      ))}
    </div>
  );
}

export function BulletColumns({ items, columns = 2 }: { items: string[]; columns?: 2 | 3 }) {
  return (
    <ul
      className={`grid grid-cols-1 gap-x-10 gap-y-0 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3 border-b border-line py-3 text-steel">
          <span aria-hidden className="label-mono pt-1 text-accent">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SpecTable({ specs }: { specs: Spec[] }) {
  return (
    <table className="w-full border-t border-b border-line text-left">
      <caption className="sr-only">Technical specifications</caption>
      <tbody className="divide-y divide-line">
        {specs.map((spec) => (
          <tr key={spec.label}>
            <th scope="row" className="w-1/2 py-3 pr-4 label-mono font-normal text-steel">
              {spec.label}
            </th>
            <td className="py-3 font-medium">{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {faqs.map((faq) => (
        <details key={faq.q} className="group py-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-xl font-semibold uppercase tracking-wide">
            {faq.q}
            <span aria-hidden className="label-mono text-accent group-open:hidden">
              +
            </span>
            <span aria-hidden className="label-mono hidden text-accent group-open:inline">
              −
            </span>
          </summary>
          <p className="mt-3 max-w-[70ch] text-steel text-pretty">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

export function GalleryStrip({
  label,
  path = "/",
  count = 4,
  offset = 0,
}: {
  label: string;
  path?: string;
  count?: number;
  offset?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
      {Array.from({ length: count }, (_, i) => i).map((n) => (
        <div key={n} className="bg-background p-2">
          <SitePhoto
            path={path}
            index={offset + n}
            label={`${label} — photo ${n + 1}`}
            ratio="4/3"
          />
        </div>
      ))}
    </div>
  );
}

export function QuoteBand({
  title = "Need a unit on site this week?",
  body = "Tell us the site, the headcount and the dates. We scope the unit, the connections and the lead time.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="panel-gradient text-primary-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-balance">{title}</h2>
          <p className="mt-3 max-w-[52ch] text-primary-foreground/70 text-pretty">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <SiteLink
            href="/get-a-quote"
            className="bg-accent px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-background"
          >
            Get a Quote
          </SiteLink>
          <SiteLink
            href="/contact"
            className="border border-primary-foreground/30 px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider transition-colors hover:border-primary-foreground"
          >
            Contact Us
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
