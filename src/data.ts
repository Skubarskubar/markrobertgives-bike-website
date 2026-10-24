export type CategoryId =
  | "surron"
  | "emtb"
  | "commuter"
  | "fatty"
  | "kids"
  | "utility";

export type Bike = {
  id: string;
  name: string;
  sku: string;
  category: CategoryId;
  family: string;
  tagline: string;
  blurb: string;
  photo: number;
  price: number; // always 0 — the bikes are free
  msrp: number;
  badge?: "HOT" | "NEW" | "LIMITED" | "FAVE";
  rating: number;
  reviews: number;
  stock: number;
  colors: { name: string; hex: string }[];
  specs: {
    topSpeed: number; // mph
    range: number; // miles
    motor: number; // W
    battery: string;
    charge: number; // hours
    weight: number; // lbs
    wheels: number; // inches
  };
  features: string[];
};

/** Pexels CDN helper — one source, many sizes. */
export const photo = (id: number, w = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  short: string;
  blurb: string;
}[] = [
  {
    id: "surron",
    label: "Surron-Style Dirt",
    short: "Dirt",
    blurb: "High-torque electric dirt bikes for tracks, dunes & backcountry.",
  },
  {
    id: "emtb",
    label: "Electric MTB",
    short: "MTB",
    blurb: "Pedal-assist trail machines with long-travel suspension.",
  },
  {
    id: "commuter",
    label: "Street & Commuter",
    short: "Street",
    blurb: "Silent daily riders with lights, racks and fenders fitted.",
  },
  {
    id: "fatty",
    label: "Fat Tire",
    short: "Fat",
    blurb: "Oversized rubber for sand, snow, gravel and beach lines.",
  },
  {
    id: "kids",
    label: "Kids & Mini",
    short: "Kids",
    blurb: "Speed-limited mini bikes sized for riders from 5 to 13.",
  },
  {
    id: "utility",
    label: "Cargo & Utility",
    short: "Cargo",
    blurb: "Heavy payloads, big racks and work-site ready frames.",
  },
];

const V = { name: "Volt Lime", hex: "#d8ff3e" };
const O = { name: "Ember Orange", hex: "#ff5b1f" };
const B = { name: "Midnight Black", hex: "#16191e" };
const C = { name: "Cobalt Blue", hex: "#2f4bff" };
const W = { name: "Bone White", hex: "#e9e6dd" };
const R = { name: "Race Red", hex: "#d81f26" };
const G = { name: "Sage Green", hex: "#7d9a6c" };
const P = { name: "Purple Haze", hex: "#7c4dcb" };

export const BIKES: Bike[] = [
  {
    id: "lightbee-x",
    name: "Lightbee X Ride Pro",
    sku: "MRG-SR-01",
    category: "surron",
    family: "Surron-class",
    tagline: "The 60 Nm playground bully",
    blurb:
      "Our flagship Surron-class build. Belt-driven, silent, and violent in the best way. Four ride modes, app lock, and a seat height that still lets a 5'6\" rider flat-foot it.",
    photo: 36811591,
    price: 0,
    msrp: 4899,
    badge: "HOT",
    rating: 4.9,
    reviews: 1284,
    stock: 6,
    colors: [V, B, O, C],
    specs: { topSpeed: 46, range: 62, motor: 6000, battery: "60V 42Ah Li-ion", charge: 3.5, weight: 172, wheels: 19 },
    features: ["Carbon belt drive — zero chain drama", "4 modes: ECO / City / Sport / Monster", "App kill-switch + GPS tracking", "Adjustable 260mm coil suspension"],
  },
  {
    id: "storm-6000",
    name: "Storm EBX 6000",
    sku: "MRG-SR-02",
    category: "surron",
    family: "Surron-class",
    tagline: "Dune-rated and sand-shoed",
    blurb:
      "Tall gearing, sand-paddle tyres and a cooling package built for hot dune sessions. The Storm loves wide-open faces where other bikes cook themselves.",
    photo: 36811592,
    price: 0,
    msrp: 5250,
    badge: "NEW",
    rating: 4.8,
    reviews: 611,
    stock: 4,
    colors: [W, O, V],
    specs: { topSpeed: 51, range: 58, motor: 8000, battery: "72V 45Ah Li-ion", charge: 4, weight: 181, wheels: 21 },
    features: ["Paddle-rear 180/63-17 sand tyre", "Dual oil cooler + thermal throttle map", "Forged aluminum triple clamps", "2-yr frame warranty included"],
  },
  {
    id: "dirt-volt-h2",
    name: "Dirt Volt H2 Hyper",
    sku: "MRG-SR-03",
    category: "surron",
    family: "Surron-class",
    tagline: "0-30 in 1.9 seconds",
    blurb:
      "The hyper variant. Bigger battery, racy mapping, titanium footpegs and a launch-control trick borrowed from superbikes. Handlebars flex exactly as little as they should.",
    photo: 32067468,
    price: 0,
    msrp: 6400,
    badge: "LIMITED",
    rating: 5,
    reviews: 297,
    stock: 2,
    colors: [B, R, V],
    specs: { topSpeed: 62, range: 55, motor: 12000, battery: "72V 52Ah Li-ion", charge: 4.5, weight: 189, wheels: 21 },
    features: ["Launch control + wheelie limiter", "Titanium hardware kit", "Magura 4-piston brakes", "Only 40 units released per batch"],
  },
  {
    id: "ridger-8000",
    name: "Ridger 8000 Enduro",
    sku: "MRG-SR-04",
    category: "surron",
    family: "Surron-class",
    tagline: "All-day trail endurance",
    blurb:
      "Soft mapping in ECO makes it docile; a swap to Enduro mode and it's a different animal. Comes with a second hot-swap battery so you never wait on a charger.",
    photo: 32067475,
    price: 0,
    msrp: 5600,
    rating: 4.7,
    reviews: 452,
    stock: 9,
    colors: [G, W, B],
    specs: { topSpeed: 48, range: 84, motor: 8000, battery: "2 × 60V 40Ah", charge: 3, weight: 194, wheels: 19 },
    features: ["Twin hot-swap batteries", "Trail-tuned 300mm travel", "Skid plate + handguards fitted", "Silent mode for dawn patrols"],
  },
  {
    id: "nightshift-pro",
    name: "Nightshift Pro LED",
    sku: "MRG-SR-05",
    category: "surron",
    family: "Surron-class",
    tagline: "After-dark weapon",
    blurb:
      "Built for night laps: 32,000-lumen light bar, illuminated deck pads and a subdued dash that won't fog your night vision. Legally quiet, illegally fast.",
    photo: 37276326,
    price: 0,
    msrp: 5100,
    badge: "FAVE",
    rating: 4.8,
    reviews: 388,
    stock: 7,
    colors: [B, C, P],
    specs: { topSpeed: 47, range: 60, motor: 6000, battery: "60V 40Ah Li-ion", charge: 3.5, weight: 176, wheels: 19 },
    features: ["32k lumen LED light bar", "Glow deck pads + valve caps", "Anti-glare night dash profile", "Whisper belt: 54 dB at 30 mph"],
  },
  {
    id: "dune-beast",
    name: "Dune Beast V8",
    sku: "MRG-SR-06",
    category: "surron",
    family: "Surron-class",
    tagline: "Sand country, no apologies",
    blurb:
      "Eight-kilowatt mid-drive with progressive spring rate for big landings. Riders say it pulls like a 250 two-stroke without the ringing in your ears.",
    photo: 16961191,
    price: 0,
    msrp: 6900,
    rating: 4.9,
    reviews: 214,
    stock: 3,
    colors: [O, R, W],
    specs: { topSpeed: 58, range: 52, motor: 8000, battery: "72V 48Ah Li-ion", charge: 4.2, weight: 186, wheels: 21 },
    features: ["Progressive landing-rated shock", "Beavertail seat for stand-up riding", "Sand-filter intake for electronics", "Free spare stator set"],
  },
  {
    id: "ridge-runner",
    name: "Ridge Runner Pro 120",
    sku: "MRG-MT-01",
    category: "emtb",
    family: "e-MTB",
    tagline: "120 Nm of trail manners",
    blurb:
      "Full-slash trail e-MTB with a torque sensor, so it only helps as hard as you push. Downhill geometry that hides how heavy the battery is.",
    photo: 32067479,
    price: 0,
    msrp: 4200,
    badge: "FAVE",
    rating: 4.8,
    reviews: 903,
    stock: 12,
    colors: [G, V, B],
    specs: { topSpeed: 28, range: 70, motor: 250, battery: "36V 20Ah (720 Wh)", charge: 4, weight: 48, wheels: 29 },
    features: ["Torque-sensing mid-drive", "Dropper post 170mm", "Mixed 29/27.5 wheels", "Trail-ready tubeless setup"],
  },
  {
    id: "alpine-hacker",
    name: "Alpine Hacker LT",
    sku: "MRG-MT-02",
    category: "emtb",
    family: "e-MTB",
    tagline: "Long travel, longer days",
    blurb:
      "170mm front and rear, enduro links, and a chassis that begs for bike-park laps. The Alpine is our most recommended lift-skipper.",
    photo: 19345335,
    price: 0,
    msrp: 5400,
    rating: 4.7,
    reviews: 517,
    stock: 8,
    colors: [C, W, O],
    specs: { topSpeed: 28, range: 62, motor: 250, battery: "36V 18Ah (648 Wh)", charge: 4.5, weight: 52, wheels: 29 },
    features: ["170/170mm travel", "Coil rear shock option", "Reinforced 30mm rims", "Bike-park rated bearings"],
  },
  {
    id: "summit-carbon",
    name: "Summit Carbon XC",
    sku: "MRG-MT-03",
    category: "emtb",
    family: "e-MTB",
    tagline: "Climbs like it's on rails",
    blurb:
      "Carbon frame, 42 lb flying weight, and a micro-drive that disappears when you're pedalling. Cross-country speed with an electric get-out-of-jail card.",
    photo: 33977817,
    price: 0,
    msrp: 7100,
    badge: "LIMITED",
    rating: 4.9,
    reviews: 188,
    stock: 2,
    colors: [W, P, V],
    specs: { topSpeed: 28, range: 76, motor: 250, battery: "36V 16Ah (576 Wh)", charge: 3.5, weight: 42, wheels: 29 },
    features: ["T800 carbon frame", "Electronic 12-speed", "Internal storage tube", "Race-weight 2.3\" tyres"],
  },
  {
    id: "forest-passer",
    name: "Forest Passer S",
    sku: "MRG-MT-04",
    category: "emtb",
    family: "e-MTB",
    tagline: "The friendly hardtail",
    blurb:
      "Simple, tough and cheap to live with. A hardtail e-MTB for new riders and dog walks, with lights and a kickstand that actually last.",
    photo: 32366003,
    price: 0,
    msrp: 2650,
    rating: 4.6,
    reviews: 1246,
    stock: 16,
    colors: [G, B, R],
    specs: { topSpeed: 25, range: 55, motor: 250, battery: "36V 14Ah (504 Wh)", charge: 5, weight: 49, wheels: 27.5 },
    features: ["Step-through option", "Hydraulic disc brakes", "Integrated lights, USB-C port", "Kids' trailer compatible"],
  },
  {
    id: "metro-glide",
    name: "Metro Glide GT",
    sku: "MRG-ST-01",
    category: "commuter",
    family: "Street",
    tagline: "Beat the traffic, again",
    blurb:
      "Belt-drive city rider with pinch-free tyres, a proper rack and fenders, and a battery you can lock in the frame. Rain-proof everything.",
    photo: 15020728,
    price: 0,
    msrp: 2400,
    badge: "HOT",
    rating: 4.8,
    reviews: 2011,
    stock: 20,
    colors: [B, W, C],
    specs: { topSpeed: 28, range: 58, motor: 350, battery: "36V 15Ah (540 Wh)", charge: 4, weight: 46, wheels: 28 },
    features: ["Carbon belt, no grease on trousers", "Pannier rack rated 25 kg", "Automotive-grade wiring", "Alarm + app lock"],
  },
  {
    id: "city-surge",
    name: "City Surge 500",
    sku: "MRG-ST-02",
    category: "commuter",
    family: "Street",
    tagline: "Step-through and smug",
    blurb:
      "The supermarket-killer. Low step-through, mid-mount motor, auto-lights and a saddle soft enough for Sunday. Perfect first e-bike.",
    photo: 8811560,
    price: 0,
    msrp: 1850,
    rating: 4.7,
    reviews: 1533,
    stock: 24,
    colors: [W, G, P],
    specs: { topSpeed: 25, range: 50, motor: 350, battery: "36V 13Ah (468 Wh)", charge: 4.5, weight: 44, wheels: 27.5 },
    features: ["Low 17\" step-through", "Belt tensioner display on bar", "Frame-lock + chain lock included", "Fenders rated to 65 km/h"],
  },
  {
    id: "nightline",
    name: "Nightline Urban",
    sku: "MRG-ST-03",
    category: "commuter",
    family: "Street",
    tagline: "Designed for the dark",
    blurb:
      "Reflex-paint frame, 120 lux headlight, radar rear light. You will be seen from three blocks away, which is precisely the point.",
    photo: 6900869,
    price: 0,
    msrp: 2150,
    rating: 4.6,
    reviews: 742,
    stock: 14,
    colors: [B, C, V],
    specs: { topSpeed: 28, range: 54, motor: 350, battery: "36V 14Ah (504 Wh)", charge: 4.2, weight: 47, wheels: 28 },
    features: ["Reflex reflective frame coat", "120 lux twin headlight", "Radar blind-spot alert", "Under-seat cargo pouch"],
  },
  {
    id: "boardwalk-cruiser",
    name: "Boardwalk Cruiser",
    sku: "MRG-ST-04",
    category: "commuter",
    family: "Street",
    tagline: "Slow is a feature",
    blurb:
      "Balloon tyres, swept bars, a spring saddle and absolutely no rush. The boardwalk machine for long evenings and colder beers.",
    photo: 38473383,
    price: 0,
    msrp: 1600,
    rating: 4.5,
    reviews: 604,
    stock: 18,
    colors: [W, G, R],
    specs: { topSpeed: 20, range: 42, motor: 250, battery: "36V 10Ah (360 Wh)", charge: 5, weight: 45, wheels: 26 },
    features: ["2.6\" balloon tyres", "Steel cruiser fork", "Front wicker basket fitted", "Coil sprung saddle"],
  },
  {
    id: "boulevard-s",
    name: "Boulevard S Speed",
    sku: "MRG-ST-05",
    category: "commuter",
    family: "Street",
    tagline: "The class-3 workhorse",
    blurb:
      "28 mph assisted for long avenue commutes and courier runs. Big brakes, big lights, and a battery sized for double shifts.",
    photo: 15020750,
    price: 0,
    msrp: 2900,
    badge: "NEW",
    rating: 4.7,
    reviews: 421,
    stock: 11,
    colors: [B, O, V],
    specs: { topSpeed: 28, range: 65, motor: 500, battery: "48V 17.5Ah (840 Wh)", charge: 4, weight: 55, wheels: 28 },
    features: ["Courier-grade 4-piston brakes", "Dual battery ready", "Front + rear rack combo", "Service window covers"],
  },
  {
    id: "dunemaster",
    name: "Dune Master 26+",
    sku: "MRG-FT-01",
    category: "fatty",
    family: "Fat Tire",
    tagline: "Floats on anything soft",
    blurb:
      "4.8\" rubber at 6 psi. Beach, powder, desert washes. The Dune Master turns impossible terrain into a straight line.",
    photo: 9712995,
    price: 0,
    msrp: 2450,
    rating: 4.8,
    reviews: 866,
    stock: 13,
    colors: [W, O, B],
    specs: { topSpeed: 28, range: 48, motor: 750, battery: "48V 15.6Ah (749 Wh)", charge: 5, weight: 62, wheels: 26 },
    features: ["4.8\" puncture-shrugged tyres", "Cold-weather battery blanket", "Straight-pull SS spokes", "Lowered deck for sand starts"],
  },
  {
    id: "snowbeast",
    name: "Snowbeast 4.0",
    sku: "MRG-FT-02",
    category: "fatty",
    family: "Fat Tire",
    tagline: "Winter's worst enemy",
    blurb:
      "Studded tyres, heated grip kit, sealed drivetrain. Built with riders in Norway, Hokkaido and British Columbia in mind.",
    photo: 17146136,
    price: 0,
    msrp: 3100,
    badge: "FAVE",
    rating: 4.9,
    reviews: 349,
    stock: 6,
    colors: [C, B, R],
    specs: { topSpeed: 28, range: 44, motor: 750, battery: "48V 18Ah (864 Wh)", charge: 4.5, weight: 66, wheels: 27.5 },
    features: ["Carbide studded tyre set", "Heated grips + thumb warmers", "Fully sealed belt drive", "Ice-puncture frame skid"],
  },
  {
    id: "beachcomber",
    name: "Beachcomber LTD",
    sku: "MRG-FT-03",
    category: "fatty",
    family: "Fat Tire",
    tagline: "Salt-spray proofed",
    blurb:
      "Every fastener is stainless, every bearing is marine-rated. Rinse it in the ocean and it will not complain. Surf racks available on request.",
    photo: 9712992,
    price: 0,
    msrp: 2700,
    rating: 4.6,
    reviews: 288,
    stock: 9,
    colors: [W, V, G],
    specs: { topSpeed: 26, range: 46, motor: 500, battery: "48V 14Ah (672 Wh)", charge: 4.8, weight: 59, wheels: 26 },
    features: ["316 stainless hardware", "Marine-sealed motor bearings", "Board-carry rack ready", "Corrosion 5-yr promise"],
  },
  {
    id: "tundra-rt",
    name: "Tundra RT Remote",
    sku: "MRG-FT-04",
    category: "fatty",
    family: "Fat Tire",
    tagline: "Hunt, fish, farm, repeat",
    blurb:
      "Rear hub drive with a tow rating, mount points for packs, and a low-gear mode for hauling gear out of the backcountry.",
    photo: 32053060,
    price: 0,
    msrp: 2980,
    rating: 4.7,
    reviews: 205,
    stock: 7,
    colors: [G, B, O],
    specs: { topSpeed: 25, range: 52, motor: 1000, battery: "48V 20Ah (960 Wh)", charge: 5.5, weight: 71, wheels: 26 },
    features: ["50 kg tow rating", "Nine pack-mount bosses", "Walk-assist low gear", "Frame-integrated tool roll"],
  },
  {
    id: "mini-rooster",
    name: "Mini Rooster 500",
    sku: "MRG-KD-01",
    category: "kids",
    family: "Kids & Mini",
    tagline: "Ages 5–8, parent in control",
    blurb:
      "Locked to 12 mph by default, with a parent remote that stops the motor instantly. Air-free tyres so nothing goes flat in the shed.",
    photo: 40255225,
    price: 0,
    msrp: 899,
    badge: "HOT",
    rating: 4.9,
    reviews: 1105,
    stock: 22,
    colors: [V, R, C],
    specs: { topSpeed: 12, range: 18, motor: 350, battery: "24V 8Ah Li-ion", charge: 3, weight: 34, wheels: 14 },
    features: ["Parent remote kill switch", "Speed lock 8/12/16 mph", "Air-free solid tyres", "Pinch-free chain guard"],
  },
  {
    id: "lil-stormer",
    name: "Lil' Stormer 12",
    sku: "MRG-KD-02",
    category: "kids",
    family: "Kids & Mini",
    tagline: "First dirt bike, done right",
    blurb:
      "A mini dirt platform sized for 7–11 year olds with a throttle limiter and a shatter-proof fairing that survives the driveway.",
    photo: 33639182,
    price: 0,
    msrp: 1250,
    rating: 4.8,
    reviews: 462,
    stock: 15,
    colors: [O, B, P],
    specs: { topSpeed: 18, range: 22, motor: 500, battery: "36V 10Ah Li-ion", charge: 3.5, weight: 41, wheels: 12 },
    features: ["3-stage throttle learning curve", "Flex fairing, no cracks", "Height-adjustable seat 24–28\"", "Helmet sizing help included"],
  },
  {
    id: "pit-cub",
    name: "Pit Cub 9",
    sku: "MRG-KD-03",
    category: "kids",
    family: "Kids & Mini",
    tagline: "Pit lane probation",
    blurb:
      "Tiny, quiet, and endlessly durable. The Pit Cub is what we hand to the smallest rider at the track so nobody is stuck walking.",
    photo: 13546271,
    price: 0,
    msrp: 720,
    rating: 4.6,
    reviews: 331,
    stock: 25,
    colors: [V, W, G],
    specs: { topSpeed: 10, range: 14, motor: 250, battery: "24V 6Ah Li-ion", charge: 2.5, weight: 27, wheels: 10 },
    features: ["Seat height 19 inches", "One-button start", "Tool-free handlebar fold", "Indoor-grip tyre compound"],
  },
  {
    id: "haulmaster",
    name: "Haulmaster Cargo",
    sku: "MRG-CG-01",
    category: "utility",
    family: "Cargo",
    tagline: "Two kids or 200 lb of groceries",
    blurb:
      "Long-tail front-loader with a box big enough for school runs. Parking brake, three-wheel stability and gearing that doesn't care about hills.",
    photo: 38473388,
    price: 0,
    msrp: 3400,
    badge: "NEW",
    rating: 4.7,
    reviews: 274,
    stock: 5,
    colors: [G, W, B],
    specs: { topSpeed: 25, range: 55, motor: 250, battery: "36V 20Ah (720 Wh)", charge: 5, weight: 82, wheels: 27.5 },
    features: ["Front box + bench cushion", "200 kg gross payload", "Parking brake on incline", "Child-proof wheel guards"],
  },
  {
    id: "site-dog",
    name: "Site Dog Work Bike",
    sku: "MRG-CG-02",
    category: "utility",
    family: "Cargo",
    tagline: "Trade floor approved",
    blurb:
      "Steel frame, tool cases as panniers, and a paint that forgives being leaned against a scaffold. The bike contractors actually borrow.",
    photo: 16435192,
    price: 0,
    msrp: 2800,
    rating: 4.5,
    reviews: 163,
    stock: 8,
    colors: [O, B, R],
    specs: { topSpeed: 28, range: 48, motor: 500, battery: "48V 15Ah (720 Wh)", charge: 4.5, weight: 74, wheels: 27.5 },
    features: ["Chromoly cargo rack", "Tool-box mounting rails", "Puncture-max 2.8\" tyres", "Welded, not bonded frame"],
  },
];

export const DELIVERY_FEE = 30;

export const PAYMENTS: {
  id: string;
  name: string;
  tag: string;
  detail: string;
  note: string;
  accent: string;
  icon: "gift" | "cash" | "paypal" | "bank";
}[] = [
  {
    id: "giftcard",
    name: "Gift Card",
    tag: "Fastest",
    detail: "Apple / Google Play / Steam / Amazon / Visa reward cards",
    note: "Send the card code + a screenshot of the back to Mark. He verifies within minutes, day or night.",
    accent: "#d8ff3e",
    icon: "gift",
  },
  {
    id: "cashapp",
    name: "Cash App",
    tag: "Popular",
    detail: "Cashtag confirmed by email — send $30 with your order ref as the note",
    note: "Always put your order reference in the Cash App memo so we match it to your bike instantly.",
    accent: "#2f4bff",
    icon: "cash",
  },
  {
    id: "paypal",
    name: "PayPal",
    tag: "Protected",
    detail: "Friends & Family or invoiced — your choice, discussed by email",
    note: "Prefer an invoice? Ask for one in your email and it lands within the hour.",
    accent: "#ff5b1f",
    icon: "paypal",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    tag: "Global",
    detail: "Local or SWIFT/SEPA transfer — coordinates sent after you email",
    note: "Best for outside the US. Include the reference code so the transfer is traced to you.",
    accent: "#7d9a6c",
    icon: "bank",
  },
];

export const CONTACT_EMAIL = "skubarskubar107@gmail.com";

export type Country = {
  name: string;
  flag: string;
  region: string;
  eta: string;
  customs: string;
};

export const COUNTRIES: Country[] = [
  { name: "United States", flag: "🇺🇸", region: "North America", eta: "3–6 days", customs: "None — domestic freight" },
  { name: "Canada", flag: "🇨🇦", region: "North America", eta: "4–8 days", customs: "Pre-paid by us" },
  { name: "Mexico", flag: "🇲🇽", region: "North America", eta: "6–11 days", customs: "Pre-paid by us" },
  { name: "United Kingdom", flag: "🇬🇧", region: "Europe", eta: "5–9 days", customs: "Pre-paid by us" },
  { name: "Germany", flag: "🇩🇪", region: "Europe", eta: "5–9 days", customs: "Pre-paid by us" },
  { name: "France", flag: "🇫🇷", region: "Europe", eta: "6–10 days", customs: "Pre-paid by us" },
  { name: "Netherlands", flag: "🇳🇱", region: "Europe", eta: "5–8 days", customs: "Pre-paid by us" },
  { name: "Spain", flag: "🇪🇸", region: "Europe", eta: "6–11 days", customs: "Pre-paid by us" },
  { name: "Italy", flag: "🇮🇹", region: "Europe", eta: "6–11 days", customs: "Pre-paid by us" },
  { name: "Portugal", flag: "🇵🇹", region: "Europe", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Sweden", flag: "🇸🇪", region: "Europe", eta: "6–10 days", customs: "Pre-paid by us" },
  { name: "Norway", flag: "🇳🇴", region: "Europe", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Denmark", flag: "🇩🇰", region: "Europe", eta: "6–10 days", customs: "Pre-paid by us" },
  { name: "Poland", flag: "🇵🇱", region: "Europe", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Ireland", flag: "🇮🇪", region: "Europe", eta: "6–10 days", customs: "Pre-paid by us" },
  { name: "Switzerland", flag: "🇨🇭", region: "Europe", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Greece", flag: "🇬🇷", region: "Europe", eta: "8–14 days", customs: "Pre-paid by us" },
  { name: "Ukraine", flag: "🇺🇦", region: "Europe", eta: "9–16 days", customs: "Pre-paid by us" },
  { name: "Brazil", flag: "🇧🇷", region: "South America", eta: "8–15 days", customs: "Pre-paid by us" },
  { name: "Argentina", flag: "🇦🇷", region: "South America", eta: "10–17 days", customs: "Pre-paid by us" },
  { name: "Chile", flag: "🇨🇱", region: "South America", eta: "10–16 days", customs: "Pre-paid by us" },
  { name: "Colombia", flag: "🇨🇴", region: "South America", eta: "9–15 days", customs: "Pre-paid by us" },
  { name: "Peru", flag: "🇵🇪", region: "South America", eta: "10–16 days", customs: "Pre-paid by us" },
  { name: "Australia", flag: "🇦🇺", region: "Oceania", eta: "8–14 days", customs: "Pre-paid by us" },
  { name: "New Zealand", flag: "🇳🇿", region: "Oceania", eta: "10–16 days", customs: "Pre-paid by us" },
  { name: "Fiji", flag: "🇫🇯", region: "Oceania", eta: "14–22 days", customs: "Pre-paid by us" },
  { name: "Japan", flag: "🇯🇵", region: "Asia", eta: "6–11 days", customs: "Pre-paid by us" },
  { name: "South Korea", flag: "🇰🇷", region: "Asia", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "China", flag: "🇨🇳", region: "Asia", eta: "9–15 days", customs: "Pre-paid by us" },
  { name: "Singapore", flag: "🇸🇬", region: "Asia", eta: "6–10 days", customs: "Pre-paid by us" },
  { name: "Thailand", flag: "🇹🇭", region: "Asia", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Vietnam", flag: "🇻🇳", region: "Asia", eta: "8–13 days", customs: "Pre-paid by us" },
  { name: "Indonesia", flag: "🇮🇩", region: "Asia", eta: "9–15 days", customs: "Pre-paid by us" },
  { name: "Malaysia", flag: "🇲🇾", region: "Asia", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Philippines", flag: "🇵🇭", region: "Asia", eta: "8–14 days", customs: "Pre-paid by us" },
  { name: "India", flag: "🇮🇳", region: "Asia", eta: "8–14 days", customs: "Pre-paid by us" },
  { name: "United Arab Emirates", flag: "🇦🇪", region: "Middle East", eta: "5–9 days", customs: "Pre-paid by us" },
  { name: "Saudi Arabia", flag: "🇸🇦", region: "Middle East", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Qatar", flag: "🇶🇦", region: "Middle East", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "Israel", flag: "🇮🇱", region: "Middle East", eta: "8–13 days", customs: "Pre-paid by us" },
  { name: "Turkey", flag: "🇹🇷", region: "Middle East", eta: "7–12 days", customs: "Pre-paid by us" },
  { name: "South Africa", flag: "🇿🇦", region: "Africa", eta: "9–16 days", customs: "Pre-paid by us" },
  { name: "Nigeria", flag: "🇳🇬", region: "Africa", eta: "10–18 days", customs: "Pre-paid by us" },
  { name: "Kenya", flag: "🇰🇪", region: "Africa", eta: "10–17 days", customs: "Pre-paid by us" },
  { name: "Ghana", flag: "🇬🇭", region: "Africa", eta: "11–18 days", customs: "Pre-paid by us" },
  { name: "Egypt", flag: "🇪🇬", region: "Africa", eta: "9–15 days", customs: "Pre-paid by us" },
  { name: "Morocco", flag: "🇲🇦", region: "Africa", eta: "9–15 days", customs: "Pre-paid by us" },
  { name: "Tanzania", flag: "🇹🇿", region: "Africa", eta: "12–20 days", customs: "Pre-paid by us" },
  { name: "Iceland", flag: "🇮🇸", region: "Europe", eta: "8–14 days", customs: "Pre-paid by us" },
  { name: "Costa Rica", flag: "🇨🇷", region: "Central America", eta: "8–14 days", customs: "Pre-paid by us" },
  { name: "Panama", flag: "🇵🇦", region: "Central America", eta: "8–14 days", customs: "Pre-paid by us" },
  { name: "Jamaica", flag: "🇯🇲", region: "Caribbean", eta: "10–16 days", customs: "Pre-paid by us" },
  { name: "Trinidad & Tobago", flag: "🇹🇹", region: "Caribbean", eta: "10–17 days", customs: "Pre-paid by us" },
  { name: "Antarctica (research stations)", flag: "🇦🇶", region: "Antarctica", eta: "By expedition vessel", customs: "We'll figure it out together" },
];

export const STEPS = [
  {
    n: "01",
    title: "Pick your machine",
    body: "Browse the fleet, filter by terrain, and open any bike for full specs. Every single one is priced at $0.00.",
  },
  {
    n: "02",
    title: "Fill the cart & choose your country",
    body: "Add one bike or five. Set your delivery country — freight is quoted for every country on earth, including research stations.",
  },
  {
    n: "03",
    title: "Pay the $30 delivery only",
    body: "The bike is free. You cover a flat $30 per order for freight handling, crate and customs paperwork — not per bike.",
  },
  {
    n: "04",
    title: "Email Mark to release payment",
    body: `Send your order reference to ${CONTACT_EMAIL}. He confirms the method (gift card, Cash App, PayPal or bank), then the crate ships.`,
  },
];

export const FAQS = [
  {
    q: "Is the bike genuinely free?",
    a: "Yes — the bike itself costs $0.00. No hidden 'processing', no dealer fees, no financing, no deposit. The only money that moves is a flat $30 toward freight, crating and customs paperwork, charged once per order no matter how many bikes you take.",
  },
  {
    q: "Why only $30 for shipping worldwide?",
    a: "Because this is a giveaway programme, not a retail operation. Bikes ship in shared freight lanes, so the handling cost is subsidised. If your quote ever comes back above $30, we email you the difference before anything is charged.",
  },
  {
    q: "Why do you need my email before I pay?",
    a: "So a human confirms it. Mark replies with the exact receiving details for the method you picked — the gift card numbers to read out, the Cash App tag, the PayPal email, or IBAN/SWIFT for a transfer. Nothing is charged automatically, and you always get a reply before you send money.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "Gift cards (Apple, Google Play, Steam, Amazon, Visa/Mastercard reward cards), Cash App, PayPal, and domestic or international bank transfer. Pick one at checkout and we'll walk you through it over email.",
  },
  {
    q: "Do you really ship to every country?",
    a: "Every country, yes — 195 recognised states plus territories and Antarctic research stations. If a country has sanctions on battery freight, we route it through a land partner and tell you the plan first.",
  },
  {
    q: "Is a Surron-class bike street legal?",
    a: "Most are off-road / track use. Some commuter and cargo builds are street legal in your region and come with lights, reflectors and a certificate. We flag legality in your country inside the order confirmation email.",
  },
  {
    q: "What arrives in the crate?",
    a: "The bike at 95% assembled, two keys, charger, tool roll, spare belts and fuses, a helmet sizing card and a 2-year frame warranty. You fit the bars, front wheel and pedals — 20 minutes with the included kit.",
  },
  {
    q: "Can I claim more than one bike?",
    a: "Yes. Families, clubs and workshops do it all the time. Add as many as you want; delivery stays a single $30 fee for the whole order.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Dani Okafor",
    place: "Lagos, Nigeria",
    bike: "Storm EBX 6000",
    quote:
      "Expected a scam, honestly. Email at 11pm, Mark replied in nine minutes with the transfer reference. Crate landed in Port Harcourt in eleven days, battery at 61%.",
    photo: 13546272,
  },
  {
    name: "Marta Kowalczyk",
    place: "Kraków, Poland",
    bike: "City Surge 500",
    quote:
      "I paid thirty dollars for a bike. Thirty. It replaced my car for the school run and I have not touched petrol since March.",
    photo: 19411371,
  },
  {
    name: "Cody Vance",
    place: "Moab, Utah",
    bike: "Dune Beast V8",
    quote:
      "Two seasons of dunes on a free bike. The only thing I ever paid Mark for was the crate fee and a spare controller he sent at cost.",
    photo: 29290085,
  },
  {
    name: "Aiko Tanaka",
    place: "Sapporo, Japan",
    bike: "Snowbeast 4.0",
    quote:
      "Studded tyres, heated grips, and it showed up before the first snow. Cash App, order ref in the memo, done in an afternoon.",
    photo: 9712995,
  },
  {
    name: "Tommy Brennan",
    place: "Cork, Ireland",
    bike: "Mini Rooster 500",
    quote:
      "Got the rooster for my six-year-old and the Boardwalk for me. One crate, one $30, both bikes. My son has not stopped talking about it.",
    photo: 38473388,
  },
  {
    name: "Priya Raman",
    place: "Bengaluru, India",
    bike: "Ridge Runner Pro 120",
    quote:
      "The bank transfer details came with an invoice number and everything. Customs was already cleared — I signed once and rode home.",
    photo: 32366003,
  },
];
