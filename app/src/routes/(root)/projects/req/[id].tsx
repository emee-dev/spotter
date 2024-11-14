import { createAsync, query, useParams } from "@solidjs/router";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Globe,
  HardDrive,
  Hourglass,
  Server,
  Share2,
  XCircle,
} from "lucide-solid";
import {
  createEffect,
  ErrorBoundary,
  For,
  on,
  onMount,
  Show,
  Suspense,
} from "solid-js";
import ErrorMessage from "~/components/error";
import { Payload } from "~/components/request-cards";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"; // Choose a style or customize
import { getRequestById } from "~/lib/db";
import { getMethodColor, getRelativeTime } from "~/lib/utils";
import { codeToHtml } from "shiki";
import { createCopy } from "~/hooks";

// const Component = () => {
//   const getIssue = createAsync(() => getRequestInfo());

//   function getStatusIcon(status: number) {
//     if (status >= 200 && status < 300) {
//       return <CheckCircle class="size-4  text-emerald-400" />;
//     }
//     if (status >= 400 && status < 500) {
//       return <AlertTriangle class="size-4  text-amber-400" />;
//     }
//     return <XCircle class="size-4  text-red-400" />;
//   }

//   function getStatusColor(status: number) {
//     if (status >= 200 && status < 300) {
//       return "text-green-500 bg-green-100"; // Success
//     } else if (status >= 300 && status < 400) {
//       return "text-yellow-500 bg-yellow-100"; // Redirect
//     } else if (status >= 400 && status < 500) {
//       return "text-red-500 bg-red-100"; // Client Error
//     } else if (status >= 500 && status < 600) {
//       return "text-orange-500 bg-orange-100"; // Server Error
//     } else {
//       return "text-gray-500 bg-gray-100"; // Unknown or Other Status
//     }
//   }

//   return (
//     <Show
//       when={getIssue()}
//       fallback={
//         <div class="flex items-center justify-center">
//           <ErrorMessage />
//         </div>
//       }
//     >
//       {(issue) => (
//         <div class="p-6 space-y-6 overflow-scroll font-inter">
//           {/* Header Section */}
//           <div class="flex items-start justify-between">
//             <div class="space-y-1">
//               <h1 class="text-xl font-bold tracking-tight">Request Details</h1>
//               <p class="text-sm text-muted-foreground gap-x-4 flex items-center">
//                 ID: {issue().xata_id}{" "}
//                 <span class="flex items-center gap-x-1">
//                   <Hourglass class="size-4" />
//                   {getRelativeTime(issue().xata_createdat)}
//                 </span>
//               </p>
//             </div>
//             <Button variant="outline" size="sm">
//               <Share2 class="mr-2 h-4 w-4" />
//               Share
//             </Button>
//           </div>

//           {/* Overview Cards */}
//           <div class="grid gap-4 md:grid-cols-2 [&>*:hover]:shadow-md shadow-blue-50">
//             <Card class="shadow-md shadow-blue-50">
//               <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle class="text-sm font-medium">
//                   Request Method
//                 </CardTitle>
//                 <Globe class="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div class="flex items-center gap-3">
//                   <Badge
//                     class={`${getMethodColor(
//                       issue().request.method
//                     )} ${"hover:bg-transparent"}`}
//                     variant={"default"}
//                   >
//                     {issue().request.method}
//                   </Badge>
//                   <span class="text-sm font-geistsans">
//                     {issue().request.url}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle class="text-sm font-medium">
//                   Response Status
//                 </CardTitle>
//                 {/* TODO remove */}
//                 {getStatusIcon(issue().response?.status || 500)}
//               </CardHeader>
//               <CardContent>
//                 <Show
//                   when={issue().response}
//                   fallback={
//                     <div class="min-h-[25px] flex flex-col justify-center">
//                       <div class="relative">
//                         <div class="absolute inset-0 flex items-center">
//                           <span class="w-full border-t" />
//                         </div>
//                         <div class="relative flex justify-center text-xs uppercase">
//                           <span class="bg-background px-2 text-muted-foreground">
//                             incomplete request no response
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   }
//                 >
//                   {(response) => (
//                     <div class="flex items-center gap-2">
//                       <Badge
//                         class={getStatusColor(response().status)}
//                         variant={"default"}
//                       >
//                         {response().status}
//                       </Badge>
//                       {issue().error && (
//                         <span class="text-sm text-muted-foreground">
//                           {issue().error?.message || ""}
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 </Show>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle class="text-sm font-medium">System Info</CardTitle>
//                 <HardDrive class="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div class="flex items-center gap-2">
//                   <Badge variant={"outline"}>{issue().system.platform}</Badge>
//                   <span class="text-sm text-muted-foreground">
//                     {issue().system.ip}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Request */}
//           <Card class="hover:shadow-md shadow-blue-50">
//             <CardContent class="p-0">
//               <div class="w-full">
//                 <div class="w-full justify-start rounded-none border-b bg-transparent p-0">
//                   <p class="text-sm p-3 font-semibold rounded-none ">
//                     Request details
//                   </p>
//                 </div>
//                 <div class=" min-h-fit ">
//                   <Tabs defaultValue="params" class="pt-2">
//                     <TabsList class="w-full justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent p-0">
//                       <For each={["Params", "Query", "Error", "Stacktrace"]}>
//                         {(item) => (
//                           <TabsTrigger
//                             value={item.toLowerCase()}
//                             class="data-[selected]:border-b-2 border-blue-400 rounded-none"
//                           >
//                             {item}
//                           </TabsTrigger>
//                         )}
//                       </For>
//                     </TabsList>

//                     <TabsContent value="params" class="m-0 min-h-fit p-4">
//                       <div class="w-full relative h-full">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           class="absolute top-2 right-2 h-8 w-8"
//                           aria-label="Copy code to clipboard"
//                         >
//                           {true ? (
//                             <Check class="h-4 w-4" />
//                           ) : (
//                             <Copy class="h-4 w-4" />
//                           )}
//                         </Button>
//                         <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
//                           <code class="text-xs sm:text-sm md:text-base font-mono">
//                             {JSON.stringify(issue().request.params, null, 3)}
//                           </code>
//                         </pre>
//                       </div>
//                     </TabsContent>
//                     <TabsContent value="query" class="m-0 min-h-fit p-4">
//                       <div class="w-full relative h-full">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           class="absolute top-2 right-2 h-8 w-8"
//                           aria-label="Copy code to clipboard"
//                         >
//                           {true ? (
//                             <Check class="h-4 w-4" />
//                           ) : (
//                             <Copy class="h-4 w-4" />
//                           )}
//                         </Button>
//                         <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
//                           <code class="text-xs sm:text-sm md:text-base font-mono">
//                             {JSON.stringify(issue().request.params, null, 3)}
//                           </code>
//                         </pre>
//                       </div>
//                     </TabsContent>

//                     <Show
//                       when={issue().error}
//                       fallback={
//                         <TabsContent value="error" class="m-0 p-4">
//                           <div class="min-h-[90px] flex flex-col justify-center">
//                             <div class="relative">
//                               <div class="absolute inset-0 flex items-center">
//                                 <span class="w-full border-t" />
//                               </div>
//                               <div class="relative flex justify-center text-xs uppercase">
//                                 <span class="bg-background px-2 text-muted-foreground">
//                                   no error was found
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </TabsContent>
//                       }
//                     >
//                       {(error) => (
//                         <TabsContent value="error" class="m-0 p-4">
//                           <div class="space-y-4 border rounded-lg">
//                             <div class="p-4">
//                               <div class="mb-2 font-medium text-destructive">
//                                 {error().name}
//                               </div>
//                               <p class="mb-4 text-sm text-muted-foreground">
//                                 {error().message}
//                               </p>
//                               <div class="text-sm">
//                                 <div>File: {error().file}</div>
//                                 <div>Line: {error().line}</div>
//                                 <div>Column: {error().column}</div>
//                                 <div>Function: {error().function}</div>
//                               </div>
//                             </div>
//                           </div>
//                         </TabsContent>
//                       )}
//                     </Show>

//                     <Show
//                       when={issue().stack}
//                       fallback={
//                         <TabsContent value="stack" class="m-0 p-4">
//                           <div class="min-h-[90px] flex flex-col justify-center">
//                             <div class="relative">
//                               <div class="absolute inset-0 flex items-center">
//                                 <span class="w-full border-t" />
//                               </div>
//                               <div class="relative flex justify-center text-xs uppercase">
//                                 <span class="bg-background px-2 text-muted-foreground">
//                                   no stack was found
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </TabsContent>
//                       }
//                     >
//                       {(stack) => (
//                         <TabsContent value="stack" class="m-0">
//                           <div class="space-y-2">
//                             <For each={stack()}>
//                               {(stack) => (
//                                 <div class="flex items-start border-t gap-2 p-4">
//                                   <div class="flex size-8 items-center justify-center rounded-full bg-muted">
//                                     <Clock class="h-4 w-4" />
//                                   </div>
//                                   <div class="space-y-1">
//                                     {stack.method && (
//                                       <div class="mt-2 flex items-center">
//                                         <Badge
//                                           variant="outline"
//                                           class="bg-blue-200"
//                                         >
//                                           {stack.method}
//                                         </Badge>
//                                       </div>
//                                     )}
//                                     <p class="text-sm font-medium">
//                                       {stack.function}
//                                     </p>
//                                     <p class="text-sm text-muted-foreground">
//                                       {stack.file}:{stack.line}:{stack.column}
//                                     </p>
//                                   </div>
//                                 </div>
//                               )}
//                             </For>
//                           </div>
//                         </TabsContent>
//                       )}
//                     </Show>
//                   </Tabs>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Response */}
//           <Card class="hover:shadow-md shadow-blue-50">
//             <CardContent class="p-0">
//               <div class="w-full">
//                 <div class="w-full justify-start rounded-none border-b bg-transparent p-0">
//                   <p class="text-sm p-3 font-semibold rounded-none ">
//                     Response details
//                   </p>
//                 </div>
//                 <div class="min-h-fit">
//                   <Show
//                     when={issue().response}
//                     fallback={
//                       <div class="pt-2 flex flex-col justify-center min-h-[90px]">
//                         <div class="relative">
//                           <div class="absolute inset-0 flex items-center">
//                             <span class="w-full border-t" />
//                           </div>
//                           <div class="relative flex justify-center text-xs uppercase">
//                             <span class="bg-background px-2 text-muted-foreground">
//                               application runtime error
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     }
//                   >
//                     {(response) => (
//                       <Tabs defaultValue="params" class="pt-2">
//                         <TabsList class="w-full justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent p-0">
//                           <For each={["Params", "Headers"]}>
//                             {(item) => (
//                               <TabsTrigger
//                                 value={item.toLowerCase()}
//                                 class="data-[selected]:border-b-2 border-blue-400 rounded-none"
//                               >
//                                 {item}
//                               </TabsTrigger>
//                             )}
//                           </For>
//                         </TabsList>

//                         <TabsContent value="params" class="m-0 min-h-fit p-4">
//                           <div class="w-full relative h-full">
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               class="absolute top-2 right-2 h-8 w-8"
//                               aria-label="Copy code to clipboard"
//                             >
//                               {true ? (
//                                 <Check class="h-4 w-4" />
//                               ) : (
//                                 <Copy class="h-4 w-4" />
//                               )}
//                             </Button>
//                             <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
//                               <code class="text-xs sm:text-sm md:text-base font-mono">
//                                 {JSON.stringify(response().params, null, 3)}
//                               </code>
//                             </pre>
//                           </div>
//                         </TabsContent>

//                         <TabsContent value="headers" class="m-0 min-h-fit p-4">
//                           <div class="w-full relative h-full">
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               class="absolute top-2 right-2 h-8 w-8"
//                               aria-label="Copy code to clipboard"
//                             >
//                               {true ? (
//                                 <Check class="h-4 w-4" />
//                               ) : (
//                                 <Copy class="h-4 w-4" />
//                               )}
//                             </Button>
//                             <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
//                               <code class="text-xs sm:text-sm md:text-base font-mono">
//                                 {JSON.stringify(response().headers, null, 3)}
//                               </code>
//                             </pre>
//                           </div>
//                         </TabsContent>
//                       </Tabs>
//                     )}
//                   </Show>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Schema */}
//           <Card class="hover:shadow-md shadow-blue-50">
//             <CardContent class="p-0">
//               <div class="w-full">
//                 <div class="w-full justify-start rounded-none border-b bg-transparent p-0">
//                   <p class="text-sm p-3 font-semibold rounded-none ">
//                     Schema details
//                   </p>
//                 </div>
//                 <div class="min-h-fit">
//                   <Show
//                     when={issue()}
//                     fallback={
//                       <div class="pt-2 flex flex-col justify-center min-h-[90px]">
//                         <div class="relative">
//                           <div class="absolute inset-0 flex items-center">
//                             <span class="w-full border-t" />
//                           </div>
//                           <div class="relative flex justify-center text-xs uppercase">
//                             <span class="bg-background px-2 text-muted-foreground">
//                               application runtime error
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     }
//                   >
//                     {(issue) => (
//                       <Tabs defaultValue="params" class="pt-2">
//                         <TabsList class="w-full justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent p-0">
//                           <For each={["Request", "Response"]}>
//                             {(item) => (
//                               <TabsTrigger
//                                 value={item.toLowerCase()}
//                                 class="data-[selected]:border-b-2 border-blue-400 rounded-none"
//                               >
//                                 {item}
//                               </TabsTrigger>
//                             )}
//                           </For>
//                         </TabsList>

//                         <TabsContent value="request" class="m-0 min-h-fit p-4">
//                           <div class="w-full relative h-full">
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               class="absolute top-2 right-2 h-8 w-8"
//                             >
//                               {true ? (
//                                 <Check class="h-4 w-4" />
//                               ) : (
//                                 <Copy class="h-4 w-4" />
//                               )}
//                             </Button>
//                             <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
//                               <code class="sm:text-sm md:text-base font-sourcecodepro text-xs">
//                                 {JSON.stringify(getIssue()?.request, null, 2)}
//                               </code>
//                             </pre>
//                           </div>
//                         </TabsContent>

//                         <TabsContent value="response" class="m-0 min-h-fit p-4">
//                           <div class="w-full relative h-full">
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               class="absolute top-2 right-2 h-8 w-8"
//                               aria-label="Copy code to clipboard"
//                             >
//                               {true ? (
//                                 <Check class="h-4 w-4" />
//                               ) : (
//                                 <Copy class="h-4 w-4" />
//                               )}
//                             </Button>
//                             <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
//                               <code class="text-xs sm:text-sm md:text-base font-mono">
//                                 {JSON.stringify(issue().response, null, 3)}
//                               </code>
//                             </pre>
//                           </div>
//                         </TabsContent>
//                       </Tabs>
//                     )}
//                   </Show>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </Show>
//   );
// };

// export default Component;

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
};

// const getRequestInfo = query(async () => {
//   const params = useParams<{ id: string }>();

//   const data = await getRequestById({ xata_id: params.id });

//   if (!data) {
//     throw new Error("Unable to retrieve any data.");
//   }
//   console.log("data", data);
//   return data as XataRequestInfo;
// }, "getRequestInfo");

// export const route = {
//   preload: () => {
//     getRequestInfo();
//   },
// };

const getRequestInfo = query(async () => {
  const params = useParams<{ id: string }>();

  // const data = await getRequestById({ xata_id: params.id });

  // if (!data) {
  //   throw new Error("Unable to retrieve any data.");
  // }

  const issue = {
    xata_id: "h3AJQNFkrx3I5yXQ3_ZfJ",
    xata_version: 0,
    xata_createdat: "2024-11-13T11:52:36.509Z",
    xata_updatedat: "2024-11-13T11:52:36.509Z",
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
      url: "/projects",
      params: { projectId: "404" },
      query: { search: "true" },
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: "Bearer some_token_here",
      },
    },
    response: {
      status: 500,
      params: { name: "emee" },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
    system: { ip: "192.168.1.1", arch: "x64", platform: "macOS" },
    projectId: "OGJ6YzU9",
    timestamp: "2024-11-04T08:30:00.000Z",
  };

  return issue as any as XataRequestInfo;
}, "getRequestInfo");

export const route = {
  preload: () => {
    getRequestInfo();
  },
};

const CodeBlock = (props: { code: string; lang: "json" | "javascript" }) => {
  let containerRef!: HTMLDivElement;
  const diffCode = () => props.code;

  createEffect(
    on(diffCode, async (code) => {
      const html = await codeToHtml(code, {
        lang: props.lang,
        theme: "slack-dark",
      });

      if (containerRef) {
        containerRef.innerHTML = html;
      }
    })
  );

  // onMount(async () => {
  //   const code = async (code: string) => {
  //     const html = await codeToHtml(code, {
  //       lang: "javascript",
  //       theme: "slack-dark",
  //     });

  //     return html;
  //   };

  //   const res = await code(props.code);

  //   if (containerRef) {
  //     containerRef.innerHTML = res;
  //   }
  // });

  return (
    <div
      ref={containerRef}
      class="[&>*]:p-3 [&>*]:rounded-lg [&>*]:font-mono [&>*]:text-sm"
    ></div>
  );
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

// Usage Example
const issueStatus = 404;
const result = getStatusMessage(issueStatus);
console.log(`Message: ${result.message}, Tailwind Class: ${result.colorClass}`);

export default function Component() {
  const getIssue = createAsync(() => getRequestInfo());
  const [isCopied, setCopyValue] = createCopy();

  createEffect(() => {
    console.log("isCopied", isCopied());
  });

  return (
    <ErrorBoundary fallback={<div>There was an error</div>}>
      <Suspense>
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
                            {issue().request.method || "GET"}
                          </Badge>
                          <span class="font-mono text-sm">
                            {issue().request.url || "/projects"}
                          </span>
                        </div>
                      </div>
                      {/* TODO improve this */}
                      <Show when={issue().response}>
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
                        <TabsContent value="error" class="mt-2">
                          <div class="w-full relative h-full">
                            <Button
                              variant="outline"
                              size="icon"
                              class="absolute top-2 right-2 size-7"
                            >
                              <Copy class="size-4" />
                            </Button>
                            <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                              <code class="text-xs sm:text-sm md:text-base font-mono">
                                {JSON.stringify(issue().error, null, 3)}
                              </code>
                            </pre>
                          </div>
                        </TabsContent>
                        <TabsContent value="req:stacktrace" class="mt-2">
                          <div class="w-full relative h-full">
                            <Button
                              variant="outline"
                              size="icon"
                              class="absolute top-2 right-2 size-7"
                            >
                              <Copy class="size-4" />
                            </Button>
                            <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
                              <code class="text-xs sm:text-sm md:text-base font-mono">
                                {JSON.stringify(issue().stack, null, 3)}
                              </code>
                            </pre>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

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
                            >
                              <Copy class="size-4" />
                            </Button>
                            <Suspense fallback={<div>Loading</div>}>
                              <CodeBlock
                                code={JSON.stringify(
                                  issue().response?.params || "{}",
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
                            >
                              <Copy class="size-4" />
                            </Button>
                            <Suspense fallback={<div>Loading</div>}>
                              <CodeBlock
                                code={JSON.stringify(
                                  issue().response?.headers || "{}",
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

              <Card class="mt-3 pt-3 font-mono">
                <CardContent class="p-5">
                  <div class="">
                    <div class="text-sm text-muted-foreground">Schema</div>
                    <Tabs defaultValue="request" class="">
                      <TabsList class=" justify-start rounded-none [&>*]:data-[selected]:border-b-2 border-blue-400 [&>*]:rounded-none bg-transparent transition-all p-0">
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
                      <TabsContent
                        value="request"
                        class="m-0 h-full min-h-fit pt-2"
                      >
                        <div class="w-full relative h-full">
                          <Button
                            variant="outline"
                            size="icon"
                            class="absolute top-2 right-2 size-7"
                          >
                            <Copy class="size-4" />
                          </Button>
                          <Suspense fallback={<div>Loading</div>}>
                            <CodeBlock
                              code={JSON.stringify(issue().request, null, 3)}
                              lang="json"
                            />
                          </Suspense>
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="response"
                        class="m-0 h-full min-h-fit pt-2"
                      >
                        <div class="w-full relative h-full">
                          <Button
                            variant="outline"
                            size="icon"
                            class="absolute top-2 right-2 size-7"
                          >
                            <Copy class="size-4" />
                          </Button>
                          <Suspense fallback={<div>Loading</div>}>
                            <CodeBlock
                              code={JSON.stringify(
                                issue().response || "{}",
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
                </CardContent>
              </Card>
            </div>
          )}
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
