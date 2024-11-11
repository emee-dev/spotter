import { Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { logout } from "~/lib/auth/action";
import { getLoggedUser } from "~/lib/auth/user";

export const route = {
  preload() {
    return getLoggedUser();
  },
};

export default function Protected() {
  const user = createAsync(() => getLoggedUser(), { deferStream: true });

  return (
    <main>
      <Title>Protected</Title>
      <div class="grid place-items-center pt-10">
        <h1 class="text-2xl text-neutral-500 font-bold pb-10">Protected</h1>
        <p class="pb-5">
          This route has protected data, if you try to acces it while logged
          out, you'll be redirected
        </p>
        <Show when={user()?.email} fallback="not logged in">
          {(email) => (
            <table>
              <tbody>
                <tr>
                  <td>
                    <span class="font-bold">User</span>
                  </td>
                  <td>
                    <p>{email()}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </Show>

        <form class="bg-red-200 mt-14" action={logout} method="post">
          <Button type="submit">Sign out</Button>
        </form>
      </div>
    </main>
  );
}
