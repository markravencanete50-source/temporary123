/**
 * Duo Kitchenware catalog data.
 *
 * The whole site is generated from this tree: navigation, mega menu, URLs,
 * breadcrumbs, hub pages, service pages, variation pages and related links.
 *
 * To add a page: add a node in the right place. To add a new size, add an
 * entry to the `sizes` array of that service (or push a full node).
 * Nothing else needs to change — nav, URLs and breadcrumbs follow the tree.
 *
 * NOTE ON SPECIFICATIONS: no technical specification is invented here.
 * Spec rows carry the placeholder value `TBD` until real figures are supplied.
 */

export type NodeKind = "category" | "service" | "variation" | "industry" | "resource" | "post";

export interface Spec {
  label: string;
  value: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface PageNode {
  slug: string;
  title: string;
  navLabel?: string;
  kind: NodeKind;
  kicker?: string;
  /** Short card + meta description. */
  summary: string;
  /** Page introduction paragraphs. */
  intro?: string[];
  benefits?: Benefit[];
  equipment?: string[];
  applications?: string[];
  specs?: Spec[];
  industries?: string[];
  faqs?: Faq[];
  /** Absolute site paths for the related-content section. */
  relatedPaths?: string[];
  metaTitle?: string;
  metaDescription?: string;
  /** Optional badge shown in the mega menu size column. */
  badge?: string | undefined;
  date?: string;
  body?: string[];
  children?: PageNode[];
}

const TBD = "TBD — confirmed on quote";

/** Standard spec sheet skeleton for a towable unit. Values stay TBD. */
const trailerSpecs = (): Spec[] => [
  { label: "Overall length", value: TBD },
  { label: "Overall width", value: TBD },
  { label: "Overall height", value: TBD },
  { label: "Dry weight", value: TBD },
  { label: "Chassis / towing", value: TBD },
  { label: "Interior finish", value: TBD },
];

const utilitySpecs = (): Spec[] => [
  { label: "Electrical service", value: TBD },
  { label: "Generator option", value: TBD },
  { label: "Fresh water capacity", value: TBD },
  { label: "Waste water capacity", value: TBD },
  { label: "Water heater", value: TBD },
  { label: "HVAC", value: TBD },
];

/** Build the size variation children for a service. */
function sizeVariations(
  parentTitle: string,
  parentPath: string,
  sizes: { ft: number; badge?: string }[],
): PageNode[] {
  return sizes.map(({ ft, badge }) => ({
    slug: `${ft}-ft`,
    title: `${ft} Ft ${parentTitle.replace(/s$/, "")}`,
    navLabel: `${ft} Ft`,
    kind: "variation" as const,
    kicker: `${ft} Ft · ${parentTitle}`,
    badge,
    summary: `${ft} ft configuration of our ${parentTitle.toLowerCase()}, delivered, positioned and connected on site.`,
    intro: [
      `The ${ft} ft unit is one of the standard lengths in our ${parentTitle.toLowerCase()} fleet. Layout, equipment and utility connections are confirmed against your site survey before dispatch.`,
      `Every specification on this page is finalised with our team at quote stage so the unit that arrives matches the plan you signed off.`,
    ],
    specs: trailerSpecs(),
    equipment: [
      "Equipment list confirmed per unit and per project",
      "Stainless work surfaces and food-safe finishes",
      "Interior lighting and ventilation",
      "Utility connection points for power and water",
    ],
    applications: [
      "Kitchen renovations and shutdowns",
      "Event and festival food service",
      "Emergency and disaster response feeding",
      "Remote workforce and camp catering",
    ],
    faqs: [
      {
        q: `What is included with the ${ft} ft unit?`,
        a: "Delivery, positioning and connection guidance are quoted with the unit. The equipment schedule is confirmed in writing before dispatch.",
      },
      {
        q: "Can the layout be changed?",
        a: "Yes. Layout and equipment are configured per project within the limits of the shell.",
      },
      {
        q: "How long can I rent for?",
        a: "Short-term, seasonal and long-term terms are all available.",
      },
    ],
    relatedPaths: [parentPath],
  }));
}

function svc(
  slug: string,
  title: string,
  summary: string,
  extra: Partial<PageNode> = {},
): PageNode {
  return { slug, title, kind: "service", summary, ...extra };
}

function industry(
  slug: string,
  title: string,
  summary: string,
  intro: string[],
  extra: Partial<PageNode> = {},
): PageNode {
  return { slug, title, kind: "industry", summary, intro, ...extra };
}

/* ------------------------------------------------------------------ */
/* MOBILE KITCHENS                                                     */
/* ------------------------------------------------------------------ */

const mobileKitchenTrailers: PageNode = {
  slug: "mobile-kitchen-trailers",
  title: "Mobile Kitchen Trailers",
  kind: "service",
  kicker: "Mobile Kitchens",
  summary:
    "Towable production kitchens in standard lengths from 24 to 40 ft, configured for the volume you need to cook.",
  intro: [
    "Our mobile kitchen trailers put a complete cooking line on a towable chassis so food service continues while a permanent kitchen is out of action, under construction, or simply does not exist yet.",
    "Each trailer is configured around your menu and throughput: cooking line, refrigeration, prep surfaces, warewashing and the utility connections that tie it all to site.",
  ],
  benefits: [
    {
      title: "Continuity of service",
      description:
        "Keep meal service running through a renovation, relocation or unplanned closure without reducing covers.",
    },
    {
      title: "Configured, not generic",
      description:
        "Cooking line, refrigeration and warewashing are specified for your menu instead of a fixed package.",
    },
    {
      title: "Site-ready delivery",
      description:
        "Units are delivered, positioned and prepared for connection to power, water and waste.",
    },
    {
      title: "Scalable fleet",
      description:
        "Add a second unit, a dishwashing trailer or refrigerated storage as demand changes.",
    },
  ],
  equipment: [
    "Commercial cooking line configured per project",
    "Refrigeration and freezer capacity",
    "Stainless preparation surfaces and shelving",
    "Warewashing sinks and handwash station",
    "Extraction hood and fire suppression",
    "Interior lighting, ventilation and climate control",
  ],
  applications: [
    "Kitchen renovation and refurbishment projects",
    "Hospital, campus and correctional food service",
    "Disaster relief and emergency feeding",
    "Large events, festivals and hospitality overflow",
    "Remote workforce, camp and industrial site catering",
  ],
  specs: [...trailerSpecs(), ...utilitySpecs()],
  faqs: [
    {
      q: "Which length should I choose?",
      a: "Length follows covers per service, menu complexity and the space available on site. Our team sizes the unit with you during the quote.",
    },
    {
      q: "What utilities are required?",
      a: "Electrical service, potable water and waste are the three connections to plan for. Requirements are confirmed per unit and per site.",
    },
    {
      q: "Do you deliver nationwide?",
      a: "Yes — delivery, positioning and collection are arranged as part of the rental.",
    },
    {
      q: "Can I rent for a single event?",
      a: "Yes. Terms range from a few days to multi-year deployments.",
    },
  ],
  industries: [
    "Construction",
    "Healthcare",
    "Government",
    "Disaster Relief",
    "Events & Festivals",
    "Remote Workforce",
  ],
  relatedPaths: [
    "/mobile-kitchens/commercial-kitchen-trailers",
    "/mobile-kitchens/temporary-kitchens",
    "/support-facility-trailers/dishwashing-trailers",
    "/support-facility-trailers/refrigerated-trailers",
  ],
};
mobileKitchenTrailers.children = sizeVariations(
  "Mobile Kitchen Trailers",
  "/mobile-kitchens/mobile-kitchen-trailers",
  [{ ft: 24 }, { ft: 26 }, { ft: 28, badge: "Popular" }, { ft: 38 }, { ft: 40 }],
);

const commercialKitchenTrailers: PageNode = {
  slug: "commercial-kitchen-trailers",
  title: "Commercial Kitchen Trailers",
  kind: "service",
  kicker: "Mobile Kitchens",
  summary:
    "High-throughput commercial cooking lines for contract catering, institutional food service and long-term deployments.",
  intro: [
    "Commercial kitchen trailers are specified for sustained, high-volume production: heavier cooking equipment, more refrigeration and a warewashing station that keeps up with a full service.",
    "They suit contract caterers, institutional kitchens and any operation where the temporary kitchen has to match the output of the permanent one.",
  ],
  benefits: [
    {
      title: "Built for volume",
      description: "Specified around sustained production rather than occasional service.",
    },
    {
      title: "Full line in one unit",
      description: "Cooking, prep, refrigeration and warewashing within a single shell.",
    },
    {
      title: "Long-term ready",
      description: "Suited to multi-month and multi-year deployments with scheduled servicing.",
    },
  ],
  equipment: [
    "Heavy-duty commercial cooking line",
    "Reach-in and walk-in refrigeration options",
    "Extended stainless prep and landing space",
    "Multi-compartment warewashing",
    "Extraction and suppression system",
  ],
  applications: [
    "Contract catering operations",
    "Institutional and campus dining",
    "Industrial and energy projects",
    "Extended emergency response operations",
  ],
  specs: [...trailerSpecs(), ...utilitySpecs()],
  faqs: [
    {
      q: "How is this different from a mobile kitchen trailer?",
      a: "The shell is comparable; the equipment package and utility service are specified for higher sustained throughput.",
    },
    {
      q: "Is service and maintenance included?",
      a: "Maintenance scope is agreed as part of longer-term rental terms.",
    },
  ],
  relatedPaths: [
    "/mobile-kitchens/mobile-kitchen-trailers",
    "/mobile-kitchens/mobile-kitchen-facilities",
    "/support-facility-trailers/refrigerated-trailers",
  ],
};
commercialKitchenTrailers.children = sizeVariations(
  "Commercial Kitchen Trailers",
  "/mobile-kitchens/commercial-kitchen-trailers",
  [{ ft: 24 }, { ft: 26 }, { ft: 28, badge: "Popular" }, { ft: 38 }, { ft: 40 }],
);

const mobileKitchens: PageNode = {
  slug: "mobile-kitchens",
  title: "Mobile Kitchens",
  kind: "category",
  kicker: "Catalog / 01",
  summary:
    "Towable and modular kitchens for renovations, emergencies, events and remote operations — 24 to 40 ft.",
  intro: [
    "Duo Kitchenware supplies temporary cooking capacity: complete kitchens on wheels, delivered to site and configured for your menu, volume and utility connections.",
    "Start with the trailer family that fits your operation, then choose a length. Support equipment such as dishwashing, refrigeration and handwashing can be added to any deployment.",
  ],
  children: [
    mobileKitchenTrailers,
    commercialKitchenTrailers,
    svc(
      "portable-kitchens",
      "Portable Kitchens",
      "Compact, relocatable cooking units for constrained sites and short deployments.",
      {
        intro: [
          "Portable kitchens are the lightest option in the catalog: quick to place, quick to relocate, and suited to sites where a full trailer cannot be positioned.",
        ],
        applications: [
          "Constrained urban sites",
          "Short-duration events",
          "Satellite service points",
        ],
        relatedPaths: [
          "/mobile-kitchens/mobile-kitchen-trailers",
          "/mobile-kitchens/temporary-kitchens",
        ],
      },
    ),
    svc(
      "temporary-kitchens",
      "Temporary Kitchens",
      "Complete interim kitchen facilities for renovation, relocation and capacity projects.",
      {
        intro: [
          "A temporary kitchen combines cooking, prep, refrigeration and warewashing into one interim facility so an existing operation can keep serving while its permanent kitchen is unavailable.",
          "Scope is planned around service volume, site access and the length of the programme.",
        ],
        benefits: [
          {
            title: "Planned around your programme",
            description: "Scope and duration follow the construction or relocation schedule.",
          },
          {
            title: "Complete facility",
            description:
              "Cooking, storage and warewashing planned as one workflow, not separate hires.",
          },
        ],
        applications: [
          "Kitchen refurbishment programmes",
          "Facility relocation",
          "Seasonal capacity increases",
        ],
        relatedPaths: [
          "/mobile-kitchens/mobile-kitchen-trailers",
          "/mobile-kitchens/mobile-kitchen-facilities",
          "/temporary-facilities/temporary-facility-rentals",
        ],
      },
    ),
    svc(
      "emergency-kitchens",
      "Emergency Kitchens",
      "Rapid-deployment feeding capacity for disaster response and emergency operations.",
      {
        intro: [
          "Emergency kitchens are staged for fast dispatch when feeding capacity has to reach a site quickly — after a storm, a fire, a utility failure or a mass-care activation.",
        ],
        applications: [
          "Disaster relief feeding operations",
          "Utility and infrastructure failures",
          "Evacuation and shelter support",
        ],
        relatedPaths: [
          "/specialty-solutions/disaster-relief-solutions",
          "/specialty-solutions/emergency-response-facilities",
          "/industries/disaster-relief",
        ],
      },
    ),
    svc(
      "mobile-kitchen-facilities",
      "Mobile Kitchen Facilities",
      "Multi-unit kitchen and support compounds for large or long-running operations.",
      {
        intro: [
          "When one trailer is not enough, we plan a compound: cooking units alongside dishwashing, refrigerated storage, handwashing and dining support, laid out as a single working facility.",
        ],
        applications: [
          "Large workforce feeding operations",
          "Multi-month construction programmes",
          "Base camp and man camp dining",
        ],
        relatedPaths: [
          "/temporary-facilities/base-camp-facilities",
          "/specialty-solutions/turnkey-facility-solutions",
          "/support-facility-trailers/dishwashing-trailers",
        ],
      },
    ),
    svc(
      "kitchen-trailer-sizes",
      "Kitchen Trailer Sizes",
      "Compare the standard lengths in our kitchen trailer fleet and what each one supports.",
      {
        intro: [
          "Standard lengths run from 24 to 40 ft across both the mobile and commercial kitchen trailer families. Additional lengths are added to the catalog as they enter the fleet.",
          "Choose a length to see its configuration page, or speak to our team and we will size the unit against your covers, menu and site.",
        ],
        relatedPaths: [
          "/mobile-kitchens/mobile-kitchen-trailers",
          "/mobile-kitchens/commercial-kitchen-trailers",
        ],
      },
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* SUPPORT & FACILITY TRAILERS                                         */
/* ------------------------------------------------------------------ */

const restroomTrailers: PageNode = {
  slug: "restroom-trailers",
  title: "Restroom Trailers",
  kind: "service",
  kicker: "Support & Facility Trailers",
  summary: "Multi-stall restroom trailers for job sites, events and long-term facility support.",
  metaTitle: "Restroom Trailer Rentals Nationwide",
  metaDescription:
    "Rent climate-controlled restroom trailers for construction sites, events and temporary facilities, with delivery and scheduled servicing nationwide.",
  intro: [
    "Restroom trailers provide plumbed, climate-controlled sanitation for sites and events where permanent facilities are unavailable or insufficient.",
    "Stall counts and lengths vary by unit. Water supply, waste handling and servicing frequency are planned with the rental.",
  ],
  benefits: [
    {
      title: "Plumbed and enclosed",
      description: "Flushing fixtures, sinks and lighting in a climate-controlled interior.",
    },
    {
      title: "Serviced on schedule",
      description: "Waste removal and restocking intervals set to occupancy.",
    },
    {
      title: "Scales with headcount",
      description: "Add units or combine with shower trailers as the site grows.",
    },
  ],
  equipment: [
    "Multiple private stalls",
    "Handwash sinks with hot water",
    "Interior lighting and ventilation",
    "Heating and cooling",
    "Fresh and waste water tanks",
  ],
  applications: [
    "Construction and industrial sites",
    "Events and festivals",
    "Disaster relief and base camps",
    "Temporary facility compounds",
  ],
  specs: [...trailerSpecs(), ...utilitySpecs()],
  faqs: [
    {
      q: "How many restrooms do I need?",
      a: "Ratios depend on headcount, shift pattern and site rules. Our team works it out with you.",
    },
    {
      q: "Do you handle waste servicing?",
      a: "Servicing is quoted with the unit and scheduled against expected occupancy.",
    },
    {
      q: "What site access and utilities are required?",
      a: "We confirm the delivery route, level placement area, power, fresh water and waste plan before dispatch. Tank-supported configurations are available where fixed services are limited.",
    },
    {
      q: "Can restroom trailers be combined with showers?",
      a: "Yes. Restroom, shower, handwashing and waste capacity can be planned as one sanitation package for the same site and schedule.",
    },
  ],
  relatedPaths: [
    "/support-facility-trailers/shower-trailers",
    "/support-facility-trailers/restroom-shower-combo-trailers",
    "/support-facility-trailers/handwashing-stations",
    "/temporary-facilities/temporary-facility-rentals",
  ],
};
restroomTrailers.children = sizeVariations(
  "Restroom Trailers",
  "/support-facility-trailers/restroom-trailers",
  [{ ft: 24 }, { ft: 28 }, { ft: 34, badge: "Popular" }],
);

const showerTrailers: PageNode = {
  slug: "shower-trailers",
  title: "Shower Trailers",
  kind: "service",
  kicker: "Support & Facility Trailers",
  summary:
    "Private shower stalls with hot water for camps, response operations and long-duration sites.",
  metaTitle: "Portable Shower Trailer Rentals Nationwide",
  metaDescription:
    "Rent private, climate-controlled shower trailers with hot water for workforce camps, emergency response and long-term projects across the United States.",
  intro: [
    "Shower trailers give crews and residents private, heated washing facilities on sites with no permanent plumbing.",
    "Stall counts, water heating and waste handling are planned around occupancy and shift patterns.",
  ],
  benefits: [
    {
      title: "Private facilities",
      description: "Individual shower and changing areas support daily use by rotating crews.",
    },
    {
      title: "Hot water planned to demand",
      description: "Heating and storage are matched to occupancy, shifts and recovery time.",
    },
    {
      title: "Complete water plan",
      description: "Fresh water, grey water and servicing are scoped before the unit arrives.",
    },
  ],
  equipment: [
    "Private shower stalls with changing space",
    "On-demand or tank water heating",
    "Ventilation and interior lighting",
    "Fresh and grey water tanks",
  ],
  applications: [
    "Workforce housing and man camps",
    "Disaster relief and mass care",
    "Military and government deployments",
    "Long-duration industrial projects",
  ],
  specs: [...trailerSpecs(), ...utilitySpecs()],
  faqs: [
    {
      q: "How many shower stalls does a site need?",
      a: "We size the facility from peak shift demand, the shower window and the time available for hot-water recovery and cleaning.",
    },
    {
      q: "Can a shower trailer operate without permanent plumbing?",
      a: "Yes. Fresh-water storage, pumping and grey-water holding can be included when permanent connections are unavailable.",
    },
  ],
  relatedPaths: [
    "/support-facility-trailers/restroom-trailers",
    "/support-facility-trailers/restroom-shower-combo-trailers",
    "/support-facility-trailers/laundry-trailers",
    "/temporary-facilities/workforce-housing",
  ],
};
showerTrailers.children = sizeVariations(
  "Shower Trailers",
  "/support-facility-trailers/shower-trailers",
  [{ ft: 24 }, { ft: 28 }],
);

const supportFacilityTrailers: PageNode = {
  slug: "support-facility-trailers",
  title: "Support & Facility Trailers",
  navLabel: "Support & Facility",
  kind: "category",
  kicker: "Catalog / 02",
  summary:
    "Warewashing, refrigeration, sanitation and laundry units that complete a temporary facility.",
  intro: [
    "A working kitchen or camp needs more than cooking capacity. Support trailers handle warewashing, cold storage, sanitation, handwashing, laundry and waste so the whole operation functions to standard.",
    "Any support unit can be rented on its own or planned alongside a kitchen or housing deployment.",
  ],
  children: [
    svc(
      "dishwashing-trailers",
      "Dishwashing Trailers",
      "High-throughput warewashing to keep pace with a full production kitchen.",
      {
        metaTitle: "Commercial Dishwashing Trailer Rentals",
        metaDescription:
          "Rent a commercial dishwashing trailer for temporary kitchens, institutional dining and events, with delivery, utilities and workflow planned nationwide.",
        intro: [
          "Dishwashing trailers take warewashing out of the cooking space, protecting throughput and hygiene separation during high-volume service.",
        ],
        benefits: [
          {
            title: "Separate clean and soiled flow",
            description:
              "Dedicated landing areas protect hygiene and keep the kitchen line moving.",
          },
          {
            title: "Matched to meal volume",
            description: "Machine capacity and staffing space are planned around peak service.",
          },
          {
            title: "Connected as one system",
            description:
              "Power, hot water, drainage and waste handling are coordinated before delivery.",
          },
        ],
        equipment: [
          "Commercial dish machine",
          "Multi-compartment sinks",
          "Soiled and clean landing areas",
          "Hot water generation",
        ],
        applications: [
          "Contract catering operations",
          "Institutional dining",
          "Festival and event kitchens",
        ],
        specs: [...trailerSpecs(), ...utilitySpecs()],
        faqs: [
          {
            q: "Can the dishwashing trailer run beside a mobile kitchen?",
            a: "Yes. The units are positioned to create a practical soiled-return and clean-service route between warewashing and production.",
          },
          {
            q: "What determines dishwashing capacity?",
            a: "Service ware, covers per peak hour, rack cycle time and the available hot-water and drainage services determine the required configuration.",
          },
        ],
        relatedPaths: [
          "/mobile-kitchens/mobile-kitchen-trailers",
          "/support-facility-trailers/sink-trailers",
          "/support-facility-trailers/waste-tank-trailers",
        ],
      },
    ),
    svc(
      "refrigerated-trailers",
      "Refrigerated Trailers",
      "Towable cold and frozen storage positioned next to your production line.",
      {
        intro: [
          "Refrigerated trailers extend cold storage capacity on site, whether that is chilled produce for a temporary kitchen or frozen stock for a long deployment.",
        ],
        equipment: [
          "Temperature-controlled cargo space",
          "Shelving options",
          "Temperature monitoring",
        ],
        applications: ["Kitchen deployments", "Event catering", "Cold chain overflow"],
        specs: [...trailerSpecs(), { label: "Temperature range", value: TBD }],
        relatedPaths: [
          "/support-facility-trailers/refrigerated-containers",
          "/mobile-kitchens/commercial-kitchen-trailers",
        ],
      },
    ),
    svc(
      "refrigerated-containers",
      "Refrigerated Containers",
      "Ground-level cold storage containers for static, long-term capacity.",
      {
        intro: [
          "Where storage stays in one place for the length of a project, a refrigerated container gives ground-level access and a smaller footprint than a towable unit.",
        ],
        specs: [
          { label: "Container size", value: TBD },
          { label: "Temperature range", value: TBD },
          { label: "Electrical service", value: TBD },
        ],
        relatedPaths: [
          "/support-facility-trailers/refrigerated-trailers",
          "/temporary-facilities/base-camp-facilities",
        ],
      },
    ),
    svc(
      "laundry-trailers",
      "Laundry Trailers",
      "Commercial washers and dryers for camps, response operations and workforce housing.",
      {
        intro: [
          "Laundry trailers keep crews and residents in clean workwear and bedding on sites with no permanent facilities.",
        ],
        equipment: ["Commercial washers", "Commercial dryers", "Folding space", "Water heating"],
        applications: ["Man camps", "Disaster relief", "Military deployments"],
        specs: [...trailerSpecs(), ...utilitySpecs()],
        relatedPaths: [
          "/support-facility-trailers/shower-trailers",
          "/temporary-facilities/workforce-housing",
        ],
      },
    ),
    showerTrailers,
    restroomTrailers,
    svc(
      "restroom-shower-combo-trailers",
      "Restroom & Shower Combo Trailers",
      "Restroom stalls and shower stalls in a single unit for compact site footprints.",
      {
        intro: [
          "Combination trailers deliver both sanitation functions in one shell — useful where space, transport movements or budget are limited.",
        ],
        equipment: ["Restroom stalls", "Shower stalls", "Handwash sinks", "Water heating"],
        specs: [...trailerSpecs(), ...utilitySpecs()],
        relatedPaths: [
          "/support-facility-trailers/restroom-trailers",
          "/support-facility-trailers/shower-trailers",
        ],
      },
    ),
    svc(
      "sink-trailers",
      "Sink Trailers",
      "Multi-bay sinks for food handling, warewashing support and hygiene compliance.",
      {
        intro: [
          "Sink trailers provide compliant wash-up capacity where a kitchen or food operation needs additional bays.",
        ],
        specs: [...trailerSpecs(), { label: "Number of bays", value: TBD }],
        relatedPaths: [
          "/support-facility-trailers/dishwashing-trailers",
          "/support-facility-trailers/handwashing-stations",
        ],
      },
    ),
    svc(
      "handwashing-stations",
      "Handwashing Stations",
      "Portable handwash points for food service, sanitation and site hygiene.",
      {
        intro: [
          "Handwashing stations are placed at kitchen entries, restroom banks and food service points to meet hygiene requirements.",
        ],
        specs: [
          { label: "Stations per unit", value: TBD },
          { label: "Water capacity", value: TBD },
          { label: "Hot water", value: TBD },
        ],
        relatedPaths: [
          "/support-facility-trailers/restroom-trailers",
          "/support-facility-trailers/sink-trailers",
        ],
      },
    ),
    svc(
      "locker-room-trailers",
      "Locker Room Trailers",
      "Changing and locker facilities for shift crews and industrial sites.",
      {
        intro: [
          "Locker room trailers give crews a clean place to change and store gear, separating work clothing from living and dining areas.",
        ],
        specs: [...trailerSpecs()],
        relatedPaths: [
          "/support-facility-trailers/shower-trailers",
          "/industries/industrial-projects",
        ],
      },
    ),
    svc(
      "waste-tank-trailers",
      "Waste Tank Trailers",
      "Holding tanks that keep sanitation and kitchen units running between services.",
      {
        metaTitle: "Waste and Water Tank Trailer Rentals",
        metaDescription:
          "Add fresh-water and waste holding capacity to temporary kitchens, restrooms and shower trailers, with connections and servicing planned for your site.",
        intro: [
          "Waste tank trailers add holding capacity so restroom, shower and kitchen units stay in service longer between scheduled pump-outs.",
        ],
        benefits: [
          {
            title: "Longer service intervals",
            description:
              "Additional holding capacity reduces interruption between scheduled pump-outs.",
          },
          {
            title: "Planned connections",
            description:
              "Tank location, hose routes and service access are coordinated with the site layout.",
          },
        ],
        applications: [
          "Temporary restroom and shower compounds",
          "Mobile kitchen and dishwashing operations",
          "Sites without direct water or sewer connections",
        ],
        specs: [
          { label: "Tank capacity", value: TBD },
          { label: "Connection type", value: TBD },
        ],
        faqs: [
          {
            q: "How often does a tank need servicing?",
            a: "The interval depends on tank capacity, fixture use, occupancy and operating hours. We calculate it during site planning and adjust it to measured use.",
          },
        ],
        relatedPaths: [
          "/support-facility-trailers/restroom-trailers",
          "/support-facility-trailers/dishwashing-trailers",
        ],
      },
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* TEMPORARY FACILITIES                                                */
/* ------------------------------------------------------------------ */

const workforceHousing: PageNode = {
  slug: "workforce-housing",
  title: "Workforce Housing",
  kind: "service",
  kicker: "Temporary Facilities",
  summary:
    "Sleeping, sanitation and dining accommodation for crews working away from permanent facilities.",
  metaTitle: "Temporary Workforce Housing Rentals",
  metaDescription:
    "Temporary workforce housing with sleeping, sanitation, laundry and dining facilities planned for remote crews, construction projects and response operations.",
  intro: [
    "Workforce housing covers the whole living side of a remote operation: sleeping units, sanitation, laundry, dining and the utilities that support them.",
    "We plan the compound around headcount, shift rotation, site access and the duration of the programme.",
  ],
  benefits: [
    {
      title: "Planned as a compound",
      description:
        "Sleeping, sanitation and dining laid out as one facility rather than separate hires.",
    },
    {
      title: "Rotation-aware",
      description: "Capacity planned around shift patterns and peak headcount.",
    },
    {
      title: "Remote-capable",
      description: "Configured for sites without permanent power, water or waste.",
    },
  ],
  applications: [
    "Energy and industrial projects",
    "Long-duration construction programmes",
    "Disaster recovery workforces",
    "Government and military deployments",
  ],
  faqs: [
    {
      q: "What is included in a workforce housing compound?",
      a: "The scope can include sleeping units, restrooms, showers, laundry, dining, offices, generated power, fresh water and waste handling.",
    },
    {
      q: "How is capacity calculated?",
      a: "We use peak on-site headcount, shift rotation, rooming requirements and the service interval for each support system.",
    },
    {
      q: "Can the compound expand after deployment?",
      a: "Yes. The initial layout can reserve access and utility capacity for additional sleeping or support units as the workforce changes.",
    },
  ],
  children: [
    svc(
      "bunkhouse-trailers",
      "Bunkhouse Trailers",
      "Sleeping units with bunks, storage and climate control for rotating crews.",
      {
        intro: [
          "Bunkhouse trailers provide the sleeping capacity of a workforce compound, with climate control and personal storage for each occupant.",
        ],
        specs: [...trailerSpecs(), { label: "Beds per unit", value: TBD }],
        relatedPaths: ["/temporary-facilities/workforce-housing"],
      },
    ),
    svc(
      "workforce-housing-facilities",
      "Workforce Housing Facilities",
      "Complete accommodation compounds including sanitation, dining and support units.",
      {
        metaTitle: "Temporary Workforce Housing Facilities",
        metaDescription:
          "Deploy a complete temporary workforce housing facility with sleeping, sanitation, laundry, dining and site utilities coordinated under one plan.",
        intro: [
          "A full housing facility bundles sleeping units with restroom, shower, laundry and dining capacity, plus the utility infrastructure to run them.",
        ],
        benefits: [
          {
            title: "One coordinated layout",
            description: "Housing, dining, sanitation and service routes are planned together.",
          },
          {
            title: "Capacity by shift",
            description: "Beds and support facilities are matched to rotations and peak occupancy.",
          },
          {
            title: "Scalable deployment",
            description:
              "Additional modules can be added without rebuilding the entire compound plan.",
          },
        ],
        applications: [
          "Construction and infrastructure projects",
          "Energy, mining and industrial sites",
          "Emergency and disaster recovery workforces",
          "Government and defence programmes",
        ],
        faqs: [
          {
            q: "Can the facility operate without permanent utilities?",
            a: "Yes. Generated power, delivered or treated water, waste holding and scheduled servicing can be included in the deployment plan.",
          },
          {
            q: "Who coordinates delivery and installation?",
            a: "Our team coordinates unit sequencing, positioning and connection requirements against the approved site layout.",
          },
        ],
        relatedPaths: [
          "/temporary-facilities/base-camp-facilities",
          "/specialty-solutions/turnkey-facility-solutions",
        ],
      },
    ),
    svc(
      "remote-workforce-housing",
      "Remote Workforce Housing",
      "Self-sufficient accommodation for sites with no permanent utilities or services.",
      {
        metaTitle: "Remote Workforce Housing Rentals",
        metaDescription:
          "Remote workforce housing for isolated projects, with sleeping, sanitation, dining, power, water, waste and resupply requirements planned as one system.",
        intro: [
          "Remote housing is planned for isolation: generated power, hauled or treated water, waste holding, and supply intervals that match how often vehicles can reach site.",
        ],
        benefits: [
          {
            title: "Self-sufficient utilities",
            description: "Power, water and waste systems are sized around occupancy and access.",
          },
          {
            title: "Resupply-aware planning",
            description:
              "Storage and service intervals reflect road, weather and delivery constraints.",
          },
          {
            title: "Crew welfare in one plan",
            description:
              "Sleeping, washing, laundry and meals are coordinated for the same rotation.",
          },
        ],
        applications: [
          "Remote energy and mining sites",
          "Infrastructure projects away from towns",
          "Disaster recovery and utility restoration",
          "Government field operations",
        ],
        faqs: [
          {
            q: "How far in advance should a remote camp be planned?",
            a: "Start as soon as headcount, access and operating dates are known. Remote utilities and delivery sequencing often control the lead time.",
          },
          {
            q: "Can units be relocated during a project?",
            a: "Towable and modular units can be relocated when the route, foundations and utility reconnection are planned in advance.",
          },
        ],
        relatedPaths: [
          "/temporary-facilities/remote-camp-facilities",
          "/industries/remote-workforce",
        ],
      },
    ),
    svc(
      "man-camp-solutions",
      "Man Camp Solutions",
      "Turnkey camp packages combining housing, catering and sanitation.",
      {
        intro: [
          "Man camp packages combine accommodation, kitchen and sanitation into a single scoped deployment with one point of contact.",
        ],
        relatedPaths: [
          "/temporary-facilities/man-camp-facilities",
          "/mobile-kitchens/mobile-kitchen-facilities",
        ],
      },
    ),
  ],
  relatedPaths: [
    "/support-facility-trailers/shower-trailers",
    "/support-facility-trailers/laundry-trailers",
    "/mobile-kitchens/mobile-kitchen-facilities",
  ],
};

const temporaryFacilities: PageNode = {
  slug: "temporary-facilities",
  title: "Temporary Facilities",
  kind: "category",
  kicker: "Catalog / 03",
  summary:
    "Housing, offices, command centers and camp infrastructure for projects away from permanent buildings.",
  intro: [
    "Temporary facilities cover everything a site needs beyond the kitchen: somewhere to sleep, somewhere to work, and the utility infrastructure that ties the compound together.",
    "We scope facilities against headcount, duration and site conditions, then deliver, position and commission them.",
  ],
  children: [
    svc(
      "temporary-facility-rentals",
      "Temporary Facility Rentals",
      "Flexible rental terms across the full temporary facility range.",
      {
        metaTitle: "Temporary Facility Rentals Nationwide",
        metaDescription:
          "Rent temporary kitchens, sanitation, workforce housing and office facilities for short- or long-term projects, delivered and coordinated nationwide.",
        intro: [
          "Rental terms run from short-term event support to multi-year project deployments, across kitchens, sanitation, housing and offices.",
        ],
        benefits: [
          {
            title: "One project schedule",
            description:
              "Delivery, connection, servicing and collection follow your operating dates.",
          },
          {
            title: "Flexible rental duration",
            description: "Short emergency hires and multi-year project terms are both available.",
          },
          {
            title: "Mixed facility packages",
            description: "Kitchen, sanitation, housing and office units can share one site plan.",
          },
        ],
        relatedPaths: [
          "/temporary-facilities/workforce-housing",
          "/support-facility-trailers",
          "/mobile-kitchens/temporary-kitchens",
        ],
      },
    ),
    workforceHousing,
    svc(
      "bunkhouse-trailers",
      "Bunkhouse Trailers",
      "Standalone sleeping units for crews, responders and seasonal workforces.",
      {
        intro: [
          "Bunkhouse trailers can be rented individually where a site needs sleeping capacity but already has sanitation and dining in place.",
        ],
        specs: [...trailerSpecs(), { label: "Beds per unit", value: TBD }],
        relatedPaths: ["/temporary-facilities/workforce-housing"],
      },
    ),
    svc(
      "man-camp-facilities",
      "Man Camp Facilities",
      "Camp infrastructure for energy, mining and heavy industrial workforces.",
      {
        intro: [
          "Man camp facilities support large rotating workforces in locations with no local accommodation or food service.",
        ],
        relatedPaths: [
          "/temporary-facilities/workforce-housing/man-camp-solutions",
          "/industries/industrial-projects",
        ],
      },
    ),
    svc(
      "base-camp-facilities",
      "Base Camp Facilities",
      "Full base camps combining accommodation, dining, sanitation and operations space.",
      {
        intro: [
          "A base camp is a complete temporary settlement: housing, dining, sanitation, laundry, offices and the utilities that run them, laid out for safe circulation.",
        ],
        relatedPaths: [
          "/specialty-solutions/turnkey-facility-solutions",
          "/mobile-kitchens/mobile-kitchen-facilities",
        ],
      },
    ),
    svc(
      "modular-office-trailers",
      "Modular Office Trailers",
      "Site offices, meeting rooms and welfare space in modular units.",
      {
        metaTitle: "Modular Office Trailer Rentals",
        metaDescription:
          "Rent modular office trailers for project teams, meetings and site welfare, with layout, delivery, utility connections and access planned nationwide.",
        intro: [
          "Modular office trailers give project teams desks, meeting space and welfare facilities on site from day one.",
        ],
        benefits: [
          {
            title: "Ready-to-use workspace",
            description: "Layouts support desks, briefings, storage and daily site administration.",
          },
          {
            title: "Flexible configurations",
            description: "Individual units or linked offices can scale with the project team.",
          },
          {
            title: "Coordinated site placement",
            description:
              "Access, power, data routes and welfare connections are planned before delivery.",
          },
        ],
        applications: [
          "Construction project offices",
          "Industrial shutdown coordination",
          "Temporary administration and meeting space",
        ],
        specs: [...trailerSpecs()],
        relatedPaths: ["/temporary-facilities/command-center-trailers", "/industries/construction"],
      },
    ),
    svc(
      "command-center-trailers",
      "Command Center Trailers",
      "Coordination and communications space for incidents and large operations.",
      {
        metaTitle: "Mobile Command Center Trailer Rentals",
        metaDescription:
          "Rent a mobile command center trailer for incident coordination, briefings and communications, with rapid delivery and site setup planned nationwide.",
        intro: [
          "Command center trailers provide a controlled environment for incident coordination, briefings and communications equipment.",
        ],
        benefits: [
          {
            title: "Central operating picture",
            description: "Dedicated space keeps briefings, communications and decisions together.",
          },
          {
            title: "Rapidly deployable",
            description:
              "Towable units can be positioned near the active operation when time matters.",
          },
          {
            title: "Support facilities available",
            description:
              "Power, welfare, sanitation and rest areas can be added to the same deployment.",
          },
        ],
        applications: [
          "Emergency operations and incident command",
          "Government and public works projects",
          "Large construction and industrial sites",
        ],
        relatedPaths: [
          "/specialty-solutions/emergency-response-facilities",
          "/industries/government",
        ],
      },
    ),
    svc(
      "remote-camp-facilities",
      "Remote Camp Facilities",
      "Self-contained camps for locations without power, water or waste infrastructure.",
      {
        metaTitle: "Remote Camp Facility Rentals",
        metaDescription:
          "Deploy a self-contained remote camp with workforce housing, dining, sanitation, power, water and waste systems planned for isolated project sites.",
        intro: [
          "Remote camps are planned as closed systems, with generated power, water treatment or hauling, waste holding and resupply intervals matched to site access.",
        ],
        benefits: [
          {
            title: "Closed-loop planning",
            description: "Utilities and servicing are sized for the people and equipment on site.",
          },
          {
            title: "Access-led logistics",
            description:
              "Delivery order and resupply intervals reflect the route and operating season.",
          },
          {
            title: "Complete crew support",
            description:
              "Housing, sanitation, laundry, dining and operations space work as one camp.",
          },
        ],
        applications: [
          "Mining, energy and exploration projects",
          "Remote infrastructure construction",
          "Emergency response base camps",
          "Government and defence field operations",
        ],
        relatedPaths: [
          "/temporary-facilities/workforce-housing/remote-workforce-housing",
          "/industries/remote-workforce",
        ],
      },
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* SPECIALTY SOLUTIONS                                                 */
/* ------------------------------------------------------------------ */

const specialtySolutions: PageNode = {
  slug: "specialty-solutions",
  title: "Specialty Solutions",
  kind: "category",
  kicker: "Catalog / 04",
  summary:
    "Complete, scoped solutions for response operations, government programmes and turnkey projects.",
  intro: [
    "Some projects are not a single unit hire. Specialty solutions describe how we combine kitchens, sanitation, housing and infrastructure into one scoped deployment with a single point of accountability.",
  ],
  children: [
    svc(
      "disaster-relief-solutions",
      "Disaster Relief Solutions",
      "Feeding, sanitation and shelter support deployed at short notice.",
      {
        intro: [
          "Disaster relief deployments prioritise speed and self-sufficiency: kitchens that can feed at scale, sanitation for responders and residents, and facilities that work without local utilities.",
        ],
        applications: [
          "Mass care and shelter operations",
          "Responder base camps",
          "Utility outage response",
        ],
        relatedPaths: [
          "/mobile-kitchens/emergency-kitchens",
          "/specialty-solutions/emergency-response-facilities",
          "/industries/disaster-relief",
        ],
      },
    ),
    svc(
      "emergency-response-facilities",
      "Emergency Response Facilities",
      "Command, welfare and sanitation facilities for active incident operations.",
      {
        metaTitle: "Emergency Response Facility Rentals",
        metaDescription:
          "Deploy command, kitchen, sanitation and crew-welfare facilities for emergency operations, with rapid delivery and self-sufficient site support nationwide.",
        intro: [
          "Response facilities support the people running an incident: coordination space, rest and welfare, sanitation and hot food.",
        ],
        benefits: [
          {
            title: "Priority deployment planning",
            description:
              "Critical units, access and utilities are sequenced around the operating deadline.",
          },
          {
            title: "Self-sufficient options",
            description:
              "Power, water and waste systems can support sites with damaged infrastructure.",
          },
          {
            title: "One support package",
            description: "Command, feeding, sanitation and crew welfare are coordinated together.",
          },
        ],
        applications: [
          "Disaster response and mass care",
          "Utility restoration operations",
          "Incident command and responder support",
          "Temporary shelter and feeding sites",
        ],
        faqs: [
          {
            q: "Which facilities should deploy first?",
            a: "The sequence follows the incident plan, but command, sanitation, handwashing and initial feeding capacity are usually treated as the first operating package.",
          },
          {
            q: "Can the setup expand as the response grows?",
            a: "Yes. The site plan can reserve circulation and utility capacity for additional kitchen, housing and sanitation units.",
          },
        ],
        relatedPaths: [
          "/temporary-facilities/command-center-trailers",
          "/specialty-solutions/disaster-relief-solutions",
        ],
      },
    ),
    svc(
      "military-government-facilities",
      "Military & Government Facilities",
      "Field kitchens, accommodation and sanitation for defence and public agencies.",
      {
        metaTitle: "Military and Government Facility Rentals",
        metaDescription:
          "Temporary kitchens, accommodation, sanitation and command facilities for military and government programmes, with documented delivery and site coordination.",
        intro: [
          "Defence and government deployments are planned around procurement requirements, site security and documented delivery schedules.",
        ],
        benefits: [
          {
            title: "Documented scope",
            description:
              "Equipment, delivery milestones and support responsibilities are confirmed in writing.",
          },
          {
            title: "Controlled site planning",
            description:
              "Access, placement and service routes are coordinated with operating restrictions.",
          },
          {
            title: "Integrated field support",
            description:
              "Kitchens, housing, sanitation and command space can deploy under one plan.",
          },
        ],
        applications: [
          "Military training and field operations",
          "Public agency programmes",
          "Correctional and institutional continuity",
          "Emergency management and response",
        ],
        faqs: [
          {
            q: "Can multiple facility types be procured together?",
            a: "Yes. A single scope can combine kitchen, sanitation, accommodation, office and utility support around the same delivery schedule.",
          },
        ],
        relatedPaths: ["/industries/military", "/industries/government"],
      },
    ),
    svc(
      "maritime-accommodation",
      "Maritime Accommodation",
      "Catering and accommodation support for port, offshore and vessel operations.",
      {
        intro: [
          "Maritime projects need food service and accommodation that work within port constraints and vessel turnaround schedules.",
        ],
        relatedPaths: [
          "/specialty-solutions/catering-facilities",
          "/temporary-facilities/workforce-housing",
        ],
      },
    ),
    svc(
      "catering-facilities",
      "Catering Facilities",
      "Production, holding and service facilities for catering contracts of any size.",
      {
        metaTitle: "Temporary Catering Facility Rentals",
        metaDescription:
          "Rent temporary catering facilities with production kitchens, refrigeration, warewashing and service areas configured for contract and event food service.",
        intro: [
          "Catering facilities are configured around the contract: production capacity, holding, plating and service flow.",
        ],
        benefits: [
          {
            title: "Designed around service volume",
            description: "Cooking, holding and plating capacity follow the peak meal period.",
          },
          {
            title: "Complete back-of-house flow",
            description: "Cold storage, preparation, cooking and warewashing are planned together.",
          },
          {
            title: "Short- or long-term rental",
            description:
              "Facilities can support a fixed event window or an ongoing catering contract.",
          },
        ],
        applications: [
          "Contract catering and institutional dining",
          "Events, festivals and hospitality overflow",
          "Workforce camps and remote feeding",
          "Kitchen renovation continuity",
        ],
        faqs: [
          {
            q: "How is a catering facility sized?",
            a: "We use peak covers, menu, service style, storage volume, staffing and the available site utilities to set the equipment and layout.",
          },
        ],
        relatedPaths: [
          "/mobile-kitchens/commercial-kitchen-trailers",
          "/specialty-solutions/food-service-solutions",
        ],
      },
    ),
    svc(
      "food-service-solutions",
      "Food Service Solutions",
      "End-to-end food service planning from cold storage through to warewashing.",
      {
        intro: [
          "We plan the whole chain — delivery, cold storage, prep, cooking, service and warewashing — so nothing becomes the bottleneck mid-contract.",
        ],
        relatedPaths: [
          "/support-facility-trailers/dishwashing-trailers",
          "/support-facility-trailers/refrigerated-trailers",
        ],
      },
    ),
    svc(
      "turnkey-facility-solutions",
      "Turnkey Facility Solutions",
      "Single-contract delivery of a complete facility, from survey to demobilisation.",
      {
        metaTitle: "Turnkey Temporary Facility Solutions",
        metaDescription:
          "Coordinate temporary kitchens, sanitation, workforce housing, offices and site utilities through one plan from survey and delivery to demobilisation.",
        intro: [
          "Turnkey delivery covers site survey, layout, equipment specification, delivery, connection, servicing and demobilisation under one contract.",
        ],
        benefits: [
          {
            title: "One coordinated scope",
            description:
              "Equipment, logistics, utilities and service intervals follow one approved plan.",
          },
          {
            title: "Fewer site interfaces",
            description:
              "One project team coordinates the temporary facility package and delivery sequence.",
          },
          {
            title: "Planned through demobilisation",
            description:
              "Collection, disconnection and site hand-back are considered before installation.",
          },
        ],
        applications: [
          "Large construction and industrial projects",
          "Remote workforce and base-camp operations",
          "Emergency response facilities",
          "Institutional kitchen continuity",
        ],
        faqs: [
          {
            q: "What does turnkey delivery include?",
            a: "The agreed scope can include survey, layout, equipment selection, delivery sequencing, connection planning, servicing and final collection.",
          },
          {
            q: "Can existing site services be used?",
            a: "Yes. We confirm which power, water and waste services are suitable and add temporary utility support only where it is needed.",
          },
        ],
        relatedPaths: [
          "/temporary-facilities/base-camp-facilities",
          "/mobile-kitchens/mobile-kitchen-facilities",
        ],
      },
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* INDUSTRIES                                                          */
/* ------------------------------------------------------------------ */

const industries: PageNode = {
  slug: "industries",
  title: "Industries",
  kind: "category",
  kicker: "Catalog / 05",
  summary: "How our kitchen, sanitation and facility equipment is applied sector by sector.",
  intro: [
    "The same equipment behaves differently depending on the sector it serves. These pages set out which Duo Kitchenware solutions apply to each industry and what usually drives the specification.",
  ],
  children: [
    industry(
      "construction",
      "Construction",
      "Kitchens, welfare and sanitation for active building sites.",
      [
        "Construction projects need welfare and food service that move with the programme and satisfy site rules.",
        "Typical deployments combine modular offices, restroom and handwashing units, and a temporary kitchen where the workforce is fed on site.",
      ],
    ),
    industry(
      "healthcare",
      "Healthcare",
      "Interim kitchens and sanitation for hospitals and care facilities.",
      [
        "Hospital and care catering cannot stop for a refurbishment. Interim kitchens are planned around meal schedules, infection control and restricted site access.",
      ],
    ),
    industry(
      "government",
      "Government",
      "Facilities for public agencies, programmes and emergency operations.",
      [
        "Public sector deployments are shaped by procurement requirements, documented timelines and audit-ready delivery.",
        "Temporary kitchens, sanitation, offices and accommodation can be combined for correctional continuity, public works, emergency management and field programmes.",
      ],
      {
        metaTitle: "Government Temporary Facility Rentals",
        metaDescription:
          "Temporary kitchens, sanitation, offices and workforce facilities for government programmes, correctional continuity and emergency operations nationwide.",
        benefits: [
          {
            title: "Procurement-ready scope",
            description:
              "Equipment and responsibilities are documented against the required schedule.",
          },
          {
            title: "Continuity for active facilities",
            description:
              "Temporary capacity keeps food service and essential operations running during works.",
          },
          {
            title: "Multi-unit coordination",
            description:
              "Kitchen, sanitation, office and housing units can share one delivery plan.",
          },
        ],
      },
    ),
    industry(
      "military",
      "Military",
      "Field kitchens, accommodation and sanitation for defence operations.",
      [
        "Defence deployments demand self-sufficient facilities that can be positioned, operated and demobilised on schedule.",
      ],
    ),
    industry(
      "disaster-relief",
      "Disaster Relief",
      "Rapid feeding, sanitation and shelter support after an event.",
      [
        "Relief operations are measured in hours. Emergency kitchens, restroom and shower units, and responder welfare facilities are staged for fast dispatch.",
      ],
    ),
    industry(
      "education",
      "Education",
      "Campus and school catering continuity during works and peak terms.",
      [
        "Schools, colleges and universities use temporary kitchens to keep dining open through refurbishment and to add capacity in peak terms.",
      ],
    ),
    industry(
      "events-festivals",
      "Events & Festivals",
      "Production kitchens, warewashing and sanitation for live events.",
      [
        "Events need capacity that arrives, performs for a fixed window and leaves cleanly. Kitchens, dishwashing and restroom banks are sized to attendance.",
      ],
    ),
    industry(
      "remote-workforce",
      "Remote Workforce",
      "Self-sufficient catering and accommodation for isolated sites.",
      [
        "Remote sites need closed-loop facilities: generated power, managed water and waste, and resupply intervals matched to access.",
      ],
    ),
    industry(
      "hospitality",
      "Hospitality",
      "Kitchen capacity for hotels, venues and restaurant groups.",
      [
        "Hospitality operators use temporary kitchens to protect covers during refurbishment and to add production capacity for peak seasons.",
      ],
    ),
    industry(
      "commercial-real-estate",
      "Commercial Real Estate",
      "Tenant amenity and food service continuity during building works.",
      [
        "Building owners and managers use temporary kitchens and sanitation to maintain tenant amenities while base-building work proceeds.",
      ],
    ),
    industry(
      "industrial-projects",
      "Industrial Projects",
      "Camp, catering and sanitation support for plants and turnarounds.",
      [
        "Turnarounds and shutdowns concentrate a large workforce into a short window, with feeding, sanitation and welfare all scaling at once.",
      ],
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* RESOURCES                                                           */
/* ------------------------------------------------------------------ */

const post = (
  slug: string,
  title: string,
  date: string,
  summary: string,
  body: string[],
): PageNode => ({
  slug,
  title,
  kind: "post",
  date,
  summary,
  body,
});

const blog: PageNode = {
  slug: "blog",
  title: "Blog",
  kind: "resource",
  summary: "Planning notes, equipment guidance and project write-ups from our team.",
  intro: [
    "Practical articles on planning temporary kitchens and facilities: sizing, utilities, logistics and compliance.",
  ],
  children: [
    post(
      "how-to-size-a-mobile-kitchen-trailer",
      "How to Size a Mobile Kitchen Trailer",
      "2026-08-18",
      "Covers per service, menu complexity and site access decide the length you need.",
      [
        "Sizing starts with covers per service, not with trailer length. Once you know peak output, the menu tells you how much cooking line and refrigeration that output requires.",
        "Site access is the second constraint. A longer unit only helps if it can be delivered, turned and positioned where the utilities are.",
        "Bring a site plan and a menu to the conversation and the length usually resolves itself.",
      ],
    ),
    post(
      "utility-planning-for-temporary-kitchens",
      "Utility Planning for Temporary Kitchens",
      "2026-08-04",
      "Power, potable water and waste are the three connections that decide your timeline.",
      [
        "Most delayed deployments are delayed by utilities, not equipment. Confirm electrical service, potable water and waste routing before delivery is booked.",
        "Where site services are unavailable, generated power and tank-based water and waste keep the unit operating with a defined servicing interval.",
      ],
    ),
    post(
      "keeping-food-service-running-during-a-renovation",
      "Keeping Food Service Running During a Renovation",
      "2026-07-21",
      "How to phase an interim kitchen against a construction programme.",
      [
        "An interim kitchen has to match the construction schedule, not the other way around. Phase the facility so the busiest weeks of the build coincide with your most capable setup.",
        "Plan warewashing and cold storage separately: they are the functions most often squeezed out of an interim layout.",
      ],
    ),
    post(
      "restroom-trailer-planning-for-large-sites",
      "Restroom Trailer Planning for Large Sites",
      "2026-07-07",
      "Headcount, shift patterns and servicing intervals drive sanitation planning.",
      [
        "Sanitation planning follows peak concurrent headcount rather than total workforce. Shift overlap is where capacity usually fails.",
        "Set servicing intervals against measured usage after the first week rather than an assumption made before mobilisation.",
      ],
    ),
    post(
      "disaster-relief-feeding-what-to-stage-first",
      "Disaster Relief Feeding: What to Stage First",
      "2026-06-23",
      "The order in which feeding, sanitation and welfare arrive on a response site.",
      [
        "Feeding capacity and sanitation arrive together. A kitchen without handwashing and restrooms cannot operate to standard.",
        "Stage responder welfare early — the operation depends on the people running it being rested and fed.",
      ],
    ),
    post(
      "dishwashing-capacity-the-hidden-bottleneck",
      "Dishwashing Capacity: The Hidden Bottleneck",
      "2026-06-09",
      "Why warewashing decides how many covers a temporary kitchen can really serve.",
      [
        "Cooking capacity gets the attention, but warewashing sets the ceiling on a temporary operation running reusable service ware.",
        "Separating warewashing into its own unit protects both throughput and hygiene separation.",
      ],
    ),
    post(
      "cold-chain-on-temporary-sites",
      "Cold Chain on Temporary Sites",
      "2026-05-26",
      "Refrigerated trailers, containers and monitoring on sites without permanent storage.",
      [
        "Cold chain on a temporary site is a logistics problem: delivery frequency, storage capacity and monitoring have to be planned as one.",
        "Choose towable refrigeration when storage moves with the operation, and containers when it stays put.",
      ],
    ),
    post(
      "workforce-housing-layout-principles",
      "Workforce Housing Layout Principles",
      "2026-05-12",
      "Circulation, separation and servicing access in a camp layout.",
      [
        "A camp layout is judged by circulation: clean routes between sleeping, sanitation and dining, and separate routes for servicing vehicles.",
        "Keep waste servicing away from dining and sleeping approaches wherever the site allows it.",
      ],
    ),
    post(
      "planning-event-kitchens-for-peak-service",
      "Planning Event Kitchens for Peak Service",
      "2026-04-28",
      "Sizing a festival or event kitchen against a short, intense service window.",
      [
        "Event kitchens are sized for the peak hour, not the average day. Everything else follows from that number.",
        "Plan the get-in and get-out with the same care as the service itself — access windows are usually the tightest constraint.",
      ],
    ),
    post(
      "short-term-versus-long-term-facility-rentals",
      "Short-Term Versus Long-Term Facility Rentals",
      "2026-04-14",
      "How rental duration changes specification, servicing and cost planning.",
      [
        "Short-term rentals optimise for speed of deployment. Long-term rentals optimise for serviceability and running cost.",
        "Where a programme runs beyond a few months, specify equipment for maintenance access from the start.",
      ],
    ),
  ],
};

const resources: PageNode = {
  slug: "resources",
  title: "Resources",
  kind: "category",
  kicker: "Catalog / 06",
  summary: "Guides, project write-ups, answers and media covering our equipment and process.",
  intro: [
    "Reference material for planning a temporary kitchen or facility: articles, equipment guides, project write-ups and answers to the questions we are asked most.",
  ],
  children: [
    blog,
    {
      slug: "faqs",
      title: "FAQs",
      kind: "resource",
      summary: "Answers on sizing, utilities, delivery, servicing and rental terms.",
      intro: ["The questions our team is asked most often, grouped by topic."],
      faqs: [
        {
          q: "How quickly can a unit be delivered?",
          a: "Lead time depends on unit type, configuration and location. Emergency deployments are prioritised — contact our team with the site and date.",
        },
        {
          q: "What do I need to have ready on site?",
          a: "A level, accessible position plus the agreed power, water and waste connections. We confirm the exact requirements per unit.",
        },
        {
          q: "Do you provide operators or staff?",
          a: "We supply and support the facility. Catering staffing is arranged separately.",
        },
        {
          q: "What rental terms are available?",
          a: "From short-term event hire through to multi-year deployments.",
        },
        {
          q: "Can equipment be configured to my menu?",
          a: "Yes. Cooking, refrigeration and warewashing are specified per project.",
        },
        {
          q: "Do you handle servicing and waste removal?",
          a: "Servicing scope and intervals are agreed as part of the rental.",
        },
      ],
      relatedPaths: ["/resources/equipment-guides", "/contact"],
    },
    {
      slug: "case-studies",
      title: "Case Studies",
      kind: "resource",
      summary: "Project write-ups showing scope, constraints and how each facility was delivered.",
      intro: [
        "Case studies are published as projects are cleared for release by our clients. Completed write-ups will appear here.",
      ],
      relatedPaths: ["/resources/blog", "/specialty-solutions/turnkey-facility-solutions"],
    },
    {
      slug: "equipment-guides",
      title: "Equipment Guides",
      kind: "resource",
      summary: "Reference guides for kitchen, sanitation and facility equipment selection.",
      intro: [
        "Selection guidance for each equipment family, covering what drives specification and which support units usually accompany it.",
      ],
      relatedPaths: ["/mobile-kitchens/kitchen-trailer-sizes", "/support-facility-trailers"],
    },
    {
      slug: "gallery",
      title: "Gallery",
      kind: "resource",
      summary: "Photography of units and deployments, by equipment family.",
      intro: [
        "Project and equipment photography. Images are added as they are supplied and cleared.",
      ],
      relatedPaths: ["/resources/videos", "/mobile-kitchens"],
    },
    {
      slug: "videos",
      title: "Videos",
      kind: "resource",
      summary: "Walkthroughs and deployment footage of our units.",
      intro: [
        "Unit walkthroughs and deployment footage. New videos are listed here as they are published.",
      ],
      relatedPaths: ["/resources/gallery"],
    },
  ],
};

export const catalog: PageNode[] = [
  mobileKitchens,
  supportFacilityTrailers,
  temporaryFacilities,
  specialtySolutions,
  industries,
  resources,
];
