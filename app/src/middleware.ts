import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
  onRequest: [
    (event) => {
      //   console.log("GLOBAL", event.request.url);
      //   event.locals.aki = "One of the good ones.";
    },
  ],
  onBeforeResponse: [(event) => {}],
});
