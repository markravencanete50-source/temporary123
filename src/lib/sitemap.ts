import { allPaths } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

export function sitemapResponse() {
  const staticPaths = ["/", "/about", "/contact", "/get-a-quote", "/service-areas"];
  const urls = [...staticPaths, ...allPaths()];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
