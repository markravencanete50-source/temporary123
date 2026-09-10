import { catalog, type PageNode } from "@/data/catalog";
import { navLabel } from "@/lib/catalog";

export interface NavLeaf {
  label: string;
  path: string;
  badge?: string | undefined;
  children?: NavLeaf[];
}

export interface NavColumn {
  heading: string;
  items: NavLeaf[];
}

export interface NavFeatured {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  path: string;
}

export interface NavEntry {
  label: string;
  path: string;
  /** Present when the entry opens a mega menu. */
  columns?: NavColumn[];
  featured?: NavFeatured;
  emphasis?: "accent";
}

function leaf(section: PageNode, slugs: string[]): NavLeaf[] {
  const base = `/${section.slug}`;
  return slugs.flatMap((slug) => {
    const node = section.children?.find((c) => c.slug === slug);
    if (!node) return [];
    const path = `${base}/${slug}`;
    const item: NavLeaf = { label: navLabel(node), path };
    if (node.children?.length) {
      item.children = node.children.map((child) => ({
        label: navLabel(child),
        path: `${path}/${child.slug}`,
        badge: child.badge,
      }));
    }
    return [item];
  });
}

function section(slug: string): PageNode {
  const node = catalog.find((n) => n.slug === slug);
  if (!node) throw new Error(`Unknown section ${slug}`);
  return node;
}

function chunk(items: NavLeaf[], size: number): NavLeaf[][] {
  const out: NavLeaf[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

const mobileKitchens = section("mobile-kitchens");
const support = section("support-facility-trailers");
const temporary = section("temporary-facilities");
const specialty = section("specialty-solutions");
const industriesSection = section("industries");
const resources = section("resources");

const supportItems = leaf(
  support,
  support.children!.map((c) => c.slug),
);
const [supportA = [], supportB = [], supportC = []] = chunk(supportItems, 4);

const temporaryItems = leaf(
  temporary,
  temporary.children!.map((c) => c.slug),
);
const [temporaryA = [], temporaryB = []] = chunk(temporaryItems, 4);

const industryItems = leaf(
  industriesSection,
  industriesSection.children!.map((c) => c.slug),
);
const [industryA = [], industryB = [], industryC = []] = chunk(industryItems, 4);

export const primaryNav: NavEntry[] = [
  { label: "Home", path: "/" },
  {
    label: "Mobile Kitchens",
    path: "/mobile-kitchens",
    columns: [
      {
        heading: "Kitchen Trailers",
        items: leaf(mobileKitchens, [
          "mobile-kitchen-trailers",
          "commercial-kitchen-trailers",
          "portable-kitchens",
        ]),
      },
      {
        heading: "Kitchen Facilities",
        items: leaf(mobileKitchens, [
          "temporary-kitchens",
          "emergency-kitchens",
          "mobile-kitchen-facilities",
        ]),
      },
      {
        heading: "Kitchen Trailer Sizes",
        items: leaf(mobileKitchens, ["kitchen-trailer-sizes"]),
      },
    ],
    featured: {
      kicker: "Featured Solution",
      title: "28 Ft Commercial Kitchen Trailer",
      description:
        "Our most requested commercial length. Configuration, equipment and utility service confirmed per project.",
      ctaLabel: "Explore Mobile Kitchens",
      path: "/mobile-kitchens/commercial-kitchen-trailers/28-ft",
    },
  },
  {
    label: "Support & Facility Trailers",
    path: "/support-facility-trailers",
    columns: [
      { heading: "Kitchen Support", items: supportA },
      { heading: "Sanitation", items: supportB },
      { heading: "Site Support", items: supportC },
    ],
    featured: {
      kicker: "Featured Solution",
      title: "34 Ft Restroom Trailer",
      description:
        "Multi-stall sanitation with handwashing and climate control for long-running sites.",
      ctaLabel: "Explore Support Trailers",
      path: "/support-facility-trailers/restroom-trailers/34-ft",
    },
  },
  {
    label: "Temporary Facilities",
    path: "/temporary-facilities",
    columns: [
      { heading: "Housing", items: temporaryA },
      { heading: "Camps & Offices", items: temporaryB },
    ],
    featured: {
      kicker: "Featured Solution",
      title: "Base Camp Facilities",
      description:
        "Accommodation, dining, sanitation and operations space planned as one compound.",
      ctaLabel: "Explore Temporary Facilities",
      path: "/temporary-facilities/base-camp-facilities",
    },
  },
  {
    label: "Specialty Solutions",
    path: "/specialty-solutions",
    columns: [
      {
        heading: "Response",
        items: leaf(specialty, [
          "disaster-relief-solutions",
          "emergency-response-facilities",
          "military-government-facilities",
        ]),
      },
      {
        heading: "Food Service",
        items: leaf(specialty, ["catering-facilities", "food-service-solutions"]),
      },
      {
        heading: "Programme Delivery",
        items: leaf(specialty, ["maritime-accommodation", "turnkey-facility-solutions"]),
      },
    ],
    featured: {
      kicker: "Featured Solution",
      title: "Turnkey Facility Solutions",
      description:
        "Survey, layout, delivery, connection, servicing and demobilisation under one contract.",
      ctaLabel: "Explore Specialty Solutions",
      path: "/specialty-solutions/turnkey-facility-solutions",
    },
  },
  {
    label: "Industries",
    path: "/industries",
    columns: [
      { heading: "Built Environment", items: industryA },
      { heading: "Public & Response", items: industryB },
      { heading: "Operations", items: industryC },
    ],
    featured: {
      kicker: "Featured Sector",
      title: "Disaster Relief",
      description:
        "Feeding, sanitation and welfare capacity staged for rapid deployment after an event.",
      ctaLabel: "Explore Industries",
      path: "/industries/disaster-relief",
    },
  },
  {
    label: "Resources",
    path: "/resources",
    columns: [
      {
        heading: "Reading",
        items: leaf(resources, ["blog", "case-studies", "equipment-guides"]),
      },
      { heading: "Media", items: leaf(resources, ["gallery", "videos"]) },
      { heading: "Answers", items: leaf(resources, ["faqs"]) },
    ],
    featured: {
      kicker: "From the Blog",
      title: "How to Size a Mobile Kitchen Trailer",
      description: "Covers per service, menu complexity and site access decide the length you need.",
      ctaLabel: "Read the Blog",
      path: "/resources/blog/how-to-size-a-mobile-kitchen-trailer",
    },
  },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

export const quoteCta = { label: "Get a Quote", path: "/get-a-quote" };
