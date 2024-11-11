import { ChevronDown, Search, X } from "lucide-solid";
import { createSignal } from "solid-js";
import { LargeRequestCard, Payload } from "~/components/request-cards";

// Mock data with sparkline data points
const issues: Payload[] = [
  {
    id: "1",
    error: {
      name: "TypeError",
      file: "apply/utils/src/instrumentation",
      line: 30,
      column: 10,
      message: "Failed to fetch resource",
      function: "fetchData",
    },
    stack: [
      {
        file: "apply/utils/src/instrumentation",
        line: 29,
        column: 5,
        function: "initializeRequest",
        method: "GET",
      },
      {
        file: "apply/utils/src/instrumentation",
        line: 30,
        column: 10,
        function: "fetchData",
        method: null,
      },
    ],
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
    system: {
      ip: "192.168.1.1",
      arch: "x64",
      platform: "macOS",
    },
    timestamp: "2024-11-04T08:30:00Z",
  },
  {
    id: "2",
    error: {
      name: "ForbiddenError",
      file: "fetchData/app/components/HoverCard",
      line: 15,
      column: 8,
      message: "User does not have permission to access this resource",
      function: "authorizeUser",
    },
    stack: [
      {
        file: "app/components/HoverCard",
        line: 15,
        column: 8,
        function: "authorizeUser",
        method: "POST",
      },
    ],
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
    system: {
      ip: null,
      arch: "x64",
      platform: "Windows",
    },
    timestamp: "2024-11-04T03:05:00Z",
  },
  {
    id: "3",
    error: {
      name: "ZodSchemaError",
      file: "validateData/app/forms/UserForm",
      line: 42,
      column: 15,
      message: "Input validation failed for user input",
      function: "validateUserInput",
    },
    stack: [
      {
        file: "app/forms/UserForm",
        line: 42,
        column: 15,
        function: "validateUserInput",
        method: "PUT",
      },
      {
        file: "app/forms/UserForm",
        line: 10,
        column: 8,
        function: "handleSubmit",
        method: null,
      },
    ],
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
    system: {
      ip: "10.0.0.25",
      arch: "arm",
      platform: "Android",
    },
    timestamp: "2024-11-03T18:45:00Z",
  },
];

export default function ProjectsDashboard() {
  const [searchQuery, setSearchQuery] = createSignal("");

  return (
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
            system={issue.system}
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
  );
}
