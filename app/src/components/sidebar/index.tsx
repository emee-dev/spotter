import {
  AlertCircle,
  BarChart2,
  ChevronDown,
  Layout,
  Menu,
  MoreHorizontal,
  Search,
  Sparkles,
  X,
} from "lucide-solid";

// Sidebar Structure
// Home
// Projects -> tabs (requests, endpoints, actions, settings)

const Sidebar = (props: {
  sidebarOpen: () => boolean;
  setSidebarOpen: (val: boolean) => void;
}) => {
  return (
    <div
      class={`fixed inset-y-0 left-0 z-50 w-64 bg-[#231f2e] transform ${
        props.sidebarOpen() ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded bg-emerald-500 flex items-center justify-center">
              <Sparkles class="h-5 w-5 text-white" />
            </div>
            <div>
              <div class="font-semibold">Empower Plant</div>
              <div class="text-sm text-gray-400">Jane Schmidt</div>
            </div>
          </div>
          <button
            onClick={() => props.setSidebarOpen(false)}
            class="lg:hidden text-gray-400 hover:text-white"
          >
            <X class="h-6 w-6" />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
          <a
            href="#"
            class="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <Layout class="h-5 w-5" />
            <span>Projects</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-3 px-4 py-2 text-white bg-white/10"
          >
            <AlertCircle class="h-5 w-5" />
            <span>Issues</span>
          </a>
          <a
            href="#"
            class="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <BarChart2 class="h-5 w-5" />
            <span>Events</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
