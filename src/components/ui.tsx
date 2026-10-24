import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Zap } from "lucide-react";
import { cn } from "../utils/cn";
import { photo } from "../data";
import { useInView } from "../hooks";

/* ------------------------------------------------------------------ button */
type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "volt" | "ink" | "bone" | "ember" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  target?: string;
};

export function Btn({
  children,
  onClick,
  href,
  variant = "volt",
  size = "md",
  className,
  arrow = false,
  disabled,
  type = "button",
  target,
}: BtnProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 font-tech font-bold uppercase tracking-[0.12em] transition-all duration-200 active:translate-y-[1px] disabled:opacity-40 disabled:pointer-events-none select-none";
  const sizes = {
    sm: "text-[11px] px-3.5 py-2",
    md: "text-xs px-5 py-3",
    lg: "text-sm px-7 py-4",
  };
  const variants = {
    volt:
      "bg-volt text-ink hover:shadow-[0_10px_0_-2px_rgba(216,255,62,0.25),0_0_34px_rgba(216,255,62,0.35)] hover:-translate-y-0.5",
    ink: "bg-ink text-bone hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)]",
    bone: "bg-bone text-ink hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.22)]",
    ember:
      "bg-ember text-white hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,91,31,0.4)]",
    ghost:
      "border border-current/25 hover:border-current/60 hover:-translate-y-0.5 bg-transparent",
  };
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          className="size-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      )}
    </>
  );
  const cls = cn(base, sizes[size], variants[variant], className);
  if (href)
    return (
      <a
        href={href}
        className={cls}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

/* --------------------------------------------------------------------- chip */
export function Chip({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "bone" | "volt" | "ember" | "outline";
}) {
  const tones = {
    ink: "bg-ink text-bone",
    bone: "bg-bone/85 text-ink",
    volt: "bg-volt text-ink",
    ember: "bg-ember text-white",
    outline: "border border-current/30",
  };
  return (
    <span
      className={cn(
        "label-tech inline-flex items-center gap-1 px-2.5 py-1 text-[10px]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------- reveal */
export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
  return (
    <As className={cn("reveal", className)} style={{ "--reveal-delay": `${delay}ms` } as any}>
      {children}
    </As>
  );
}

/* --------------------------------------------------------------- bike image */
export function BikeImage({
  id,
  alt,
  w = 1000,
  className,
  imgClass,
}: {
  id: number;
  alt: string;
  w?: number;
  className?: string;
  imgClass?: string;
}) {
  const [state, setState] = useState<"load" | "ok" | "err">("load");
  return (
    <div className={cn("relative overflow-hidden bg-ink-3", className)}>
      {state !== "ok" && (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(115deg,#1f262f,#12161b_45%,#252d38)]">
          {state === "load" ? (
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-[linear-gradient(90deg,transparent,rgba(216,255,62,0.10),transparent)]" />
          ) : (
            <Zap className="size-8 text-volt/40" />
          )}
        </div>
      )}
      <img
        src={photo(id, w)}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setState("ok")}
        onError={() => setState("err")}
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform] duration-700",
          state === "ok" ? "opacity-100" : "opacity-0",
          imgClass
        )}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- spec bar */
export function SpecBar({
  label,
  value,
  max,
  unit,
  accent = "#d8ff3e",
  delay = 0,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  accent?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const pct = Math.max(6, Math.min(100, (value / max) * 100));
  return (
    <div ref={ref} className="group/bar">
      <div className="flex items-baseline justify-between gap-2">
        <span className="label-tech text-[10px] text-steel group-hover/bar:text-current">
          {label}
        </span>
        <span className="font-tech text-sm font-bold tabular-nums">
          {value}
          <span className="ml-0.5 text-[10px] text-steel">{unit}</span>
        </span>
      </div>
      <div className="mt-1.5 h-[5px] w-full overflow-hidden bg-current/10">
        <div
          className="h-full origin-left transition-[width] duration-1000 ease-out"
          style={{
            width: inView ? `${pct}%` : "0%",
            background: accent,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ section label */
export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5 label-tech text-[11px]", className)}>
      {dot && (
        <span className="relative grid size-2 place-items-center">
          <span className="absolute inset-0 rounded-full bg-volt animate-[pulse-ring_2.4s_ease-out_infinite]" />
          <span className="size-2 rounded-full bg-volt" />
        </span>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ colour button */
export function Swatch({
  name,
  hex,
  active,
  onClick,
  size = "md",
}: {
  name: string;
  hex: string;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      title={name}
      aria-label={name}
      onClick={onClick}
      className={cn(
        "relative rounded-full border transition-all duration-200",
        size === "md" ? "size-7" : "size-5",
        active
          ? "border-current scale-110"
          : "border-current/20 hover:border-current/60 hover:scale-105"
      )}
      style={{ background: hex }}
    >
      {active && (
        <Check
          className={cn(
            "absolute inset-0 m-auto text-ink mix-blend-difference",
            size === "md" ? "size-3.5" : "size-2.5"
          )}
          strokeWidth={3.5}
        />
      )}
    </button>
  );
}
