// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { Spotter } from "@spotter/solidstart";

Spotter.init({
  apikey: "your_api_key",
  projectId: "your_project_id",
  debugUrl: "https://webhook.site/8a58b0c2-bb51-46b1-be47-ce684f8abf47",
  environment: "debug",
  logLevel: "verbose",
});

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
