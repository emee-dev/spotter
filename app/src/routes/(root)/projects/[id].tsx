import {
  createAsync,
  query,
  useAction,
  useParams,
  useSubmission,
} from "@solidjs/router";
import { Unkey } from "@unkey/api";
import { Box, Copy, Key, Radio, RotateCw } from "lucide-solid";
import { createSignal, ErrorBoundary, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  LargeRequestCard,
  Payload,
  SmallRequestCard,
} from "~/components/request-cards";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { showToast } from "~/components/ui/toast";
import { env } from "~/env";
import { getProjectStatsById, listAllRequests } from "~/lib/db";
import { createProjectAPIKey } from "~/lib/db/action";
// import { updateProjectAction } from "~/lib/db/action";

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

const overview = [
  {
    icon: "Box",
    label: "Requests",
    value: 0,
    color: "text-blue-500",
  },
  {
    icon: "Radio",
    label: "Endpoints",
    value: 0,
    color: "text-purple-500",
  },
];

const statsIcons = {
  Box: Box,
  Radio: Radio,
};

const projectStats = query(async () => {
  const params = useParams<{ id: string }>();

  const data = await getProjectStatsById({ projectId: params.id });

  return data;
}, "projectStats");

// const listProjectRequests = query(async () => {}, "listProjectRequests");

export const route = {
  preload: () => {
    projectStats();
  },
};

function SettingsTabContent() {
  const params = useParams<{ id: string }>();
  // const updateProject = useSubmission(updateProjectAction);
  const createAPIKey = useSubmission(createProjectAPIKey);

  return (
    <div class="space-y-6">
      {/* <Card>
        <CardHeader>
          <CardTitle>Project</CardTitle>
        </CardHeader>
        <form action={updateProjectAction} method="post">
          <CardContent class="space-y-4">
            <TextField class="space-y-2">
              <TextFieldLabel for="projectLabel">Label</TextFieldLabel>
              <TextFieldInput
                id="projectLabel"
                name="projectLabel"
                type="text"
                placeholder="Service name"
                maxLength={32}
              />
            </TextField>
            <TextField class="space-y-2">
              <TextFieldLabel for="baseUrl">Base URL</TextFieldLabel>
              <TextFieldInput
                id="baseUrl"
                name="baseUrl"
                type="text"
                placeholder="https://localhost:3000/"
                maxLength={32}
              />
            </TextField>
          </CardContent>
          <CardFooter>
            <Show
              when={updateProject.pending}
              fallback={<Button type="submit">Save</Button>}
            >
              {(_) => (
                <Button disabled type="submit">
                  Saving <RotateCw class="ml-2 size-4 animate-spin" />
                </Button>
              )}
            </Show>
          </CardFooter>
        </form>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Generate and manage API keys to authenticate your requests.
          </CardDescription>
        </CardHeader>
        <form action={createProjectAPIKey} method="post">
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <TextField class="flex items-center gap-2">
                <TextFieldInput
                  type="text"
                  value={
                    createAPIKey.result?.apiKey || "You may generate a new key."
                  }
                />
                <Button variant="outline" size="icon">
                  <Copy class="h-4 w-4" />
                  <span class="sr-only">Copy API key</span>
                </Button>
              </TextField>
              <span class="mt-3 leading-3 tracking-tighter text-sm font-mono text-red-400">
                Be sure to copy key, it will be shown once.
              </span>
              <input
                type="text"
                name="projectId"
                value={params.id}
                class="hidden"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Show
              when={createAPIKey.pending}
              fallback={<Button type="submit">Generate Key</Button>}
            >
              {(_) => (
                <Button disabled type="submit">
                  Generating ... <RotateCw class="ml-2 size-4 animate-spin" />
                </Button>
              )}
            </Show>
          </CardFooter>
        </form>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Team URL</CardTitle>
          <CardDescription>
            This is your team's URL namespace on the platform. Within it, your
            team can inspect their projects, check out any recent activity, or
            configure settings to their liking.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <TextField class="space-y-2">
            <TextFieldLabel for="teamUrl">URL</TextFieldLabel>
            <div class="flex">
              <div class="flex h-10 items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                app.example.com/
              </div>
              <TextFieldInput
                id="teamUrl"
                type="text"
                class="rounded-l-none"
                maxLength={48}
              />
            </div>
            <p class="text-sm text-muted-foreground">
              Please use 48 characters at maximum.
            </p>
          </TextField>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card> */}
    </div>
  );
}

export default function ProjectsDashboard() {
  const [page, setPage] = createSignal(1);
  const params = useParams<{ id: string }>();

  const getProjectStats = createAsync(() => projectStats());

  const getPaginatedReqs = createAsync(() =>
    listAllRequests({ projectId: params.id, page: page() })
  );

  return (
    <ErrorBoundary
      fallback={(err, reset) => <div>There is an error {err.message}</div>}
    >
      <div class="flex-1 overflow-auto p-4 space-y-4">
        <Tabs defaultValue="overview" class="space-y-4">
          <TabsList>
            <For each={["Overview", "Requests", "Endpoints", "Settings"]}>
              {(item) => (
                <TabsTrigger value={item.toLowerCase()} class="text-sm">
                  {item}
                </TabsTrigger>
              )}
            </For>
          </TabsList>
          <TabsContent value="overview" class="space-y-4">
            <div class="grid gap-4">
              <Card class="w-full max-w-3xl">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-lg font-bold">
                    Stats Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-2 gap-4">
                    <For each={getProjectStats()}>
                      {(stat, index) => (
                        <div class="flex items-center space-x-4 rounded-lg bg-neutral-300/50 p-4 transition-colors border hover:border-blue-400">
                          <div
                            class={`rounded-full bg-muted p-2 ${stat.color}`}
                          >
                            <Dynamic
                              component={statsIcons[stat.icon]}
                              class="h-6 w-6"
                            />
                          </div>
                          <div>
                            <p class="text-sm font-medium text-muted-foreground">
                              {stat.label}
                            </p>
                            <p class={`text-2xl font-bold ${stat.color}`}>
                              {stat.value}
                            </p>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" class="space-y-10">
            <div class="space-y-2">
              {issues.map((issue) => (
                <LargeRequestCard
                  id={issue.id}
                  error={issue.error}
                  system={issue.system}
                  request={issue.request}
                  timestamp={issue.timestamp}
                />
              ))}
            </div>

            <div>{JSON.stringify(getPaginatedReqs()?.records || [])}</div>

            <div class="flex justify-center">
              <Pagination
                count={getPaginatedReqs()?.count || 0}
                fixedItems
                itemComponent={(props) => (
                  <PaginationItem page={props.page}>
                    {props.page}
                  </PaginationItem>
                )}
                ellipsisComponent={() => <PaginationEllipsis />}
              >
                <PaginationPrevious
                  onClick={() => {
                    setPage(page() - 1);
                  }}
                />
                <PaginationItems />
                <PaginationNext
                  onClick={() => {
                    setPage(page() + 1);
                  }}
                />
              </Pagination>
            </div>
          </TabsContent>

          <TabsContent value="endpoints" class="space-y-2">
            {issues.map((issue) => (
              <SmallRequestCard
                id={issue.id}
                request={issue.request}
                response={issue.response}
                timestamp={issue.timestamp}
              />
            ))}
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
}
