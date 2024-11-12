import redis from "../redis";

type Stats = { requestCount?: number; endpointsCount?: number };

export const setStats = async (stat: `stats:${string}`, args: Stats) => {
  // Retrieve the existing stats
  const existingStats = await getStats(stat);

  // Merge existing stats with new values from args
  const updatedStats = {
    ...existingStats,
    ...args,
  };

  // Save the updated stats back to Redis
  await redis.set(stat, JSON.stringify(updatedStats));
};

export const getStats = async (stat: `stats:${string}`) => {
  const data = (await redis.get(stat)) as Stats;

  return data ? data : null;
};
