import {
  AlertTriangle,
  Check,
  CheckCircle,
  Clock,
  Copy,
  Globe,
  HardDrive,
  Share2,
  XCircle,
} from "lucide-solid";
import { For, onMount, Show } from "solid-js";
import { Payload } from "~/components/request-cards";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Choose a style or customize

/* 

import prettier from "prettier/standalone";
import "prettier/parser-babel";
// JS script, should be run after <script> tags load
const formatted = prettier.format("console.log( 'ok')", {
  parser: "babel",
  plugins: prettierPlugins,
});
console.log(formatted);
<!-- HTML -->
<script src="https://unpkg.com/prettier@2.6.2/standalone.js"></script>
<script src="https://unpkg.com/prettier@2.6.2/parser-babel.js"></script>
*/

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

const Component = () => {
  const issue = {
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
      method: "POST",
      url: "/projects/direct/backend/releases/v7210",
      params: { projectId: "404" },
      query: { search: "true" },
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: "Bearer some_token_here",
      },
    },
    // response: null,
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
  };

  onMount(() => {});

  function getStatusIcon(status: number) {
    if (status >= 200 && status < 300) {
      return <CheckCircle class="size-4  text-emerald-400" />;
    }
    if (status >= 400 && status < 500) {
      return <AlertTriangle class="size-4  text-amber-400" />;
    }
    return <XCircle class="size-4  text-red-400" />;
  }

  function getMethodColor(method: string) {
    const methodColors = {
      GET: "text-blue-500 bg-blue-100",
      POST: "text-green-500 bg-green-100",
      PUT: "text-yellow-500 bg-yellow-100",
      DELETE: "text-red-500 bg-red-100",
      PATCH: "text-purple-500 bg-purple-100",
      OPTIONS: "text-gray-500 bg-gray-100",
      HEAD: "text-pink-500 bg-pink-100",
    };

    return methodColors[method as keyof typeof methodColors];
  }

  function getStatusColor(status: number) {
    if (status >= 200 && status < 300) {
      return "text-green-500 bg-green-100"; // Success
    } else if (status >= 300 && status < 400) {
      return "text-yellow-500 bg-yellow-100"; // Redirect
    } else if (status >= 400 && status < 500) {
      return "text-red-500 bg-red-100"; // Client Error
    } else if (status >= 500 && status < 600) {
      return "text-orange-500 bg-orange-100"; // Server Error
    } else {
      return "text-gray-500 bg-gray-100"; // Unknown or Other Status
    }
  }

  return (
    <div class="p-6 space-y-6 overflow-scroll">
      {/* Header Section */}
      <div class="flex items-start justify-between">
        <div class="space-y-1">
          <h1 class="text-2xl font-bold tracking-tight">Request Details</h1>
          <p class="text-sm text-muted-foreground">
            ID: {issue.id} • {new Date(issue.timestamp).toLocaleString()}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Share2 class="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Overview Cards */}
      <div class="grid gap-4 md:grid-cols-2 [&>*:hover]:shadow-md shadow-blue-50">
        <Card class="shadow-md shadow-blue-50">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Request Method</CardTitle>
            <Globe class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2">
              <Badge
                class={getMethodColor(issue.request.method)}
                variant={"default"}
              >
                {issue.request.method}
              </Badge>
              <span class="text-sm text-muted-foreground">
                {issue.request.url}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Response Status</CardTitle>
            {getStatusIcon(issue.response.status)}
          </CardHeader>
          <CardContent>
            <Show
              when={issue.response}
              fallback={
                <div class="min-h-[25px] flex flex-col justify-center">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <span class="w-full border-t" />
                    </div>
                    <div class="relative flex justify-center text-xs uppercase">
                      <span class="bg-background px-2 text-muted-foreground">
                        incomplete request
                      </span>
                    </div>
                  </div>
                </div>
              }
            >
              {(response) => (
                <div class="flex items-center gap-2">
                  <Badge
                    class={getStatusColor(issue.response.status)}
                    variant={"default"}
                  >
                    {response().status}
                  </Badge>
                  {issue.error && (
                    <span class="text-sm text-muted-foreground">
                      {issue.error.message}
                    </span>
                  )}
                </div>
              )}
            </Show>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">System Info</CardTitle>
            <HardDrive class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="flex items-center gap-2">
              <Badge variant={"outline"}>{issue.system.platform}</Badge>
              <span class="text-sm text-muted-foreground">
                {issue.system.ip}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request */}
      <Card class="hover:shadow-md shadow-blue-50">
        <CardContent class="p-0">
          <div class="w-full">
            <div class="w-full justify-start rounded-none border-b bg-transparent p-0">
              <p class="text-sm p-3 font-semibold rounded-none ">
                Request details
              </p>
            </div>
            <div class=" min-h-fit ">
              <Tabs defaultValue="params" class="pt-2">
                <TabsList class="w-full justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent p-0">
                  <For each={["Params", "Query", "Error", "Stacktrace"]}>
                    {(item) => (
                      <TabsTrigger
                        value={item.toLowerCase()}
                        class="data-[selected]:border-b-2 border-blue-400 rounded-none"
                      >
                        {item}
                      </TabsTrigger>
                    )}
                  </For>
                </TabsList>

                <TabsContent value="params" class="m-0 min-h-fit p-4">
                  <div class="w-full relative h-full">
                    <Button
                      variant="outline"
                      size="icon"
                      class="absolute top-2 right-2 h-8 w-8"
                      aria-label="Copy code to clipboard"
                    >
                      {true ? (
                        <Check class="h-4 w-4" />
                      ) : (
                        <Copy class="h-4 w-4" />
                      )}
                    </Button>
                    <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                      <code class="text-xs sm:text-sm md:text-base font-mono">
                        {JSON.stringify(issue.request.params, null, 3)}
                      </code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="query" class="m-0 min-h-fit p-4">
                  <div class="w-full relative h-full">
                    <Button
                      variant="outline"
                      size="icon"
                      class="absolute top-2 right-2 h-8 w-8"
                      aria-label="Copy code to clipboard"
                    >
                      {true ? (
                        <Check class="h-4 w-4" />
                      ) : (
                        <Copy class="h-4 w-4" />
                      )}
                    </Button>
                    <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                      <code class="text-xs sm:text-sm md:text-base font-mono">
                        {JSON.stringify(issue.request.params, null, 3)}
                      </code>
                    </pre>
                  </div>
                </TabsContent>

                <Show
                  when={issue.error}
                  fallback={
                    <TabsContent value="error" class="m-0 p-4">
                      <div class="min-h-[90px] flex flex-col justify-center">
                        <div class="relative">
                          <div class="absolute inset-0 flex items-center">
                            <span class="w-full border-t" />
                          </div>
                          <div class="relative flex justify-center text-xs uppercase">
                            <span class="bg-background px-2 text-muted-foreground">
                              no error was found
                            </span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  }
                >
                  {(issue) => (
                    <TabsContent value="error" class="m-0 p-4">
                      <div class="space-y-4 border rounded-lg">
                        <div class="p-4">
                          <div class="mb-2 font-medium text-destructive">
                            {issue().name}
                          </div>
                          <p class="mb-4 text-sm text-muted-foreground">
                            {issue().message}
                          </p>
                          <div class="text-sm">
                            <div>File: {issue().file}</div>
                            <div>Line: {issue().line}</div>
                            <div>Column: {issue().column}</div>
                            <div>Function: {issue().function}</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                </Show>

                <Show
                  when={issue.stack}
                  fallback={
                    <TabsContent value="stack" class="m-0 p-4">
                      <div class="min-h-[90px] flex flex-col justify-center">
                        <div class="relative">
                          <div class="absolute inset-0 flex items-center">
                            <span class="w-full border-t" />
                          </div>
                          <div class="relative flex justify-center text-xs uppercase">
                            <span class="bg-background px-2 text-muted-foreground">
                              no stack was found
                            </span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  }
                >
                  {(stack) => (
                    <TabsContent value="stack" class="m-0">
                      <div class="space-y-2">
                        <For each={stack()}>
                          {(stack) => (
                            <div class="flex items-start border-t gap-2 p-4">
                              <div class="flex size-8 items-center justify-center rounded-full bg-muted">
                                <Clock class="h-4 w-4" />
                              </div>
                              <div class="space-y-1">
                                {stack.method && (
                                  <div class="mt-2 flex items-center">
                                    <Badge
                                      variant="outline"
                                      class="bg-blue-200"
                                    >
                                      {stack.method}
                                    </Badge>
                                  </div>
                                )}
                                <p class="text-sm font-medium">
                                  {stack.function}
                                </p>
                                <p class="text-sm text-muted-foreground">
                                  {stack.file}:{stack.line}:{stack.column}
                                </p>
                              </div>
                            </div>
                          )}
                        </For>
                      </div>
                    </TabsContent>
                  )}
                </Show>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response */}
      <Card class="hover:shadow-md shadow-blue-50">
        <CardContent class="p-0">
          <div class="w-full">
            <div class="w-full justify-start rounded-none border-b bg-transparent p-0">
              <p class="text-sm p-3 font-semibold rounded-none ">
                Response details
              </p>
            </div>
            <div class="min-h-fit">
              <Show
                when={issue.response}
                fallback={
                  <div class="pt-2 flex flex-col justify-center min-h-[90px]">
                    <div class="relative">
                      <div class="absolute inset-0 flex items-center">
                        <span class="w-full border-t" />
                      </div>
                      <div class="relative flex justify-center text-xs uppercase">
                        <span class="bg-background px-2 text-muted-foreground">
                          application runtime error
                        </span>
                      </div>
                    </div>
                  </div>
                }
              >
                {(response) => (
                  <Tabs defaultValue="params" class="pt-2">
                    <TabsList class="w-full justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent p-0">
                      <For each={["Params", "Headers"]}>
                        {(item) => (
                          <TabsTrigger
                            value={item.toLowerCase()}
                            class="data-[selected]:border-b-2 border-blue-400 rounded-none"
                          >
                            {item}
                          </TabsTrigger>
                        )}
                      </For>
                    </TabsList>

                    <TabsContent value="params" class="m-0 min-h-fit p-4">
                      <div class="w-full relative h-full">
                        <Button
                          variant="outline"
                          size="icon"
                          class="absolute top-2 right-2 h-8 w-8"
                          aria-label="Copy code to clipboard"
                        >
                          {true ? (
                            <Check class="h-4 w-4" />
                          ) : (
                            <Copy class="h-4 w-4" />
                          )}
                        </Button>
                        <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                          <code class="text-xs sm:text-sm md:text-base font-mono">
                            {JSON.stringify(response().params, null, 3)}
                          </code>
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="headers" class="m-0 min-h-fit p-4">
                      <div class="w-full relative h-full">
                        <Button
                          variant="outline"
                          size="icon"
                          class="absolute top-2 right-2 h-8 w-8"
                          aria-label="Copy code to clipboard"
                        >
                          {true ? (
                            <Check class="h-4 w-4" />
                          ) : (
                            <Copy class="h-4 w-4" />
                          )}
                        </Button>
                        <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                          <code class="text-xs sm:text-sm md:text-base font-mono">
                            {JSON.stringify(response().headers, null, 3)}
                          </code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </Show>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schema */}
      <Card class="hover:shadow-md shadow-blue-50">
        <CardContent class="p-0">
          <div class="w-full">
            <div class="w-full justify-start rounded-none border-b bg-transparent p-0">
              <p class="text-sm p-3 font-semibold rounded-none ">
                Schema details
              </p>
            </div>
            <div class="min-h-fit">
              <Show
                when={issue}
                fallback={
                  <div class="pt-2 flex flex-col justify-center min-h-[90px]">
                    <div class="relative">
                      <div class="absolute inset-0 flex items-center">
                        <span class="w-full border-t" />
                      </div>
                      <div class="relative flex justify-center text-xs uppercase">
                        <span class="bg-background px-2 text-muted-foreground">
                          application runtime error
                        </span>
                      </div>
                    </div>
                  </div>
                }
              >
                {(issue) => (
                  <Tabs defaultValue="params" class="pt-2">
                    <TabsList class="w-full justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent p-0">
                      <For each={["Request", "Response"]}>
                        {(item) => (
                          <TabsTrigger
                            value={item.toLowerCase()}
                            class="data-[selected]:border-b-2 border-blue-400 rounded-none"
                          >
                            {item}
                          </TabsTrigger>
                        )}
                      </For>
                    </TabsList>

                    <TabsContent value="request" class="m-0 min-h-fit p-4">
                      <div class="w-full relative h-full">
                        <Button
                          variant="outline"
                          size="icon"
                          class="absolute top-2 right-2 h-8 w-8"
                          aria-label="Copy code to clipboard"
                        >
                          {true ? (
                            <Check class="h-4 w-4" />
                          ) : (
                            <Copy class="h-4 w-4" />
                          )}
                        </Button>
                        <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                          <code class="text-xs sm:text-sm md:text-base font-mono">
                            {JSON.stringify(issue().request, null, 3)}
                          </code>
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="response" class="m-0 min-h-fit p-4">
                      <div class="w-full relative h-full">
                        <Button
                          variant="outline"
                          size="icon"
                          class="absolute top-2 right-2 h-8 w-8"
                          aria-label="Copy code to clipboard"
                        >
                          {true ? (
                            <Check class="h-4 w-4" />
                          ) : (
                            <Copy class="h-4 w-4" />
                          )}
                        </Button>
                        <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                          <code class="text-xs sm:text-sm md:text-base font-mono">
                            {JSON.stringify(issue().response, null, 3)}
                          </code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </Show>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Component;
