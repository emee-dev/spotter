import { AlertTriangle, MoreHorizontal, XCircle } from "lucide-solid";

export type Payload = {
  id: string;
  error: {
    name: string;
    message: string;
    location: string;
  };
  request: {
    method: string;
    url: string;
    params: {
      [x: string]: string;
    } | null;
    query: {
      [x: string]: string;
    } | null;
    headers: {
      [x: string]: string;
    } | null;
  };
  response: {
    status: number;
    params: {
      [x: string]: string;
    } | null;
    headers: {
      [x: string]: string;
    } | null;
  } | null;
  platform: string;
  timestamp: string;
};

export const LargeRequestCard = (props: {
  id: string;
  timestamp: string;
  platform: string;
  error: Payload["error"];
  request: Payload["request"];
}) => {
  return (
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#231f2e] rounded-lg hover:bg-[#2a2535] group">
      <div class="pl-2 flex-1 min-w-0 space-y-1 sm:space-y-2">
        <div class="flex items-start sm:items-center gap-2 flex-wrap">
          <span class="font-medium text-sm">{props.error.name}</span>
          <span class="text-gray-500 text-sm hidden sm:inline">
            {props.error.location}
          </span>
        </div>
        <div class="text-sm text-gray-400 space-x-3 truncate">
          <span>{props.request.method}</span> <span>{props.request.url}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="font-medium text-xs text-gray-400">
            {props.platform}
          </span>
          <span class="text-gray-500">{props.timestamp}</span>
        </div>
      </div>
      <div class="flex items-center gap-4 w-full sm:w-auto">
        <button class="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded opacity-0 group-hover:opacity-100">
          <MoreHorizontal class="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export const SmallRequestCard = (props: {
  id: string;
  timestamp: string;
  request: Payload["request"];
  response: Payload["response"];
}) => {
  return (
    <div class="group grid grid-cols-[auto_auto_auto_auto_1fr] items-center gap-3 p-3 bg-[#231f2e]/50 rounded-lg hover:bg-[#231f2e] backdrop-blur-sm transition-colors">
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

      <span class="text-gray-400 text-center">{props.timestamp}</span>
      <span class="font-mono text-indigo-400 text-center">
        | {props.request.method} |
      </span>
      <span class="font-mono text-gray-300 truncate">{props.request.url}</span>
    </div>
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
