import { createFileRoute } from "@tanstack/react-router";

import { SitePhoto } from "@/components/site/SitePhoto";
import { CardGrid, LinkList, QuoteBand, SectionHeading } from "@/components/site/Sections";
import { SiteLink } from "@/components/site/SiteLink";
import { catalog } from "@/data/catalog";
import { stateNames } from "@/data/locations";
import { childrenOf, resolvePath } from "@/lib/catalog";
import { jsonLd, pageMeta, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta({
      title: "Duo Kitchenware | Mobile Kitchen & Facility Rentals",
      description:
        "B2B rental of mobile kitchen trailers, support and sanitation trailers, and temporary facilities — delivered, positioned and connected on site nationwide.",
      path: "/",
    }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: "/",
        description:
          "Rental of temporary mobile kitchens, support trailers and facility units for construction, healthcare, government, response and remote operations.",
      }),
    ],
  }),
  component: Home,
});

function Home() {
  const coreCategories = catalog
    .filter((c) =>
      [
        "mobile-kitchens",
        "support-facility-trailers",
        "temporary-facilities",
        "specialty-solutions",
      ].includes(c.slug),
    )
    .map((node) => ({ node, path: `/${node.slug}` }));

  const kitchenSizes = childrenOf("/mobile-kitchens/mobile-kitchen-trailers");
  const industries = childrenOf("/industries").slice(0, 8);
  const posts = childrenOf("/resources/blog").slice(0, 4);
  const restroom = resolvePath("/support-facility-trailers/restroom-trailers");

  return (
    <>
      <section className="relative border-b border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-6 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label-mono animate-rise text-accent">
              (a) / Temporary Kitchen &amp; Facility Rental
            </p>
            <h1 className="mt-4 animate-rise text-5xl font-bold leading-[0.92] tracking-tight text-balance md:text-6xl">
              Deploy a full kitchen in days, not months
            </h1>
            <p className="mt-5 max-w-[46ch] animate-rise text-lg text-steel text-pretty">
              Mobile kitchens, support trailers and temporary facilities — specified, delivered and
              connected for real job sites.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SiteLink
                href="/get-a-quote"
                className="bg-primary px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Get a Quote
              </SiteLink>
              <SiteLink
                href="/mobile-kitchens"
                className="border border-line px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider transition-colors hover:border-primary"
              >
                Browse the Catalog
              </SiteLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SitePhoto
              path="/mobile-kitchens/mobile-kitchen-trailers"
              label="Mobile kitchen trailer deployed on site"
              ratio="4/3"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <SectionHeading kicker="(b) / Catalog" title="Core Categories" aside="04 systems" />
        <div className="mt-8">
          <CardGrid items={coreCategories} columns={4} numbered />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading kicker="(c) / Sizes" title="Kitchen Trailer Sizes" />
            <p className="mt-4 max-w-[44ch] text-steel text-pretty">
              Standard lengths from 24 to 40 ft across the mobile and commercial trailer families.
              Additional lengths are added to the catalog as they enter the fleet.
            </p>
            <SiteLink
              href="/mobile-kitchens/kitchen-trailer-sizes"
              className="mt-6 inline-block label-mono text-accent"
            >
              Compare all sizes ›
            </SiteLink>
          </div>
          <div className="lg:col-span-7">
            <LinkList items={kitchenSizes} heading="Mobile Kitchen Trailers" />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <SectionHeading kicker="(d) / Industries" title="Sectors We Serve" aside="11 sectors" />
          <div className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-2">
            <LinkList items={industries.slice(0, 4)} />
            <LinkList items={industries.slice(4)} />
          </div>
          <SiteLink href="/industries" className="mt-6 inline-block label-mono text-accent">
            All industries ›
          </SiteLink>
        </div>
      </section>

      {restroom ? (
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SitePhoto
                path="/support-facility-trailers/restroom-trailers"
                label="Restroom and shower trailer on site"
                ratio="3/2"
              />
            </div>
            <div className="lg:col-span-6">
              <SectionHeading kicker="(e) / Site Support" title="Sanitation That Scales" />
              <p className="mt-4 max-w-[48ch] text-steel text-pretty">
                {restroom.node.summary} Combine restroom, shower and handwashing units with a
                kitchen deployment, or rent them on their own.
              </p>
              <div className="mt-6">
                <LinkList items={restroom.children} heading="Restroom Trailer Sizes" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <SectionHeading kicker="(f) / Resources" title="From the Blog" />
          <ul className="mt-6 divide-y divide-line border-t border-b border-line">
            {posts.map((post) => (
              <li key={post.path}>
                <SiteLink
                  href={post.path}
                  className="grid grid-cols-1 gap-2 py-5 transition-colors hover:text-accent md:grid-cols-12 md:items-baseline"
                >
                  <span className="label-mono text-steel md:col-span-2">{post.node.date}</span>
                  <span className="font-display text-2xl font-bold uppercase tracking-wide md:col-span-6">
                    {post.node.title}
                  </span>
                  <span className="text-sm text-steel md:col-span-4 text-pretty">
                    {post.node.summary}
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <SectionHeading
            kicker="(g) / Coverage"
            title="We Serve All States and Cities of the United States"
            aside={`${stateNames.length} states`}
          />
          <ul className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stateNames.map((state) => (
              <li key={state}>
                <SiteLink
                  href="/service-areas"
                  className="flex items-center justify-between gap-3 bg-background px-5 py-4 text-sm font-semibold transition-colors hover:bg-secondary hover:text-accent"
                >
                  <span>Mobile Kitchen &amp; Trailer Rental in {state}</span>
                  <span aria-hidden className="label-mono text-steel">
                    ›
                  </span>
                </SiteLink>
              </li>
            ))}
          </ul>
          <SiteLink href="/service-areas" className="mt-6 inline-block label-mono text-accent">
            See all cities we serve ›
          </SiteLink>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
