import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";
import { cn } from "../utils/cn";
import { COUNTRIES, DELIVERY_FEE } from "../data";
import { useStore } from "../store";
import { useScroll } from "../hooks";
import { Btn } from "./ui";

const NAV = [
  { id: "fleet", label: "The Fleet" },
  { id: "matrix", label: "Spec matrix" },
  { id: "how", label: "How it works" },
  { id: "worldwide", label: "Worldwide" },
  { id: "riders", label: "Riders" },
  { id: "faq", label: "FAQ" },
];

/* ------------------------------------------------------- country selector */
export function CountrySelect({ compact = false }: { compact?: boolean }) {
  const { country, setCountry } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const box = useRef<HTMLDivElement>(null);

  const active = COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0];
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.region.toLowerCase().includes(needle)
    );
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group flex items-center gap-2 border border-current/20 px-3 py-2 font-tech text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-volt hover:text-volt",
          open && "border-volt text-volt",
          compact && "text-[10px]"
        )}
        aria-expanded={open}
      >
        <span className="text-sm leading-none">{active.flag}</span>
        <span className={cn("max-w-[9.5rem] truncate", compact ? "inline" : "hidden sm:inline")}>
          {active.name}
        </span>
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[min(94vw,25rem)] origin-top animate-rise border border-ink/10 bg-bone text-ink shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2.5">
            <Search className="size-4 text-steel" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 195 countries…"
              className="w-full bg-transparent font-tech text-xs uppercase tracking-wider outline-none placeholder:text-steel/70"
            />
          </div>
          <div className="max-h-[19rem] overflow-y-auto">
            {list.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  setCountry(c.name);
                  setOpen(false);
                  setQ("");
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-volt/40",
                  c.name === country && "bg-ink text-bone hover:bg-ink-3"
                )}
              >
                <span className="text-lg leading-none">{c.flag}</span>
                <span className="flex-1">
                  <span className="block font-tech text-[12px] font-semibold uppercase tracking-wide">
                    {c.name}
                  </span>
                  <span className={cn("block text-[11px]", c.name === country ? "text-bone/60" : "text-steel")}>
                    {c.region} · {c.eta}
                  </span>
                </span>
                <span className="font-tech text-[11px] font-bold text-ember">$0</span>
              </button>
            ))}
            {list.length === 0 && (
              <p className="px-3 py-6 text-center font-tech text-[11px] uppercase tracking-widest text-steel">
                Not in the list? We still ship there — just email us
              </p>
            )}
          </div>
          <div className="border-t border-ink/10 px-3 py-2 text-[11px] text-steel">
            Flat ${DELIVERY_FEE} delivery to every country below — one crate, any number of bikes.
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ header */
export default function Header() {
  const { count, setCartOpen, setCheckoutOpen, setDetail } = useStore();
  const { passed } = useScroll(30);
  const [active, setActive] = useState("fleet");
  const [mobile, setMobile] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    setPop(true);
    const t = window.setTimeout(() => setPop(false), 400);
    return () => window.clearTimeout(t);
  }, [count]);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.3, 0.6] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setMobile(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* notice ticker */}
      <div className="relative z-40 overflow-hidden border-b border-bone/10 bg-ember text-ink">
        <div className="flex w-max animate-marquee-rev items-center gap-8 py-1.5 pr-8 whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 font-tech text-[11px] font-bold uppercase tracking-[0.22em]">
              Every bike $0.00
              <Zap className="size-3" />
              Flat ${DELIVERY_FEE} delivery worldwide
              <Zap className="size-3" />
              Gift card · Cash App · PayPal · Bank
              <Zap className="size-3" />
            </span>
          ))}
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          passed
            ? "border-b border-bone/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[86rem] items-center gap-4 px-4 py-3 sm:px-6">
          {/* wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 text-left"
          >
            <span className="relative grid size-9 place-items-center bg-volt text-ink transition-transform duration-300 group-hover:rotate-[-8deg]">
              <Zap className="size-5" strokeWidth={2.6} fill="currentColor" />
            </span>
            <span className="leading-none">
              <span className="display-xl block text-[19px] text-bone transition-colors group-hover:text-volt sm:text-[21px]">
                Markrobertgives
              </span>
              <span className="label-tech block text-[8.5px] text-steel sm:text-[9px]">
                Free bike programme · est. 2019
              </span>
            </span>
          </button>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={cn(
                  "relative px-3 py-2 font-tech text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                  active === n.id ? "text-volt" : "text-bone/70 hover:text-bone"
                )}
              >
                {n.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px bg-volt transition-transform duration-300",
                    active === n.id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div className="hidden text-bone sm:block">
              <CountrySelect />
            </div>
            <Btn
              variant="volt"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => {
                setDetail(null);
                setCartOpen(true);
              }}
              arrow={false}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="size-3.5" strokeWidth={2.5} />
                Crate
                <span
                  className={cn(
                    "grid min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] text-volt",
                    pop && "animate-pop"
                  )}
                >
                  {count}
                </span>
              </span>
            </Btn>
            <button
              onClick={() => setMobile((m) => !m)}
              className="grid size-9 place-items-center border border-bone/20 text-bone transition-colors hover:border-volt hover:text-volt lg:hidden"
              aria-label="Menu"
            >
              {mobile ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {mobile && (
          <div className="animate-rise border-t border-bone/10 bg-ink-2/95 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="grid gap-1">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="flex items-center justify-between border-b border-bone/10 py-3 font-tech text-sm uppercase tracking-[0.12em] text-bone/80"
                >
                  {n.label}
                  <ChevronDown className="size-4 -rotate-90 text-volt" />
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <CountrySelect compact />
              <Btn
                variant="volt"
                size="sm"
                onClick={() => {
                  setMobile(false);
                  setCartOpen(true);
                }}
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="size-3.5" /> Crate · {count}
                </span>
              </Btn>
            </div>
            <button
              onClick={() => {
                setMobile(false);
                setCheckoutOpen(true);
              }}
              className="mt-3 w-full border border-volt/40 py-2.5 font-tech text-[11px] uppercase tracking-[0.18em] text-volt"
            >
              Start my $30 reservation
            </button>
          </div>
        )}
      </header>
    </>
  );
}
