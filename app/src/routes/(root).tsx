import { createAsync, RouteDefinition } from "@solidjs/router";
import { ParentProps, Suspense } from "solid-js";
import { getSessionUser } from "~/lib/auth/session";
import "@fontsource/geist-sans";
import "@fontsource-variable/source-code-pro";

// export const route: RouteDefinition = {
//   preload: async () => {
//     return getSessionUser();
//   },
// };

export default function Layout(props: ParentProps) {
  //   const user = createAsync(() => getSessionUser());

  return <main class="">{props.children}</main>;
}
