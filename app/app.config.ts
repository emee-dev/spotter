import { defineConfig } from "@solidjs/start/config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// import { Spotter } from "@spotter/solidstart";

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
  // vite: {
  //   resolve: {
  //     alias: {
  //       "@": resolve(__dirname, "./src"),
  //     },
  //   },
  // },
  server: {
    preset: "vercel",
  },
});
