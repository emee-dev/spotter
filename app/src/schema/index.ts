import { z, ZodError } from "zod";

// Type for INVALID_RESPONSE_BODY
export const InvalidResponseBodySchema = z.literal("INVALID_JSON_BODY");

// Zod schema for the SpotterPayload error object
const ErrorSchema = z.object({
  name: z.string(),
  file: z.string(),
  line: z.number(),
  column: z.number(),
  message: z.string(),
  function: z.string(),
});

// Zod schema for the stack items in SpotterPayload and SpotterPayloadWithRuntimeError
const StackItemSchema = z.object({
  file: z.string(),
  line: z.number(),
  column: z.number(),
  function: z.string(),
  method: z.string().nullable(),
});

// Zod schema for the SpotterPayload request object
const RequestSchema = z.object({
  method: z.string(),
  url: z.string(),
  params: z.record(z.string()).nullable(),
  query: z.record(z.string()).nullable(),
  headers: z.record(z.string()).nullable(),
});

// Zod schema for the SpotterPayload response object
const ResponseSchema = z
  .object({
    status: z.number(),
    params: z.record(z.string()).nullable(),
    headers: z.record(z.string()).nullable(),
  })
  .nullable();

// Zod schema for the SpotterPayload spotter object
const SpotterSchema = z.object({
  apiKey: z.string(),
  projectId: z.string(),
});

// Zod schema for the SpotterPayload system object
const SystemSchema = z.object({
  ip: z.string().nullable(),
  arch: z.string(),
  platform: z.string(),
});

// Main SpotterPayload schema
export const SpotterPayloadSchema = z.object({
  error: ErrorSchema.nullable(),
  stack: z.array(StackItemSchema).nullable(),
  request: RequestSchema,
  response: ResponseSchema,
  timestamp: z.string(),
  spotter: SpotterSchema,
  system: SystemSchema,
});

export const formatZodError = <T>(error: ZodError<T>) => {
  return error.errors.map((i) => `Path: '${i.path.join(".")}' - ${i.message}`);
};
