import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  Check,
  Copy,
  Gift,
  Landmark,
  Mail,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import { CONTACT_EMAIL, COUNTRIES, DELIVERY_FEE, PAYMENTS } from "../data";
import { buildOrderMail, useStore } from "../store";
import { useScrollLock } from "../hooks";
import { BikeImage, Btn, Chip } from "./ui";
import { cn } from "../utils/cn";
import { CountrySelect } from "./Header";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

const METHOD_ICON: Record<string, any> = {
  gift: Gift,
  cash: Banknote,
  paypal: Wallet,
  bank: Landmark,
};

/* =========================================================== crate / drawer */
export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    lines,
    count,
    delivery,
    total,
    saved,
    setQty,
    remove,
    clear,
    setCheckoutOpen,
    country,
  } = useStore();
  useScrollLock(cartOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  const ship = COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70]",
        cartOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!cartOpen}
    >
      <div
        onClick={() => setCartOpen(false)}
        className={cn(
          "absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300",
          cartOpen ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[30rem] flex-col border-l border-bone/12 bg-ink-2 shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          cartOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Your crate"
      >
        {/* head */}
        <div className="flex items-center justify-between border-b border-bone/12 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="size-4 text-volt" />
            <h3 className="display-xl text-2xl text-bone">Your crate</h3>
            <span className="label-tech bg-volt px-1.5 py-0.5 text-[9px] text-ink">{count}</span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="grid size-8 place-items-center border border-bone/20 text-bone transition-colors hover:border-ember hover:text-ember"
            aria-label="Close crate"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="relative grid size-20 place-items-center border border-dashed border-bone/25">
                <Gift className="size-8 text-volt" />
              </div>
              <p className="display-xl mt-5 text-xl text-bone">The crate is empty</p>
              <p className="mt-2 max-w-[22rem] text-[14px] leading-relaxed text-bone/60">
                Every bike in the fleet is $0.00. Add one (or five) and the only charge is ${DELIVERY_FEE}{" "}
                flat for freight to {ship.name}.
              </p>
              <Btn
                variant="volt"
                size="md"
                className="mt-5"
                arrow
                onClick={() => {
                  setCartOpen(false);
                  document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Browse the fleet
              </Btn>
            </div>
          ) : (
            <ul className="grid gap-3">
              {lines.map((l) => (
                <li
                  key={l.key}
                  className="group relative flex gap-3 border border-bone/10 bg-ink/50 p-2.5 transition-colors hover:border-bone/30"
                >
                  <BikeImage
                    id={l.bike.photo}
                    alt={l.bike.name}
                    w={220}
                    className="size-[4.5rem] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-tech text-[12.5px] font-bold uppercase leading-tight text-bone">
                        {l.bike.name}
                      </h4>
                      <button
                        onClick={() => remove(l.key)}
                        className="shrink-0 text-steel transition-colors hover:text-ember"
                        aria-label={`Remove ${l.bike.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-steel">
                      <span className="flex items-center gap-1">
                        <span
                          className="inline-block size-2.5 rounded-full ring-1 ring-bone/30"
                          style={{
                            background:
                              l.bike.colors.find((c) => c.name === l.color)?.hex ?? "#888",
                          }}
                        />
                        {l.color}
                      </span>
                      <span>·</span>
                      <span>{l.bike.sku}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => setQty(l.key, l.qty - 1)}
                          className="grid size-6 place-items-center border border-bone/20 text-bone transition-colors hover:border-volt hover:text-volt"
                          aria-label="Fewer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-7 text-center font-tech text-xs font-bold text-volt">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => setQty(l.key, l.qty + 1)}
                          disabled={l.qty >= l.bike.stock}
                          className="grid size-6 place-items-center border border-bone/20 text-bone transition-colors hover:border-volt hover:text-volt disabled:opacity-30"
                          aria-label="More"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-tech text-sm font-bold text-volt">$0.00</div>
                        <div className="text-[10px] text-steel line-through">
                          ${(l.bike.msrp * l.qty).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 && (
            <button
              onClick={clear}
              className="mt-4 flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.16em] text-steel transition-colors hover:text-ember"
            >
              <Trash2 className="size-3" /> Empty the crate
            </button>
          )}
        </div>

        {/* summary */}
        <div className="border-t border-bone/12 bg-ink/70 px-5 py-4">
          <div className="grid gap-1.5 text-[13px]">
            <Row label={`Bikes (${count}) × $0.00`} value="$0.00" muted />
            <Row label="Retail value you're not paying" value={`−$${saved.toLocaleString()}`} accent="#ff5b1f" />
            <Row label={`Freight, crate & customs — ${ship.flag}`} value={`$${delivery}.00`} />
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-dashed border-bone/20 pt-3">
            <div>
              <div className="label-tech text-[9px] text-steel">Total due</div>
              <div className="text-[11px] text-bone/50">{ship.eta} to {ship.name}</div>
            </div>
            <div className="display-xl text-4xl text-volt">${total}.00</div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border border-bone/10 px-3 py-2">
            <span className="label-tech text-[9px] text-steel">Delivering to</span>
            <CountrySelect compact />
          </div>

          <Btn
            variant="volt"
            size="lg"
            className="mt-3 w-full"
            disabled={lines.length === 0}
            onClick={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}
            arrow
          >
            Reserve & pay ${DELIVERY_FEE} delivery
          </Btn>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Question before I reserve a free bike")}&body=${encodeURIComponent("Hi Mark,\n\nI'm about to reserve a bike from the Markrobertgives fleet and I have a question:\n\n")}`}
            className="mt-2.5 flex w-full items-center justify-center gap-2 border border-bone/15 py-2.5 font-tech text-[10.5px] uppercase tracking-[0.14em] text-bone/70 transition-colors hover:border-volt hover:text-volt"
          >
            <Mail className="size-3.5" /> Ask Mark a question first
          </a>
        </div>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={cn("text-bone/60", muted && "text-steel")}>{label}</span>
      <span className="font-tech text-[13px] font-bold" style={{ color: accent ?? "#efebe3" }}>
        {value}
      </span>
    </div>
  );
}

/* ============================================================== checkout */
export function Checkout() {
  const {
    checkoutOpen,
    setCheckoutOpen,
    lines,
    count,
    total,
    country,
    placeOrder,
    order,
    push,
    clear,
    resetOrder,
  } = useStore();
  useScrollLock(checkoutOpen);

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const ship = useMemo(
    () => COUNTRIES.find((c) => c.name === country) ?? COUNTRIES[0],
    [country]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCheckoutOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setCheckoutOpen]);

  // re-opened: fresh cart restarts the flow, an empty cart with a live order shows the release
  useEffect(() => {
    if (!checkoutOpen) return;
    if (lines.length > 0 && !order) setStep(1);
    if (lines.length === 0 && order) setStep(3);
  }, [checkoutOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const doCopy = async (text: string, tag: string) => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(tag);
      push("Copied", tag === "message" ? "Order message ready to paste into an email" : undefined, "info");
      window.setTimeout(() => setCopied(null), 1900);
    } else {
      push("Copy blocked", "Select the text and copy manually — your mail app link still works", "warn");
    }
  };

  if (!checkoutOpen) return null;

  const validStep1 = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "We need a name for the crate label";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "A working email — Mark replies there";
    if (form.address.trim().length < 6) e.address = "Street + unit so the freight driver finds you";
    if (form.city.trim().length < 2) e.city = "City or region";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const chosenMethod = PAYMENTS.find((p) => p.id === method);

  const advance = () => {
    if (step === 1) {
      if (!validStep1()) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!method) {
        push("Pick a payment method", "Gift card, Cash App, PayPal or bank transfer", "warn");
        return;
      }
      const placed = placeOrder({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        country: ship.name,
        method: chosenMethod!.name,
        note: form.note.trim(),
      });
      setStep(3);
      push(`Order ${placed.ref} locked in`, "Email Mark to release the payment and your crate ships", "ok");
      return;
    }
    setCheckoutOpen(false);
  };

  const empty = lines.length === 0 && !order;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/92 backdrop-blur-md sm:items-center sm:p-6">
      <div className="relative w-full max-w-[58rem] animate-rise border border-bone/12 bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:my-6">
        {/* head */}
        <div className="flex items-center justify-between gap-3 border-b border-bone/12 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="display-xl text-2xl text-bone sm:text-3xl">
              {step === 3 ? "Release your crate" : `Step ${step} of 3`}
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={cn(
                    "h-1.5 transition-all duration-300",
                    s <= step ? "w-10 bg-volt" : "w-5 bg-bone/20"
                  )}
                />
              ))}
            </span>
          </div>
          <button
            onClick={() => setCheckoutOpen(false)}
            className="grid size-8 place-items-center border border-bone/20 text-bone transition-colors hover:border-ember hover:text-ember"
            aria-label="Close checkout"
          >
            <X className="size-4" />
          </button>
        </div>

        {empty ? (
          <div className="px-6 py-16 text-center">
            <p className="display-xl text-3xl text-bone">No bikes reserved yet</p>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-bone/60">
              Add at least one free bike to your crate and the ${DELIVERY_FEE} freight payment will
              open here. The bikes stay $0.00 forever.
            </p>
            <Btn
              variant="volt"
              size="lg"
              className="mt-6"
              arrow
              onClick={() => {
                setCheckoutOpen(false);
                document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Choose my bike
            </Btn>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.55fr_1fr]">
            {/* main column */}
            <div className="p-5 sm:p-7">
              {step === 1 && (
                <div className="animate-rise">
                  <h3 className="font-tech text-lg font-bold uppercase tracking-tight text-bone">
                    Where does the crate go?
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-bone/60">
                    Freight to {ship.flag} {ship.name} · {ship.eta} · {ship.customs}. This is a
                    delivery label, not a bill — nothing is charged on this page.
                  </p>
                  <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      error={errors.name}
                      placeholder="Alex Mensah"
                      className="sm:col-span-2"
                    />
                    <Field
                      label="Email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      error={errors.email}
                      placeholder="you@example.com"
                      type="email"
                    />
                    <Field
                      label="Phone (optional)"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      placeholder="+234 801 555 0110"
                    />
                    <Field
                      label="Street address"
                      value={form.address}
                      onChange={(v) => setForm({ ...form, address: v })}
                      error={errors.address}
                      placeholder="14 Ridgeway Close, Block C"
                      className="sm:col-span-2"
                    />
                    <Field
                      label="City / region"
                      value={form.city}
                      onChange={(v) => setForm({ ...form, city: v })}
                      error={errors.city}
                      placeholder="Port Harcourt"
                    />
                    <div>
                      <label className="label-tech mb-1.5 block text-[9px] text-steel">
                        Country — {COUNTRIES.length}+ listed, all free to ship
                      </label>
                      <div className="flex h-[42px] items-center justify-between border border-bone/15 bg-ink/60 px-3">
                        <span className="text-[13px] text-bone">{ship.flag} {ship.name}</span>
                        <CountrySelect compact />
                      </div>
                    </div>
                    <Field
                      label="Note for Mark (optional)"
                      value={form.note}
                      onChange={(v) => setForm({ ...form, note: v })}
                      placeholder="Gate code, best delivery hour, helmet size…"
                      className="sm:col-span-2"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-rise">
                  <h3 className="font-tech text-lg font-bold uppercase tracking-tight text-bone">
                    How will you send the ${DELIVERY_FEE}?
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-bone/60">
                    Bikes are free. Choose the rail you want to use for the flat freight fee — Mark
                    sends you the exact receiving details by email once you pick.
                  </p>
                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {PAYMENTS.map((p) => {
                      const Icon = METHOD_ICON[p.icon];
                      const active = method === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setMethod(p.id)}
                          className={cn(
                            "group relative overflow-hidden border p-4 text-left transition-all duration-200",
                            active
                              ? "border-volt bg-volt/10 -translate-y-0.5"
                              : "border-bone/15 bg-ink/40 hover:border-bone/45 hover:-translate-y-0.5"
                          )}
                        >
                          <span
                            className="absolute inset-x-0 top-0 h-[3px] transition-transform duration-300 group-hover:scale-x-100"
                            style={{ background: p.accent, transform: active ? "scaleX(1)" : "scaleX(0)" }}
                          />
                          <div className="flex items-start justify-between gap-3">
                            <span className="grid size-9 place-items-center border border-bone/15" style={{ color: p.accent }}>
                              <Icon className="size-4.5" />
                            </span>
                            <span className="label-tech text-[8.5px] text-steel">{p.tag}</span>
                          </div>
                          <div className="mt-3 font-tech text-[13px] font-bold uppercase tracking-wide text-bone">
                            {p.name}
                          </div>
                          <p className="mt-1 text-[12.5px] leading-snug text-bone/60">{p.detail}</p>
                          {active && (
                            <span className="mt-2.5 inline-flex items-center gap-1 font-tech text-[9.5px] uppercase tracking-[0.16em] text-volt">
                              <Check className="size-3" strokeWidth={3} /> selected
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-start gap-3 border border-ember/40 bg-ember/10 p-3.5">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-ember" />
                    <p className="text-[13px] leading-relaxed text-bone/80">
                      <strong className="font-semibold text-ember">Do not send money yet.</strong>{" "}
                      Nobody at Markrobertgives asks for your card PIN, password or 2FA code. Mark
                      replies with the receiving details for {chosenMethod ? chosenMethod.name : "your chosen method"} first —
                      verify the reply comes from {CONTACT_EMAIL}.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && order && (
                <div className="animate-rise">
                  <div className="flex items-center gap-3">
                    <span className="relative grid size-11 place-items-center bg-volt text-ink">
                      <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] bg-volt/60" />
                      <Check className="relative size-6" strokeWidth={3} />
                    </span>
                    <div>
                      <h3 className="font-tech text-lg font-bold uppercase leading-none tracking-tight text-bone">
                        Reserved for you
                      </h3>
                      <p className="mt-1 text-[13px] text-bone/60">
                        Bikes locked for 48 hours · total due {""}
                        <span className="text-volt">${DELIVERY_FEE}.00</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-dashed border-volt/50 bg-ink/60 p-4">
                    <div>
                      <div className="label-tech text-[9px] text-steel">Order reference</div>
                      <div className="display-xl text-[clamp(1.8rem,4.4vw,2.6rem)] text-volt">
                        {order.ref}
                      </div>
                    </div>
                    <Btn
                      variant="ghost"
                      size="sm"
                      className="text-bone"
                      onClick={() => doCopy(order.ref, "ref")}
                    >
                      {copied === "ref" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      {copied === "ref" ? "Copied" : "Copy ref"}
                    </Btn>
                  </div>

                  <div className="mt-4 grid gap-2 text-[13px]">
                    <Line k="Payment method" v={order.method} />
                    <Line k="Delivery address" v={`${order.address}, ${order.city}, ${order.country}`} />
                    <Line k="Contact" v={`${order.name} · ${order.email}`} />
                    <Line k="Bikes reserved" v={order.items.map((i) => `${i.qty} × ${i.name}`).join(", ")} />
                    <Line k="Bike cost" v="$0.00 (free, as always)" />
                    <Line k="Delivery fee due" v={`$${DELIVERY_FEE}.00 flat`} accent />
                  </div>

                  <div className="mt-5 border border-bone/12 bg-ink/50 p-4">
                    <div className="label-tech mb-2 text-[9px] text-steel">
                      Step 4 — send it to Mark
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-bone/70">
                      Email <span className="text-volt">{CONTACT_EMAIL}</span> with reference{" "}
                      <span className="text-bone">{order.ref}</span> and tell him you're paying the $
                      {DELIVERY_FEE} delivery by {order.method}. He confirms the receiving details,
                      then your crate is booked on the next freight lane.
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      <a
                        href={buildOrderMail(order).href}
                        className="group inline-flex flex-1 items-center justify-center gap-2 bg-volt px-5 py-3.5 font-tech text-xs font-bold uppercase tracking-[0.12em] text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(216,255,62,0.32)]"
                      >
                        <Mail className="size-4" /> Open email with my order
                      </a>
                      <Btn
                        variant="ghost"
                        size="md"
                        className="text-bone"
                        onClick={() => doCopy(buildOrderMail(order).plain, "message")}
                      >
                        {copied === "message" ? (
                          <Check className="size-3.5" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                        {copied === "message" ? "Message copied" : "Copy order message"}
                      </Btn>
                    </div>
                    <p className="mt-2.5 text-[12px] text-steel">
                      Mail app not opening? Copy the message and paste it into Gmail/Outlook addressed to{" "}
                      {CONTACT_EMAIL}.
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {PAYMENTS.find((p) => p.id === method)?.note && (
                      <div className="border border-bone/12 bg-ink/50 p-3.5 sm:col-span-2">
                        <div className="label-tech text-[9px] text-steel">
                          {order.method} — what to expect
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-bone/70">
                          {PAYMENTS.find((p) => p.id === method)!.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* nav */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-bone/12 pt-4">
                {step > 1 && !order && (
                  <Btn variant="ghost" size="md" className="text-bone" onClick={() => setStep((s) => s - 1)}>
                    <ArrowLeft className="size-4" /> Back
                  </Btn>
                )}
                {step < 3 && (
                  <Btn variant="volt" size="md" className="flex-1 sm:flex-none" onClick={advance} arrow>
                    {step === 1 ? `Choose payment method` : `Generate order reference`}
                  </Btn>
                )}
                {step === 3 && order && (
                  <>
                    <Btn
                      variant="bone"
                      size="md"
                      className="flex-1 sm:flex-none"
                      onClick={() => {
                        clear();
                        setCheckoutOpen(false);
                        push(
                          "Crate confirmed",
                          `Reference ${order.ref} is saved — reopen the crate any time to re-send it to Mark`,
                          "ok"
                        );
                      }}
                      arrow
                    >
                      Done — I'm an e-bike owner
                    </Btn>
                    <Btn
                      variant="ghost"
                      size="md"
                      className="text-bone"
                      onClick={() => {
                        setCheckoutOpen(false);
                        document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Add more free bikes
                    </Btn>
                    <Btn
                      variant="ghost"
                      size="md"
                      className="text-bone"
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Order ${order.ref}`)}`}
                    >
                      Email instead
                    </Btn>
                    <Btn
                      variant="ghost"
                      size="md"
                      className="text-steel"
                      onClick={() => {
                        resetOrder();
                        clear();
                        setMethod(null);
                        setStep(1);
                        setCheckoutOpen(false);
                        push("Reference cleared", "Add bikes again whenever you're ready", "info");
                      }}
                    >
                      Clear &amp; start over
                    </Btn>
                  </>
                )}
                <span className="ml-auto flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.14em] text-steel">
                  <span className="size-1.5 rounded-full bg-volt animate-pulse" />
                  {count} bike{count === 1 ? "" : "s"} held
                </span>
              </div>
            </div>

            {/* side: receipt */}
            <aside className="border-t border-bone/12 bg-ink/60 p-5 lg:border-l lg:border-t-0">
              <div className="label-tech text-[9px] text-steel">Crate manifest</div>
              <ul className="mt-3 grid gap-2.5">
                {(order?.items ?? lines).map((l, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="grid size-8 shrink-0 place-items-center border border-volt/40 font-tech text-[10px] font-bold text-volt">
                      {"qty" in l ? l.qty : 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-tech text-[11.5px] font-bold uppercase text-bone">
                        {"name" in l ? l.name : l.bike.name}
                      </span>
                      <span className="block text-[11px] text-steel">
                        {"color" in l ? l.color : ""} · ${0}.00
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-dashed border-bone/20 pt-3">
                <Row label="Bikes" value="$0.00" muted />
                <div className="mt-1.5 flex items-end justify-between">
                  <span className="label-tech text-[9px] text-steel">Pay now</span>
                  <span className="display-xl text-4xl text-volt">${total || DELIVERY_FEE}</span>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-snug text-steel">
                  Flat ${DELIVERY_FEE} per crate — not per bike. {ship.flag} {ship.name}: {ship.eta}.
                </p>
              </div>
              <div className="mt-4 grid gap-1.5">
                {[
                  "Bike, charger, 2 keys, tool roll",
                  "Spare belt, fuses, helmet sizing card",
                  "2-year frame warranty",
                  "Crated, insured, customs pre-paid",
                ].map((t) => (
                  <span key={t} className="flex items-start gap-2 text-[12px] leading-snug text-bone/65">
                    <Check className="mt-0.5 size-3 shrink-0 text-volt" strokeWidth={3} />
                    {t}
                  </span>
                ))}
              </div>
              <Chip tone="volt" className="mt-4 w-full justify-center py-2 text-[9.5px]">
                <Gift className="size-3" /> Bike cost: forever $0.00
              </Chip>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label-tech mb-1.5 block text-[9px] text-steel">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-[42px] w-full border bg-ink/60 px-3 text-[13.5px] text-bone outline-none transition-colors placeholder:text-steel/70",
          error ? "border-ember" : "border-bone/15 focus:border-volt"
        )}
      />
      {error && <p className="mt-1 flex items-center gap-1 text-[11.5px] text-ember"><AlertTriangle className="size-3" /> {error}</p>}
    </div>
  );
}

function Line({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-bone/8 pb-1.5">
      <span className="label-tech text-[9px] text-steel">{k}</span>
      <span className={cn("text-right text-[13px] font-medium", accent ? "text-volt" : "text-bone/85")}>
        {v}
      </span>
    </div>
  );
}
