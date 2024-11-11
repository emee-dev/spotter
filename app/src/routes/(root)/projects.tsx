import { createAsync, RouteSectionProps } from "@solidjs/router";
import { Menu, Plus } from "lucide-solid";
import { createSignal } from "solid-js";
import Sidebar from "~/components/sidebar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getLoggedUser } from "~/lib/auth/user";

export const route = {
  preload() {
    return getLoggedUser();
  },
};

export default function ProjectLayout(props: RouteSectionProps) {
  const user = createAsync(() => getLoggedUser(), { deferStream: true });
  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  return (
    // <div class="flex h-screen bg-[#1a1625] text-white">
    <div class="flex h-screen bg-background">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Separator orientation="vertical" />

      <div class="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <Separator orientation="horizontal" />
        {props.children}
      </div>
    </div>
  );
}

const Header = (props: { setSidebarOpen: (val: boolean) => void }) => {
  return (
    // <header class="bg-[#231f2e] p-4 flex items-center justify-between">
    <header class="bg-background/95 z-30 p-4 flex items-center justify-between">
      <button
        onClick={() => props.setSidebarOpen(true)}
        class="lg:hidden text-gray-400 hover:text-white"
      >
        <Menu class="h-6 w-6" />
      </button>
      <h1 class="text-xl font-semibold">Issues</h1>
      <div class="">
        <Button variant="outline" size={"sm"}>
          <Plus class="size-4 mr-2" />
          <span>Add API</span>
        </Button>
      </div>{" "}
    </header>
  );
};
