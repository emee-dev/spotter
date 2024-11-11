import { query, redirect } from "@solidjs/router";
import { getSessionUser } from "../auth/session";
import { redisGetUserByEmail } from "../redis";
import { UNAUTHORIZED_ROUTE } from "./action";

export const getLoggedUser = query(async () => {
  "use server";
  const session = await getSessionUser();

  const user = await redisGetUserByEmail(session?.email ?? "");

  if (!user) {
    throw redirect(UNAUTHORIZED_ROUTE);
  }

  return user;
}, "logged-user");
