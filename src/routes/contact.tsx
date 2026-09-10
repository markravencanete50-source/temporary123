import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeading } from "@/components/site/Sections";
import { SiteLink } from "@/components/site/SiteLink";
import { breadcrumbSchema, jsonLd, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageMeta({
      title: "Contact Duo Kitchenware",
      description:
        "Contact the Duo Kitchenware team about mobile kitchen, support trailer and temporary facility rentals for your site, project or event.",
      path: "/contact",
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]),
      ),
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact Us", path: "/contact" }]} />

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <p className="label-mono text-accent">(a) / Contact</p>
        <h1 className="mt-4 max-w-[24ch] text-5xl font-bold leading-[0.95] text-balance md:text-6xl">
          Talk to our team about your site
        </h1>
        <p className="mt-5 max-w-[54ch] text-lg text-steel text-pretty">
          Tell us where the unit is going, what it needs to do and when you need it. We will come
          back with a scoped configuration and a delivery window.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading kicker="(b) / Enquiry" title="Send an enquiry" />
            <form className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2" aria-label="Contact form">
              <Field label="Full name" name="name" />
              <Field label="Company" name="company" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
              <div className="md:col-span-2">
                <Field label="Site location" name="location" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="label-mono block text-steel">
                  What do you need?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full border border-line bg-card px-3 py-2.5 text-base outline-none focus:border-accent"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-primary px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Send Enquiry
                </button>
                <p className="mt-3 label-mono text-muted-foreground">
                  Form delivery is not connected yet — add a backend to receive submissions.
                </p>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <SectionHeading kicker="(c) / Direct" title="Other ways to reach us" />
            <dl className="mt-6 divide-y divide-line border-t border-b border-line">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="label-mono text-steel">Quotes</dt>
                <dd>
                  <SiteLink href="/get-a-quote" className="font-medium hover:text-accent">
                    Request a quote ›
                  </SiteLink>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="label-mono text-steel">Phone</dt>
                <dd>
                  <a href="tel:+18004435212" className="font-medium hover:text-accent">
                    +1 (800) 443-5212
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted-foreground text-pretty">
              The operations team is available by phone 24 hours a day, 7 days a week for quotes,
              active deployments and urgent site requirements.
            </p>
          </aside>
        </div>
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
