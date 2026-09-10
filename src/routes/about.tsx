import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SitePhoto } from "@/components/site/SitePhoto";
import { QuoteBand, SectionHeading } from "@/components/site/Sections";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...pageMeta({
      title: "About Duo Kitchenware",
      description:
        "Duo Kitchenware supplies temporary mobile kitchens, support trailers and facility rentals for B2B projects across construction, healthcare, government and response operations.",
      path: "/about",
    }),
    scripts: [
      jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }])),
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About Us", path: "/about" }]} />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label-mono text-accent">(a) / About Us</p>
            <h1 className="mt-4 text-5xl font-bold leading-[0.95] text-balance md:text-6xl">
              Temporary kitchens and facilities, planned like permanent ones
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg text-steel text-pretty">
              Duo Kitchenware rents mobile kitchens, support trailers and temporary facilities to
              organisations that cannot pause their operations. We survey the site, specify the
              equipment, deliver it, connect it and take it away again.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SitePhoto path="/about" label="Duo Kitchenware trailer fleet" ratio="4/3" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <SectionHeading kicker="(b) / How We Work" title="From survey to demobilisation" />
        <ol className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-4">
          {[
            {
              step: "01",
              title: "Site survey",
              body: "Access, positioning, utilities and servicing routes are checked before anything is specified.",
            },
            {
              step: "02",
              title: "Specification",
              body: "Equipment, layout and capacity are set against your volume, menu or headcount.",
            },
            {
              step: "03",
              title: "Delivery & connection",
              body: "Units are transported, positioned and prepared for connection to power, water and waste.",
            },
            {
              step: "04",
              title: "Service & demobilisation",
              body: "Scheduled servicing through the rental, then collection and site hand-back.",
            },
          ].map((item) => (
            <li key={item.step} className="bg-background p-6">
              <p className="label-mono text-steel">{item.step}</p>
              <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-steel">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <QuoteBand />
    </>
  );
}
