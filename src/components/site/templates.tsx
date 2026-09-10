import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SitePhoto } from "@/components/site/SitePhoto";
import {
  BenefitGrid,
  BulletColumns,
  CardGrid,
  FaqList,
  GalleryStrip,
  LinkList,
  Prose,
  QuoteBand,
  SectionHeading,
  SpecTable,
} from "@/components/site/Sections";
import { SiteLink } from "@/components/site/SiteLink";
import type { PageNode } from "@/data/catalog";
import { navLabel, relatedFor, resolvePath, type ResolvedPage } from "@/lib/catalog";

function crumbs(page: ResolvedPage) {
  return page.trail.map((step) => ({ label: navLabel(step.node), path: step.path }));
}

function Hero({
  page,
  kicker,
  ratio = "4/3",
}: {
  page: ResolvedPage;
  kicker: string;
  ratio?: "4/3" | "3/2";
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label-mono animate-rise text-accent">{kicker}</p>
          <h1 className="mt-4 max-w-[22ch] animate-rise text-5xl font-bold leading-[0.94] text-balance md:text-6xl">
            {page.node.title}
          </h1>
          <p className="mt-5 max-w-[52ch] animate-rise text-lg text-steel text-pretty">
            {page.node.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SiteLink
              href="/get-a-quote"
              className="bg-primary px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Get a Quote
            </SiteLink>
            <SiteLink
              href={page.parent?.path ?? "/"}
              className="border border-line px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider transition-colors hover:border-primary"
            >
              {page.parent ? `Back to ${navLabel(page.parent.node)}` : "Browse the Catalog"}
            </SiteLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <SitePhoto path={page.path} label={page.node.title} ratio={ratio} priority />
        </div>
      </div>
    </section>
  );
}

function Related({ page }: { page: ResolvedPage }) {
  const related = relatedFor(page);
  if (!related.length) return null;
  return (
    <section className="border-t border-line bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-14">
        <SectionHeading kicker="Related" title="Related pages" />
        <div className="mt-6 grid grid-cols-1 gap-x-10 md:grid-cols-2">
          <LinkList items={related.slice(0, Math.ceil(related.length / 2))} />
          <LinkList items={related.slice(Math.ceil(related.length / 2))} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Category hub ---------------- */

export function CategoryHub({ page }: { page: ResolvedPage }) {
  return (
    <>
      <Breadcrumbs items={crumbs(page)} />
      <Hero page={page} kicker={page.node.kicker ?? "Catalog"} ratio="3/2" />

      {page.node.intro ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Overview" title={`About ${page.node.title}`} />
          <div className="mt-6">
            <Prose paragraphs={page.node.intro} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1400px] px-6 pb-16">
        <SectionHeading
          kicker="Subcategories"
          title={`Explore ${page.node.title}`}
          aside={`${String(page.children.length).padStart(2, "0")} pages`}
        />
        <div className="mt-6">
          <CardGrid items={page.children} columns={4} numbered />
        </div>
      </section>

      <Related page={page} />
      <QuoteBand />
    </>
  );
}

/* ---------------- Service page ---------------- */

export function ServiceTemplate({ page }: { page: ResolvedPage }) {
  const node = page.node;
  return (
    <>
      <Breadcrumbs items={crumbs(page)} />
      <Hero page={page} kicker={node.kicker ?? navLabel(page.parent?.node ?? node)} />

      {node.intro ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Introduction" title="What this covers" />
          <div className="mt-6">
            <Prose paragraphs={node.intro} />
          </div>
        </section>
      ) : null}

      {node.benefits?.length ? (
        <section className="mx-auto max-w-[1400px] px-6 pb-14">
          <SectionHeading kicker="Benefits" title="Key benefits" />
          <div className="mt-6">
            <BenefitGrid benefits={node.benefits} />
          </div>
        </section>
      ) : null}

      {node.equipment?.length ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 py-14">
            <SectionHeading kicker="Equipment" title="Equipment & features" />
            <div className="mt-6">
              <BulletColumns items={node.equipment} />
            </div>
          </div>
        </section>
      ) : null}

      {node.applications?.length ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Applications" title="Where it is used" />
          <div className="mt-6">
            <BulletColumns items={node.applications} />
          </div>
        </section>
      ) : null}

      {page.children.length ? (
        <section className="border-t border-line bg-secondary/40">
          <div className="mx-auto max-w-[1400px] px-6 py-14">
            <SectionHeading
              kicker="Variations"
              title="Available variations"
              aside={`${String(page.children.length).padStart(2, "0")} configurations`}
            />
            <div className="mt-6">
              <CardGrid items={page.children} columns={4} />
            </div>
          </div>
        </section>
      ) : null}

      {node.specs?.length ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading
            kicker="Specifications"
            title="Specifications"
            aside="Confirmed per unit"
          />
          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SpecTable specs={node.specs} />
            </div>
            <div className="lg:col-span-5">
              <SitePhoto path={page.path} index={1} label={`${node.title} detail`} ratio="4/3" />
            </div>
          </div>
        </section>
      ) : null}

      {node.industries?.length ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 py-14">
            <SectionHeading kicker="Industries" title="Industries served" />
            <div className="mt-6">
              <BulletColumns items={node.industries} columns={3} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <SectionHeading kicker="Gallery" title="Gallery" aside="Photography" />
        <div className="mt-6">
          <GalleryStrip label={node.title} path={page.path} offset={3} />
        </div>
      </section>

      {node.faqs?.length ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 py-14">
            <SectionHeading kicker="FAQs" title="Frequently asked questions" />
            <div className="mt-6">
              <FaqList faqs={node.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <Related page={page} />
      <QuoteBand />
    </>
  );
}

/* ---------------- Variation page ---------------- */

export function VariationTemplate({ page }: { page: ResolvedPage }) {
  const node = page.node;
  const siblingSizes = page.siblings;

  return (
    <>
      <Breadcrumbs items={crumbs(page)} />
      <Hero page={page} kicker={node.kicker ?? "Configuration"} />

      {node.intro ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Overview" title="Overview" />
          <div className="mt-6">
            <Prose paragraphs={node.intro} />
          </div>
        </section>
      ) : null}

      {node.specs?.length ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 py-14">
            <SectionHeading
              kicker="Specifications"
              title="Technical specifications"
              aside="Confirmed on quote"
            />
            <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SpecTable specs={node.specs} />
                <p className="mt-4 text-sm text-muted-foreground text-pretty">
                  Figures are confirmed against the specific unit allocated to your project. Send us
                  your fleet data and we will publish exact values here.
                </p>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="label-mono mb-2 text-steel">Power requirements</p>
                  <SpecTable
                    specs={[
                      { label: "Electrical service", value: "TBD — confirmed on quote" },
                      { label: "Generator option", value: "TBD — confirmed on quote" },
                    ]}
                  />
                </div>
                <div>
                  <p className="label-mono mb-2 text-steel">Water & plumbing</p>
                  <SpecTable
                    specs={[
                      { label: "Fresh water", value: "TBD — confirmed on quote" },
                      { label: "Waste water", value: "TBD — confirmed on quote" },
                      { label: "Water heating", value: "TBD — confirmed on quote" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {node.equipment?.length ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Equipment" title="Equipment included" />
          <div className="mt-6">
            <BulletColumns items={node.equipment} />
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Layout" title="Layout & configuration" />
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <SitePhoto path={page.path} index={1} label={`${node.title} layout`} ratio="16/10" />
            <SitePhoto path={page.path} index={2} label={`${node.title} interior`} ratio="16/10" />
          </div>
        </div>
      </section>

      {node.applications?.length ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Applications" title="Ideal applications" />
          <div className="mt-6">
            <BulletColumns items={node.applications} />
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Gallery" title="Gallery" aside="Photography" />
          <div className="mt-6">
            <GalleryStrip label={node.title} path={page.path} offset={3} />
          </div>
        </div>
      </section>

      {node.faqs?.length ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="FAQs" title="Frequently asked questions" />
          <div className="mt-6">
            <FaqList faqs={node.faqs} />
          </div>
        </section>
      ) : null}

      {siblingSizes.length ? (
        <section className="border-t border-line bg-secondary/40">
          <div className="mx-auto max-w-[1400px] px-6 py-14">
            <SectionHeading kicker="Related sizes" title="Other configurations" />
            <div className="mt-6">
              <CardGrid items={siblingSizes} columns={4} />
            </div>
          </div>
        </section>
      ) : null}

      <Related page={page} />
      <QuoteBand />
    </>
  );
}

/* ---------------- Industry page ---------------- */

export function IndustryTemplate({ page }: { page: ResolvedPage }) {
  const node = page.node;
  return (
    <>
      <Breadcrumbs items={crumbs(page)} />
      <Hero page={page} kicker="Industries" />

      {node.intro ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Sector" title={`${node.title} projects`} />
          <div className="mt-6">
            <Prose paragraphs={node.intro} />
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <SectionHeading kicker="Solutions" title="Relevant solutions" />
          <div className="mt-6">
            <CardGrid items={relatedIndustrySolutions()} columns={4} />
          </div>
        </div>
      </section>

      <Related page={page} />
      <QuoteBand />
    </>
  );
}

function relatedIndustrySolutions(): { node: PageNode; path: string }[] {
  return [
    "/mobile-kitchens/mobile-kitchen-trailers",
    "/support-facility-trailers/restroom-trailers",
    "/temporary-facilities/workforce-housing",
    "/specialty-solutions/turnkey-facility-solutions",
  ]
    .map((path) => {
      const resolved = resolvePath(path);
      return resolved ? { node: resolved.node, path } : null;
    })
    .filter((x): x is { node: PageNode; path: string } => x !== null);
}

/* ---------------- Resource pages ---------------- */

export function ResourceTemplate({ page }: { page: ResolvedPage }) {
  const node = page.node;
  return (
    <>
      <Breadcrumbs items={crumbs(page)} />
      <Hero page={page} kicker="Resources" />

      {node.intro ? (
        <section className="mx-auto max-w-[1400px] px-6 py-14">
          <Prose paragraphs={node.intro} />
        </section>
      ) : null}

      {page.children.length ? (
        <section className="mx-auto max-w-[1400px] px-6 pb-14">
          <SectionHeading
            kicker="Articles"
            title="Latest articles"
            aside={`${String(page.children.length).padStart(2, "0")} posts`}
          />
          <ul className="mt-6 divide-y divide-line border-t border-b border-line">
            {page.children.map((child) => (
              <li key={child.path}>
                <SiteLink
                  href={child.path}
                  className="grid grid-cols-1 gap-2 py-5 transition-colors hover:text-accent md:grid-cols-12 md:items-baseline"
                >
                  <span className="label-mono md:col-span-2 text-steel">{child.node.date}</span>
                  <span className="font-display text-2xl font-bold uppercase tracking-wide md:col-span-6">
                    {child.node.title}
                  </span>
                  <span className="text-sm text-steel md:col-span-4 text-pretty">
                    {child.node.summary}
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {node.faqs?.length ? (
        <section className="mx-auto max-w-[1400px] px-6 pb-14">
          <SectionHeading kicker="FAQs" title="Questions & answers" />
          <div className="mt-6">
            <FaqList faqs={node.faqs} />
          </div>
        </section>
      ) : null}

      {node.slug === "gallery" ? (
        <section className="mx-auto max-w-[1400px] px-6 pb-14">
          <GalleryStrip label="Duo Kitchenware deployment" path={page.path} count={8} />
        </section>
      ) : null}

      <Related page={page} />
      <QuoteBand />
    </>
  );
}

export function PostTemplate({ page }: { page: ResolvedPage }) {
  const node = page.node;
  return (
    <>
      <Breadcrumbs items={crumbs(page)} />
      <article className="mx-auto max-w-[1400px] px-6 py-14">
        <p className="label-mono text-accent">Blog · {node.date}</p>
        <h1 className="mt-4 max-w-[30ch] text-5xl font-bold leading-[0.95] text-balance">
          {node.title}
        </h1>
        <p className="mt-5 max-w-[60ch] text-lg text-steel text-pretty">{node.summary}</p>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Prose paragraphs={node.body ?? []} />
          </div>
          <aside className="lg:col-span-4">
            <SitePhoto path={page.path} label={node.title} ratio="4/3" />
          </aside>
        </div>
      </article>
      <Related page={page} />
      <QuoteBand />
    </>
  );
}
