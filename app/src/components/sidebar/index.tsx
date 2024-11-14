import { useLocation } from "@solidjs/router";
import { BellDot, Home, X } from "lucide-solid";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import Logo from "~/assets/logo.svg";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: "/projects",
  },
  {
    label: "Other",
    icon: BellDot,
    path: "/other",
  },
];

const Sidebar = (props: {
  sidebarOpen: () => boolean;
  setSidebarOpen: (val: boolean) => void;
}) => {
  const location = useLocation();

  return (
    <div
      class={`fixed inset-y-0 left-0 z-50 w-64 bg-background  transform ${
        props.sidebarOpen()
          ? "translate-x-0 bg-background opacity-100 shadow-2xl"
          : "-translate-x-full"
      } transition-transform duration-300 ease-in-out shadow-md lg:relative lg:translate-x-0`}
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-3">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded flex items-center justify-center">
              <Logo />
            </div>
            <div>
              <div class="font-semibold">Spotter.dev</div>
              {/* <div class="text-sm text-gray-400">Jane Schmidt</div> */}
            </div>
          </div>
          <Button
            size={"icon"}
            onClick={() => props.setSidebarOpen(false)}
            class="lg:hidden size-8 "
          >
            <X class="size-5" />
          </Button>
        </div>

        <Separator></Separator>

        <nav class="flex-1 overflow-y-auto py-4">
          <For each={navItems}>
            {(item) => (
              <a
                href={item.path}
                class={`${
                  location.pathname.startsWith(item.path)
                    ? "bg-accent text-accent-foreground" // Active styles
                    : "text-muted-foreground hover:bg-muted" // Inactive styles
                } rounded flex items-center gap-3 px-4 py-2`}
              >
                <Dynamic component={item.icon} class="size-4" />
                <span class="text-balance text-base">{item.label}</span>
              </a>
            )}
          </For>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
