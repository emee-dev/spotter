import { type ClassValue, clsx } from "clsx";
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
