import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Toaster } from "~/components/ui/toast";
// import { Spotter } from "@spotter.dev/solidstart";
import "./index.css";

// Spotter.init({
//   apikey: "spotter_3ZizcLTizBKyupQXtdkxjBaW",
//   projectId: "x4Yr4Au1",
//   // debugUrl: "https://webhook.site/20a13784-475d-4070-9570-82f99c239786",
//   // debugUrl: "http://localhost:3000/api/payload",
//   // environment: "debug",
//   // logLevel: "verbose",
// });

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Spotter.dev</Title>
          <Meta
            name="description"
            content="Observability tool with native SolidStart support, making API debugging simpler."
          />
          <Meta property="og:title" content="Spotter.dev" />
          <Meta
            property="og:description"
            content="Simplify api observability and error tracking."
          />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
      <Toaster />
    </Router>
  );
}
