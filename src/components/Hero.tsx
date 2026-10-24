import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Copy,
  Gauge,
  MapPin,
  BatteryCharging,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
import { BIKES, COUNTRIES, DELIVERY_FEE, CONTACT_EMAIL, type Bike } from "../data";
import { useStore } from "../store";
import { useCountUp, useInView } from "../hooks";
import { BikeImage, Btn, Chip, Eyebrow } from "./ui";
import { cn } from "../utils/cn";

const FEATURED_IDS = ["lightbee-x", "storm-6000", "dunemaster", "ridge-runner", "metro-glide"];

function Streaks() {
  const rows = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        top: 6 + i * 6.6 + (i % 3) * 2,
        w: 18 + ((i * 37) % 46),
        dur: 5.5 + ((i * 13) % 9),
        delay: (i * 0.85) % 7,
        hot: i % 4 === 0,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {rows.map((r, i) => (
        <span
          key={i}
          className="absolute h-px opacity-0 animate-[streak_linear_infinite]"
          style={{
            top: `${r.top}%`,
            width: `${r.w}%`,
            background: r.hot
              ? "linear-gradient(90deg,transparent,rgba(255,91,31,0.75),transparent)"
              : "linear-gradient(90deg,transparent,rgba(216,255,62,0.42),transparent)",
            animationDuration: `${r.dur}s`,
            animationDelay: `${r.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Stat({
  value,
  suffix,
  prefix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView, 1400);
  return (
    <div ref={ref} className="min-w-0">
      <div className="display-xl flex items-baseline gap-0.5 text-[clamp(1.9rem,4.4vw,3.1rem)] text-bone">
        {prefix}
        {n.toFixed(decimals)}
        {suffix && <span className="text-volt">{suffix}</span>}
      </div>
      <div className="label-tech mt-1 text-[9.5px] leading-snug text-steel">{label}</div>
    </div>
  );
}

function ShowcaseCard({ bike }: { bike: Bike }) {
  const { add, setDetail } = useStore();
  return (
    <div
      key={bike.id}
      className="animate-rise relative border border-bone/12 bg-ink-2/70 backdrop-blur-md"
    >
      <div className="relative overflow-hidden">
        <BikeImage
          id={bike.photo}
          alt={bike.name}
          w={1200}
          className="aspect-[16/11] w-full"
          imgClass="scale-[1.03] hover:scale-110 transition-transform duration-[1.4s]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,17,22,0)_35%,rgba(14,17,22,0.92))]" />
        <div className="absolute left-0 top-0 flex items-center gap-2 p-3">
          <Chip tone="volt">{bike.badge ?? "FREE"}</Chip>
          <Chip tone="ink">{bike.family}</Chip>
        </div>
        <div className="absolute right-3 top-3 rotate-6 border-2 border-volt bg-ink/80 px-2.5 py-1 text-right">
          <div className="label-tech text-[8px] text-volt/70">price</div>
          <div className="font-tech text-lg font-bold leading-none text-volt">$0.00</div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="display-xl text-[clamp(1.35rem,2.6vw,2rem)] text-bone">{bike.name}</h3>
          <p className="mt-1 font-tech text-[11px] uppercase tracking-[0.16em] text-volt">
            {bike.tagline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-bone/10 border-t border-bone/10">
        {[
          { icon: Gauge, v: `${bike.specs.topSpeed}`, u: "mph" },
          { icon: BatteryCharging, v: `${bike.specs.range}`, u: "mi range" },
          { icon: Zap, v: `${bike.specs.motor}`, u: "w motor" },
        ].map((s, i) => (
          <div key={i} className="px-3 py-3">
            <s.icon className="mb-1 size-3.5 text-steel" />
            <div className="font-tech text-base font-bold leading-none text-bone">{s.v}</div>
            <div className="label-tech mt-1 text-[8.5px] text-steel">{s.u}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-bone/10 p-3">
        <Btn variant="volt" size="sm" className="flex-1" onClick={() => add(bike, bike.colors[0].name)}>
          Reserve free · ${DELIVERY_FEE} ship
        </Btn>
        <Btn variant="ghost" size="sm" className="text-bone" onClick={() => setDetail(bike)}>
          Full spec
        </Btn>
      </div>
    </div>
  );
}

export default function Hero() {
  const fleet = useMemo(() => {
    const byId = (id: string) => BIKES.find((b) => b.id === id)!;
    return [...BIKES.filter((b) => b.stock <= 3), ...FEATURED_IDS.map(byId)];
  }, []);
  const featured = useMemo(() => {
    const seen = new Set<string>();
    return fleet.filter((b) => (seen.has(b.id) ? false : seen.add(b.id))).slice(0, 5);
  }, [fleet]);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const { setCartOpen } = useStore();

  useEffect(() => {
    if (paused || featured.length < 2) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % featured.length), 6000);
    return () => window.clearInterval(t);
  }, [paused, featured.length]);

  const bike = featured[idx] ?? featured[0];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-ink pt-6 pb-0">
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0 grid-blueprint opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 -top-32 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(216,255,62,0.16),transparent_65%)] blur-2xl animate-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-52 right-[-6rem] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,91,31,0.16),transparent_65%)] blur-2xl animate-drift [animation-delay:-8s]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 noise-layer opacity-[0.16] mix-blend-overlay" aria-hidden />
      <Streaks />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[38%] hidden select-none text-center text-[18vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(239,235,227,0.055)] lg:block"
        aria-hidden
      >
        SURRON
      </div>

      <div className="relative mx-auto max-w-[86rem] px-4 pt-10 sm:px-6 lg:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ---------------- left: the claim ---------------- */}
          <div className="lg:col-span-7">
            <Eyebrow className="text-volt">
              Programme №4 · {BIKES.length} machines open · {COUNTRIES.length + 141} countries served
            </Eyebrow>

            <h1 className="display-xl mt-5 text-[clamp(2.7rem,8.4vw,6.6rem)] text-bone">
              <span className="block">Every bike</span>
              <span className="block text-volt">
                is free.
                <Sparkles className="ml-3 inline-block size-[0.42em] align-middle text-ember [animation:flicker_4.5s_ease-in-out_infinite]" fill="currentColor" />
              </span>
              <span className="block">
                You pay{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-ember">${DELIVERY_FEE}</span>
                  <span className="absolute inset-x-0 bottom-1 z-0 h-[0.22em] bg-ember/30" />
                </span>{" "}
                for the crate.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-bone/75">
              Markrobertgives hands out Surron-class dirt bikes and e-bikes to riders in every
              country on earth. Pick the machine you want, add it to your crate, and the only money
              that ever moves is a flat <strong className="font-semibold text-volt">${DELIVERY_FEE}</strong> for
              freight, crating and customs paperwork. Pay by gift card, Cash App, PayPal or bank
              transfer — after you email Mark and he confirms it with you personally.
            </p>

            {/* email pill */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={copyEmail}
                className="group flex items-center gap-2.5 border border-bone/20 bg-ink-2/60 px-3 py-2.5 text-left transition-colors hover:border-volt/70"
              >
                <span className="label-tech text-[9px] text-steel">Payments & release</span>
                <span className="font-tech text-[12px] font-semibold text-bone group-hover:text-volt">
                  {CONTACT_EMAIL}
                </span>
                {copied ? (
                  <span className="flex items-center gap-1 font-tech text-[10px] uppercase tracking-widest text-volt">
                    <Check className="size-3.5" /> copied
                  </span>
                ) : (
                  <Copy className="size-3.5 text-steel transition-colors group-hover:text-volt" />
                )}
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Btn
                size="lg"
                variant="volt"
                onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}
                arrow
              >
                Browse the free fleet
              </Btn>
              <Btn size="lg" variant="ghost" className="text-bone" href="#how">
                How the ${DELIVERY_FEE} works
              </Btn>
              <button
                onClick={() => setCartOpen(true)}
                className="group flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.14em] text-bone/70 transition-colors hover:text-volt"
              >
                <BadgeCheck className="size-4" />
                Open my crate
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* ---------------- right: rotating showcase ---------------- */}
          <div
            className="lg:col-span-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative">
              <div className="absolute -left-3 -top-3 hidden size-16 border-l-2 border-t-2 border-volt/50 lg:block" />
              <div className="absolute -bottom-3 -right-3 hidden size-16 border-b-2 border-r-2 border-ember/50 lg:block" />
              <ShowcaseCard bike={bike} />
              <div className="mt-3 flex items-center gap-2">
                {featured.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "group relative h-14 flex-1 overflow-hidden border transition-all",
                      i === idx
                        ? "border-volt"
                        : "border-bone/10 opacity-55 hover:opacity-100"
                    )}
                    aria-label={`Show ${f.name}`}
                  >
                    <BikeImage id={f.photo} alt={f.name} w={220} className="h-full w-full" />
                    <span className="absolute inset-x-0 bottom-0 truncate bg-ink/80 px-1 text-[7.5px] uppercase tracking-[0.1em] text-bone/90">
                      {f.sku}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* stat band */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-bone/10 py-8 sm:grid-cols-3 lg:grid-cols-6">
          <Stat value={BIKES.length} label="Bikes free right now" />
          <Stat value={8412} label="Machines already shipped" />
          <Stat value={195} label="Countries served" />
          <Stat value={DELIVERY_FEE} prefix="$" label="Flat delivery fee, per order" />
          <Stat value={4.8} decimals={1} label="Average rider rating" />
          <Stat value={0} prefix="$" label="Cost of the bike itself" />
        </div>
      </div>

      <div className="relative mt-2 border-y border-bone/10 bg-ink-2/60 py-2.5">
        <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap">
          {[...BIKES, ...BIKES].map((b, i) => (
            <span key={i} className="flex items-center gap-3 font-tech text-[11px] uppercase tracking-[0.18em] text-bone/45">
              <MapPin className="size-3 text-ember" />
              {b.name}
              <span className="text-volt">$0.00</span>
              <span className="text-steel">/ {b.stock} left</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
