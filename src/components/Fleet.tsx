import { useMemo, useState } from "react";
import {
  ArrowDownWideNarrow,
  Check,
  Eye,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { BIKES, CATEGORIES, DELIVERY_FEE, type Bike, type CategoryId } from "../data";
import { useStore } from "../store";
import { BikeImage, Btn, Chip, Eyebrow, Reveal, SpecBar, Swatch } from "./ui";
import { cn } from "../utils/cn";

type Sort = "popular" | "speed" | "range" | "stock" | "rating";
const SORTS: { id: Sort; label: string }[] = [
  { id: "popular", label: "Most wanted" },
  { id: "speed", label: "Top speed" },
  { id: "range", label: "Longest range" },
  { id: "stock", label: "Available now" },
  { id: "rating", label: "Best rated" },
];

function BikeCard({ bike, index }: { bike: Bike; index: number }) {
  const { add, has, setDetail, setCartOpen } = useStore();
  const [color, setColor] = useState(bike.colors[0].name);
  const inCrate = has(bike.id, color);
  const low = bike.stock <= 3;

  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <article className="group relative flex h-full flex-col border border-ink/12 bg-bone transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_24px_50px_-24px_rgba(14,17,22,0.55)]">
        {/* media */}
        <div className="relative overflow-hidden">
          <BikeImage
            id={bike.photo}
            alt={bike.name}
            w={800}
            className="aspect-[4/3] w-full"
            imgClass="duration-[1.2s] group-hover:scale-[1.09]"
          />
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-[900ms] group-hover:translate-x-full" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(14,17,22,0.75))]" />

          <div className="absolute left-2.5 top-2.5 flex flex-wrap items-center gap-1.5">
            {bike.badge && <Chip tone={bike.badge === "LIMITED" ? "ember" : "volt"}>{bike.badge}</Chip>}
            <Chip tone="ink">{bike.family}</Chip>
          </div>

          <div className="absolute right-2.5 top-2.5">
            <span
              className={cn(
                "label-tech flex items-center gap-1.5 bg-ink/80 px-2 py-1 text-[9px] text-bone",
                low && "text-volt"
              )}
            >
              <span className={cn("size-1.5 rounded-full", low ? "bg-ember animate-pulse" : "bg-volt")} />
              {bike.stock} left
            </span>
          </div>

          <button
            onClick={() => setDetail(bike)}
            className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 border border-bone/40 bg-ink/60 px-2.5 py-1.5 font-tech text-[9.5px] uppercase tracking-[0.14em] text-bone backdrop-blur-sm transition-colors hover:border-volt hover:text-volt"
          >
            <Eye className="size-3" /> Spec
          </button>

          <div className="absolute bottom-2.5 left-2.5">
            <div className="display-xl text-2xl text-volt">$0.00</div>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-tech text-[15px] font-bold uppercase leading-tight tracking-tight text-ink">
              {bike.name}
            </h3>
            <div className="shrink-0 text-right">
              <div className="font-tech text-[10px] uppercase tracking-wider text-steel">retail</div>
              <div className="font-tech text-[12px] font-bold text-ink/40 line-through">
                ${bike.msrp.toLocaleString()}
              </div>
            </div>
          </div>
          <p className="mt-1.5 text-[13px] leading-snug text-ink/65">{bike.tagline}</p>

          <div className="mt-3.5 grid grid-cols-3 gap-2 border-y border-ink/10 py-3">
            {[
              { v: `${bike.specs.topSpeed}`, u: "mph" },
              { v: `${bike.specs.range}`, u: "mi" },
              { v: `${bike.specs.motor}`, u: "watt" },
            ].map((s) => (
              <div key={s.u}>
                <div className="font-tech text-base font-bold leading-none text-ink">{s.v}</div>
                <div className="label-tech mt-0.5 text-[8.5px] text-steel">{s.u}</div>
              </div>
            ))}
          </div>

          <div className="mt-3.5 flex items-center gap-2">
            <span className="label-tech text-[9px] text-steel">Trim</span>
            <div className="flex gap-1.5 text-ink">
              {bike.colors.map((c) => (
                <Swatch
                  key={c.name}
                  name={c.name}
                  hex={c.hex}
                  size="sm"
                  active={c.name === color}
                  onClick={() => setColor(c.name)}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div className="mb-2.5 flex items-baseline justify-between">
              <span className="font-tech text-[10px] uppercase tracking-[0.14em] text-steel">
                You pay only
              </span>
              <span className="font-tech text-sm font-bold text-ember">
                ${DELIVERY_FEE} delivery
              </span>
            </div>
            {inCrate ? (
              <button
                onClick={() => setCartOpen(true)}
                className="flex w-full items-center justify-center gap-2 bg-ink py-3 font-tech text-[11px] font-bold uppercase tracking-[0.16em] text-volt transition-colors hover:bg-ink-3"
              >
                <Check className="size-4" strokeWidth={3} /> In your crate — view
              </button>
            ) : (
              <Btn variant="volt" size="md" className="w-full" onClick={() => add(bike, color)}>
                Add to crate — free
              </Btn>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Fleet() {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [expanded, setExpanded] = useState(false);
  const [onlyLow, setOnlyLow] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = BIKES.filter((b) => {
      if (cat !== "all" && b.category !== cat) return false;
      if (onlyLow && b.stock > 4) return false;
      if (!needle) return true;
      return (
        b.name.toLowerCase().includes(needle) ||
        b.tagline.toLowerCase().includes(needle) ||
        b.family.toLowerCase().includes(needle) ||
        b.sku.toLowerCase().includes(needle) ||
        b.colors.some((c) => c.name.toLowerCase().includes(needle))
      );
    });
    const by: Record<Sort, (a: Bike, b: Bike) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      speed: (a, b) => b.specs.topSpeed - a.specs.topSpeed,
      range: (a, b) => b.specs.range - a.specs.range,
      stock: (a, b) => b.stock - a.stock,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...list].sort(by[sort]);
  }, [cat, q, sort, onlyLow]);

  const shown = expanded ? filtered : filtered.slice(0, 9);
  const activeCat = CATEGORIES.find((c) => c.id === cat);

  return (
    <section id="fleet" className="relative bg-bone py-20 text-ink sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-blueprint-ink opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow className="text-ink/60">The fleet · every machine $0.00</Eyebrow>
            <h2 className="display-xl mt-4 max-w-3xl text-[clamp(2.2rem,6vw,4.4rem)]">
              Pick the one you want.
              <br />
              <span className="text-ink/35">There are {BIKES.length} to take.</span>
            </h2>
          </div>
          <div className="max-w-sm shrink-0">
            <p className="text-[15px] leading-relaxed text-ink/70">
              {activeCat ? activeCat.blurb : "Surron-class dirt bikes, trail e-MTBs, commuters, fat-tire builds, kids' minis and cargo haulers — all free, all shipped for the same $30."}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Sparkles className="size-4 text-ember" />
              <span className="font-tech text-[11px] uppercase tracking-[0.14em] text-ink/70">
                {filtered.length} of {BIKES.length} bikes shown
              </span>
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="sticky top-[3.4rem] z-20 -mx-4 mt-6 bg-bone/92 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:pb-0">
              <button
                onClick={() => setCat("all")}
                className={cn(
                  "shrink-0 border px-3 py-2 font-tech text-[10.5px] font-bold uppercase tracking-[0.14em] transition-all",
                  cat === "all"
                    ? "border-ink bg-ink text-volt"
                    : "border-ink/20 text-ink/70 hover:border-ink hover:bg-ink/5"
                )}
              >
                All {BIKES.length}
              </button>
              {CATEGORIES.map((c) => {
                const n = BIKES.filter((b) => b.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={cn(
                      "shrink-0 border px-3 py-2 font-tech text-[10.5px] font-bold uppercase tracking-[0.14em] transition-all",
                      cat === c.id
                        ? "border-ink bg-ink text-volt"
                        : "border-ink/20 text-ink/70 hover:border-ink hover:bg-ink/5"
                    )}
                  >
                    {c.label} <span className="ml-1 text-ember">{n}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-1 items-center gap-2 lg:justify-end">
              <label className="flex flex-1 items-center gap-2 border border-ink/20 bg-bone px-3 py-2 transition-colors focus-within:border-ink lg:max-w-[15rem]">
                <Search className="size-3.5 shrink-0 text-steel" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search bike, SKU, colour"
                  className="w-full bg-transparent font-tech text-[11px] uppercase tracking-wide outline-none placeholder:text-steel/80"
                />
                {q && (
                  <button onClick={() => setQ("")} aria-label="Clear search">
                    <X className="size-3.5 text-steel hover:text-ember" />
                  </button>
                )}
              </label>

              <button
                onClick={() => setOnlyLow((v) => !v)}
                className={cn(
                  "flex items-center gap-1.5 border px-3 py-2 font-tech text-[10.5px] font-bold uppercase tracking-[0.12em] transition-all",
                  onlyLow
                    ? "border-ember bg-ember text-white"
                    : "border-ink/20 text-ink/70 hover:border-ink"
                )}
              >
                <SlidersHorizontal className="size-3.5" /> Low stock
              </button>

              <div className="relative">
                <ArrowDownWideNarrow className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-steel" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="appearance-none border border-ink/20 bg-bone py-2 pl-8 pr-7 font-tech text-[10.5px] font-bold uppercase tracking-[0.12em] outline-none transition-colors hover:border-ink focus:border-ink"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* grid */}
        {shown.length === 0 ? (
          <div className="mt-16 border border-dashed border-ink/25 py-20 text-center">
            <p className="font-tech text-sm uppercase tracking-[0.16em] text-ink/60">
              No bike matches that search
            </p>
            <p className="mt-2 text-ink/50">
              Try “surron”, “fat”, “kids” or clear the filters — there's always something free.
            </p>
            <Btn
              variant="ink"
              size="sm"
              className="mt-5"
              onClick={() => {
                setQ("");
                setCat("all");
                setOnlyLow(false);
              }}
            >
              Reset filters
            </Btn>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((b, i) => (
              <BikeCard key={b.id} bike={b} index={i} />
            ))}
          </div>
        )}

        {filtered.length > 9 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <Btn variant="ink" size="lg" onClick={() => setExpanded((v) => !v)} arrow={!expanded}>
              {expanded ? "Show fewer bikes" : `Show all ${filtered.length} bikes`}
            </Btn>
            <div className="flex w-full max-w-md flex-col gap-2.5">
              <SpecBar
                label="Fleet claimed this month"
                value={68}
                max={100}
                unit="%"
                accent="#ff5b1f"
              />
              <SpecBar
                label="Crates already dispatched worldwide"
                value={91}
                max={100}
                unit="%"
                accent="#0e1116"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
