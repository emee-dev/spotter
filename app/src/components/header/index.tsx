// import { Link } from "next-view-transitions";
import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "~/components/ui/drawer";

// import { FaBrandsTwitter } from "solid-icons/fa";
// import { IoLogoGithub, IoMenuSharp } from "solid-icons/io";

import Logo from "~/assets/logo.svg";
import { For, Show } from "solid-js";
import { cn } from "~/lib/utils";
import { Github, Menu, Twitter } from "lucide-solid";

type Tabs = {
  name: string;
  href: string;
  isNewTab?: boolean;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "arrow"
    | null
    | undefined;
  class?: string;
  isUpdated?: boolean;
};

const tabs: Tabs[] = [
  { name: "Readme", href: "/readme", variant: "link" },
  {
    name: "Roadmap",
    href: "https://shadcnform.featurebase.app/",
    variant: "arrow",
    isNewTab: true,
  },
  { name: "Templates", href: "/templates", variant: "link" },
  {
    name: "Playground",
    href: "/playground",
    variant: "default",
    class: "bg-primary text-white rounded-full px-2",
    isUpdated: false,
  },
];

export default function Header() {
  return (
    <header class="max-w-5xl mx-auto flex justify-between items-center my-5 px-5 lg:px-0">
      <A href="/" class="cursor-pointer">
        <Logo />
      </A>

      <div class="hidden md:flex items-center gap-3">
        <For each={tabs}>
          {(tab) => (
            <a
              href={tab.href}
              target={tab.isNewTab ? "_blank" : "_self"}
              class="relative"
            >
              <Button
                variant={tab.variant}
                class={cn("w-full px-1", tab?.class)}
              >
                {tab.name}
                <Show when={tab.isUpdated}>
                  <span class="w-2 h-2 bg-green-400 rounded-full absolute right-1.5 top-1.5 animate-pulse" />
                </Show>
              </Button>
            </a>
          )}
        </For>

        <A href="https://github.com/hasanharman/form-builder" target="_blank">
          <Button variant="outline" class="rounded-full p-2">
            <Github class="text-lg" />
          </Button>
        </A>
        <A href="https://x.com/strad3r" target="_blank">
          <Button variant="outline" class="rounded-full p-2">
            {/* <FaXTwitter class="text-lg" /> */}
            <Twitter class="text-lg" />
          </Button>
        </A>
      </div>

      <div class="md:hidden">
        <Drawer>
          <DrawerTrigger>
            <Button variant="outline" class="rounded-full" size="icon">
              <Menu />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <div class="mx-auto w-full max-w-sm flex flex-col gap-3">
              <DrawerFooter>
                <div class="flex justify-end space-x-2">
                  <A
                    href="https://github.com/hasanharman/form-builder"
                    target="_blank"
                  >
                    <Button variant="outline" class="rounded-full p-2">
                      {/* <LuGithub class="text-lg" /> */}
                      <Github class="text-lg" />
                    </Button>
                  </A>

                  <A href="https://x.com/strad3r" target="_blank">
                    <Button variant="outline" class="rounded-full p-2">
                      <Twitter class="text-lg" />
                    </Button>
                  </A>
                </div>

                <For each={tabs}>
                  {(tab) => (
                    <DrawerClose>
                      <a href={tab.href}>
                        <Button
                          variant="secondary"
                          class={cn("w-full", tab?.class)}
                        >
                          {tab.name}
                        </Button>
                      </a>
                    </DrawerClose>
                  )}
                </For>

                <DrawerClose>
                  <Button variant="outline" class="rounded-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
