import { createFileRoute } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";

import { SitePhoto } from "@/components/site/SitePhoto";
import { CardGrid, LinkList, QuoteBand, SectionHeading } from "@/components/site/Sections";
import { SiteLink } from "@/components/site/SiteLink";
import { catalog } from "@/data/catalog";
import { childrenOf, resolvePath } from "@/lib/catalog";
import { jsonLd, organizationSchema, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta({
      title: "Duo Kitchenware | Mobile Kitchen & Facility Rentals",
      description:
        "B2B rental of mobile kitchen trailers, support and sanitation trailers, and temporary facilities — delivered, positioned and connected on site nationwide.",
      path: "/",
    }),
    scripts: [jsonLd(organizationSchema())],
  }),
  component: Home,
});

const trustItems = ["Nationwide delivery", "24/7 dispatch", "Turnkey setup", "GSA contract holder"];

const deploymentSteps = [
  {
    number: "01",
    title: "Scope the site",
    body: "We confirm output, headcount, access, utilities and the deployment window.",
  },
  {
    number: "02",
    title: "Configure the system",
    body: "Kitchen, sanitation, storage and support units are matched to the operation.",
  },
  {
    number: "03",
    title: "Deliver and connect",
    body: "The facility is positioned, connected and made ready for your team.",
  },
] as const;

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
      <section className="surface-grid relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        <div className="relative mx-auto grid min-h-[640px] max-w-[1400px] grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6 xl:col-span-7">
            <p className="label-mono animate-rise text-accent" style={{ animationDelay: "40ms" }}>
              (a) / Temporary Kitchen &amp; Facility Rental
            </p>
            <h1
              className="mt-5 animate-rise text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.84] tracking-[-0.035em] text-balance"
              style={{ animationDelay: "100ms" }}
            >
              Deploy a full kitchen in days, not months
            </h1>
            <p
              className="mt-6 max-w-[50ch] animate-rise text-lg leading-relaxed text-steel text-pretty sm:text-xl"
              style={{ animationDelay: "160ms" }}
            >
              Mobile kitchens, support trailers and temporary facilities — specified, delivered and
              connected for real job sites.
            </p>
            <div
              className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "220ms" }}
            >
              <SiteLink
                href="/get-a-quote"
                className="bg-primary px-7 py-4 text-center font-display text-base font-bold uppercase tracking-wider text-primary-foreground transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
              >
                Get a Quote
              </SiteLink>
              <SiteLink
                href="/mobile-kitchens"
                className="border border-line bg-background/80 px-7 py-4 text-center font-display text-base font-bold uppercase tracking-wider transition-[border-color,transform] hover:-translate-y-0.5 hover:border-primary"
              >
                Browse the Catalog
              </SiteLink>
              <a
                href="tel:+18004435212"
                aria-label="Call Us 24/7 at +1 (800) 443-5212"
                className="flex items-center justify-center gap-2 bg-accent px-7 py-4 font-display text-base font-bold uppercase tracking-wider text-accent-foreground shadow-md transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                <PhoneCall aria-hidden="true" className="size-4" />
                Call Us 24/7
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-6 xl:col-span-5">
            <div className="border border-line bg-background p-2 shadow-2xl shadow-primary/15 sm:p-3">
              <SitePhoto
                source="/images/trailer-side.png"
                path="/mobile-kitchens/mobile-kitchen-trailers"
                label="Temporary 123 mobile kitchen trailer ready for deployment"
                ratio="4/3"
                priority
              />
              <div className="flex items-center justify-between gap-3 border-t border-line px-2 py-3 label-mono text-steel">
                <span>Field-ready mobile kitchen</span>
                <span className="text-accent">Nationwide</span>
              </div>
            </div>
            <div className="absolute -bottom-5 left-4 animate-drift bg-primary px-5 py-4 text-primary-foreground shadow-xl sm:left-8 lg:-left-6">
              <p className="label-mono text-accent">Live support</p>
              <p className="mt-1 font-display text-xl font-bold uppercase">24 hours · 7 days</p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Service commitments"
        className="border-b border-line bg-primary text-primary-foreground"
      >
        <ul className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-primary-foreground/10 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0">
          {trustItems.map((item, index) => (
            <li key={item} className="flex items-center gap-3 px-3 py-4 sm:px-5">
              <span className="label-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-display text-sm font-bold uppercase tracking-wide sm:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16">
        <SectionHeading kicker="(b) / Catalog" title="Core Categories" aside="04 systems" />
        <div className="mt-8">
          <CardGrid items={coreCategories} columns={4} numbered />
        </div>
      </section>

      <section className="border-t border-line bg-secondary/40">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-2 lg:col-span-7">
            <SitePhoto
              source="/images/trailer-interior.png"
              path="/mobile-kitchens"
              label="Stainless steel mobile kitchen interior"
              ratio="16/10"
              className="col-span-2"
            />
            <SitePhoto
              source="/images/restroom-shower.png"
              path="/support-facility-trailers"
              label="Restroom and shower trailer deployed on site"
              ratio="4/3"
            />
            <SitePhoto
              source="/images/facility-combo.png"
              path="/temporary-facilities"
              label="Multi-door temporary facility trailer"
              ratio="4/3"
            />
          </div>
          <div className="lg:col-span-5 lg:pl-4">
            <SectionHeading kicker="(c) / Turnkey Delivery" title="One coordinated deployment" />
            <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-steel text-pretty">
              Real equipment, planned as one working system. We coordinate the kitchen, support
              facilities and site connections around your operating deadline.
            </p>
            <ol className="mt-8 border-t border-line">
              {deploymentSteps.map((step) => (
                <li
                  key={step.number}
                  className="grid grid-cols-[auto_1fr] gap-4 border-b border-line py-5"
                >
                  <span className="label-mono pt-1 text-accent">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-bold tracking-wide">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-steel text-pretty">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading kicker="(d) / Sizes" title="Kitchen Trailer Sizes" />
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
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading kicker="(e) / Industries" title="Sectors We Serve" aside="11 sectors" />
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
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SitePhoto
                source="/images/restroom-shower.png"
                path="/support-facility-trailers/restroom-trailers"
                label="Restroom and shower trailer on site"
                ratio="3/2"
              />
            </div>
            <div className="lg:col-span-6">
              <SectionHeading kicker="(f) / Site Support" title="Sanitation That Scales" />
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
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading kicker="(g) / Resources" title="From the Blog" />
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
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            kicker="(h) / Coverage"
            title="Nationwide coverage, focused on real projects"
            aside="50 states + DC"
          />
          <div className="mt-8 flex flex-col justify-between gap-6 border-y border-line py-6 md:flex-row md:items-center">
            <p className="max-w-[62ch] text-lg text-steel text-pretty">
              We deliver, position and connect temporary kitchens, sanitation units and facility
              rentals nationwide. Tell us where the project is and what the site needs.
            </p>
            <SiteLink href="/service-areas" className="shrink-0 label-mono text-accent">
              Explore service areas ›
            </SiteLink>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
