import { RouteSectionProps } from "@solidjs/router";
import { ChevronDown, Menu, Plus, Search, X } from "lucide-solid";
import { createSignal } from "solid-js";
import { LargeRequestCard, Payload } from "~/components/request-cards";
import Sidebar from "~/components/sidebar";

// Mock data with sparkline data points
const issues: Payload[] = [
  {
    id: "1",
    error: {
      name: "TypeError",
      message: "Failed to fetch resource",
      location: "apply(utils/src/instrumentation)",
    },
    request: {
      method: "GET",
      url: "/projects/direct/backend/releases/v7210",
      params: { projectId: "404" },
      query: { search: "true" },
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: "Bearer some_token_here",
      },
    },
    response: {
      status: 404,
      params: { errorCode: "404" },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
    platform: "mac",
    timestamp: "2024-11-04T08:30:00Z",
  },
  {
    id: "2",
    error: {
      name: "ForbiddenError",
      message: "User does not have permission to access this resource",
      location: "fetchData(app/components/HoverCard)",
    },
    request: {
      method: "POST",
      url: "/api/user/update",
      params: null,
      query: null,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json",
        Authorization: "Bearer another_token",
      },
    },
    response: null,
    platform: "win-32",
    timestamp: "2024-11-04T03:05:00Z",
  },
  {
    id: "3",
    error: {
      name: "ZodSchemaError",
      message: "Input validation failed for user input",
      location: "validateData(app/forms/UserForm)",
    },
    request: {
      method: "PUT",
      url: "/api/user/12345",
      params: { userId: "12345" },
      query: { validate: "true" },
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    response: {
      status: 422,
      params: { statusCode: "422" },
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "120",
      },
    },
    platform: "android",
    timestamp: "2024-11-03T18:45:00Z",
  },
];

export default function ProjectsDashboard() {
  const [searchQuery, setSearchQuery] = createSignal("");
  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  return (
    <div class="flex h-screen bg-[#1a1625] text-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
          <div class="">
            <button class="flex text-sm items-center text-gray-400 hover:text-white">
              <Plus class="size-4 mr-2" />
              <span>Add API</span>
            </button>
          </div>{" "}
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
              All requests <span class="text-gray-600 ml-1">241</span>
            </button>
            <button class="px-4 py-1.5 bg-white/10 text-white rounded-full text-sm whitespace-nowrap">
              By Error <span class="text-gray-400 ml-1">7</span>
            </button>
          </div>

          <div class="space-y-2">
            {issues.map((issue) => (
              <LargeRequestCard
                id={issue.id}
                error={issue.error}
                request={issue.request}
                platform={issue.platform}
                timestamp={issue.timestamp}
                // response={issue.response}
              />
              // <SmallRequestCard
              //   id={issue.id}
              //   request={issue.request}
              //   response={issue.response}
              //   timestamp={issue.timestamp}
              // />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
