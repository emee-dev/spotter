import axios from "axios";
import normalizeUrl from "normalize-url";
import { SpotterArgs } from "./config";
import type {
  INVALID_RESPONSE_BODY,
  SpotterPayload,
  SpotterPayloadWithRuntimeError,
} from "@spotter/types";

const BASE_URL = "https://spotter-rust.vercel.app/";
const apiEndpoint = "/payload";

/**
 * Retrieves the appropriate base URL based on environment.
 * @param environment - The current Spotter environment.
 * @param debugUrl - Debug URL for custom debugging endpoints.
 * @returns The formatted base URL or null if environment is invalid.
 */
export const getBaseUrlByEnvironment = (
  environment: SpotterArgs["environment"],
  debugUrl?: string
): string | null => {
  console.log("Environment:", environment);
  console.log("Debug URL:", debugUrl);

  switch (environment) {
    case "production":
      return `${BASE_URL}${apiEndpoint}`;
    case "debug":
      return debugUrl ? normalizeUrl(debugUrl) : null;
    default:
      return null;
  }
};

/**
 * Sends the payload to the specified API endpoint with optional retries.
 * @param apiUrl - The API endpoint URL.
 * @param payload - The payload data to send.
 * @param logLevel - Logging level, default is "silent".
 * @param retries - Number of retry attempts in case of failure.
 * @param retryDelay - Delay in milliseconds between retry attempts.
 */
export const sendPayloadToSpotter = async (
  apiUrl: string,
  payload: SpotterPayload | SpotterPayloadWithRuntimeError,
  logLevel: SpotterArgs["logLevel"] = "silent",
  retries: number = 3,
  retryDelay: number = 1000
): Promise<void> => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const response = await axios.post(normalizeUrl(apiUrl), payload, {
        headers: { "Content-Type": "application/json" },
      });

      log(response.data, logLevel);
      break;
    } catch (error) {
      if (attempt < retries - 1) {
        console.warn(
          `Attempt ${attempt + 1} failed. Retrying in ${retryDelay}ms...`
        );
        await delay(retryDelay);
      } else {
        console.error("All retry attempts failed.", error);
      }
    }
    attempt++;
  }
};

/**
 * Logs the message if log level is set to verbose.
 * @param message - The message to log.
 * @param logLevel - Logging level, either "verbose" or "silent".
 */
const log = (message: unknown, logLevel: SpotterArgs["logLevel"]): void => {
  if (logLevel === "verbose") {
    console.log("Response:", message);
  }
};

/**
 * Delays execution for the specified duration.
 * @param ms - Milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));