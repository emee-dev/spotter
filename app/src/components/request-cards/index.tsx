import { AlertTriangle, Link, MoreHorizontal, XCircle } from "lucide-solid";
import { Show } from "solid-js";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { formatDateRelative } from "@solid-primitives/date";

export type Payload = {
  id: string;
  error: {
    name: string;
    file: string;
    line: number;
    column: number;
    message: string;
    function: string;
  } | null;
  stack:
    | {
        file: string;
        line: number;
        column: number;
        function: string;
        method: string | null;
      }[]
    | null;
  request: {
    method: string;
    url: string;
    params: Record<string, string> | null;
    query: Record<string, string> | null;
    headers: Record<string, string> | null;
  };
  response: {
    status: number;
    params: Record<string, string> | null;
    headers: Record<string, string> | null;
  } | null;
  system: {
    ip: string | null;
    arch: string;
    platform: string;
  };
  timestamp: string;
};

export const LargeRequestCard = (props: {
  id: string;
  error: Payload["error"];
  system: Payload["system"];
  request: Payload["request"];
  xata_createdat: number;
}) => {
  return (
    <a href={`/projects/req/${props.id}`}>
      <Card class="flex bg-background font-geistsans flex-col sm:flex-row items-start sm:items-center gap-4 p-4  rounded-lg  group">
        <div class="pl-2 flex-1 min-w-0 space-y-1 sm:space-y-2">
          <Show
            when={props.error}
            fallback={
              <div class="flex items-start sm:items-center gap-2 flex-wrap" />
            }
          >
            {(error) => (
              <div class="flex items-start sm:items-center gap-2 flex-wrap">
                <span class="font-medium text-sm">{error().name}</span>
                <span class=" text-sm hidden sm:inline">{error().line}</span>
              </div>
            )}
          </Show>

          <div class="text-sm   space-x-3 truncate">
            <span>{props.request.method}</span> <span>{props.request.url}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="font-medium text-xs ">{props.system.platform}</span>
            <span class="text-gray-600/75">
              {formatDateRelative(props.xata_createdat)}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <Button
            variant={"outline"}
            size={"icon"}
            class="p-1.5 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal class="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </a>
  );
};

// export const SmallRequestCard = (props: {
//   id: string;
//   timestamp: string;
//   request: Payload["request"];
//   response: Payload["response"];
// }) => {
//   return (
//     <div class="group grid grid-cols-[auto_auto_auto_auto_1fr] items-center gap-3 p-3 bg-[#231f2e]/50 rounded-lg hover:bg-[#231f2e] backdrop-blur-sm transition-colors">
//       <div class="flex w-16 space-x-5 items-center">
//         {props.response ? (
//           <StatusIcon status={props.response.status} />
//         ) : (
//           <span class="opacity-0">●</span>
//         )}

//         {props.response ? (
//           <StatusCode status={props.response.status} />
//         ) : (
//           <span class="opacity-0"></span>
//         )}
//       </div>

//       <span class="text-gray-400 text-center">{props.timestamp}</span>
//       <span class="font-mono text-indigo-400 text-center">
//         | {props.request.method} |
//       </span>
//       <span class="font-mono text-gray-300 truncate">{props.request.url}</span>
//     </div>
//   );
// };

export const SmallRequestCard = (props: {
  id: string;
  request: Payload["request"];
  response: Payload["response"];
  xata_createdat: number;
}) => {
  return (
    <a href={`/project/req/${props.id}`}>
      <Card class="group grid hover:shadow text-base grid-cols-[auto_auto_auto_auto_1fr] items-center gap-3 p-3 rounded-lg backdrop-blur-sm transition-colors">
        <div class="flex w-16 space-x-5 items-center">
          {props.response ? (
            <StatusIcon status={props.response.status} />
          ) : (
            <span class="opacity-0">●</span>
          )}

          {props.response ? (
            <StatusCode status={props.response.status} />
          ) : (
            <span class="opacity-0"></span>
          )}
        </div>

        <span class=" text-center">
          {formatDateRelative(props.xata_createdat)}
        </span>
        <span class="font-mono text-indigo-400 text-center">
          | {props.request.method} |
        </span>
        <span class="font-mono truncate">{props.request.url}</span>
      </Card>
    </a>
  );
};

export const EndpointCard = (props: {
  id: string;
  requestUrl: string;
  xata_createdat: number;
}) => {
  return (
    <Card class="group hover:shadow text-base flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm transition-colors">
      <span class="font-mono ml-3  text-center mr-2">
        <Link class="size-4"></Link>
      </span>
      <span class="font-mono group-hover:underline underline-offset-4 text-blue-400 text-center">
        {props.requestUrl}
      </span>
      <span class="ml-auto text-center text-sm text-neutral-400">
        {formatDateRelative(props.xata_createdat)}
      </span>
    </Card>
  );
};

function StatusIcon({ status }: { status: number }) {
  if (status >= 200 && status < 300) {
    return null;
  }
  if (status >= 400 && status < 500) {
    return <AlertTriangle class="h-4 w-4 text-amber-400" />;
  }
  return <XCircle class="h-4 w-4 text-red-400" />;
}

function StatusCode({ status }: { status: number }) {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-400";
    if (status >= 400 && status < 500) return "text-amber-400";
    return "text-red-400";
  };

  return <span class={`font-mono ${getStatusColor(status)}`}>{status}</span>;
}
