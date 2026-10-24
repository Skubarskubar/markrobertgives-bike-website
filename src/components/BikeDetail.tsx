import { useEffect, useMemo, useState } from "react";
import {
  BatteryCharging,
  Check,
  Gauge,
 Minus,
  Plus,
  Ruler,
  Scale,
  ShieldCheck,
  Star,
  Timer,
  Truck,
  Disc,
  X,
} from "lucide-react";
import { BIKES, COUNTRIES, DELIVERY_FEE } from "../data";
import { useStore } from "../store";
import { useScrollLock } from "../hooks";
import { BikeImage, Btn, Chip, SpecBar, Swatch } from "./ui";
import { cn } from "../utils/cn";

export default function BikeDetail() {
  const { detail, setDetail, add, country, setCartOpen } = useStore();
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  useScrollLock(!!detail);

  useEffect(() => {
    if (detail) {
      setColor(detail.colors[0].name);
      setQty(1);
      setShot(0);
    }
  }, [detail]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDetail(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setDetail]);

  const bike = detail;
  const gallery = useMemo(() => {
    if (!bike) return [];
    const others = BIKES.filter((b) => b.category === bike.id.slice(0, 0) ? false : b.category === bike.category && b.id !== bike.id);
    return [bike.photo, ...others.slice(0, 2).map((b) => b.photo)];
  }, [bike]);

  if (!bike) return null;
  const ship = COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0];

  const specTiles = [
    { icon: Gauge, label: "Top speed", value: bike.specs.topSpeed, unit: "mph" },
    { icon: BatteryCharging, label: "Real range", value: bike.specs.range, unit: "mi" },
    { icon: Truck, label: "Peak motor", value: bike.specs.motor, unit: "W" },
    { icon: Timer, label: "Full charge", value: bike.specs.charge, unit: "hrs" },
    { icon: Scale, label: "Rider weight", value: bike.specs.weight, unit: "lb" },
    { icon: Disc, label: "Wheel size", value: bike.specs.wheels, unit: "in" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        className="absolute inset-0"
        onClick={() => setDetail(null)}
        aria-hidden
      />
      <div className="relative my-0 w-full max-w-[70rem] animate-rise border border-bone/12 bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] sm:my-6">
        <button
          onClick={() => setDetail(null)}
          className="absolute right-3 top-3 z-20 grid size-9 place-items-center border border-bone/20 bg-ink/70 text-bone transition-colors hover:border-ember hover:text-ember"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="grid lg:grid-cols-2">
          {/* gallery */}
          <div className="relative bg-ink p-4 sm:p-5">
            <BikeImage
              key={gallery[shot]}
              id={gallery[shot]}
              alt={bike.name}
              w={1100}
              className="aspect-[4/3] w-full"
            />
            <div className="mt-3 flex items-center gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setShot(i)}
                  className={cn(
                    "h-16 flex-1 overflow-hidden border transition-all",
                    i === shot ? "border-volt" : "border-bone/10 opacity-50 hover:opacity-100"
                  )}
                >
                  <BikeImage id={g} alt={`${bike.name} angle ${i + 1}`} w={220} className="h-full w-full" />
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip tone="volt">{bike.sku}</Chip>
              <Chip tone="bone">{bike.family}</Chip>
              <Chip tone="outline" className="text-bone/70">
                <span className="flex items-center gap-1">
                  <Star className="size-3 text-volt" fill="currentColor" />
                  {bike.rating} · {bike.reviews.toLocaleString()} riders
                </span>
              </Chip>
            </div>
          </div>

          {/* spec sheet */}
          <div className="max-h-[78vh] overflow-y-auto p-5 sm:p-7">
            <h3 className="display-xl pr-10 text-[clamp(1.7rem,4vw,2.6rem)] text-bone">{bike.name}</h3>
            <p className="mt-1.5 font-tech text-[11px] uppercase tracking-[0.18em] text-volt">
              {bike.tagline}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-bone/70">{bike.blurb}</p>

            {/* price block */}
            <div className="mt-5 flex flex-wrap items-end gap-4 border-y border-bone/10 py-4">
              <div>
                <div className="label-tech text-[9px] text-steel">Bike price</div>
                <div className="display-xl text-4xl text-volt">$0.00</div>
              </div>
              <div className="h-10 w-px bg-bone/15" />
              <div>
                <div className="label-tech text-[9px] text-steel">You pay</div>
                <div className="font-tech text-2xl font-bold text-ember">${DELIVERY_FEE}</div>
              </div>
              <div className="h-10 w-px bg-bone/15" />
              <div>
                <div className="label-tech text-[9px] text-steel">Retail value</div>
                <div className="font-tech text-lg font-bold text-bone/40 line-through">
                  ${bike.msrp.toLocaleString()}
                </div>
              </div>
            </div>

            {/* specs */}
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
              {specTiles.map((s) => (
                <div key={s.label} className="border border-bone/10 bg-ink/50 p-3">
                  <s.icon className="mb-2 size-4 text-volt" />
                  <div className="font-tech text-lg font-bold leading-none text-bone">
                    {s.value}
                    <span className="ml-1 text-[10px] text-steel">{s.unit}</span>
                  </div>
                  <div className="label-tech mt-1.5 text-[8.5px] text-steel">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              <SpecBar label="Power delivery" value={Math.round(bike.specs.motor / 120)} max={100} unit="/100" accent="#d8ff3e" />
              <SpecBar label="Distance per charge" value={bike.specs.range} max={90} unit="mi" accent="#ff5b1f" />
              <SpecBar label="Battery pack" value={Number(bike.specs.battery.replace(/[^\d.]/g, "").slice(0, 2)) || 40} max={100} unit="Wh-class" accent="#2f4bff" />
            </div>

            <div className="mt-6">
              <div className="label-tech mb-2.5 text-[9.5px] text-steel">Battery</div>
              <p className="font-tech text-sm text-bone/85">{bike.specs.battery}</p>
            </div>

            <ul className="mt-5 grid gap-2">
              {bike.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-bone/75">
                  <Check className="mt-0.5 size-4 shrink-0 text-volt" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>

            {/* configure */}
            <div className="mt-6 border border-bone/10 bg-ink/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="label-tech text-[9px] text-steel">Colourway</div>
                  <div className="mt-1.5 flex items-center gap-2 text-bone">
                    <div className="flex gap-1.5">
                      {bike.colors.map((c) => (
                        <Swatch
                          key={c.name}
                          name={c.name}
                          hex={c.hex}
                          active={c.name === color}
                          onClick={() => setColor(c.name)}
                        />
                      ))}
                    </div>
                    <span className="font-tech text-[11px] uppercase tracking-wider">{color}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="label-tech text-[9px] text-steel">Crate qty</div>
                  <div className="mt-1.5 flex items-center gap-1">
                    <button
                      onClick={() => setQty((v) => Math.max(1, v - 1))}
                      className="grid size-8 place-items-center border border-bone/20 text-bone transition-colors hover:border-volt hover:text-volt"
                      aria-label="Decrease"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center font-tech text-base font-bold text-volt">{qty}</span>
                    <button
                      onClick={() => setQty((v) => Math.min(bike.stock, v + 1))}
                      className="grid size-8 place-items-center border border-bone/20 text-bone transition-colors hover:border-volt hover:text-volt"
                      aria-label="Increase"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-bone/10 pt-3">
                <ShipIcon />
                <p className="text-[13px] text-bone/70">
                  Ships to <strong className="text-bone">{ship.flag} {ship.name}</strong> · {ship.eta} ·{" "}
                  {ship.customs}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Btn
                  variant="volt"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    add(bike, color, qty);
                    setDetail(null);
                    setCartOpen(true);
                  }}
                >
                  Reserve {qty > 1 ? `${qty} × ` : ""}free — ${DELIVERY_FEE} delivery
                </Btn>
                <Btn variant="ghost" size="md" className="text-bone" onClick={() => setDetail(null)}>
                  Keep browsing
                </Btn>
              </div>
              <p className="mt-3 flex items-start gap-2 text-[12px] leading-snug text-steel">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-volt" />
                No deposit, no card at checkout. Reserve here, then email{" "}
                <span className="text-bone/80">skubarskubar107@gmail.com</span> for the $30 freight
                release.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShipIcon() {
  return (
    <span className="relative grid size-8 shrink-0 place-items-center">
      <Ruler className="size-4 text-ember" />
    </span>
  );
}
