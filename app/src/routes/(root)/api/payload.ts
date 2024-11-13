// import zodToJsonSchema from "zod-to-json-schema";
// import jsonSchemaToZod from "json-schema-to-zod";
import type { APIEvent } from "@solidjs/start/server";
import type { SpotterPayload } from "@spotter/types";
import { verifyKey } from "@unkey/api";

import { env } from "~/env";
import { formatZodError, SpotterPayloadSchema } from "~/schema";

export const POST = async (event: APIEvent) => {
  try {
    const params = (await event.request.json()) as { data: SpotterPayload };

    const result = SpotterPayloadSchema.safeParse(params.data);

    if (!result.success) {
      return Response.json(
        {
          message: "Schema error",
          data: formatZodError(result.error),
        },
        { status: 404 }
      );
    }

    const { result: unkey_result, error: unkey_error } = await verifyKey({
      key: params.data.spotter.apiKey,
      apiId: env().UNKEY_API_ID,
    });

    if (unkey_error) {
      // handle potential network or bad request error
      // a link to our docs will be in the `error.docs` field
      console.error(unkey_error.message);
      return;
    }

    if (!unkey_result.valid) {
      // do not grant access
      return;
    }

    const { error, spotter, request, response, stack, system, timestamp } =
      params.data;

    // const isValidKey = "";

    // const findProject = await createRequest({
    //   error: error,
    //   projectId: spotter.projectId,
    //   request,
    //   response,
    //   stack,
    //   system,
    //   timestamp,
    // });

    return Response.json(
      { message: "Payload recieved", data: params.data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Internal server error, please try again.",
      },
      { status: 500 }
    );
  }
};
