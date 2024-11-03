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
import { createSignal } from "solid-js";

// Mock data with sparkline data points
const issues = [
  {
    id: 1,
    type: "TypeError",
    message: "Failed to fetch",
    project: "PLANT1000-ABC",
    location: "apply(utils/src/instrumentation)",
    timestamp: "3 min ago",
    sparkline: [2, 5, 8, 12, 7, 9, 15, 20, 18, 16, 14, 12],
    count: 798,
    userCount: 826,
  },
  {
    id: 2,
    type: "ForbiddenError",
    message: "GET /projects/direct/backend/releases/v7210/404",
    project: "PLANT1000-DEF",
    location: "fetchData(app/components/HoverCard)",
    timestamp: "5 hrs 25 min ago",
    sparkline: [1, 3, 7, 5, 9, 11, 8, 6, 4, 7, 9, 12],
    count: 130,
    userCount: 196,
  },
  {
    id: 3,
    type: "NotAllowedError",
    message: "GET /projects/direct/backend/releases/v7210/404",
    project: "PLANT1000-ABC",
    location: "fetchData(app/components/HoverCard)",
    timestamp: "8 hrs 3 min ago",
    sparkline: [5, 8, 12, 15, 10, 7, 9, 11, 13, 16, 14, 12],
    count: 883,
    userCount: 540,
  },
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg class="h-8 w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        stroke-width={2}
        class="text-indigo-400"
      />
    </svg>
  );
}

export default function ProjectsDashboard() {
  const [searchQuery, setSearchQuery] = createSignal(
    "is:unresolved is:for_review assigned_or_suggested:me,none"
  );
  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  return (
    <div class="flex h-screen bg-[#1a1625] text-white">
      {/* Sidebar */}
      <div
        class={`fixed inset-y-0 left-0 z-50 w-64 bg-[#231f2e] transform ${
          sidebarOpen() ? "translate-x-0" : "-translate-x-full"
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
              onClick={() => setSidebarOpen(false)}
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

      {/* Main content */}
      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="bg-[#231f2e] p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            class="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu class="h-6 w-6" />
          </button>
          <h1 class="text-xl font-semibold">Issues</h1>
          <div class="w-6" /> {/* Spacer for alignment */}
        </header>

        <div class="flex-1 overflow-auto p-4 space-y-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="flex-1 w-full relative">
              <Search class="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery()}
                onChange={(e) => setSearchQuery(e.target.value)}
                class="w-full bg-[#231f2e] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery() && (
                <button
                  onClick={() => setSearchQuery("")}
                  class="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                >
                  <X class="h-5 w-5" />
                </button>
              )}
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button class="flex items-center gap-2 px-4 py-2 bg-[#231f2e] text-white rounded-lg hover:bg-[#2a2535] w-full sm:w-auto justify-center sm:justify-start">
                Sort by: Date Added
                <ChevronDown class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button class="px-4 py-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full text-sm whitespace-nowrap">
              All Unresolved <span class="text-gray-600 ml-1">241</span>
            </button>
            <button class="px-4 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap">
              For Review <span class="text-gray-400 ml-1">7</span>
            </button>
            <button class="px-4 py-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full text-sm whitespace-nowrap">
              Ignored <span class="text-gray-600 ml-1">81</span>
            </button>
            <button class="px-4 py-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full text-sm whitespace-nowrap">
              Saved Searches
            </button>
          </div>

          <div class="space-y-2">
            {issues.map((issue) => (
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#231f2e] rounded-lg hover:bg-[#2a2535] group">
                <input
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-700 mt-1 sm:mt-0"
                />
                <div class="flex-1 min-w-0 space-y-1 sm:space-y-0">
                  <div class="flex items-start sm:items-center gap-2 flex-wrap">
                    <span class="font-medium">{issue.type}</span>
                    <span class="text-gray-500 text-sm hidden sm:inline">
                      {issue.location}
                    </span>
                  </div>
                  <div class="text-sm text-gray-400 truncate">
                    {issue.message}
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <span class="px-2 py-1 bg-[#1a1625] text-xs text-gray-400 rounded">
                      New Issue
                    </span>
                    <span class="font-medium text-xs text-gray-400">
                      {issue.project}
                    </span>
                    <span class="text-gray-500">{issue.timestamp}</span>
                  </div>
                </div>
                <div class="flex items-center gap-4 w-full sm:w-auto">
                  {/* 
                  
                  <div class="flex-1 sm:w-32">
                    <Sparkline data={issue.sparkline} />
                  </div>
                    */}

                  <div class="text-right">
                    <div class="font-medium">{issue.count}</div>
                    <div class="text-gray-500 text-sm">{issue.userCount}</div>
                  </div>
                  <button class="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded opacity-0 group-hover:opacity-100">
                    <MoreHorizontal class="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
