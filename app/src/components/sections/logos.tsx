import Marquee from "~/components/magicui/marquee";
// import Image from "next/image";

const companies = [
  {
    img: "139895814",
    link: "shadcn/ui",
    name: "shadcn/ui",
    author: "shadcn",
  },
  // mine
  {
    img: "79226042",
    link: "Solidstart",
    name: "solidstart",
    author: "solidstart",
  },
  {
    img: "14985020",
    link: "Vercel Hosting",
    name: "vercel.com",
    author: "vercel",
  },
  {
    img: "138932600",
    link: "Unkey.dev",
    name: "unkey.dev",
    author: "kronark",
  },
];

export default function Logos() {
  return (
    <section id="logos">
      <div class="container mx-auto px-4 md:px-8 py-12">
        <h3 class="text-center text-sm font-semibold text-gray-500">
          BUILT WITH
        </h3>
        <div class="relative mt-6 select-none">
          <Marquee className="max-w-full [--duration:40s]">
            {companies.map((item) => (
              <div class="h-10 w-40 dark:brightness-0 dark:invert grayscale opacity-30 flex items-center gap-2">
                <img
                  width={112}
                  height={40}
                  src={`https://avatars.githubusercontent.com/u/${item.img}`}
                  class="h-8 w-8 rounded"
                  alt={item.name}
                />
                <p class="text-sm whitespace-nowrap">{item.name}</p>
              </div>
            ))}
          </Marquee>
          <div class="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
          <div class="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}
