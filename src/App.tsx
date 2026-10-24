import Header from "./components/Header";
import Hero from "./components/Hero";
import Fleet from "./components/Fleet";
import BikeDetail from "./components/BikeDetail";
import WhyBand from "./components/WhyBand";
import { CartDrawer, Checkout } from "./components/Crate";
import {
  Faq,
  Footer,
  HowItWorks,
  MobileCrateBar,
  Riders,
  Toasts,
  Worldwide,
} from "./components/Sections";
import SpecMatrix from "./components/SpecMatrix";
import { StoreProvider } from "./store";
import { useRevealRoot } from "./hooks";

function Page() {
  useRevealRoot();
  return (
    <div className="relative min-h-screen bg-ink text-bone antialiased">
      <a
        href="#fleet"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-volt focus:px-4 focus:py-2 focus:font-tech focus:text-xs focus:uppercase focus:tracking-widest focus:text-ink"
      >
        Skip to the free fleet
      </a>
      <Header />
      <main>
        <Hero />
        <Fleet />
        <SpecMatrix />
        <HowItWorks />
        <Worldwide />
        <WhyBand />
        <Riders />
        <Faq />
      </main>
      <Footer />

      {/* overlays */}
      <BikeDetail />
      <CartDrawer />
      <Checkout />
      <Toasts />
      <MobileCrateBar />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Page />
    </StoreProvider>
  );
}
