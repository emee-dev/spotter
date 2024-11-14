import { createAsync, query, useParams, useSubmission } from "@solidjs/router";
import { Box, Copy, Radio, RotateCw } from "lucide-solid";
import {
  createEffect,
  createResource,
  createSignal,
  ErrorBoundary,
  For,
  on,
  Show,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import ErrorMessage from "~/components/error";
import {
  // EndpointCard,
  EndpointItem,
  // LargeRequestCard,
  Payload,
  RequestItem,
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
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
} from "~/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
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

// export default function ProjectsDashboard() {
//   const params = useParams<{ id: string }>();
//   const getProjectStats = createAsync(() => projectStats());

//   const [page, setPage] = createSignal(1);
//   const [endpointPage, setEndpointPage] = createSignal(1);

//   const [requests, setRequests] = createSignal<XataRequests[]>([]);
//   const [endpoints, setEndpoints] = createSignal<XataEndpoints[]>([]);

//   const [count, setCount] = createSignal<number>(0);
//   const [endpointCount, setEndpointCount] = createSignal<number>(0);
//   const pageSize = 6;
//   const getPaginatedReqs = createAsync(() =>
//     listAllRequests({ projectId: params.id, page: page(), pageSize })
//   );

//   const getPaginatedEndpoints = createAsync(() =>
//     listAllEndpoints({
//       projectId: params.id,
//       page: endpointPage(),
//       pageSize,
//     })
//   );

//   const totalRequestPages = () => Math.ceil(count() / pageSize);
//   const totalEndpointPages = () => Math.ceil(endpointCount() / pageSize);

//   createEffect(
//     on(getPaginatedReqs, (reqs) => {
//       if (reqs && reqs.records) {
//         setCount(reqs.count);
//         setRequests(reqs.records as XataRequests[]);
//       }
//     })
//   );

//   createEffect(
//     on(getPaginatedEndpoints, (endpoints) => {
//       if (endpoints && endpoints.records) {
//         setEndpointCount(endpoints.count);
//         setEndpoints(endpoints.records as XataEndpoints[]);
//       }
//     })
//   );

//   return (
//     <ErrorBoundary fallback={(err, reset) => <ErrorMessage />}>
//       <div class="flex-1 overflow-auto p-4 space-y-4">
//         <Tabs defaultValue="overview" class="space-y-4">
//           <TabsList>
//             <For each={["Overview", "Requests", "Endpoints", "Settings"]}>
//               {(item) => (
//                 <TabsTrigger
//                   value={item.toLowerCase()}
//                   class="text-sm"
//                   onClick={() => {
//                     if (item === "Requests") {
//                       console.log("requests", requests());
//                     }

//                     if (item === "Endpoints") {
//                       console.log("endpoints", endpoints());
//                     }
//                   }}
//                 >
//                   {item}
//                 </TabsTrigger>
//               )}
//             </For>
//           </TabsList>
//           <TabsContent value="overview" class="space-y-4">
//             <div class="grid gap-4">
//               <Card class="w-full max-w-3xl">
//                 <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle class="text-lg font-bold">
//                     Stats Overview
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <For each={getProjectStats()}>
//                       {(stat, index) => (
//                         <div class="flex items-center space-x-4 rounded-lg bg-neutral-300/50 p-4 transition-colors border hover:border-blue-400">
//                           <div
//                             class={`rounded-full bg-muted p-2 ${stat.color}`}
//                           >
//                             <Dynamic
//                               component={statsIcons[stat.icon]}
//                               class="h-6 w-6"
//                             />
//                           </div>
//                           <div>
//                             <p class="text-sm font-medium text-muted-foreground">
//                               {stat.label}
//                             </p>
//                             <p class={`text-2xl font-bold ${stat.color}`}>
//                               {stat.value}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </For>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="requests" class="">
//             <div class="space-y-2">
//               <For each={requests()}>
//                 {(issue) => (
//                   <LargeRequestCard
//                     id={issue.xata_id}
//                     error={issue.error}
//                     system={issue.system}
//                     request={issue.request}
//                     xata_createdat={issue.xata_createdat}
//                   />
//                 )}
//               </For>
//             </div>

//             <div class="flex mt-auto justify-center">
//               <Pagination
//                 count={totalRequestPages()}
//                 fixedItems
//                 itemComponent={(props) => (
//                   <PaginationItem
//                     page={props.page}
//                     onClick={() => setPage(props.page)}
//                   >
//                     {props.page}
//                   </PaginationItem>
//                 )}
//                 ellipsisComponent={() => <PaginationEllipsis />}
//               >
//                 <PaginationItems />
//               </Pagination>
//             </div>
//           </TabsContent>

//           <TabsContent value="endpoints" class="space-y-10">
//             <div class="space-y-2">
//               <For each={endpoints()}>
//                 {(issue) => (
//                   <EndpointCard
//                     id={issue.xata_id}
//                     requestUrl={issue.requestUrl}
//                     xata_createdat={issue.xata_createdat}
//                   />
//                 )}
//               </For>
//             </div>

//             <div class="flex mt-auto justify-center">
//               <Pagination
//                 count={totalEndpointPages()}
//                 fixedItems
//                 itemComponent={(props) => (
//                   <PaginationItem
//                     page={props.page}
//                     onClick={() => setEndpointPage(props.page)}
//                   >
//                     {props.page}
//                   </PaginationItem>
//                 )}
//                 ellipsisComponent={() => <PaginationEllipsis />}
//               >
//                 <PaginationItems />
//               </Pagination>
//             </div>
//           </TabsContent>

//           <TabsContent value="settings">
//             <SettingsTabContent />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </ErrorBoundary>
//   );
// }
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

  const reqArgs = () => ({
    projectId: params.id,
    page: page(),
    pageSize,
  });

  const endpointArgs = () => ({
    projectId: params.id,
    page: endpointPage(),
    pageSize,
  });

  const [getPaginatedReqs] = createResource(reqArgs, listAllRequests);

  const [getPaginatedEndpoints] = createResource(
    endpointArgs,
    listAllEndpoints
  );
  // const getPaginatedEndpoints = createAsync(() =>
  //   listAllEndpoints({
  //     projectId: params.id,
  //     page: endpointPage(),
  //     pageSize,
  //   })
  // );

  const totalRequestPages = () => Math.ceil(count() / pageSize);
  const totalEndpointPages = () => Math.ceil(endpointCount() / pageSize);

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
    <ErrorBoundary fallback={(err, reset) => <ErrorMessage />}>
      <div class="flex-1 overflow-auto p-4 space-y-4">
        <Tabs defaultValue="requests" class="space-y-4">
          <TabsList>
            <For each={["Overview", "Requests", "Endpoints", "Settings"]}>
              {(item) => (
                <TabsTrigger
                  value={item.toLowerCase()}
                  class="text-sm"
                  onClick={() => {
                    if (item === "Requests") {
                      console.log("requests", requests());
                    }

                    if (item === "Endpoints") {
                      console.log("endpoints", endpoints());
                    }
                  }}
                >
                  {item}
                </TabsTrigger>
              )}
            </For>
          </TabsList>
          {/* <TabsContent value="overview" class="space-y-4">
            <div class="grid gap-4">
              <Card class="w-full max-w-3xl">
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
            </div>
          </TabsContent> */}

          <TabsContent value="requests" class="">
            {/* {getPaginatedReqs.loading ? "Loading req" : "Done"} */}

            {
              <div class="space-y-2">
                <Show
                  when={!getPaginatedReqs.loading}
                  fallback={<div>Loading requests</div>}
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
            }

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
              <For each={endpoints()}>
                {(issue) => (
                  // <EndpointCard
                  //   id={issue.xata_id}
                  //   requestUrl={issue.requestUrl}
                  //   xata_createdat={issue.xata_createdat}
                  // />
                  <EndpointItem
                    id={issue.xata_id}
                    requestUrl={issue.requestUrl}
                    xata_createdat={issue.xata_createdat}
                  />
                )}
              </For>
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

          {/* <TabsContent value="settings">
            <SettingsTabContent />
          </TabsContent> */}
        </Tabs>
      </div>
    </ErrorBoundary>
  );
}
