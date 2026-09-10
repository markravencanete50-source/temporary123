import { createFileRoute } from "@tanstack/react-router";

import { allPaths } from "@/lib/catalog";

export const Route = createFileRoute("/api/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const staticPaths = ["/", "/about", "/contact", "/get-a-quote", "/service-areas"];
        const urls = [...staticPaths, ...allPaths()];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${origin}${p}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
