import { A, createAsync, query } from "@solidjs/router";
import { Heart, Star } from "lucide-solid";
import { For } from "solid-js";
import { NumberTicker } from "~/components/number-ticker";
import HeroVideoDialog from "~/components/sections/hero/hero-video";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import HeroImageDialog from "./hero-image";

type GithubData = {
  stargazers_count: number;
  forks_count: number;
};

const getGithubStats = query(async () => {
  "use server";

  try {
    const req = await fetch(
      // "https://api.github.com/repos/hasanharman/form-builder"
      "https://api.github.com/emee-dev/spotter"
    );

    const response = await req.json();
    return response as GithubData;
  } catch (err: any) {
    console.error("Error fetching repo: ", err);
  }
}, "github_stats");

export const route = {
  preload: () => getGithubStats(),
};

function HeroPill() {
  const stars = createAsync(() => getGithubStats(), { deferStream: true });

  return (
    <div class="flex items-center">
      <div class={cn("z-10 flex -space-x-10 rtl:space-x-reverse")}>
        <a
          // TODO update sponsor
          href="#"
          target="_blank"
          class="group"
        >
          <Button class="h-10 w-36 flex justify-start items-center rounded-full border-2 border-white dark:border-gray-800 shadow">
            <Heart class="mr-1 group-hover:text-red-500 size-4" />
            Sponsor
          </Button>
        </a>
        <a
          href="https://github.com/emee-dev/spotter"
          target="_blank"
          class="h-10 cursor-pointer flex w-auto items-center space-x-1 rounded-full bg-muted px-3 group border-2 border-white whitespace-pre shadow hover:shadow-lg"
        >
          <p class="font-medium text-primary text-sm">Star Project on GitHub</p>
          <div class="flex items-center rounded-full px-2 py-1 text-center font-medium text-sm ">
            <Star class="group-hover:text-yellow-500 size-4" />
            <NumberTicker
              delay={0}
              direction="up"
              value={stars()?.stargazers_count || 0}
              className="ml-1"
              decimalPlaces={0}
            />
          </div>
        </a>
      </div>
    </div>
  );
}

function HeroTitles() {
  return (
    <div class="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <h1 class="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl font-inter">
        {/* <For each={["Build", "your", "APIs", "Faster"]}> */}
        <For
          each={[
            "Find and fix",
            "production issues before",
            "ur customers do.",
          ]}
        >
          {(text) => <span class="inline-block px-1 md:px-2">{text}</span>}
        </For>
      </h1>
      <p class="mx-auto max-w-xl text-center leading-7 text-muted-foreground">
        Helps engineering teams,{" "}
        <span class="hover:underline cursor-pointer">quickly debug and, </span>
        <span class="hover:underline cursor-pointer">
          troubleshoot microservice issues
        </span>{" "}
        by providing{" "}
        <span class="hover:underline cursor-pointer">observability</span> for
        your API.
      </p>
    </div>
  );
}

function HeroCTA() {
  return (
    <>
      <div class="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-6 sm:flex-row sm:space-x-4 sm:space-y-0">
        <a
          href="/projects"
          class={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2 rounded-full"
          )}
        >
          Go to Dashboard
        </a>
      </div>
    </>
  );
}

function HeroImage() {
  return (
    <div class="relative mx-auto flex w-full items-center justify-center">
      {/* <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/25IzTkU3En4"
        thumbnailSrc="/demo.png"
        thumbnailAlt="Thumbnail"
        className="border rounded-lg shadow-lg max-w-screen-lg mt-16"
      /> */}
      <HeroImageDialog
        animationStyle="from-center"
        // imageSrc="https://www.youtube.com/embed/25IzTkU3En4"
        imageSrc="https://youtu.be/eG0VnvaQTsU?si=uiqsevC2kOPYkdLe"
        thumbnailSrc="/home.png"
        thumbnailAlt="Thumbnail"
        className="border rounded-lg shadow-lg max-w-screen-lg mt-16"
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero">
      <div class="relative flex w-full flex-col items-center justify-start px-4 pt-16 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
        <HeroImage />
        <div class="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4"></div>
      </div>
    </section>
  );
}
