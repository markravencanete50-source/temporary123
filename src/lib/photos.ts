import { photoGroups, type PhotoGroup } from "@/data/photos";

/**
 * Maps catalog paths (and static routes) to the client-supplied photo sets.
 * Most specific rules first.
 */
const rules: { match: RegExp; groups: PhotoGroup[] }[] = [
  { match: /^\/mobile-kitchens\/(mobile|commercial)-kitchen-trailers/, groups: ["kitchen"] },
  { match: /^\/mobile-kitchens\/kitchen-trailer-sizes/, groups: ["kitchen", "dining"] },
  { match: /^\/mobile-kitchens\/emergency-kitchens/, groups: ["kitchen", "dining"] },
  { match: /^\/mobile-kitchens\/mobile-kitchen-facilities/, groups: ["kitchen", "dining"] },
  { match: /^\/mobile-kitchens/, groups: ["kitchen", "kitchenRefrigeration"] },

  { match: /^\/support-facility-trailers\/dishwashing-trailers/, groups: ["dishwashing"] },
  {
    match: /^\/support-facility-trailers\/refrigerated/,
    groups: ["refrigeration", "kitchenRefrigeration"],
  },
  { match: /^\/support-facility-trailers\/laundry-trailers/, groups: ["laundry"] },
  { match: /^\/support-facility-trailers\/(shower|restroom)/, groups: ["showerRestroom"] },
  { match: /^\/support-facility-trailers\/sink-trailers/, groups: ["sink"] },
  { match: /^\/support-facility-trailers\/handwashing-stations/, groups: ["sink", "water"] },
  { match: /^\/support-facility-trailers\/locker-room-trailers/, groups: ["locker", "laundry"] },
  { match: /^\/support-facility-trailers\/waste-tank-trailers/, groups: ["water"] },
  { match: /^\/support-facility-trailers/, groups: ["showerRestroom", "dishwashing", "sink"] },

  { match: /^\/temporary-facilities\/workforce-housing/, groups: ["sleeper"] },
  { match: /^\/temporary-facilities\/bunkhouse-trailers/, groups: ["sleeper"] },
  { match: /^\/temporary-facilities\/(man-camp|base-camp|remote-camp)/, groups: ["basecamp", "sleeper"] },
  { match: /^\/temporary-facilities\/modular-office-trailers/, groups: ["office"] },
  { match: /^\/temporary-facilities\/command-center-trailers/, groups: ["office"] },
  { match: /^\/temporary-facilities/, groups: ["sleeper", "office", "officeRestroomCombo"] },

  { match: /^\/specialty-solutions\/(disaster-relief|emergency-response)/, groups: ["basecamp", "kitchen"] },
  { match: /^\/specialty-solutions\/military-government/, groups: ["basecamp", "office"] },
  { match: /^\/specialty-solutions\/maritime/, groups: ["sleeper"] },
  { match: /^\/specialty-solutions\/(catering|food-service)/, groups: ["dining", "kitchen"] },
  { match: /^\/specialty-solutions\/turnkey/, groups: ["multifunctional", "ramps"] },
  { match: /^\/specialty-solutions/, groups: ["multifunctional", "kitchen"] },

  { match: /^\/industries\/(construction|industrial-projects)/, groups: ["ramps", "kitchen"] },
  { match: /^\/industries\/healthcare/, groups: ["kitchen", "dining"] },
  { match: /^\/industries\/(government|military)/, groups: ["basecamp", "office"] },
  { match: /^\/industries\/disaster-relief/, groups: ["basecamp", "showerRestroom"] },
  { match: /^\/industries\/education/, groups: ["dining", "kitchen"] },
  { match: /^\/industries\/events-festivals/, groups: ["multifunctional", "kitchen"] },
  { match: /^\/industries\/remote-workforce/, groups: ["sleeper", "basecamp"] },
  { match: /^\/industries\/hospitality/, groups: ["dining", "kitchen"] },
  { match: /^\/industries\/commercial-real-estate/, groups: ["office", "kitchen"] },
  { match: /^\/industries/, groups: ["kitchen", "sleeper", "office"] },

  { match: /^\/resources\/gallery/, groups: ["kitchen", "showerRestroom", "sleeper", "office", "dishwashing"] },
  { match: /^\/resources\/blog/, groups: ["kitchen", "dishwashing", "showerRestroom", "sleeper"] },
  { match: /^\/resources/, groups: ["kitchen", "multifunctional"] },

  { match: /^\/(about|contact|get-a-quote|service-areas)/, groups: ["multifunctional", "kitchen", "ramps"] },
];

const fallback: PhotoGroup[] = ["kitchen", "showerRestroom", "sleeper", "office"];

function hash(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) % 100000;
  return h;
}

/** Ordered, de-duplicated photo URLs suitable for a page. */
export function photosFor(path: string): string[] {
  const groups = rules.find((rule) => rule.match.test(path))?.groups ?? fallback;
  const pool = groups.flatMap((group) => [...photoGroups[group]]);
  const unique = [...new Set(pool)];
  if (unique.length <= 1) return unique;
  const offset = hash(path) % unique.length;
  return [...unique.slice(offset), ...unique.slice(0, offset)];
}

/** A single stable photo for a page slot. */
export function photoFor(path: string, index = 0): string | undefined {
  const list = photosFor(path);
  if (!list.length) return undefined;
  return list[index % list.length];
}
