import { SiteLink } from "@/components/site/SiteLink";

export interface Crumb {
  label: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-secondary/60">
      <ol className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3 label-mono text-muted-foreground">
        <li>
          <SiteLink href="/" className="transition-colors hover:text-ink">
            Home
          </SiteLink>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              <span aria-hidden className="text-muted-foreground/50">
                /
              </span>
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              ) : (
                <SiteLink href={item.path} className="transition-colors hover:text-ink">
                  {item.label}
                </SiteLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
