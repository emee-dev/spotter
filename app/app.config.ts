import { defineConfig } from "@solidjs/start/config";
import { dirname, resolve } from "node:path";
import solidSvg from "vite-plugin-solid-svg";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite: {
    envDir: "/",
    plugins: [solidSvg()],
  },
});
