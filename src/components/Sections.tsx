import { useMemo, useState } from "react";
import {
  ArrowRight,
  Banknote,
  Check,
  CircleCheck,
  Gift,
  Globe2,
  Landmark,
  Mail,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import {
  BIKES,
  CONTACT_EMAIL,
  COUNTRIES,
  DELIVERY_FEE,
  FAQS,
  PAYMENTS,
  STEPS,
  TESTIMONIALS,
} from "../data";
import { useStore } from "../store";
import { BikeImage, Btn, Chip, Eyebrow, Reveal } from "./ui";
import { cn } from "../utils/cn";

const PAY_ICON: Record<string, any> = {
  gift: Gift,
  cash: Banknote,
  paypal: Wallet,
  bank: Landmark,
};

/* ================================================================ how it works */
export function HowItWorks() {
  const { setCheckoutOpen, count } = useStore();
  const saved = BIKES.reduce((n, b) => n + b.msrp, 0);

  return (
    <section id="how" className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-blueprint opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[22rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(216,255,62,0.13),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-volt">The deal, in four moves</Eyebrow>
            <h2 className="display-xl mt-4 text-[clamp(2.1rem,5.6vw,4rem)] text-bone">
              Free bike.
              <br />
              <span className="text-ink-3 [-webkit-text-stroke:1px_rgba(216,255,62,0.55)]">
                Thirty dollar crate.
              </span>
              <br />
              That's the whole thing.
            </h2>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-bone/65">
              No loan applications, no "processing fee", no financing pitch. We reserve your machine,
              you send ${DELIVERY_FEE} once for freight, and the crate rolls. A human confirms every
              payment personally — that's also why you email before you pay.
            </p>

            <div className="mt-9 grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 90}>
                  <div className="group h-full bg-ink-2 p-5 transition-colors hover:bg-ink-3">
                    <div className="flex items-start justify-between">
                      <span className="display-xl text-4xl text-volt/90 transition-transform duration-300 group-hover:-translate-y-0.5">
                        {s.n}
                      </span>
                      <ArrowRight className="size-4 text-steel transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt" />
                    </div>
                    <h3 className="mt-3 font-tech text-[13px] font-bold uppercase tracking-wide text-bone">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-bone/60">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* the math */}
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="relative border border-volt/30 bg-ink-2 p-6">
                <div className="absolute -right-2 -top-2 rotate-3 bg-ember px-2.5 py-1 font-tech text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Read this
                </div>
                <div className="label-tech text-[9.5px] text-steel">Whole-fleet retail value</div>
                <div className="display-xl mt-1 text-[clamp(2.2rem,6vw,3.4rem)] text-bone/30 line-through decoration-ember decoration-[3px]">
                  ${saved.toLocaleString()}
                </div>
                <div className="label-tech mt-6 text-[9.5px] text-steel">
                  Your total for {BIKES.length} bikes
                </div>
                <div className="display-xl mt-1 text-[clamp(3rem,9vw,5.4rem)] leading-none text-volt">
                  ${DELIVERY_FEE}
                  <span className="text-[0.35em] text-bone/60">.00</span>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-bone/65">
                  That's the flat delivery fee — one crate, one charge, whatever you take. No bike
                  on this site has ever had a price attached to it.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="label-tech text-[9.5px] text-steel">Four ways to pay the fee</div>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENTS.map((p) => {
                      const Icon = PAY_ICON[p.icon];
                      return (
                        <div
                          key={p.id}
                          className="group flex items-center gap-2 border border-bone/12 bg-ink/60 px-2.5 py-2 transition-colors hover:border-volt/60"
                        >
                          <Icon
                            className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{ color: p.accent }}
                          />
                          <span className="font-tech text-[11px] font-bold uppercase tracking-wide text-bone/85">
                            {p.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Btn
                  variant="volt"
                  size="lg"
                  className="mt-6 w-full"
                  arrow
                  onClick={() => setCheckoutOpen(true)}
                >
                  {count > 0 ? "Continue my reservation" : `Start my reservation — $${DELIVERY_FEE}`}
                </Btn>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("How does the free bike programme work?")}`}
                  className="mt-2.5 flex items-center justify-center gap-2 font-tech text-[10.5px] uppercase tracking-[0.14em] text-bone/60 transition-colors hover:text-volt"
                >
                  <Mail className="size-3.5" /> Or ask Mark directly
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== worldwide */
export function Worldwide() {
  const [q, setQ] = useState("");
  const { country, setCartOpen } = useStore();

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = needle
      ? COUNTRIES.filter(
          (c) =>
            c.name.toLowerCase().includes(needle) || c.region.toLowerCase().includes(needle)
        )
      : COUNTRIES.filter((c) => c.name === country);
    return list.slice(0, 8);
  }, [q, country]);

  const regions = useMemo(() => {
    const map = new Map<string, number>();
    COUNTRIES.forEach((c) => map.set(c.region, (map.get(c.region) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  return (
    <section id="worldwide" className="relative overflow-hidden bg-bone py-20 text-ink sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-blueprint-ink opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-ink/55">Available in all countries</Eyebrow>
            <h2 className="display-xl mt-4 text-[clamp(2.1rem,5.6vw,3.9rem)]">
              195 countries.
              <br />
              One flat ${DELIVERY_FEE}.
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ink/70">
              If a road reaches you, a crate can too. Freight lanes run out of three hubs and every
              destination pays the same delivery fee — the bikes themselves are free in all of them.
              Check your country below for the honest transit time.
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {regions.map(([r, n]) => (
                <span
                  key={r}
                  className="border border-ink/15 px-2.5 py-1 font-tech text-[10px] uppercase tracking-[0.12em] text-ink/65 transition-colors hover:border-ink hover:bg-ink hover:text-volt"
                >
                  {r} <span className="text-ember">{n}</span>
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-ink/15 pt-6">
              {[
                { v: "3", l: "Freight hubs" },
                { v: "8,412", l: "Crates delivered" },
                { v: "0", l: "Bike charges, ever" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="display-xl text-[clamp(1.6rem,4vw,2.4rem)]">{s.v}</div>
                  <div className="label-tech mt-1 text-[9px] text-ink/55">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-ink/15 bg-bone-2/60">
              <div className="flex items-center gap-2.5 border-b border-ink/12 px-4 py-3">
                <Search className="size-4 text-ink/50" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Type your country — Nigeria, Germany, Peru, Fiji…"
                  className="w-full bg-transparent font-tech text-[12px] uppercase tracking-wide outline-none placeholder:text-ink/40"
                />
                <span className="label-tech hidden text-[9px] text-ink/50 sm:block">
                  {COUNTRIES.length} listed
                </span>
              </div>
              <div className="max-h-[24rem] divide-y divide-ink/10 overflow-y-auto">
                {results.map((c, i) => (
                  <Reveal key={c.name} delay={i * 40}>
                    <button
                      onClick={() => setQ(c.name)}
                      className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-volt/35"
                    >
                      <span className="text-2xl leading-none">{c.flag}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-tech text-[13px] font-bold uppercase tracking-wide">
                          {c.name}
                        </span>
                        <span className="block text-[12.5px] text-ink/60">
                          {c.region} · {c.customs}
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block font-tech text-[12px] font-bold text-ink/80">{c.eta}</span>
                        <span className="block font-tech text-[10px] uppercase tracking-[0.14em] text-ember">
                          bike $0 · ship ${DELIVERY_FEE}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-ink/25 transition-all group-hover:translate-x-1 group-hover:text-ink" />
                    </button>
                  </Reveal>
                ))}
                {results.length === 0 && (
                  <div className="px-4 py-10 text-center">
                    <p className="font-tech text-[12px] uppercase tracking-[0.14em] text-ink/70">
                      “{q}” isn't in the quick list
                    </p>
                    <p className="mt-2 text-[14px] text-ink/60">
                      We still ship there. Email {CONTACT_EMAIL} and Mark will quote the lane for you
                      the same day.
                    </p>
                    <Btn
                      variant="ink"
                      size="sm"
                      className="mt-4"
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Shipping to ${q}`)}`}
                      arrow
                    >
                      Ask about {q}
                    </Btn>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/12 bg-ink px-4 py-3">
                <span className="flex items-center gap-2 font-tech text-[10.5px] uppercase tracking-[0.14em] text-bone/75">
                  <Globe2 className="size-3.5 text-volt" /> Rural, island & landlocked routes included
                </span>
                <button
                  onClick={() => setCartOpen(true)}
                  className="font-tech text-[10.5px] uppercase tracking-[0.14em] text-volt hover:underline"
                >
                  Check my crate →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================================== riders */
export function Riders() {
  return (
    <section id="riders" className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-blueprint opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-volt">Riders in the wild</Eyebrow>
            <h2 className="display-xl mt-4 max-w-2xl text-[clamp(2rem,5.4vw,3.7rem)] text-bone">
              {BIKES.length} bikes, {COUNTRIES.length}+ countries,
              <br />
              <span className="text-volt">$0.00 charged for a bike.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 text-volt" fill="currentColor" />
              ))}
            </div>
            <span className="font-tech text-[11px] uppercase tracking-[0.14em] text-bone/70">
              4.8 avg · 21,760 reviews
            </span>
          </div>
        </div>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 90} className="min-w-[80%] snap-start sm:min-w-[46%] lg:min-w-0">
              <figure className="group flex h-full flex-col border border-bone/12 bg-ink-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-volt/50">
                <div className="relative overflow-hidden">
                  <BikeImage
                    id={t.photo}
                    alt={t.name}
                    w={700}
                    className="aspect-[16/9] w-full"
                    imgClass="grayscale-[0.35] duration-[1.4s] group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(14,17,22,0.9))]" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                    <div>
                      <div className="font-tech text-[12.5px] font-bold uppercase tracking-wide text-bone">
                        {t.name}
                      </div>
                      <div className="label-tech text-[9px] text-volt">{t.place}</div>
                    </div>
                    <Chip tone="ink">{t.bike}</Chip>
                  </figcaption>
                </div>
                <blockquote className="flex-1 p-4 text-[14.5px] leading-relaxed text-bone/75">
                  <span className="mr-1 text-volt">“</span>
                  {t.quote}
                  <span className="ml-1 text-volt">”</span>
                </blockquote>
                <div className="flex items-center gap-2 border-t border-bone/10 px-4 py-2.5">
                  <CircleCheck className="size-3.5 text-volt" />
                  <span className="font-tech text-[10px] uppercase tracking-[0.14em] text-steel">
                    Paid ${DELIVERY_FEE} — nothing else
                  </span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================================================================= faq */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-bone py-20 text-ink sm:py-24">
      <div className="pointer-events-none absolute inset-0 grid-blueprint-ink opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[86rem] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-ink/55">Straight answers</Eyebrow>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5.2vw,3.6rem)]">
              “Free” is
              <br />
              the whole point.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
              People ask the same three things: is the bike really free, why only thirty bucks, and
              why talk to a human before paying. Here they are.
            </p>
            <div className="mt-6 border border-ink/15 bg-bone-2/70 p-4">
              <div className="label-tech text-[9px] text-ink/60">Still unsure?</div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink/75">
                Mark answers personally, usually inside an hour, day or night.
              </p>
              <Btn
                variant="ink"
                size="sm"
                className="mt-3 w-full"
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Question about the free bike programme")}`}
                arrow
              >
                {CONTACT_EMAIL}
              </Btn>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-ink/15">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className="border-b border-ink/15">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start gap-4 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="mt-0.5 font-tech text-[11px] font-bold text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-tech text-[15px] font-bold uppercase leading-snug tracking-tight transition-colors sm:text-[17px]",
                          isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                        )}
                      >
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 grid size-7 shrink-0 place-items-center border transition-all duration-300",
                          isOpen
                            ? "border-ink bg-ink text-volt"
                            : "border-ink/25 text-ink/60 group-hover:border-ink"
                        )}
                      >
                        {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-3xl pb-5 pl-10 pr-6 text-[14.5px] leading-relaxed text-ink/70">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================================== footer */
export function Footer() {
  const { setCartOpen, count, setCheckoutOpen } = useStore();
  return (
    <footer className="relative overflow-hidden bg-ink pt-0">
      {/* CTA slab */}
      <div className="relative bg-volt text-ink">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply">
          <div className="hatch h-full w-full text-ink" />
        </div>
        <div className="relative mx-auto flex max-w-[86rem] flex-col items-start gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div>
            <div className="label-tech flex items-center gap-2 text-[10px]">
              <Zap className="size-3.5 animate-pulse" fill="currentColor" /> Programme №4 open
            </div>
            <h2 className="display-xl mt-2.5 max-w-3xl text-[clamp(2rem,6vw,4rem)]">
              Take a free bike. Pay ${DELIVERY_FEE} for the crate.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/75">
              {count > 0
                ? `${count} machine${count === 1 ? "" : "s"} held in your crate. Finish the $${DELIVERY_FEE} freight release and Mark books your lane.`
                : "24 machines waiting, none of them carrying a price. Pick yours before the batch closes."}
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
            <Btn variant="ink" size="lg" onClick={() => setCartOpen(true)}>
              <span className="flex items-center gap-2">
                <ShoppingBag className="size-4" /> My crate ({count})
              </span>
            </Btn>
            <Btn variant="ember" size="lg" onClick={() => setCheckoutOpen(true)} arrow>
              Pay ${DELIVERY_FEE} delivery
            </Btn>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[86rem] px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center bg-volt text-ink">
                <Zap className="size-5" strokeWidth={2.6} fill="currentColor" />
              </span>
              <span className="display-xl text-2xl text-bone">Markrobertgives</span>
            </div>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-bone/60">
              An independent free-bike programme giving away electric dirt bikes and e-bikes to
              riders worldwide since 2019. Bikes cost nothing. Freight costs ${DELIVERY_FEE}. A
              human checks every order.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 border border-bone/20 px-3 py-2 font-tech text-[11px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-volt hover:text-volt"
            >
              <Mail className="size-3.5" /> {CONTACT_EMAIL}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              {PAYMENTS.map((p) => {
                const Icon = PAY_ICON[p.icon];
                return (
                  <span
                    key={p.id}
                    className="flex items-center gap-1.5 border border-bone/12 px-2.5 py-1.5 font-tech text-[10px] uppercase tracking-[0.12em] text-bone/65"
                  >
                    <Icon className="size-3.5" style={{ color: p.accent }} /> {p.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="label-tech text-[9px] text-steel">The fleet</div>
            <ul className="mt-3 grid gap-2">
              {["surron", "emtb", "commuter", "fatty", "kids", "utility"].map((c) => {
                const label =
                  c === "surron"
                    ? "Surron-style dirt"
                    : c === "emtb"
                      ? "Electric MTB"
                      : c === "commuter"
                        ? "Street & commuter"
                        : c === "fatty"
                          ? "Fat tire"
                          : c === "kids"
                            ? "Kids & mini"
                            : "Cargo & utility";
                const n = BIKES.filter((b) => b.category === c).length;
                return (
                  <li key={c}>
                    <button
                      onClick={() =>
                        document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="group flex w-full items-baseline justify-between gap-3 border-b border-bone/8 py-1.5 text-left transition-colors hover:border-volt/50"
                    >
                      <span className="font-tech text-[11.5px] uppercase tracking-wide text-bone/70 group-hover:text-volt">
                        {label}
                      </span>
                      <span className="font-tech text-[10px] text-steel">{n} free</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="label-tech text-[9px] text-steel">Programme notes</div>
            <ul className="mt-3 grid gap-2.5">
              {[
                "Every bike listed is $0.00 — no deposit, no instalments, no dealer fees.",
                `A single flat $${DELIVERY_FEE} covers freight, crating, insurance and customs paperwork for the whole order.`,
                `Payment is arranged by email with ${CONTACT_EMAIL} before anything is sent.`,
                "We never ask for card PINs, passwords, 2FA codes or remote-access installs.",
                "Dirt bikes are off-road machines; check your local e-bike class rules before riding on public roads.",
                "Not affiliated with, or endorsed by, Surron Motors — these are our own builds and spec levels.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-[13px] leading-snug text-bone/55">
                  <Check className="mt-0.5 size-3 shrink-0 text-volt" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-bone/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-tech text-[10px] uppercase tracking-[0.14em] text-steel">
            © {new Date().getFullYear()} Markrobertgives free bike programme · ships worldwide
          </p>
          <p className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.14em] text-steel">
            <span className="size-1.5 rounded-full bg-volt animate-pulse" />
            {BIKES.reduce((n, b) => n + b.stock, 0)} bikes still unreserved
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ==================================================================== toasts */
export function Toasts() {
  const { toasts, dismiss } = useStore();
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[90] flex w-[min(94vw,24rem)] -translate-x-1/2 flex-col gap-2 sm:bottom-5 sm:left-auto sm:right-5 sm:translate-x-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex animate-toast items-start gap-3 border bg-ink-2/95 p-3 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md",
            t.kind === "ok"
              ? "border-volt/50"
              : t.kind === "warn"
                ? "border-ember/60"
                : "border-bone/20"
          )}
        >
          <span
            className={cn(
              "mt-0.5 grid size-6 shrink-0 place-items-center",
              t.kind === "ok" ? "bg-volt text-ink" : t.kind === "warn" ? "bg-ember text-white" : "bg-bone/15 text-bone"
            )}
          >
            {t.kind === "warn" ? <X className="size-3.5" /> : <Check className="size-3.5" strokeWidth={3} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-tech text-[11.5px] font-bold uppercase tracking-wide text-bone">
              {t.title}
            </p>
            {t.body && <p className="mt-0.5 text-[12.5px] leading-snug text-bone/60">{t.body}</p>}
          </div>
          <button
            onClick={() => dismiss(t.id)}
            className="text-steel transition-colors hover:text-bone"
            aria-label="Dismiss"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ===================================================== sticky mobile cart bar */
export function MobileCrateBar() {
  const { count, total, setCartOpen } = useStore();
  const [seen, setSeen] = useState(false);
  if (count === 0 || seen) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[65] border-t border-volt/40 bg-ink-2/95 px-4 py-3 backdrop-blur-lg sm:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-tech text-[10px] uppercase tracking-[0.16em] text-steel">
            {count} free bike{count === 1 ? "" : "s"} held
          </div>
          <div className="font-tech text-base font-bold text-volt">
            ${total}.00 due — delivery only
          </div>
        </div>
        <Btn variant="volt" size="sm" onClick={() => setCartOpen(true)} arrow>
          Crate
        </Btn>
        <button
          onClick={() => setSeen(true)}
          className="text-steel"
          aria-label="Hide bar"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
