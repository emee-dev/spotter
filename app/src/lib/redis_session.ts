import redis from "./redis";

type Credentials = {
  email: string;
  hashPassword: string;
};

export const redisSetUserEmail = async (args: Credentials) => {
  "use server";
  return await redis.set(args.email, JSON.stringify(args));
};

export const redisGetUserByEmail = async (
  email: Credentials["email"]
): Promise<Credentials | null> => {
  "use server";
  const data = await redis.get<string>(email);

  if (!data) {
    return null;
  }

  return data as unknown as Credentials;
};

export const redisHasAccount = async (email: Credentials["email"]) => {
  "use server";
  const data = await redis.exists(email);

  if (data && data === 1) {
    return true;
  } else {
    return false;
  }
};

export const redisRemoveData = async (email: Credentials["email"]) => {
  "use server";
  const isDeleted = await redis.del(email);

  if (isDeleted && isDeleted === 1) {
    return true;
  } else {
    return false;
  }
};
