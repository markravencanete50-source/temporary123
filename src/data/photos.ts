// Client-supplied photography mirrored locally from the current Temporary 123 site.
// Keeping these in /public avoids the Lovable-only /__l5e asset route and makes
// every image available in local development and on Vercel.
export const photoGroups = {
  kitchen: [
    "/images/trailer-interior.png",
    "/images/trailer-side.png",
    "/images/mobile-kitchen.jpg",
    "/images/dishwashing.png",
    "/images/food-service.png",
  ],
  kitchenRefrigeration: [
    "/images/kitchen-exterior.png",
    "/images/trailer-side.png",
    "/images/mobile-kitchen.jpg",
  ],
  dishwashing: [
    "/images/equipment-5.png",
    "/images/dishwashing.png",
    "/images/trailer-interior.png",
  ],
  refrigeration: [
    "/images/kitchen-exterior.png",
    "/images/trailer-side.png",
    "/images/mobile-kitchen.jpg",
  ],
  laundry: [
    "/images/laundry.png",
    "/images/restroom-shower-interior.webp",
    "/images/facility-layout.jpg",
  ],
  showerRestroom: [
    "/images/restroom-shower.png",
    "/images/restroom-shower-interior.webp",
    "/images/restroom-trailer.jpg",
    "/images/shower-trailer.jpg",
  ],
  sink: ["/images/sink-trailer.png", "/images/unit-2.jpg", "/images/equipment-5.png"],
  locker: ["/images/facility-combo.png", "/images/restroom-shower-interior.webp"],
  sleeper: ["/images/facility-combo.png", "/images/bunkhouse.png", "/images/office-trailer.png"],
  office: [
    "/images/facility-combo.png",
    "/images/command-center.png",
    "/images/office-trailer.png",
  ],
  basecamp: [
    "/images/facility-layout.jpg",
    "/images/temporary-facilities.jpg",
    "/images/trailer-20x40.png",
  ],
  dining: [
    "/images/food-service.png",
    "/images/temporary-facilities.jpg",
    "/images/trailer-interior.png",
  ],
  ramps: ["/images/trailer-side.png", "/images/facility-combo.png", "/images/restroom-shower.png"],
  water: ["/images/sink-trailer.png", "/images/restroom-shower.png", "/images/facility-layout.jpg"],
  generator: ["/images/kitchen-exterior.png", "/images/facility-layout.jpg"],
  officeRestroomCombo: [
    "/images/facility-combo.png",
    "/images/restroom-shower.png",
    "/images/office-trailer.png",
  ],
  multifunctional: [
    "/images/temporary-facilities.jpg",
    "/images/facility-combo.png",
    "/images/facility-layout.jpg",
    "/images/trailer-20x40.png",
  ],
} as const satisfies Record<string, readonly string[]>;

export type PhotoGroup = keyof typeof photoGroups;
