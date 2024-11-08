import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "@fontsource/inter";
import "./index.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Spotter</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      {/* <main class="min-h-[70vh]">{children}</main> */}
      <FileRoutes />
    </Router>
  );
}
