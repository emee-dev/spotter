import { createAsync, redirect, RouteSectionProps } from "@solidjs/router";
import { Menu, Plus } from "lucide-solid";
import { createSignal, Show, Suspense } from "solid-js";
import { SpinnerLoader } from "~/components/loaders";
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

  if (!user) {
    return redirect("/");
  }

  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  return (
    <div class="flex h-screen bg-muted">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Separator orientation="vertical" />

      <div class="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <Separator orientation="horizontal" />
        <Suspense fallback={<SpinnerLoader />}>{props.children}</Suspense>
      </div>
    </div>
  );
}

const Header = (props: { setSidebarOpen: (val: boolean) => void }) => {
  return (
    <header class="bg-muted z-30 p-3 flex items-center justify-between">
      <Button
        size="icon"
        variant="outline"
        onClick={() => props.setSidebarOpen(true)}
        class="lg:hidden"
      >
        <Menu class="size-4" />
      </Button>
      <h1 class="text-xl font-semibold">Project</h1>
      <a href="/projects/create">
        <Button size={"sm"}>
          <Plus class="size-4 mr-2" />
          <span>Add API</span>
        </Button>
      </a>
    </header>
  );
};
