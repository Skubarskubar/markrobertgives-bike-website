import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BIKES, CONTACT_EMAIL, DELIVERY_FEE, type Bike } from "./data";

export type CartLine = { key: string; bikeId: string; color: string; qty: number };

export type OrderDetails = {
  ref: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  method: string;
  note: string;
  placedAt: string;
  items: { name: string; sku: string; color: string; qty: number }[];
  total: number;
};

type Toast = { id: number; title: string; body?: string; kind: "ok" | "warn" | "info" };

type Store = {
  lines: (CartLine & { bike: Bike })[];
  rawLines: CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  saved: number;
  has: (bikeId: string, color: string) => boolean;
  add: (bike: Bike, color: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  country: string;
  setCountry: (c: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  detail: Bike | null;
  setDetail: (b: Bike | null) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  order: OrderDetails | null;
  placeOrder: (o: Omit<OrderDetails, "ref" | "placedAt" | "items" | "total">) => OrderDetails;
  resetOrder: () => void;
  toasts: Toast[];
  push: (title: string, body?: string, kind?: Toast["kind"]) => void;
  dismiss: (id: number) => void;
};

const Ctx = createContext<Store | null>(null);

const LS_CART = "mrg.cart.v1";
const LS_COUNTRY = "mrg.country.v1";
const LS_ORDER = "mrg.order.v1";

function makeRef() {
  const s = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += s[Math.floor(Math.random() * s.length)];
  return `MRG-${out}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(LS_CART);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartLine[];
      return parsed.filter((l) => BIKES.some((b) => b.id === l.bikeId));
    } catch {
      return [];
    }
  });
  const [country, setCountry] = useState<string>(
    () => localStorage.getItem(LS_COUNTRY) || "United States"
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<Bike | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState<OrderDetails | null>(() => {
    try {
      const raw = localStorage.getItem(LS_ORDER);
      return raw ? (JSON.parse(raw) as OrderDetails) : null;
    } catch {
      return null;
    }
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem(LS_CART, JSON.stringify(rawLines));
  }, [rawLines]);
  useEffect(() => {
    localStorage.setItem(LS_COUNTRY, country);
  }, [country]);
  useEffect(() => {
    if (order) localStorage.setItem(LS_ORDER, JSON.stringify(order));
    else localStorage.removeItem(LS_ORDER);
  }, [order]);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (title: string, body?: string, kind: Toast["kind"] = "ok") => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t.slice(-2), { id, title, body, kind }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss]
  );

  const lines = useMemo(
    () =>
      rawLines.flatMap((l) => {
        const bike = BIKES.find((b) => b.id === l.bikeId);
        return bike ? [{ ...l, bike }] : [];
      }),
    [rawLines]
  );

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = 0; // every bike in the fleet is free
  const delivery = count > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;
  const saved = useMemo(
    () => lines.reduce((n, l) => n + l.bike.msrp * l.qty, 0),
    [lines]
  );

  const has = useCallback(
    (bikeId: string, color: string) =>
      rawLines.some((l) => l.bikeId === bikeId && l.color === color),
    [rawLines]
  );

  const add = useCallback(
    (bike: Bike, color: string, qty = 1) => {
      setRawLines((prev) => {
        const key = `${bike.id}::${color}`;
        const found = prev.find((l) => l.key === key);
        if (found) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: Math.min(l.qty + qty, 5) } : l
          );
        }
        return [...prev, { key, bikeId: bike.id, color, qty }];
      });
      push(`${bike.name} reserved`, `${color} · added to your crate — bike cost $0.00`, "ok");
    },
    [push]
  );

  const setQty = useCallback((key: string, qty: number) => {
    setRawLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 5) } : l))
    );
  }, []);

  const remove = useCallback((key: string) => {
    setRawLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setRawLines([]), []);

  const placeOrder = useCallback<Store["placeOrder"]>(
    (o) => {
      const placed: OrderDetails = {
        ...o,
        ref: makeRef(),
        placedAt: new Date().toISOString(),
        items: lines.map((l) => ({
          name: l.bike.name,
          sku: l.bike.sku,
          color: l.color,
          qty: l.qty,
        })),
        total: DELIVERY_FEE,
      };
      setOrder(placed);
      return placed;
    },
    [lines]
  );

  const value: Store = {
    lines,
    rawLines,
    count,
    subtotal,
    delivery,
    total,
    saved,
    has,
    add,
    setQty,
    remove,
    clear,
    country,
    setCountry,
    cartOpen,
    setCartOpen,
    detail,
    setDetail,
    checkoutOpen,
    setCheckoutOpen,
    order,
    placeOrder,
    resetOrder: () => setOrder(null),
    toasts,
    push,
    dismiss,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}

/** Build the pre-filled email Mark needs to receive. */
export function buildOrderMail(o: OrderDetails) {
  const lines = o.items
    .map((i) => `  • ${i.qty} × ${i.name}  [${i.sku}] — ${i.color} — $0.00`)
    .join("\n");
  const body = [
    `Hi Mark — I want to pay my $30 delivery fee and release my order.`,
    ``,
    `ORDER REFERENCE: ${o.ref}`,
    ``,
    `BIKES RESERVED (all free):`,
    lines,
    ``,
    `Bike total: $0.00`,
    `Delivery (flat, one crate): $${o.total}.00`,
    `Amount I need to send: $${o.total}.00`,
    ``,
    `PAYMENT METHOD I CHOSE: ${o.method}`,
    `Please send me the exact receiving details for ${o.method}.`,
    ``,
    `DELIVERY TO`,
    `  Name: ${o.name}`,
    `  Email: ${o.email}`,
    `  Phone: ${o.phone || "—"}`,
    `  Address: ${o.address}`,
    `  City: ${o.city}`,
    `  Country: ${o.country}`,
    o.note ? `  Note: ${o.note}` : "",
    ``,
    `Submitted: ${new Date(o.placedAt).toLocaleString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const subject = `Delivery fee — order ${o.ref} (${o.items.reduce((n, i) => n + i.qty, 0)} free bike${
    o.items.reduce((n, i) => n + i.qty, 0) === 1 ? "" : "s"
  })`;

  return {
    subject,
    body,
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`,
    plain: `${subject}\n\n${body}`,
  };
}
