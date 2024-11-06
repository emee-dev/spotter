/* 
// JS script, should be run after <script> tags load
const formatted = prettier.format("console.log( 'ok')", {
  parser: "babel",
  plugins: prettierPlugins,
});
console.log(formatted);
<!-- HTML -->
<script src="https://unpkg.com/prettier@2.6.2/standalone.js"></script>
<script src="https://unpkg.com/prettier@2.6.2/parser-babel.js"></script>
*/

import Header from "~/components/header";
import HeroSection from "~/components/sections/hero";
import Logos from "~/components/sections/logos";
import Problem from "~/components/sections/problem";
import Solution from "~/components/sections/solution";
import HowItWorks from "~/components/sections/how-it-works";
import FAQ from "~/components/sections/faq";
// import Testimonials from "~/components/sections/testimonials";
import { Footer } from "~/components/footer";

export default function Home() {
  return (
    <main class="min-h-[70vh]">
      <Header />
      <HeroSection />
      <Logos />
      <Problem />
      <Solution />
      <HowItWorks />
      {/* <Testimonials /> */}
      <FAQ />
      <Footer />
    </main>
  );
}
