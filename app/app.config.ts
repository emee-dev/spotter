import { defineConfig } from "@solidjs/start/config";
import * as dotenv from "dotenv";
import solidSvg from "vite-plugin-solid-svg";

dotenv.config({ path: ["./.env", "./.env.local"] });

export default defineConfig({
  server: {
    preset: "vercel",
    compressPublicAssets: true,
    // prerender: {
    //   routes: ["/readme"],
    // },
  },
  vite: {
    plugins: [solidSvg()],
    optimizeDeps: {
      exclude: ["prettier"],
    },
  },
});
