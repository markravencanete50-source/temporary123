import { createFileRoute, notFound } from "@tanstack/react-router";

import { SiteLink } from "@/components/site/SiteLink";
import {
  CategoryHub,
  IndustryTemplate,
  PostTemplate,
  ServiceTemplate,
  VariationTemplate,
  ResourceTemplate,
} from "@/components/site/templates";
import { navLabel, resolvePath } from "@/lib/catalog";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  pageMeta,
  productSchema,
  serviceSchema,
} from "@/lib/seo";

export const Route = createFileRoute("/$")({
  head: ({ params }) => {
    const path = `/${params._splat ?? ""}`;
    const page = resolvePath(path);
    if (!page) {
      return {
        meta: [
          { title: "Page not found | Duo Kitchenware" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const node = page.node;
    const title = node.metaTitle ?? `${node.title}`;
    const description = node.metaDescription ?? node.summary;
    const scripts = [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          ...page.trail.map((step) => ({ name: navLabel(step.node), path: step.path })),
        ]),
      ),
    ];

    if (node.kind === "variation") {
      scripts.push(jsonLd(productSchema(node.title, description, page.path)));
    } else if (node.kind === "post") {
      scripts.push(jsonLd(articleSchema(node.title, description, page.path, node.date)));
    } else if (node.kind !== "resource") {
      scripts.push(jsonLd(serviceSchema(node.title, description, page.path)));
    }
    if (node.faqs?.length) scripts.push(jsonLd(faqSchema(node.faqs)));

    return {
      ...pageMeta({
        title,
        description,
        path: page.path,
        type:
          node.kind === "variation" ? "product" : node.kind === "post" ? "article" : "website",
      }),
      scripts,
    };
  },
  loader: ({ params }) => {
    const page = resolvePath(`/${params._splat ?? ""}`);
    if (!page) throw notFound();
    return { path: page.path };
  },
  notFoundComponent: CatalogNotFound,
  component: CatalogPage,
});

function CatalogPage() {
  const params = Route.useParams();
  const page = resolvePath(`/${params._splat ?? ""}`);
  if (!page) return <CatalogNotFound />;

  switch (page.node.kind) {
    case "category":
      return <CategoryHub page={page} />;
    case "industry":
      return <IndustryTemplate page={page} />;
    case "resource":
      return <ResourceTemplate page={page} />;
    case "post":
      return <PostTemplate page={page} />;
    case "variation":
      return <VariationTemplate page={page} />;
    default:
      return <ServiceTemplate page={page} />;
  }
}

function CatalogNotFound() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-24">
      <p className="label-mono text-accent">404</p>
      <h1 className="mt-4 text-5xl font-bold">This page isn’t in the catalog</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-steel text-pretty">
        The page may have moved, or the equipment listing has not been published yet.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <SiteLink
          href="/mobile-kitchens"
          className="bg-primary px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Browse the Catalog
        </SiteLink>
        <SiteLink
          href="/contact"
          className="border border-line px-7 py-3.5 font-display text-base font-bold uppercase tracking-wider transition-colors hover:border-primary"
        >
          Contact Us
        </SiteLink>
      </div>
    </div>
  );
}
