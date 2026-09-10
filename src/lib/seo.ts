const SITE_NAME = "Duo Kitchenware";
const SITE_URL = "https://temporary123.com";
const DEFAULT_SOCIAL_IMAGE = "/images/trailer-side.png";

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export interface MetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
}

export function pageMeta({ title, description, path, type = "website" }: MetaInput) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = absoluteUrl(path);
  const socialImageUrl = absoluteUrl(DEFAULT_SOCIAL_IMAGE);
  return {
    meta: [
      { title: fullTitle.slice(0, 70) },
      { name: "description", content: description.slice(0, 158) },
      {
        name: "robots",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description.slice(0, 158) },
      { property: "og:type", content: type },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: socialImageUrl },
      { property: "og:image:alt", content: "Duo Kitchenware mobile kitchen trailer" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description.slice(0, 158) },
      { name: "twitter:image", content: socialImageUrl },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
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
      item: absoluteUrl(item.path),
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
    url: absoluteUrl(path),
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function productSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(path),
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
    url: absoluteUrl(path),
    ...(date ? { datePublished: date } : {}),
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "+1-800-443-5212",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-443-5212",
      contactType: "sales and dispatch",
      availableLanguage: "English",
    },
  };
}

export { SITE_NAME, SITE_URL };
