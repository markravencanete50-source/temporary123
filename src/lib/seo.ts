const SITE_NAME = "Duo Kitchenware";

export interface MetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
}

export function pageMeta({ title, description, path, type = "website" }: MetaInput) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    meta: [
      { title: fullTitle.slice(0, 70) },
      { name: "description", content: description.slice(0, 158) },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description.slice(0, 158) },
      { property: "og:type", content: type },
      { property: "og:url", content: path },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path,
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: path,
    provider: { "@type": "Organization", name: SITE_NAME },
  };
}

export function productSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: path,
    brand: { "@type": "Brand", name: SITE_NAME },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(headline: string, description: string, path: string, date?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: path,
    ...(date ? { datePublished: date } : {}),
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export { SITE_NAME };
