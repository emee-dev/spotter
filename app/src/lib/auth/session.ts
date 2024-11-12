import { query, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";
import { env } from "~/env";
import { redisRemoveData } from "../redis_session";

export interface SessionData {
  email: string | undefined | null;
}

export function getSession() {
  "use server";

  return useSession<SessionData>({
    password: env.SESSION_SECRET,
  });
}

export const protect = query(async () => {
  "use server";

  const user = await getSessionUser();
  if (!user) {
    throw redirect("/unauthorized");
  }

  return null;
}, "protect");

export const getSessionUser = query(async () => {
  "use server";

  const { data } = await getSession();

  return Boolean(data.email) ? data : null;
}, "session-user");

export async function setSession(email: string) {
  "use server";
  const session = await getSession();
  await session.update((user: SessionData) => ((user.email = email), user));
}

export async function terminateSession() {
  "use server";
  const session = await getSession();

  await redisRemoveData(session.data.email as string);

  await session.update((user: SessionData) => {
    user.email = undefined;

    return user;
  });
}
