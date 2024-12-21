import {
  createAsync,
  query,
  revalidate,
  useParams,
  useSubmission,
} from "@solidjs/router";
import { Box, Copy, Loader, Radio } from "lucide-solid";
import {
  createEffect,
  createResource,
  createSignal,
  ErrorBoundary,
  For,
  on,
  Show,
  Suspense,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import CodeBlock from "~/components/code-block";
import ErrorMessage from "~/components/error";
import { SpinnerLoader } from "~/components/loaders";
import { EndpointItem, Payload, RequestItem } from "~/components/request-cards";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
} from "~/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { createCopy } from "~/hooks";
import {
  getProjectStatsById,
  listAllEndpoints,
  listAllRequests,
} from "~/lib/db";
import { createProjectAPIKey } from "~/lib/db/action";

type XataRequests = {
  error: Payload["error"];
  projectId: string;
  xata_id: string;
  xata_version: number;
  xata_createdat: Date;
  xata_updatedat: Date;
  stack: Payload["stack"];
  request: Payload["request"];
  response: Payload["response"];
  system: Payload["system"];
  requestSchema?: string | null;
  responseSchema?: string | null;
  timestamp: Date;
};

type XataEndpoints = {
  xata_id: string;
  xata_version: number;
  xata_createdat: Date;
  xata_updatedat: Date;
  projectId: string;
  requestUrl: string;
};

const statsIcons = {
  Box: Box,
  Radio: Radio,
};

const projectStats = query(async () => {
  // revalidate(projectStats.key);
  const params = useParams<{ id: string }>();

  const data = await getProjectStatsById({ projectId: params.id });

  return data;
}, "projectStats");

export const route = {
  preload: () => {
    projectStats();
  },
};

function SettingsTabContent() {
  const params = useParams<{ id: string }>();
  const createAPIKey = useSubmission(createProjectAPIKey);

  return (
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Generate API keys to authenticate your requests.
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

            <Show when={createAPIKey.error as Error}>
              {(error) => (
                <div class="text-sm leading-3 tracking-tight text-red-400">
                  {error().message}
                </div>
              )}
            </Show>
          </CardContent>
          <CardFooter>
            <Show
              when={createAPIKey.pending}
              fallback={<Button type="submit">Generate Key</Button>}
            >
              {(_) => (
                <Button disabled type="submit">
                  Generating ... <Loader class="ml-2 size-4 animate-spin" />
                </Button>
              )}
            </Show>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

const code = `
// Initialize SDK in src/app.tsx
import { Spotter } from "@spotter.dev/solidstart";

Spotter.init({
  apikey: process.env.SPOTTER_API_KEY,
  projectId: process.env.SPOTTER_PROJECT_ID,
});


// Set up API handler in api/index.ts
import type { APIEvent } from "@solidjs/start/server";
import { withSpotter } from "@spotter.dev/solidstart";

export const GET = withSpotter(async (event: APIEvent) => {
  console.log("Server root is good.");
  return Response.json({ message: "Hello" });
});

`;

export default function ProjectsDashboard() {
  const params = useParams<{ id: string }>();
  const getProjectStats = createAsync(() => projectStats());

  const [page, setPage] = createSignal(1);
  const [endpointPage, setEndpointPage] = createSignal(1);

  const [requests, setRequests] = createSignal<XataRequests[]>([]);
  const [endpoints, setEndpoints] = createSignal<XataEndpoints[]>([]);

  const [count, setCount] = createSignal<number>(0);
  const [endpointCount, setEndpointCount] = createSignal<number>(0);
  const pageSize = 6;

  const requestArgs = () => ({
    projectId: params.id,
    page: page(),
    pageSize,
  });

  const endpointArgs = () => ({
    projectId: params.id,
    page: endpointPage(),
    pageSize,
  });

  const [getPaginatedReqs] = createResource(requestArgs, listAllRequests);

  const [getPaginatedEndpoints] = createResource(
    endpointArgs,
    listAllEndpoints
  );

  const totalRequestPages = () => Math.ceil(count() / pageSize);
  const totalEndpointPages = () => Math.ceil(endpointCount() / pageSize);
  const [_, setCopyValue] = createCopy();

  createEffect(
    on(getPaginatedReqs, (reqs) => {
      if (reqs && reqs.records) {
        setCount(reqs.count);
        setRequests(reqs.records as XataRequests[]);
      }
    })
  );

  createEffect(
    on(getPaginatedEndpoints, (endpoints) => {
      if (endpoints && endpoints.records) {
        setEndpointCount(endpoints.count);
        setEndpoints(endpoints.records as XataEndpoints[]);
      }
    })
  );

  return (
    // <ErrorBoundary fallback={(err, reset) => <ErrorMessage />}>
    <ErrorBoundary fallback={(err, reset) => <>{err.message}</>}>
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
              <Card class="w-full">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-lg font-bold">
                    Stats Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Card class="w-full  ">
                <CardHeader class="flex space-y-0 pb-2">
                  <CardTitle class="text-lg font-semibold">Usage</CardTitle>
                  <CardDescription class="text-base">
                    follow the instructions below to use the tool.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="w-full relative h-full">
                    <Button
                      variant="outline"
                      size="icon"
                      class="absolute top-2 right-2 size-7"
                      onClick={() => {
                        setCopyValue(code);
                      }}
                    >
                      <Copy class="size-4" />
                    </Button>
                    <Suspense fallback={<div>Loading</div>}>
                      <CodeBlock
                        code={code}
                        lang="javascript"
                        // class="[&>*]:overflow-scroll sm:[&>*]:overflow-auto"
                      />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" class="">
            <div class="space-y-2">
              <Show
                when={!getPaginatedReqs.loading}
                fallback={<SpinnerLoader />}
              >
                <For each={requests()}>
                  {(issue) => (
                    <RequestItem
                      id={issue.xata_id}
                      error={issue.error}
                      system={issue.system}
                      request={issue.request}
                      xata_createdat={issue.xata_createdat}
                    />
                  )}
                </For>
              </Show>
            </div>

            <div class="flex mt-auto justify-center">
              <Pagination
                count={totalRequestPages()}
                fixedItems
                itemComponent={(props) => (
                  <PaginationItem
                    page={props.page}
                    onClick={() => {
                      console.log("Page", props.page);
                      setPage(props.page);
                    }}
                  >
                    {props.page}
                  </PaginationItem>
                )}
                ellipsisComponent={() => <PaginationEllipsis />}
              >
                <PaginationItems />
              </Pagination>
            </div>
          </TabsContent>

          <TabsContent value="endpoints" class="space-y-10">
            <div class="space-y-2">
              <Show
                when={!getPaginatedEndpoints.loading}
                fallback={<SpinnerLoader />}
              >
                <For each={endpoints()}>
                  {(issue) => (
                    <EndpointItem
                      id={issue.xata_id}
                      requestUrl={issue.requestUrl}
                      xata_createdat={issue.xata_createdat}
                    />
                  )}
                </For>
              </Show>
            </div>

            <div class="flex mt-auto justify-center">
              <Pagination
                count={totalEndpointPages()}
                fixedItems
                itemComponent={(props) => (
                  <PaginationItem
                    page={props.page}
                    onClick={() => setEndpointPage(props.page)}
                  >
                    {props.page}
                  </PaginationItem>
                )}
                ellipsisComponent={() => <PaginationEllipsis />}
              >
                <PaginationItems />
              </Pagination>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
}
