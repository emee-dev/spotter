import { createAsync, query, revalidate, useParams } from "@solidjs/router";
import { AlertCircle, Clock, Copy, Server, Share2 } from "lucide-solid";
import { ErrorBoundary, For, Show, Suspense } from "solid-js";
import CodeBlock from "~/components/code-block";
import { SpinnerLoader } from "~/components/loaders";
import { Payload } from "~/components/request-cards";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"; // Choose a style or customize
import { createCopy } from "~/hooks";
import { getRequestById } from "~/lib/db";

type XataRequestInfo = {
  xata_id: string;
  xata_version: number;
  xata_createdat: Date;
  xata_updatedat: Date;
  error: Payload["error"];
  stack: Payload["stack"];
  request: Payload["request"];
  response: Payload["response"];
  system: Payload["system"];
  projectId: string;
  timestamp: Date;
  requestSchema?: string | null;
  responseSchema?: string | null;
};

const getRequestInfo = query(async () => {
  // NOTE: this helps remove any sort of redundant cache error
  revalidate(getRequestInfo.key);

  const params = useParams<{ id: string }>();

  const data = await getRequestById({ xata_id: params.id });

  if (!data) {
    throw new Error("Unable to retrieve any data.");
  }

  return data as XataRequestInfo;
}, "getRequestInfo");

export const route = {
  preload: () => {
    getRequestInfo();
  },
};

type StatusResponse = {
  message: string;
  colorClass: string;
};

function getStatusMessage(status: number): StatusResponse {
  if (status >= 200 && status < 300) {
    return { message: "SUCCESS", colorClass: "text-green-500" };
  } else if (status >= 400 && status < 500) {
    if (status === 400) {
      return { message: "BAD REQUEST", colorClass: "text-yellow-500" };
    } else if (status === 401) {
      return { message: "UNAUTHORIZED", colorClass: "text-red-500" };
    } else if (status === 403) {
      return { message: "FORBIDDEN", colorClass: "text-red-600" };
    } else if (status === 404) {
      return { message: "NOT FOUND", colorClass: "text-orange-500" };
    } else {
      return { message: "CLIENT ERROR", colorClass: "text-yellow-600" };
    }
  } else if (status >= 500 && status < 600) {
    if (status === 500) {
      return { message: "SERVER ERROR", colorClass: "text-purple-500" };
    } else if (status === 503) {
      return { message: "SERVICE UNAVAILABLE", colorClass: "text-purple-600" };
    } else {
      return { message: "SERVER ERROR", colorClass: "text-purple-700" };
    }
  } else {
    return { message: "UNKNOWN STATUS", colorClass: "text-gray-500" };
  }
}

export default function Component() {
  const getIssue = createAsync(() => getRequestInfo(), { deferStream: true });
  const [_, setCopyValue] = createCopy();

  return (
    <ErrorBoundary
      fallback={(err, reset) => <ErrorMessage err={err} reset={reset} />}
    >
      <Suspense fallback={<SpinnerLoader />}>
        <Show when={getIssue()} fallback={<div>Request is invalid</div>}>
          {(issue) => (
            <div class="p-3 font-inter overflow-y-scroll h-full">
              <Card class="h-full">
                <CardHeader class="flex flex-row items-center justify-between pb-2">
                  <div class="">
                    <CardTitle class="text-sm font-medium">
                      Request Details
                    </CardTitle>
                  </div>
                  <div class="flex items-center gap-2">
                    <Button variant="ghost" size="icon" class="h-8 w-8">
                      <Share2 class="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" class="h-8 w-8">
                      <Server class="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent class="h-fit">
                  <div class="space-y-4">
                    <div class=" flex font-mono items-center space-x-2">
                      <div class="text-sm ">Id:</div>
                      <div class="text-sm">
                        {issue().xata_id || "bCyU3yd2WzDspsyfRqtdG"}
                      </div>
                    </div>
                    <div class="flex flex-col space-y-2 md:grid md:grid-cols-2">
                      <div class="space-y-1">
                        <div class="text-sm text-muted-foreground">
                          Request Method
                        </div>
                        <div class="flex items-center gap-2">
                          <Badge variant="secondary">
                            {issue()?.request?.method}
                          </Badge>
                          <span class="font-mono text-sm">
                            {issue()?.request?.url}
                          </span>
                        </div>
                      </div>

                      <Show
                        when={issue().response}
                        fallback={
                          <div class="space-y-1">
                            <div class="text-sm text-muted-foreground">
                              Response Status
                            </div>
                            <div
                              class={`flex items-center gap-2 text-destructive`}
                            >
                              <AlertCircle class="h-4 w-4" />
                              <span class="text-sm uppercase">
                                incomplete request
                              </span>
                            </div>
                          </div>
                        }
                      >
                        {(response) => {
                          const format = getStatusMessage(response().status);
                          return (
                            <div class="space-y-1">
                              <div class="text-sm text-muted-foreground">
                                Response Status
                              </div>
                              <div
                                class={`flex items-center gap-2 ${format.colorClass}`}
                              >
                                <AlertCircle class="h-4 w-4" />
                                <span class="text-sm">{format.message}</span>
                              </div>
                            </div>
                          );
                        }}
                      </Show>
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm text-muted-foreground">
                        System Info
                      </div>
                      <div class="flex items-center gap-2">
                        <Badge variant="outline">
                          {issue().system.platform || "macOS"}
                        </Badge>
                        <span class="font-mono text-sm">
                          {issue().system.ip || "192.168.1.1"}
                        </span>
                      </div>
                    </div>

                    {/* Request payload */}
                    <div class="space-y-1 mt-3 font-mono">
                      <div class="text-sm text-muted-foreground">
                        Request Payload
                      </div>
                      <Tabs defaultValue="params" class="">
                        <TabsList class=" justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent transition-all p-0">
                          <For
                            each={[
                              "req:Params",
                              "req:Query",
                              "req:Error",
                              "req:Stacktrace",
                            ]}
                          >
                            {(item) => (
                              <TabsTrigger
                                value={item.toLowerCase()}
                                class="data-[selected]:border-b-2 border-blue-400 rounded-none"
                              >
                                {item.replace("req:", "")}
                              </TabsTrigger>
                            )}
                          </For>
                        </TabsList>
                        <TabsContent value="req:params" class="mt-2">
                          <div class="w-full relative h-full">
                            <Button
                              variant="outline"
                              size="icon"
                              class="absolute top-2 right-2 size-7"
                              onClick={() => {
                                setCopyValue(
                                  JSON.stringify(
                                    issue().request.params,
                                    null,
                                    3
                                  )
                                );
                              }}
                            >
                              <Copy class="size-4" />
                            </Button>
                            <Suspense fallback={<div>Loading</div>}>
                              <CodeBlock
                                code={JSON.stringify(
                                  issue().request.params,
                                  null,
                                  3
                                )}
                                lang="json"
                              />
                            </Suspense>
                          </div>
                        </TabsContent>
                        <TabsContent value="req:query" class="mt-2">
                          <div class="w-full relative h-full text-sm font-geistmono">
                            <Button
                              variant="outline"
                              size="icon"
                              class="absolute top-2 right-2 size-7"
                              onClick={() => {
                                setCopyValue(
                                  JSON.stringify(issue().request.query, null, 3)
                                );
                              }}
                            >
                              <Copy class="size-4" />
                            </Button>

                            <Suspense fallback={<div>Loading</div>}>
                              <CodeBlock
                                code={JSON.stringify(
                                  issue().request.query,
                                  null,
                                  3
                                )}
                                lang="json"
                              />
                            </Suspense>
                          </div>
                        </TabsContent>
                        <TabsContent value="req:error" class="mt-2">
                          <div class="w-full relative h-full">
                            <Button
                              variant="outline"
                              size="icon"
                              class="absolute top-2 right-2 size-7"
                              onClick={() => {
                                setCopyValue(
                                  JSON.stringify(issue().error, null, 3)
                                );
                              }}
                            >
                              <Copy class="size-4" />
                            </Button>
                            <Suspense fallback={<div>Loading</div>}>
                              <CodeBlock
                                code={JSON.stringify(issue().error, null, 3)}
                                lang="json"
                              />
                            </Suspense>
                          </div>
                        </TabsContent>
                        <TabsContent value="req:stacktrace" class="mt-2">
                          <Show
                            when={issue().stack}
                            fallback={
                              <div class="min-h-[25px] flex flex-col justify-center">
                                <div class="relative">
                                  <div class="absolute inset-0 flex items-center">
                                    <span class="w-full border-t" />
                                  </div>
                                  <div class="relative flex justify-center uppercase">
                                    <span class="bg-background px-2 text-sm text-muted-foreground">
                                      incomplete request no response
                                    </span>
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            {(stack) => (
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
                                          {stack.file}:{stack.line}:
                                          {stack.column}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </For>
                              </div>
                            )}
                          </Show>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Response payload */}
                    <div class="space-y-1 mt-3 font-mono">
                      <div class="text-sm text-muted-foreground">
                        Response Payload
                      </div>
                      <Tabs defaultValue="params" class="">
                        <TabsList class=" justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent transition-all p-0">
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
                        <TabsContent value="params" class="mt-2">
                          <div class="w-full relative h-full">
                            <Button
                              variant="outline"
                              size="icon"
                              class="absolute top-2 right-2 size-7"
                              onClick={() => {
                                setCopyValue(
                                  JSON.stringify(
                                    issue().response?.params || {},
                                    null,
                                    3
                                  )
                                );
                              }}
                            >
                              <Copy class="size-4" />
                            </Button>
                            <Suspense fallback={<div>Loading</div>}>
                              <CodeBlock
                                code={JSON.stringify(
                                  issue().response?.params || {},
                                  null,
                                  3
                                )}
                                lang="json"
                              />
                            </Suspense>
                          </div>
                        </TabsContent>
                        <TabsContent value="headers" class="mt-2">
                          <div class="w-full relative h-full">
                            <Button
                              variant="outline"
                              size="icon"
                              class="absolute top-2 right-2 size-7"
                              onClick={() => {
                                setCopyValue(
                                  JSON.stringify(
                                    issue().response?.headers || {},
                                    null,
                                    3
                                  )
                                );
                              }}
                            >
                              <Copy class="size-4" />
                            </Button>
                            <Suspense fallback={<div>Loading</div>}>
                              <CodeBlock
                                code={JSON.stringify(
                                  issue().response?.headers || {},
                                  null,
                                  3
                                )}
                                lang="json"
                              />
                            </Suspense>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schema Payload */}
              <Card class="mt-3 pt-3 font-mono">
                <CardContent class="p-5">
                  <div class="">
                    <div class="text-sm text-muted-foreground">Schema</div>
                    <Tabs defaultValue="request" class="">
                      <TabsList class="justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent transition-all p-0">
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
                      <TabsContent value="request" class="mt-2">
                        {
                          <Show
                            when={issue()?.requestSchema}
                            fallback={<SchemaUnavailable />}
                          >
                            {(requestSchema) => (
                              <div class="w-full relative h-full">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  class="absolute top-2 right-2 size-7"
                                  onClick={() => {
                                    setCopyValue(
                                      JSON.stringify(requestSchema(), null, 3)
                                    );
                                  }}
                                >
                                  <Copy class="size-4" />
                                </Button>
                                <Suspense fallback={<div>Loading</div>}>
                                  <div class="font-mono text-xs">
                                    <CodeBlock
                                      code={requestSchema()}
                                      lang="javascript"
                                      class="[&>*]:overflow-scroll sm:[&>*]:overflow-auto"
                                    />
                                  </div>
                                </Suspense>
                              </div>
                            )}
                          </Show>
                        }
                      </TabsContent>
                      <TabsContent value="response" class="mt-2">
                        {
                          <Show
                            when={issue()?.responseSchema}
                            fallback={<SchemaUnavailable />}
                          >
                            {(responseSchema) => (
                              <div class="w-full relative h-full">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  class="absolute top-2 right-2 size-7"
                                  onClick={() => {
                                    setCopyValue(
                                      JSON.stringify(responseSchema(), null, 3)
                                    );
                                  }}
                                >
                                  <Copy class="size-4" />
                                </Button>
                                <Suspense fallback={<div>Loading</div>}>
                                  <CodeBlock
                                    code={responseSchema()}
                                    class="[&>*]:overflow-scroll sm:[&>*]:overflow-auto"
                                    lang="javascript"
                                  />
                                </Suspense>
                              </div>
                            )}
                          </Show>
                        }
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}

const SchemaUnavailable = () => (
  <div class="min-h-[25px] flex flex-col justify-center">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center uppercase">
        <span class="bg-background px-2 text-sm text-muted-foreground">
          schema is not available
        </span>
      </div>
    </div>
  </div>
);

function ErrorMessage(props: { err?: Error; reset: () => void }) {
  return (
    <div class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md text-center">
        <div class="mx-auto h-12 w-12 text-primary" />
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p class="mt-4 text-muted-foreground">
          {props.err?.message || "An unexpected error has occurred."}
          {/* {"An unexpected error has occurred."} */}
        </p>
        <div class="mt-6">
          <Button
            onClick={props.reset}
            class="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try Again
          </Button>
          <a
            href="#"
            class="ml-4 inline-flex items-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
