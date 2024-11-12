import * as dotenv from "dotenv";
import { defineConfig } from "@solidjs/start/config";
import { dirname, resolve } from "node:path";
import solidSvg from "vite-plugin-solid-svg";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite: {
    plugins: [solidSvg()],
  },
});
