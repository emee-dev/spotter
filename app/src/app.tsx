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

/* 
<!-- HTML Meta Tags -->
<title>Spotter: Gain Deep Visibility and Control Over Your REST APIs</title>
<meta name="description" content="Spotter helps engineers quickly debug and troubleshoot microservice issues by providing deep visibility into request parameters, schemas, and errors. Stop wasting time digging through logs.">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://spotter-rust.vercel.app/">
<meta property="og:type" content="website">
<meta property="og:title" content="Spotter: Gain Deep Visibility and Control Over Your REST APIs">
<meta property="og:description" content="Spotter helps engineers quickly debug and troubleshoot microservice issues by providing deep visibility into request parameters, schemas, and errors. Stop wasting time digging through logs.">
<meta property="og:image" content="https://opengraph.b-cdn.net/production/images/8d2e20de-d11d-4447-80da-2238b5461814.png?token=tj4OmcGwjOGUNuldbt27dG0UAkUmfVuInKaSLm1GVGY&height=628&width=1200&expires=33270737597">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="spotter-rust.vercel.app">
<meta property="twitter:url" content="https://spotter-rust.vercel.app/">
<meta name="twitter:title" content="Spotter: Gain Deep Visibility and Control Over Your REST APIs">
<meta name="twitter:description" content="Spotter helps engineers quickly debug and troubleshoot microservice issues by providing deep visibility into request parameters, schemas, and errors. Stop wasting time digging through logs.">
<meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/8d2e20de-d11d-4447-80da-2238b5461814.png?token=tj4OmcGwjOGUNuldbt27dG0UAkUmfVuInKaSLm1GVGY&height=628&width=1200&expires=33270737597">

<!-- Meta Tags Generated via https://www.opengraph.xyz -->

*/

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          {/* <Title>Spotter.dev</Title>
          <Meta
            property="og:title"
            content="Spotter: Gain Deep Visibility and Control Over Your REST APIs"
          />
          <Meta
            property="og:description"
            content="Spotter helps engineers quickly debug and troubleshoot microservice issues by providing deep visibility into request parameters, schemas, and errors. Stop wasting time digging through logs."
          />
          <Meta
            property="og:image"
            content="https://spotter-rust.vercel.app/og.png"
          /> */}
          <Title>
            Spotter: Gain Deep Visibility and Control Over Your REST APIs
          </Title>
          <Meta
            name="description"
            content="Spotter helps engineers quickly debug and troubleshoot microservice issues by providing deep visibility into request parameters, schemas, and errors. Stop wasting time digging through logs."
          />

          {/* Open Graph / Facebook Meta Tags */}
          <Meta property="og:url" content="https://spotter-rust.vercel.app/" />
          <Meta property="og:type" content="website" />
          <Meta
            property="og:title"
            content="Spotter: Gain Deep Visibility and Control Over Your REST APIs"
          />
          <Meta
            property="og:description"
            content="Spotter helps engineers quickly debug and troubleshoot microservice issues by providing deep visibility into request parameters, schemas, and errors. Stop wasting time digging through logs."
          />
          <Meta
            property="og:image"
            content="https://opengraph.b-cdn.net/production/images/8d2e20de-d11d-4447-80da-2238b5461814.png?token=tj4OmcGwjOGUNuldbt27dG0UAkUmfVuInKaSLm1GVGY&height=628&width=1200&expires=33270737597"
          />

          {/* Twitter Meta Tags */}
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta property="twitter:domain" content="spotter-rust.vercel.app" />
          <Meta
            property="twitter:url"
            content="https://spotter-rust.vercel.app/"
          />
          <Meta
            name="twitter:title"
            content="Spotter: Gain Deep Visibility and Control Over Your REST APIs"
          />
          <Meta
            name="twitter:description"
            content="Spotter helps engineers quickly debug and troubleshoot microservice issues by providing deep visibility into request parameters, schemas, and errors. Stop wasting time digging through logs."
          />
          <Meta
            name="twitter:image"
            content="https://opengraph.b-cdn.net/production/images/8d2e20de-d11d-4447-80da-2238b5461814.png?token=tj4OmcGwjOGUNuldbt27dG0UAkUmfVuInKaSLm1GVGY&height=628&width=1200&expires=33270737597"
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
