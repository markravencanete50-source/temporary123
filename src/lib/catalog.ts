import { catalog, type PageNode } from "@/data/catalog";

export interface ResolvedPage {
  node: PageNode;
  path: string;
  /** Ancestors from top-level down to (and including) this node. */
  trail: { node: PageNode; path: string }[];
  parent: ResolvedPage | null;
  children: { node: PageNode; path: string }[];
  siblings: { node: PageNode; path: string }[];
}

interface FlatEntry {
  node: PageNode;
  path: string;
  parentPath: string | null;
}

function buildIndex(): Map<string, FlatEntry> {
  const map = new Map<string, FlatEntry>();
  const walk = (nodes: PageNode[], prefix: string, parentPath: string | null) => {
    for (const node of nodes) {
      const path = `${prefix}/${node.slug}`;
      map.set(path, { node, path, parentPath });
      if (node.children?.length) walk(node.children, path, path);
    }
  };
  walk(catalog, "", null);
  return map;
}

const index = buildIndex();

export const allPaths = (): string[] => [...index.keys()];

export function navLabel(node: PageNode): string {
  return node.navLabel ?? node.title;
}

export function getSection(slug: string): PageNode {
  const node = catalog.find((n) => n.slug === slug);
  if (!node) throw new Error(`Unknown catalog section: ${slug}`);
  return node;
}

export function childrenOf(path: string): { node: PageNode; path: string }[] {
  const entry = index.get(path);
  if (!entry?.node.children) return [];
  return entry.node.children.map((child) => ({ node: child, path: `${path}/${child.slug}` }));
}

export function resolvePath(rawPath: string): ResolvedPage | null {
  const path = normalizePath(rawPath);
  const entry = index.get(path);
  if (!entry) return null;

  const segments = path.split("/").filter(Boolean);
  const trail: { node: PageNode; path: string }[] = [];
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    const step = index.get(acc);
    if (step) trail.push({ node: step.node, path: acc });
  }

  const parentEntry = entry.parentPath ? index.get(entry.parentPath) : null;
  const parent = parentEntry
    ? {
        node: parentEntry.node,
        path: parentEntry.path,
        trail: [],
        parent: null,
        children: childrenOf(parentEntry.path),
        siblings: [],
      }
    : null;

  const siblings = entry.parentPath
    ? childrenOf(entry.parentPath).filter((s) => s.path !== path)
    : catalog
        .filter((n) => n.slug !== entry.node.slug)
        .map((n) => ({ node: n, path: `/${n.slug}` }));

  return {
    node: entry.node,
    path,
    trail,
    parent,
    children: childrenOf(path),
    siblings,
  };
}

export function normalizePath(raw: string): string {
  const trimmed = `/${raw}`.replace(/\/+/g, "/").replace(/\/$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** Related links: explicit paths first, then siblings, capped. */
export function relatedFor(page: ResolvedPage, limit = 6): { node: PageNode; path: string }[] {
  const out: { node: PageNode; path: string }[] = [];
  const seen = new Set<string>([page.path]);

  for (const p of page.node.relatedPaths ?? []) {
    const target = index.get(normalizePath(p));
    if (target && !seen.has(target.path)) {
      seen.add(target.path);
      out.push({ node: target.node, path: target.path });
    }
  }
  for (const sibling of page.siblings) {
    if (out.length >= limit) break;
    if (!seen.has(sibling.path)) {
      seen.add(sibling.path);
      out.push(sibling);
    }
  }
  if (page.parent && out.length < limit && !seen.has(page.parent.path)) {
    out.push({ node: page.parent.node, path: page.parent.path });
  }
  return out.slice(0, limit);
}

export function findPost(slug: string) {
  return resolvePath(`/resources/blog/${slug}`);
}
