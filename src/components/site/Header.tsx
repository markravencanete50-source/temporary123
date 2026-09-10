import { useRouterState } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

import { SitePhoto } from "@/components/site/SitePhoto";
import { SiteLink } from "@/components/site/SiteLink";
import { primaryNav, quoteCta, type NavEntry, type NavLeaf } from "@/data/navigation";

const phoneHref = "tel:+18004435212";
const phoneLabel = "+1 (800) 443-5212";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

  return (
    <>
      <div className="h-1 w-full rule-gradient" />
      <div className="border-b border-line bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-6 py-2.5 label-mono">
          <span className="text-primary-foreground/70">Nationwide deployment · 24/7 dispatch</span>
          <span className="hidden text-accent sm:inline">Spec sheets on request</span>
        </div>
      </div>

      <header
        className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
          <SiteLink href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid size-8 place-items-center bg-primary font-display text-lg font-bold text-accent">
              D
            </span>
            <span className="hidden font-display text-xl font-bold uppercase tracking-wide sm:inline">
              Duo <span className="text-steel">Kitchenware</span>
            </span>
          </SiteLink>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-5 font-display text-[15px] font-semibold uppercase tracking-wide xl:flex"
          >
            {primaryNav.map((entry) => (
              <div
                key={entry.path}
                onMouseEnter={() => setOpenMenu(entry.columns ? entry.path : null)}
              >
                {entry.columns ? (
                  <button
                    type="button"
                    aria-expanded={openMenu === entry.path}
                    onClick={() => setOpenMenu(openMenu === entry.path ? null : entry.path)}
                    className={`relative py-1 uppercase transition-colors hover:text-ink ${
                      isActive(entry.path) ? "text-ink" : "text-ink/60"
                    }`}
                  >
                    {entry.label}
                    {isActive(entry.path) || openMenu === entry.path ? (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-accent" />
                    ) : null}
                  </button>
                ) : (
                  <SiteLink
                    href={entry.path}
                    className={`relative py-1 uppercase transition-colors hover:text-ink ${
                      isActive(entry.path) ? "text-ink" : "text-ink/60"
                    }`}
                  >
                    {entry.label}
                  </SiteLink>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SiteLink
              href={quoteCta.path}
              className="hidden bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-block"
            >
              {quoteCta.label}
            </SiteLink>
            <a
              href={phoneHref}
              aria-label={`Call Us 24/7 at ${phoneLabel}`}
              className="group flex items-center gap-2 bg-accent px-3 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-md transition-[background-color,color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 motion-safe:animate-signal-pulse sm:px-4"
            >
              <PhoneCall
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:rotate-[-12deg]"
              />
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline lg:hidden">Call Us</span>
              <span className="hidden lg:inline">Call Us 24/7</span>
              <span className="hidden border-l border-current/25 pl-2 2xl:inline">
                {phoneLabel}
              </span>
            </a>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="border border-line px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wider xl:hidden"
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        {primaryNav.map((entry) =>
          entry.columns && openMenu === entry.path ? (
            <MegaMenu key={entry.path} entry={entry} />
          ) : null,
        )}
      </header>

      {mobileOpen ? <MobileNav /> : null}
    </>
  );
}

function MegaMenu({ entry }: { entry: NavEntry }) {
  const columns = entry.columns ?? [];
  return (
    <div className="hidden border-t border-line bg-background xl:block">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-6 py-8">
        {columns.map((column, i) => (
          <div
            key={column.heading}
            className="col-span-3 animate-rise"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <p className="label-mono mb-4 text-accent">{column.heading}</p>
            <ul className="space-y-3">
              {column.items.map((item) => (
                <li key={item.path}>
                  <SiteLink
                    href={item.path}
                    className="font-display text-lg font-semibold uppercase tracking-wide transition-colors hover:text-accent"
                  >
                    {item.label}
                  </SiteLink>
                  {item.children?.length ? (
                    <ul className="mt-2 space-y-2 border-l border-line pl-3">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <SiteLink
                            href={child.path}
                            className="flex items-baseline justify-between gap-3 transition-colors hover:text-accent"
                          >
                            <span className="font-display text-base font-bold uppercase">
                              {child.label}
                            </span>
                            {child.badge ? (
                              <span className="label-mono shrink-0 text-steel">{child.badge}</span>
                            ) : null}
                          </SiteLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {entry.featured ? (
          <div
            className={`animate-rise ${columns.length >= 3 ? "col-span-3" : "col-span-6"}`}
            style={{ animationDelay: "180ms" }}
          >
            <div className="panel-gradient flex h-full flex-col justify-between gap-4 p-6 text-primary-foreground">
              <div>
                <p className="label-mono text-accent">{entry.featured.kicker}</p>
                <h3 className="mt-2 text-2xl font-bold leading-none">{entry.featured.title}</h3>
                <p className="mt-3 max-w-[38ch] text-sm text-primary-foreground/70 text-pretty">
                  {entry.featured.description}
                </p>
              </div>
              <SitePhoto
                path={entry.featured.path}
                label={entry.featured.title}
                ratio="16/10"
                tone="dark"
                className="max-w-[240px]"
              />
              <SiteLink
                href={entry.featured.path}
                className="self-start bg-accent px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-background"
              >
                {entry.featured.ctaLabel}
              </SiteLink>
            </div>
          </div>
        ) : null}

        <div className="col-span-12 border-t border-line pt-4">
          <SiteLink
            href={entry.path}
            className="label-mono text-steel transition-colors hover:text-accent"
          >
            View all {entry.label} ›
          </SiteLink>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <nav
      id="mobile-nav"
      aria-label="Mobile"
      className="border-b border-line bg-background xl:hidden"
    >
      <ul className="mx-auto max-w-[1400px] divide-y divide-line px-6">
        {primaryNav.map((entry) => (
          <li key={entry.path} className="py-1">
            {entry.columns ? (
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between py-3 font-display text-lg font-bold uppercase tracking-wide">
                  {entry.label}
                  <span aria-hidden className="label-mono text-accent">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="pb-3">
                  <SiteLink href={entry.path} className="label-mono block py-2 text-accent">
                    All {entry.label} ›
                  </SiteLink>
                  {entry.columns.map((column) => (
                    <div key={column.heading} className="mt-2">
                      <p className="label-mono py-1 text-steel">{column.heading}</p>
                      <ul className="border-l border-line pl-3">
                        {column.items.map((item) => (
                          <MobileLeaf key={item.path} item={item} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ) : (
              <SiteLink
                href={entry.path}
                className="block py-3 font-display text-lg font-bold uppercase tracking-wide"
              >
                {entry.label}
              </SiteLink>
            )}
          </li>
        ))}
        <li className="py-4">
          <SiteLink
            href={quoteCta.path}
            className="block bg-accent px-5 py-3 text-center font-display text-base font-bold uppercase tracking-wider text-accent-foreground"
          >
            {quoteCta.label}
          </SiteLink>
        </li>
        <li className="pb-4">
          <a
            href={phoneHref}
            className="flex items-center justify-center gap-2 bg-accent px-5 py-3 text-center font-display text-base font-bold uppercase tracking-wider text-accent-foreground transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            <PhoneCall aria-hidden="true" className="size-4" />
            Call Us 24/7 · {phoneLabel}
          </a>
        </li>
      </ul>
    </nav>
  );
}

function MobileLeaf({ item }: { item: NavLeaf }) {
  if (!item.children?.length) {
    return (
      <li>
        <SiteLink href={item.path} className="block py-2 text-steel">
          {item.label}
        </SiteLink>
      </li>
    );
  }
  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between py-2 text-steel">
          {item.label}
          <span aria-hidden className="label-mono text-accent">
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <ul className="border-l border-line pl-3">
          <li>
            <SiteLink href={item.path} className="label-mono block py-2 text-accent">
              Overview ›
            </SiteLink>
          </li>
          {item.children.map((child) => (
            <li key={child.path}>
              <SiteLink href={child.path} className="block py-2 text-steel">
                {child.label}
              </SiteLink>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
