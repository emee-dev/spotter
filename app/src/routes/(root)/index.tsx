import { lazy } from "solid-js";

const Header = lazy(() => import("~/components/header"));
const HeroSection = lazy(() => import("~/components/sections/hero"));
const Logos = lazy(() => import("~/components/sections/logos"));
const Problem = lazy(() => import("~/components/sections/problem"));
const Solution = lazy(() => import("~/components/sections/solution"));
const HowItWorks = lazy(() => import("~/components/sections/how-it-works"));
const FAQ = lazy(() => import("~/components/sections/faq"));
// import Testimonials from "~/components/sections/testimonials";
const Footer = lazy(() => import("~/components/footer"));

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <Logos />
      <Problem />
      <Solution />
      <HowItWorks />
      {/* <Testimonials /> */}
      <FAQ />
      <Footer />
    </>
  );
}
