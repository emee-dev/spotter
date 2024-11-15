import type { APIEvent } from "@solidjs/start/server";
import type { SpotterPayload } from "@spotter.dev/spotter_types";
import { verifyKey } from "@unkey/api";
import jsonToZod from "json-schema-to-zod";
import toJsonSchema from "to-json-schema";
import { env } from "~/env";
import { formatZodError, SpotterPayloadSchema } from "~/schema";
// @ts-expect-error ts error
import { format } from "prettier";
import { createRequest } from "~/lib/db";

export const POST = async (event: APIEvent) => {
  try {
    const params = (await event.request.json()) as { data: SpotterPayload };

    const result = SpotterPayloadSchema.safeParse(params.data);

    if (!result.success) {
      console.log("Schema error:", result.error.errors);

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
      return Response.json(
        {
          message: "Internal server error, please try again.",
          data: null,
        },
        { status: 500 }
      );
    }

    if (!unkey_result.valid) {
      // do not grant access
      return Response.json(
        {
          message: "Permission denied, please refrain from dubious activites.",
          data: null,
        },
        { status: 403 }
      );
    }

    const { error, spotter, request, response, stack, system, timestamp } =
      params.data;

    const requestSchema = (await format(jsonToZod(toJsonSchema(request)), {
      parser: "typescript",
    })) as string;

    const responseSchema: string | null =
      response !== null || response !== undefined
        ? await format(jsonToZod(toJsonSchema(response)), {
            parser: "typescript",
          })
        : null;

    await createRequest({
      error: error,
      request,
      response,
      stack,
      system,
      timestamp,
      requestSchema,
      responseSchema,
      projectId: spotter.projectId,
    });

    return Response.json(
      { message: "Payload recieved", data: null },
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
