import { SiteLink } from "@/components/site/SiteLink";
import { catalog } from "@/data/catalog";
import { navLabel } from "@/lib/catalog";

export function Footer() {
  const columns = catalog.slice(0, 5);

  return (
    <footer className="border-t border-line bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center bg-accent font-display text-lg font-bold text-accent-foreground">
                D
              </span>
              <span className="font-display text-lg font-bold uppercase tracking-wide">
                Duo Kitchenware
              </span>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/60 text-pretty">
              Temporary kitchen, sanitation and facility rentals for B2B projects.
            </p>
            <SiteLink
              href="/get-a-quote"
              className="mt-5 inline-block bg-accent px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-background hover:text-ink"
            >
              Get a Quote
            </SiteLink>
          </div>

          {columns.map((section) => (
            <nav key={section.slug} aria-label={section.title}>
              <p className="label-mono text-accent">{navLabel(section)}</p>
              <ul className="mt-4 space-y-2">
                {(section.children ?? []).slice(0, 8).map((child) => (
                  <li key={child.slug}>
                    <SiteLink
                      href={`/${section.slug}/${child.slug}`}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                      {navLabel(child)}
                    </SiteLink>
                  </li>
                ))}
                <li>
                  <SiteLink
                    href={`/${section.slug}`}
                    className="label-mono text-primary-foreground/50 transition-colors hover:text-accent"
                  >
                    All {navLabel(section)} ›
                  </SiteLink>
                </li>
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-primary-foreground/15 pt-6 md:flex-row md:items-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 label-mono text-primary-foreground/60">
            <li>
              <SiteLink href="/resources" className="hover:text-accent">
                Resources
              </SiteLink>
            </li>
            <li>
              <SiteLink href="/resources/blog" className="hover:text-accent">
                Blog
              </SiteLink>
            </li>
            <li>
              <SiteLink href="/resources/faqs" className="hover:text-accent">
                FAQs
              </SiteLink>
            </li>
            <li>
              <SiteLink href="/service-areas" className="hover:text-accent">
                Cities We Serve
              </SiteLink>
            </li>
            <li>
              <SiteLink href="/about" className="hover:text-accent">
                About Us
              </SiteLink>
            </li>
            <li>
              <SiteLink href="/contact" className="hover:text-accent">
                Contact Us
              </SiteLink>
            </li>
          </ul>
          <p className="label-mono text-primary-foreground/40">
            © {new Date().getFullYear()} Duo Kitchenware
          </p>
        </div>
      </div>
    </footer>
  );
}
