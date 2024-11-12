import type { APIEvent } from "@solidjs/start/server";
import { withSpotter } from "@spotter/solidstart";

export const GET = withSpotter(async (event) => {
  console.log("Server root is good.");
  return Response.json({ message: "Hello" });
});

// Has error but with trycatch block
export const POST = withSpotter(async (event: APIEvent) => {
  try {
    let params = (await event.request.json()) as { name: string };

    if (!params.name) {
      throw new Error("Params is not defined");
    }

    console.log("params:", params);

    return Response.json(
      { message: "Hello" },
      {
        headers: {
          "cache-control": "max-age=60",
        },
      }
    );
  } catch (error: any) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
});

// Will error out or response valid response returned.
export const PUT = withSpotter(async (event: APIEvent) => {
  let params = (await event.request.json()) as { name: string };

  if (!params.name) {
    throw new Error("Params is not defined");
  }

  console.log("params:", params);

  return Response.json(
    { message: "Hello" },
    {
      headers: {
        "cache-control": "max-age=60",
      },
    }
  );
});
