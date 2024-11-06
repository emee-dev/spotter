import { defineConfig } from "@solidjs/start/config";
import { dirname, resolve } from "node:path";
import solidSvg from "vite-plugin-solid-svg";
import { fileURLToPath } from "node:url";
import { Spotter, withSpotter } from "@spotter/solidstart";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// // Usage example
// Spotter.withSpotterConfig({
//   apikey: "your_api_key",
//   projectId: "your_project_id",
// });

// const configInstance = Spotter.getInstance();

// console.log(configInstance.getConfig());
// console.log(configInstance.isConfigDefined());

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite: {
    plugins: [solidSvg()],
  },
});
