import { action, redirect, revalidate } from "@solidjs/router";
import { getLoggedUser } from "./user";
import { getSessionUser, setSession, terminateSession } from "./session";
import { AccountError, errors } from "../config";
import { createUser, getUserRecord } from "../db";
import bcrypt from "bcrypt";
import { redisHasAccount, redisSetUserEmail } from "../redis";

export const AFTER_LOGIN_REDIRECT = "/projects";
export const UNAUTHORIZED_ROUTE = "/unauthorized";
export const AFTER_REGISTER_REDIRECT = "/login";

export const loginFormAction = action(async (formData: FormData) => {
  "use server";

  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password")).trim();

  if (!email || !password) {
    throw new Error(errors.MISSING_FIELDS.message);
  }

  try {
    const user = await getUserRecord({ email, password });

    await setSession(user.email);
    await redisSetUserEmail({
      email: user.email,
      hashPassword: user.hashPassword,
    });
  } catch (error: any) {
    if (error instanceof AccountError && error.name === "USER_NOT_FOUND") {
      throw redirect("/register");
    } else {
      console.log("error", error);

      throw error;
    }
  }

  throw redirect(AFTER_LOGIN_REDIRECT, {
    revalidate: [getSessionUser.key, getLoggedUser.key],
  });
});

export const registerFormAction = action(async (formData: FormData) => {
  "use server";

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!email || !password) {
    throw new Error(errors.MISSING_FIELDS.message);
  }

  // Check if user exists in cache
  const userExists = await redisHasAccount(email);
  if (userExists) {
    throw new Error(errors.USER_ALREADY_EXISTS.message);
  }

  // Create user record in database
  await createUser({ email, password });

  // Redirect user
  throw redirect(AFTER_REGISTER_REDIRECT, {
    revalidate: [getSessionUser.key, getLoggedUser.key],
  });
});

// Will log the user out
export const logout = action(async () => {
  "use server";

  await terminateSession();

  return revalidate("logged-user");
});
