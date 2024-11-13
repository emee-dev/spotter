import { ParentProps } from "solid-js";
// import { getSessionUser } from "~/lib/auth/session";

// export const route: RouteDefinition = {
//   preload: async () => {
//     return getSessionUser();
//   },
// };

export default function Layout(props: ParentProps) {
  //   const user = createAsync(() => getSessionUser());

  return <main class="">{props.children}</main>;
}
