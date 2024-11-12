import { action, redirect } from "@solidjs/router";
import { createProject, updateProjectDetails } from ".";
import { getLoggedUser } from "../auth/user";
import { errors } from "../config";
import { genProjectId } from "../utils";

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

export const updateProjectAction = action(async (formData: FormData) => {
  "use server";

  const user = await getLoggedUser();
  const baseUrl = String(formData.get("baseUrl")).trim();
  const projectLabel = String(formData.get("projectLabel")).trim();
  const projectId = String(formData.get("projectId")).trim();

  if (!baseUrl || !projectLabel) {
    throw new Error(errors.MISSING_FIELDS.message);
  }

  try {
    await updateProjectDetails({
      baseUrl,
      projectId,
      projectLabel,
      email: user.email,
    });
  } catch (error: any) {
    throw error;
  }

  throw redirect(AFTER_CREATE_PROJECT_REDIRECT);
});
