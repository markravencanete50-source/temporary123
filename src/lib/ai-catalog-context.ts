import { catalog, type PageNode } from "@/data/catalog";

export interface CatalogEntry {
  path: string;
  title: string;
  kind: PageNode["kind"];
  section: string;
}

const EQUIPMENT_SECTIONS = [
  "mobile-kitchens",
  "support-facility-trailers",
  "temporary-facilities",
  "specialty-solutions",
];

function flatten(nodes: PageNode[], prefix: string, section: string, out: CatalogEntry[]) {
  for (const node of nodes) {
    const path = `${prefix}/${node.slug}`;
    out.push({ path, title: node.title, kind: node.kind, section });
    if (node.children?.length) flatten(node.children, path, section, out);
  }
}

/** Flat list of every catalog page, used as grounding context for AI answers. */
export function catalogEntries(): CatalogEntry[] {
  const out: CatalogEntry[] = [];
  for (const section of catalog) {
    out.push({
      path: `/${section.slug}`,
      title: section.title,
      kind: section.kind,
      section: section.slug,
    });
    if (section.children?.length)
      flatten(section.children, `/${section.slug}`, section.slug, out);
  }
  return out;
}

/** Only the pages a customer can request as equipment on a quote. */
export function equipmentEntries(): CatalogEntry[] {
  return catalogEntries().filter(
    (entry) => EQUIPMENT_SECTIONS.includes(entry.section) && entry.kind !== "category",
  );
}

export function catalogContextText(): string {
  return catalogEntries()
    .map((entry) => `${entry.path} — ${entry.title}`)
    .join("\n");
}

export function equipmentContextText(): string {
  return equipmentEntries()
    .map((entry) => `${entry.path} — ${entry.title}`)
    .join("\n");
}
