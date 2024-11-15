import type { APIEvent } from "@solidjs/start/server";
import {
  SpotterPayload,
  SpotterPayloadWithRuntimeError,
} from "@spotter.dev/spotter_types";
import os from "node:os";
import { Spotter, SpotterArgs } from "./lib/config";
import { getBaseUrlByEnvironment, sendPayloadToSpotter } from "./lib/http";
import {
  extractQueryParams,
  getErrorMessage,
  getErrorStrace,
  getRequestBody,
  getRequestHeaders,
  getResponseHeaders,
  parseIp,
} from "./utils";

type RouteHandler = (event: APIEvent) => Response | Promise<Response>;

/**
 * Enhances an API route handler with additional logging and payload tracking functionality for Spotter.
 *
 * This wrapper function takes a standard route handler and enriches it by logging request and response details
 * to Spotter's endpoint. It provides a mechanism for centralized logging and analytics in Spotter, including
 * request parameters, headers, response details, and basic system information. However, it does not handle errors
 * or exceptions, so errors must be caught and handled within the route handler.
 *
 * @param cb - The API route handler function to be wrapped.
 * @returns A new function that takes an APIEvent and returns a response after capturing request/response data.
 *
 * @remarks
 * - **Error Handling**: This function does not catch or handle errors automatically. The route handler must
 *   handle its own errors, or unhandled exceptions will propagate.
 * - **Configuration Requirements**: Requires Spotter configuration values (`apiKey`, `projectId`)
 *   to be set in `spotter.init()`. If the config is missing, the request proceeds without Spotter logging.
 * - **Response Type Limitation**: This function only processes `Response` objects. If the route handler
 *   returns other types (e.g., text), they are passed through unmodified.
 *
 * ## Example Usage
 *
 * Basic GET handler wrapped with `withSpotter`:
 *
 * ```typescript
 * export const GET = withSpotter(async (event) => {
 *   console.log("GET handler called");
 *   return Response.json({ message: "Hello" });
 * });
 * ```
 *
 * POST handler with error handling:
 *
 * ```typescript
 * export const POST = withSpotter(async (event) => {
 *   try {
 *     const params = await event.request.json();
 *     if (!params.name) throw new Error("Missing 'name' parameter");
 *
 *     return Response.json({ message: `Hello, ${params.name}` });
 *   } catch (error) {
 *     return Response.json({ message: "Internal server error" }, { status: 500 });
 *   }
 * });
 * ```
 */
export const withSpotter = (cb: RouteHandler) => {
  const spotter = Spotter.getInstance();
  const config = spotter.getConfig();

  return async (event: APIEvent) => {
    // Clone the request to capture the body for logging
    const requestClone = event.request.clone();
    const requestBody = await getRequestBody(requestClone);

    // Execute the original route handler
    let response;
    try {
      response = await cb(event);
    } catch (error: any) {
      await captureRuntimeErrorRequest({
        event,
        error,
        config,
        requestBody,
        requestClone,
      });

      throw error; // Ensure errors are propagated to the route handler
    }

    // Return if response is not a Response object (e.g., plain text response)
    if (!(response instanceof Response)) {
      return response;
    }

    // Capture response details
    const responseClone = response.clone();
    let responseBody;
    try {
      responseBody = await responseClone.json();
    } catch {
      responseBody = "INVALID_JSON_BODY";
    }

    await captureNoRuntimeErrorRequest({
      config,
      response,
      requestBody,
      requestClone,
      responseClone,
      responseBody,
      event,
    });

    return response;
  };
};

const captureNoRuntimeErrorRequest = async ({
  event,
  config,
  response,
  requestBody,
  requestClone,
  responseBody,
  responseClone,
}: {
  event: APIEvent;
  requestBody: any;
  responseBody: any;
  response: Response;
  requestClone: Request;
  responseClone: Response;
  config: SpotterArgs | null;
}) => {
  if (!config || !config.apikey || !config.projectId) {
    console.log("Spotter config missing.");
    return;
  }

  // Construct payload for Spotter
  const payload: SpotterPayload = {
    error: null,
    stack: null,
    spotter: {
      apiKey: config.apikey,
      projectId: config.projectId,
    },
    request: {
      params: requestBody,
      url: requestClone.url,
      method: requestClone.method,
      headers: getRequestHeaders(requestClone),
      query: extractQueryParams(requestClone.url),
    },
    response: {
      params: responseBody,
      status: responseClone.status,
      headers: getResponseHeaders(responseClone),
    },
    system: {
      arch: os.arch(),
      ip: parseIp(event),
      platform: os.platform(),
    },
    timestamp: new Date().toISOString(),
  };

  // Determine API endpoint based on environment configuration
  const baseUrl = getBaseUrlByEnvironment(config.environment, config.debugUrl);

  if (!baseUrl) {
    console.log("Spotter base URL not configured.");
    return response;
  }

  // Attempt to send payload to Spotter, logging errors in verbose mode
  try {
    await sendPayloadToSpotter(baseUrl, payload, config.logLevel);
  } catch (error: any) {
    if (config.logLevel === "verbose") {
      console.error("Error sending payload to Spotter:", error);
    }
  }
};

const captureRuntimeErrorRequest = async ({
  event,
  error,
  config,
  requestBody,
  requestClone,
}: {
  error: Error;
  event: APIEvent;
  requestBody: any;
  requestClone: Request;
  config: SpotterArgs | null;
}) => {
  if (!config || !config.apikey || !config.projectId) {
    console.log("Spotter config missing.");
    return;
  }

  const payload: SpotterPayloadWithRuntimeError = {
    error: getErrorMessage(error),
    stack: getErrorStrace(error),
    spotter: {
      apiKey: config.apikey,
      projectId: config.projectId,
    },
    request: {
      params: requestBody,
      url: requestClone.url,
      method: requestClone.method,
      headers: getRequestHeaders(requestClone),
      query: extractQueryParams(requestClone.url),
    },
    response: null,
    system: {
      arch: os.arch(),
      ip: parseIp(event),
      platform: os.platform(),
    },
    timestamp: new Date().toISOString(),
  };

  // Determine API endpoint based on environment configuration
  const baseUrl = getBaseUrlByEnvironment(config.environment, config.debugUrl);

  if (!baseUrl) {
    console.log("Spotter base URL not configured.");
    return;
  }

  // Attempt to send payload to Spotter, logging errors in verbose mode
  try {
    await sendPayloadToSpotter(baseUrl, payload, config.logLevel);
  } catch (error: any) {
    if (config.logLevel === "verbose") {
      console.error("Error sending payload to Spotter:", error);
    }
  }
};
