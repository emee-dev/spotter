import { BellDot, Construction, Home, Sparkles, X } from "lucide-solid";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Projects",
    icon: Construction,
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
  return (
    <div
      class={`fixed inset-y-0 left-0 z-50 w-64 bg-background/75  transform ${
        props.sidebarOpen() ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out shadow-md lg:relative lg:translate-x-0`}
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded bg-emerald-500 flex items-center justify-center">
              <Sparkles class="h-5 w-5" />
            </div>
            <div>
              <div class="font-semibold">Empower Plant</div>
              <div class="text-sm text-gray-400">Jane Schmidt</div>
            </div>
          </div>
          <button
            onClick={() => props.setSidebarOpen(false)}
            class="lg:hidden text-gray-400 hover:text-neutral-600"
          >
            <X class="h-6 w-6" />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
          <For each={navItems}>
            {(item) => (
              <a
                href={item.path}
                // class="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10"
                class="flex items-center gap-3 px-4 py-2 text-current hover:bg-neutral-100"
                // active class
                // class="flex items-center gap-3 px-4 py-2 text-white bg-white/10"
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
