import { APIEvent } from "@solidjs/start/server";
import qs from "qs";
import requestIp from "request-ip";
import * as stackTrace from "stack-trace";

export const getRequestHeaders = (requestClone: Request) => {
  const temp = {} as { [index: string]: string };

  for (const [key, value] of requestClone.headers.entries()) {
    temp[key] = value;
  }

  return temp;
};

export const getResponseHeaders = (responseClone: Response) => {
  const temp = {} as { [index: string]: string };

  for (const [key, value] of responseClone.headers.entries()) {
    temp[key] = value;
  }

  return temp;
};

export const getRequestBody = async (requestClone: Request) => {
  const body =
    requestClone.method === "GET" || requestClone.method === "get"
      ? null
      : await requestClone.json();

  return body;
};

export const extractQueryParams = (url: string) => {
  // Extract just the query string part from the URL
  const queryString = url.split("?")[1] || "";

  const queryObject = qs.parse(queryString);

  return queryObject as Record<string, any>;
};

export const parseIp = (req: APIEvent) =>
  requestIp.getClientIp(req.nativeEvent.node.req);

/**
 * Captures an error stacktrace including line, columns etc.
 * @param error
 * @returns
 */
export const getErrorStrace = <T extends Error>(error: T) => {
  const trace = stackTrace.parse(error);

  const formattedTrace = trace.map((frame) => ({
    file: frame.getFileName(),
    line: frame.getLineNumber(),
    column: frame.getColumnNumber(),
    function: frame.getFunctionName() || "anonymous",
    method: frame.getMethodName(),
  }));

  return formattedTrace;
};

/**
 * Captures an error including name, message etc
 * @param error
 * @returns
 */
export const getErrorMessage = <T extends Error>(error: T) => {
  const trace = stackTrace.parse(error)[0];

  return {
    message: error.message,
    name: error.name || "Error",
    file: trace.getFileName(),
    line: trace.getLineNumber(),
    column: trace.getColumnNumber(),
    function: trace.getMethodName() || "anonymous",
  };
};
