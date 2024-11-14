import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Toaster } from "~/components/ui/toast";
import { Spotter } from "@spotter.dev/solidstart";
import "./index.css";

// Spotter.init({
//   apikey: "your_api_key",
//   projectId: "your_project_id",
//   debugUrl: "https://webhook.site/20a13784-475d-4070-9570-82f99c239786",
//   environment: "debug",
//   logLevel: "verbose",
// });

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Spotter.dev</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
      <Toaster />
    </Router>
  );
}
