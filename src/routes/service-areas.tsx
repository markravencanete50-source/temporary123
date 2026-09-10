import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteBand, SectionHeading } from "@/components/site/Sections";
import { serviceAreas, stateNames, totalCities } from "@/data/locations";
import { breadcrumbSchema, jsonLd, pageMeta, serviceSchema } from "@/lib/seo";

function anchor(state: string) {
  return state.toLowerCase().replace(/[^a-z]+/g, "-");
}

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    ...pageMeta({
      title: "Cities We Serve | Nationwide Mobile Kitchen & Trailer Rental",
      description:
        "Duo Kitchenware delivers mobile kitchens, support trailers and temporary facilities to every US state — browse the cities we serve state by state.",
      path: "/service-areas",
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cities We Serve", path: "/service-areas" },
        ]),
      ),
      jsonLd(
        serviceSchema(
          "Mobile Kitchen & Facility Rental",
          "Temporary kitchen, sanitation and facility rentals delivered nationwide across all 50 states.",
          "/service-areas",
        ),
      ),
    ],
  }),
  component: ServiceAreas,
});

function ServiceAreas() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cities We Serve", path: "/service-areas" }]} />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-14">
          <p className="label-mono text-accent">(a) / Coverage</p>
          <h1 className="mt-4 max-w-[24ch] text-5xl font-bold leading-[0.92] tracking-tight text-balance md:text-6xl">
            Cities We Serve
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg text-steel text-pretty">
            We deliver, position and connect mobile kitchens, support trailers and temporary
            facilities nationwide. Below are {totalCities} cities across {stateNames.length} states
            and territories where we regularly quote projects — if your site is not listed, ask us
            anyway.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <SectionHeading
            kicker="(b) / Index"
            title="Jump to a State"
            aside={`${stateNames.length} states`}
          />
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {stateNames.map((state) => (
              <li key={state}>
                <a
                  href={`#${anchor(state)}`}
                  className="label-mono text-steel transition-colors hover:text-accent"
                >
                  {state}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="space-y-12">
          {serviceAreas.map((area) => (
            <div key={area.state} id={anchor(area.state)} className="scroll-mt-28">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-3">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                  {area.state}
                </h2>
                <span className="label-mono text-steel">
                  {area.cities.length} {area.cities.length === 1 ? "city" : "cities"}
                </span>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
                {area.cities.map((city) => (
                  <li key={city} className="text-sm text-steel">
                    Mobile Kitchen &amp; Trailer Rental in {city}, {area.state}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
