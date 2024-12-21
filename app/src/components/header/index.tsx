 import { Github, Menu, Twitter } from "lucide-solid";
import { For, Show } from "solid-js";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger
} from "~/components/ui/drawer";
import { cn } from "~/lib/utils";

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
  // {
  //   name: "Roadmap",
  //   href: "/roadmap",
  //   variant: "arrow",
  //   isNewTab: true,
  // },
  { name: "Pricing", href: "/pricing", variant: "link" },
  {
    name: "Continue",
    href: "/login",
    variant: "default",
    class: "bg-primary text-white hover:bg-primary/80 rounded-full flex items-center px-4",
    isUpdated: false,
  },
];

export default function Header() {
  return (
    <header class="max-w-5xl mx-auto flex justify-between items-center my-5 px-5 lg:px-0">
      <a href="/" class="cursor-pointer size-[48px] aspect-square">
        <Logo />
      </a>

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

        <a href="https://github.com/emee-dev/spotter" target="_blank">
          <Button variant="outline" class="rounded-full p-2">
            <Github class="text-lg size-5" />
          </Button>
        </a>
        <a href="https://x.com/___emee_" target="_blank">
          <Button variant="outline" class="rounded-full p-2">
            <Twitter class="text-lg size-5" />
          </Button>
        </a>
      </div>

      <div class="md:hidden">
        <Drawer>
          <DrawerTrigger
            as={Button<"button">}
            variant="outline"
            class="rounded-full"
            size="icon"
          >
            <Menu />
          </DrawerTrigger>

          <DrawerContent class="mx-auto w-full max-w-sm flex flex-col gap-3">
          
              <DrawerFooter>
                <div class="flex justify-end space-x-2">
                  <a href="https://github.com/emee-dev/spotter" target="_blank">
                    <Button variant="outline" class="rounded-full p-2">
                      <Github class="text-lg size-4" />
                    </Button>
                  </a>

                  <a href="https://x.com/___emee_" target="_blank">
                    <Button variant="outline" class="rounded-full p-2">
                      <Twitter class="text-lg size-4" />
                    </Button>
                  </a>
                </div>

                <For each={tabs}>
                  {(tab) => (
                    <div>
                      <a href={tab.href}>
                        <Button
                          variant="secondary"
                          class={cn("w-full", tab?.class)}
                        >
                          {tab.name}
                        </Button>
                      </a>
                    </div>
                  )}
                </For>

                <DrawerClose>
                  <Button variant="outline" class="rounded-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
        
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
