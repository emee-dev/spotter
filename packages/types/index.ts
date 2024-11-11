export type INVALID_RESPONSE_BODY = "INVALID_JSON_BODY";

/**
 * A payload with a complete request and response cycle.
 * It may include try catch statements, as long as there is
 * no runtime error leading to function terminating.
 */
export type SpotterPayload = {
  error: null;
  stack: null;
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
  };
  timestamp: string;
  spotter: {
    apiKey: string;
    projectId: string;
  };
  system: {
    ip: string | null;
    arch: string;
    platform: string;
  };
};

/**
 * Captures payloads where the request and response is incomplete perhaps due to a runtime error.
 * It captures the unhandled runtime errors.
 */
export type SpotterPayloadWithRuntimeError = Pick<
  SpotterPayload,
  "request" | "timestamp" | "system" | "spotter"
> & {
  error: {
    name: string;
    file: string;
    line: number;
    column: number;
    message: string;
    function: string;
  };
  stack: {
    file: string;
    line: number;
    column: number;
    function: string;
    method: string | null;
  }[];
  response: null;
};
