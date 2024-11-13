import { action, redirect } from "@solidjs/router";
import { createProject, updateProjectDetails } from ".";
import { getLoggedUser } from "../auth/user";
import { errors } from "../config";
import { genProjectId } from "../utils";
import { Unkey } from "@unkey/api";
import { env } from "~/env";

const AFTER_CREATE_PROJECT_REDIRECT = "/projects";

export const createProjectAction = action(async (formData: FormData) => {
  "use server";

  const user = await getLoggedUser();
  const baseUrl = String(formData.get("baseUrl")).trim();
  const projectLabel = String(formData.get("projectLabel")).trim();

  if (!baseUrl || !projectLabel) {
    throw new Error(errors.MISSING_FIELDS.message);
  }

  try {
    await createProject({
      baseUrl,
      projectLabel,
      createdBy: user.email,
      projectId: genProjectId(),
      serviceType: "solidstart",
    });
  } catch (error: any) {
    throw error;
  }

  throw redirect(AFTER_CREATE_PROJECT_REDIRECT);
});

// export const updateProjectAction = action(async (formData: FormData) => {
//   "use server";

//   const user = await getLoggedUser();
//   const baseUrl = String(formData.get("baseUrl")).trim();
//   const projectLabel = String(formData.get("projectLabel")).trim();
//   const projectId = String(formData.get("projectId")).trim();

//   if (!baseUrl || !projectLabel) {
//     throw new Error(errors.MISSING_FIELDS.message);
//   }

//   try {
//     await updateProjectDetails({
//       baseUrl,
//       projectId,
//       projectLabel,
//       email: user.email,
//     });
//   } catch (error: any) {
//     throw error;
//   }

//   throw redirect(AFTER_CREATE_PROJECT_REDIRECT);
// });

export const createProjectAPIKey = action(async (formData: FormData) => {
  "use server";
  const unkey = new Unkey({ rootKey: env().UNKEY_ROOT_KEY });

  const projectId = String(formData.get("projectId")).trim();

  const { error, result } = await unkey.keys.create({
    apiId: env().UNKEY_API_ID,
    prefix: "spotter",
    meta: {
      projectId,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const keyId = result.keyId;
  const apiKey = result.key;

  console.log({ keyId, apiKey });

  return { apiKey };
});
