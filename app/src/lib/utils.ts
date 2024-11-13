import { formatDateRelative } from "@solid-primitives/date";
import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEndpoint(url: string): string {
  // Remove the protocol, domain, and query parameters
  const path = url.replace(/https?:\/\/[^\/]+/, "").split("?")[0];

  // Match all segments that contain only letters and skip numerical ones
  const staticSegments = path
    .split("/")
    .filter((segment) => /^[a-zA-Z]+$/.test(segment));

  return `/${staticSegments.join("/")}`;
}

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const idLength = 8;

// Create the custom ID generator function
export const genProjectId = customAlphabet(alphabet, idLength);

export const getRelativeTime = (ts: Date) => {
  const targetDate = new Date(ts);
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  return formatDateRelative(difference);
};
