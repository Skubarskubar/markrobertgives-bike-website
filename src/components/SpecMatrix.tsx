import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronUp, Plus } from "lucide-react";
import { BIKES, CATEGORIES, DELIVERY_FEE, type Bike } from "../data";
import { useStore } from "../store";
import { BikeImage, Btn, Chip, Eyebrow } from "./ui";
import { cn } from "../utils/cn";

type Col = {
  key: string;
  label: string;
  unit?: string;
  get: (b: Bike) => number | string;
  align?: "left" | "right";
  hideBelow?: string;
};

const COLS: Col[] = [
  { key: "name", label: "Machine", get: (b) => b.name },
  { key: "cat", label: "Class", get: (b) => b.family },
  { key: "speed", label: "Top speed", unit: "mph", get: (b) => b.specs.topSpeed, align: "right" },
  { key: "range", label: "Range", unit: "mi", get: (b) => b.specs.range, align: "right" },
  { key: "motor", label: "Motor", unit: "W", get: (b) => b.specs.motor, align: "right" },
  {
    key: "battery",
    label: "Pack",
    get: (b) => b.specs.battery,
    hideBelow: "lg",
  },
  { key: "weight", label: "Weight", unit: "lb", get: (b) => b.specs.weight, align: "right", hideBelow: "md" },
  { key: "stock", label: "Left", get: (b) => b.stock, align: "right", hideBelow: "sm" },
  { key: "price", label: "Bike price", get: () => "$0.00", align: "right" },
];

export default function SpecMatrix() {
  const { setDetail, add, country } = useStore();
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 }>({ key: "speed", dir: -1 });
  const [cat, setCat] = useState<string>("all");

  const rows = useMemo(() => {
    const list = BIKES.filter((b) => cat === "all" || b.category === cat);
    const col = COLS.find((c) => c.key === sort.key)!;
    return [...list].sort((a, b) => {
      const av = col.get(a);
      const bv = col.get(b);
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
      return String(av).localeCompare(String(bv)) * sort.dir;
    });
  }, [sort, cat]);

  const maxSpeed = Math.max(...BIKES.map((b) => b.specs.topSpeed));

  const clickSort = (key: string) =>
    setSort((s) => ({ key, dir: s.key === key ? ((s.dir * -1) as 1 | -1) : -1 }));

  return (
    <section id="matrix" className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-blueprint opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-volt">Full spec sheet · all {BIKES.length} bikes</Eyebrow>
            <h2 className="display-xl mt-4 max-w-2xl text-[clamp(2rem,5.2vw,3.4rem)] text-bone">
              Compare the numbers.
              <br />
              <span className="text-bone/35">Compare the prices if you like.</span>
            </h2>
          </div>
          <div className="no-scrollbar flex max-w-full gap-1.5 overflow-x-auto">
            <button
              onClick={() => setCat("all")}
              className={cn(
                "shrink-0 border px-3 py-2 font-tech text-[10px] font-bold uppercase tracking-[0.14em] transition-colors",
                cat === "all"
                  ? "border-volt bg-volt text-ink"
                  : "border-bone/20 text-bone/70 hover:border-bone/60"
              )}
            >
              Everything
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "shrink-0 border px-3 py-2 font-tech text-[10px] font-bold uppercase tracking-[0.14em] transition-colors",
                  cat === c.id
                    ? "border-volt bg-volt text-ink"
                    : "border-bone/20 text-bone/70 hover:border-bone/60"
                )}
              >
                {c.short}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto border border-bone/12 bg-ink-2/60">
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-bone/12 bg-ink/70">
                {COLS.map((c) => (
                  <th
                    key={c.key}
                    className={cn(
                      "p-0",
                      c.hideBelow === "sm" && "hidden sm:table-cell",
                      c.hideBelow === "md" && "hidden md:table-cell",
                      c.hideBelow === "lg" && "hidden lg:table-cell"
                    )}
                  >
                    <button
                      onClick={() => clickSort(c.key)}
                      className={cn(
                        "flex w-full items-center gap-1.5 px-3 py-3 font-tech text-[9.5px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-volt/10 hover:text-volt",
                        c.align === "right" && "justify-end",
                        sort.key === c.key ? "text-volt" : "text-steel"
                      )}
                    >
                      {c.label}
                      {c.unit && <span className="text-bone/25">({c.unit})</span>}
                      {sort.key === c.key ? (
                        <ChevronUp className={cn("size-3", sort.dir === -1 && "rotate-180")} />
                      ) : (
                        <ArrowUpDown className="size-3 opacity-40" />
                      )}
                    </button>
                  </th>
                ))}
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((b, i) => (
                <tr
                  key={b.id}
                  className={cn(
                    "group border-b border-bone/8 transition-colors last:border-0 hover:bg-volt/8",
                    i % 2 === 1 && "bg-bone/[0.02]"
                  )}
                >
                  <td className="p-0">
                    <button
                      onClick={() => setDetail(b)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
                    >
                      <BikeImage
                        id={b.photo}
                        alt={b.name}
                        w={140}
                        className="size-9 shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
                      />
                      <span className="min-w-0">
                        <span className="block truncate font-tech text-[12px] font-bold uppercase tracking-wide text-bone group-hover:text-volt">
                          {b.name}
                        </span>
                        <span className="block text-[10.5px] text-steel">{b.sku}</span>
                        <span className="mt-1 block h-[3px] w-full max-w-[7rem] bg-bone/10">
                          <span
                            className="block h-full bg-ember transition-[width] duration-700"
                            style={{ width: `${(b.specs.topSpeed / maxSpeed) * 100}%` }}
                          />
                        </span>
                      </span>
                    </button>
                  </td>
                  <td className="px-3 py-2.5">
                    <Chip tone="outline" className="text-bone/60">
                      {b.family}
                    </Chip>
                  </td>
                  <td className="px-3 py-2.5 text-right font-tech text-[13px] font-bold text-bone">
                    {b.specs.topSpeed}
                  </td>
                  <td className="px-3 py-2.5 text-right font-tech text-[13px] text-bone/80">
                    {b.specs.range}
                  </td>
                  <td className="px-3 py-2.5 text-right font-tech text-[13px] text-bone/80">
                    {b.specs.motor.toLocaleString()}
                  </td>
                  <td className="hidden px-3 py-2.5 font-tech text-[11.5px] text-bone/60 lg:table-cell">
                    {b.specs.battery}
                  </td>
                  <td className="hidden px-3 py-2.5 text-right font-tech text-[13px] text-bone/80 md:table-cell">
                    {b.specs.weight}
                  </td>
                  <td
                    className={cn(
                      "hidden px-3 py-2.5 text-right font-tech text-[12px] sm:table-cell",
                      b.stock <= 3 ? "text-ember" : "text-volt"
                    )}
                  >
                    {b.stock}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="font-tech text-[13px] font-bold text-volt">$0.00</span>
                    <span className="block text-[10px] text-steel line-through">
                      ${b.msrp.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <button
                      onClick={() => add(b, b.colors[0].name)}
                      className="inline-flex items-center gap-1 border border-bone/20 px-2.5 py-1.5 font-tech text-[9.5px] font-bold uppercase tracking-[0.14em] text-bone/70 transition-colors hover:border-volt hover:bg-volt hover:text-ink"
                    >
                      <Plus className="size-3" /> Take
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-5">
          <p className="max-w-xl text-[13.5px] leading-relaxed text-bone/60">
            Every row costs the same: nothing. {rows.length} machines listed here ×{" "}
            <span className="text-volt">$0.00</span> + one flat{" "}
            <span className="text-volt">${DELIVERY_FEE}</span> delivery to {country} — even if you
            take the whole table.
          </p>
          <Btn variant="volt" size="md" arrow onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}>
            Back to the bike cards
          </Btn>
        </div>
      </div>
    </section>
  );
}
