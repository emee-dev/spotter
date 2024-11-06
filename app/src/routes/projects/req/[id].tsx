// import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-solid";
// import { A } from "@solidjs/router";

// const request = {
//   id: 1,
//   timestamp: "12:49:03",
//   method: "GET",
//   path: "/launchweek/live",
//   status: 200,
//   url: "https://api.example.com/launchweek/live",
//   params: { page: "1", limit: "10" },
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer token123",
//   },
//   response: {
//     success: true,
//     data: {
//       events: [
//         { id: 1, name: "Keynote" },
//         { id: 2, name: "Workshop" },
//       ],
//     },
//   },
//   error: null,
// };

// function StatusIcon({ status }: { status: number }) {
//   if (status >= 200 && status < 300) {
//     return <CheckCircle class="h-6 w-6 text-emerald-400" />;
//   }
//   if (status >= 400 && status < 500) {
//     return <AlertTriangle class="h-6 w-6 text-amber-400" />;
//   }
//   return <XCircle class="h-6 w-6 text-red-400" />;
// }

// function StatusBadge({ status }: { status: number }) {
//   const getStatusColor = (status: number) => {
//     if (status >= 200 && status < 300)
//       return "bg-emerald-400/10 text-emerald-400";
//     if (status >= 400 && status < 500) return "bg-amber-400/10 text-amber-400";
//     return "bg-red-400/10 text-red-400";
//   };

//   return (
//     <span
//       class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//         status
//       )}`}
//     >
//       {status}
//     </span>
//   );
// }

// function RequestDetailsPage() {
//   return (
//     <div class="min-h-screen bg-[#1a1625] text-white">
//       <div class="bg-[#231f2e] p-4">
//         <div class="max-w-7xl mx-auto flex items-center justify-between">
//           <A
//             href="/projects"
//             class="flex items-center text-gray-400 hover:text-white"
//           >
//             <ArrowLeft class="h-5 w-5 mr-2" />
//             Back to Requests
//           </A>
//           <h1 class="text-xl font-semibold">Request Details</h1>
//         </div>
//       </div>

//       <div class="max-w-7xl mx-auto p-4 space-y-6">
//         {/* Request Details Card */}
//         <div class="bg-[#231f2e] rounded-lg p-6 shadow-lg">
//           <h2 class="text-lg font-semibold mb-4 flex items-center">
//             <StatusIcon status={request.status} />
//             <span class="ml-2">Request Details</span>
//           </h2>
//           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p class="text-gray-400">Method:</p>
//               <p class="font-mono">{request.method}</p>
//             </div>
//             <div>
//               <p class="text-gray-400">Status:</p>
//               <StatusBadge status={request.status} />
//             </div>
//             <div class="md:col-span-2">
//               <p class="text-gray-400">URL:</p>
//               <p class="font-mono break-all">{request.url}</p>
//             </div>
//             <div class="md:col-span-2">
//               <p class="text-gray-400">Timestamp:</p>
//               <p>{request.timestamp}</p>
//             </div>
//           </div>
//         </div>

//         {/* Parameters Card */}
//         <div class="bg-[#231f2e] rounded-lg p-6 shadow-lg">
//           <h2 class="text-lg font-semibold mb-4">Parameters</h2>
//           <pre class="bg-[#1a1625] p-3 rounded overflow-x-auto">
//             {JSON.stringify(request.params, null, 2)}
//           </pre>
//         </div>

//         {/* Headers Card */}
//         <div class="bg-[#231f2e] rounded-lg p-6 shadow-lg">
//           <h2 class="text-lg font-semibold mb-4">Headers</h2>
//           <pre class="bg-[#1a1625] p-3 rounded overflow-x-auto">
//             {JSON.stringify(request.headers, null, 2)}
//           </pre>
//         </div>

//         {/* Response Card */}
//         {request.response && (
//           <div class="bg-[#231f2e] rounded-lg p-6 shadow-lg">
//             <h2 class="text-lg font-semibold mb-4">Response</h2>
//             <pre class="bg-[#1a1625] p-3 rounded overflow-x-auto">
//               {JSON.stringify(request.response, null, 2)}
//             </pre>
//           </div>
//         )}

//         {/* Error Card */}
//         {request.error && (
//           <div class="bg-[#231f2e] rounded-lg p-6 shadow-lg border border-red-500">
//             <h2 class="text-lg font-semibold mb-4 text-red-400">Error</h2>
//             <pre class="bg-[#1a1625] p-3 rounded overflow-x-auto">
//               {JSON.stringify(request.error, null, 2)}
//             </pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RequestDetailsPage;

import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-solid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { A } from "@solidjs/router";

const request = {
  id: 1,
  timestamp: "12:49:03",
  method: "GET",
  path: "/launchweek/live",
  status: 200,
  url: "https://api.example.com/launchweek/live",
  params: { page: "1", limit: "10" },
  query: { sort: "date", order: "desc" },
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token123",
  },
  response: {
    body: {
      success: true,
      data: {
        events: [
          { id: 1, name: "Keynote" },
          { id: 2, name: "Workshop" },
        ],
      },
    },
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=3600",
    },
  },
  error: null,
};

function StatusIcon({ status }: { status: number }) {
  if (status >= 200 && status < 300) {
    return <CheckCircle class="h-6 w-6 text-emerald-400" />;
  }
  if (status >= 400 && status < 500) {
    return <AlertTriangle class="h-6 w-6 text-amber-400" />;
  }
  return <XCircle class="h-6 w-6 text-red-400" />;
}

function StatusBadge({ status }: { status: number }) {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300)
      return "bg-emerald-400/10 text-emerald-400";
    if (status >= 400 && status < 500) return "bg-amber-400/10 text-amber-400";
    return "bg-red-400/10 text-red-400";
  };

  return (
    <span
      class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}

export default function Component() {
  return (
    <div class="min-h-screen bg-background text-foreground">
      <div class="bg-muted p-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <A
            href="/projects"
            class="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft class="h-5 w-5 mr-2" />
            Back to Requests
          </A>
          <h1 class="text-xl font-semibold">Request Details</h1>
        </div>
      </div>

      <div class="max-w-7xl mx-auto p-4 space-y-6">
        {/* Request Details Card */}
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center">
              <StatusIcon status={request.status} />
              <span class="ml-2">Request Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-muted-foreground">Method:</p>
                <p class="font-mono">{request.method}</p>
              </div>
              <div>
                <p class="text-muted-foreground">Status:</p>
                <StatusBadge status={request.status} />
              </div>
              <div class="md:col-span-2">
                <p class="text-muted-foreground">URL:</p>
                <p class="font-mono break-all">{request.url}</p>
              </div>
              <div class="md:col-span-2">
                <p class="text-muted-foreground">Timestamp:</p>
                <p>{request.timestamp}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Request</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="params">
              <TabsList>
                <TabsTrigger value="params">Params</TabsTrigger>
                <TabsTrigger value="query">Query</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>
              <TabsContent value="params">
                <pre class="bg-muted p-3 rounded overflow-x-auto">
                  {JSON.stringify(request.params, null, 2)}
                </pre>
              </TabsContent>
              <TabsContent value="query">
                <pre class="bg-muted p-3 rounded overflow-x-auto">
                  {JSON.stringify(request.query, null, 2)}
                </pre>
              </TabsContent>
              <TabsContent value="headers">
                <pre class="bg-muted p-3 rounded overflow-x-auto">
                  {JSON.stringify(request.headers, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Response Tabs */}
        {request.response && (
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="body">
                <TabsList>
                  <TabsTrigger value="body">Body</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                </TabsList>
                <TabsContent value="body">
                  <pre class="bg-muted p-3 rounded overflow-x-auto">
                    {JSON.stringify(request.response.body, null, 2)}
                  </pre>
                </TabsContent>
                <TabsContent value="headers">
                  <pre class="bg-muted p-3 rounded overflow-x-auto">
                    {JSON.stringify(request.response.headers, null, 2)}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Error Card */}
        {request.error && (
          <Card class="border-destructive">
            <CardHeader>
              <CardTitle class="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <pre class="bg-muted p-3 rounded overflow-x-auto">
                {JSON.stringify(request.error, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// function spotterAction(
//   fn: (args: any) => Promise<any> | void,
//   key?: string
// ): any {}

// const storeFormDataAction = spotterAction(function (formData: any) {
//   console.log("Hey action was called.");
// }, "storeFormDataAction");
