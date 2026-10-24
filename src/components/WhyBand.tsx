import { useEffect, useState } from "react";
import { BadgeCheck, Quote, ShieldCheck, Timer, Zap } from "lucide-react";
import { BikeImage, Eyebrow, Reveal } from "./ui";

const PROMISES = [
  {
    k: "01",
    t: "The bike never has a price",
    b: "No invoice for the frame, no 'assembly', no delivery-date surprise. If a listing says $0.00, that is the whole bike price for as long as it stays on this site.",
  },
  {
    k: "02",
    t: "A human checks every order",
    b: "Mark reads each reservation himself, answers on email, and only releases a crate once the $30 freight payment matches your reference.",
  },
  {
    k: "03",
    t: "You keep the warranty, not a lease",
    b: "Two years on the frame, the motor and the battery pack. The bike is yours the day it leaves the workshop — nothing to cancel, nothing to renew.",
  },
];

export default function WhyBand() {
  const [today, setToday] = useState(14);
  const [mins, setMins] = useState(3);

  useEffect(() => {
    const a = window.setInterval(() => setToday((v) => v + (Math.random() > 0.6 ? 1 : 0)), 11000);
    const b = window.setInterval(() => setMins(() => 1 + Math.floor(Math.random() * 8)), 13000);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink-2 py-20 text-bone sm:py-24">
      <div
        className="pointer-events-none absolute -left-24 top-1/4 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,91,31,0.15),transparent_68%)] blur-2xl animate-drift"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[86rem] items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
        {/* portrait */}
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <BikeImage
              id={28100861}
              alt="Mark in the workshop"
              w={900}
              className="aspect-[4/5] w-full border border-bone/12"
              imgClass="grayscale-[0.2]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(14,17,22,0.95))] p-4">
              <div className="label-tech text-[9px] text-volt">The workshop</div>
              <p className="mt-1 font-tech text-[13px] uppercase leading-snug tracking-wide text-bone">
                Crates packed by hand, one reference at a time
              </p>
            </div>
            <div className="absolute -left-3 -top-3 flex items-center gap-2 border border-volt/50 bg-ink px-2.5 py-1.5">
              <Zap className="size-3.5 text-volt" fill="currentColor" />
              <span className="label-tech text-[9px] text-volt">Mark · founder</span>
            </div>
            <div className="absolute -bottom-4 right-4 rotate-[-4deg] border-2 border-ember bg-ink px-3 py-2 text-center">
              <div className="display-xl text-xl leading-none text-ember">NO PRICE</div>
              <div className="label-tech mt-1 text-[8px] text-bone/60">on any bike</div>
            </div>
          </div>
        </Reveal>

        {/* statement */}
        <div className="lg:col-span-7">
          <Eyebrow className="text-volt">Why a free bike exists at all</Eyebrow>
          <h2 className="display-xl mt-4 text-[clamp(2rem,5.4vw,3.6rem)]">
            Riders with a bike
            <br />
            stop needing a lift.
          </h2>

          <figure className="mt-6 border-l-2 border-volt pl-5">
            <Quote className="mb-2 size-5 text-volt" />
            <blockquote className="text-[16px] leading-relaxed text-bone/80">
              I started fixing bikes for kids on my street in 2019. Selling them came later and I
              hated it more each year. So the programme is simple: the machines come out of my
              workshop for nothing, and everyone chips in thirty dollars so freight and paperwork
              don't bankrupt the thing. It has kept 8,412 riders off the bus.
            </blockquote>
            <figcaption className="mt-3 font-tech text-[11px] uppercase tracking-[0.16em] text-steel">
              Mark Robert · owner, mechanic, answerer of every email
            </figcaption>
          </figure>

          <ul className="mt-8 grid gap-px border border-bone/10 bg-bone/10">
            {PROMISES.map((p, i) => (
              <Reveal key={p.k} delay={i * 90} as="li">
                <div className="group flex items-start gap-4 bg-ink-2 p-4 transition-colors hover:bg-ink-3 sm:p-5">
                  <span className="display-xl shrink-0 text-3xl text-volt/80 transition-transform duration-300 group-hover:translate-y-[-2px]">
                    {p.k}
                  </span>
                  <span>
                    <span className="block font-tech text-[13px] font-bold uppercase tracking-wide text-bone">
                      {p.t}
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-bone/60">{p.b}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-bone/10 pt-5">
            <span className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.14em] text-bone/70">
              <span className="relative grid size-2.5 place-items-center">
                <span className="absolute inset-0 rounded-full bg-volt/70 animate-[pulse-ring_2.4s_ease-out_infinite]" />
                <span className="size-2.5 rounded-full bg-volt" />
              </span>
              {today} bikes released today
            </span>
            <span className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.14em] text-bone/70">
              <Timer className="size-3.5 text-volt" /> Mark replies in ~{mins} min
            </span>
            <span className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.14em] text-bone/70">
              <ShieldCheck className="size-3.5 text-volt" /> 2-yr frame warranty
            </span>
            <span className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.14em] text-bone/70">
              <BadgeCheck className="size-3.5 text-volt" /> No card details on this site
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
