import { Github, Mail, Twitter } from "lucide-solid";
import { For, ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import Logo from "~/assets/spotter.svg";

interface Icon {
  icon: ValidComponent;
  url: string;
}

const icons: Icon[] = [
  { icon: Github, url: "https://github.com/hasanharman/form-builder" },
  { icon: Twitter, url: "https://x.com/strad3r" },
  { icon: Mail, url: "mailto:hasanharman33@gmail.com" },
];

type Link = {
  text: string;
  url: string;
};

const links: Link[] = [
  { text: "Readme", url: "/readme" },
  { text: "Features", url: "https://shadcnform.featurebase.app/" },
  { text: "Playground", url: "/playground" },
];

 function Footer() {
  return (
    <footer class="max-w-5xl mx-auto flex flex-col gap-y-3 pt-10 pb-5 px-5 lg:px-0">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-2">
          <a href="/" class="cursor-pointer size-[48px] aspect-square">
            <Logo />
          </a>
          <h2 class="font-semibold text-neutral-900 dark:text-white">
            Spotter.dev
          </h2>
        </div>

        <div class="flex gap-x-2">
          <For each={icons}>
            {(icon) => (
              <a
                href={icon.url}
                class="flex h-5 w-5 items-center justify-center text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-500 hover:dark:text-neutral-100"
              >
                <Dynamic component={icon.icon} />
              </a>
            )}
          </For>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul class="flex flex-col gap-x-5 gap-y-2 text-neutral-500 md:flex-row md:items-center ">
          {/* <For each={links}>
            {(link) => (
              <li class="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100">
                <a href={link.url}>{link.text}</a>
              </li>
            )}
          </For> */}
        </ul>
        <div class="flex items-center justify-between text-sm font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
          <p>All right reserverd.</p>
        </div>
      </div>
    </footer>
  );
}


export default Footer