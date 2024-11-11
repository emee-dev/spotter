import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { customAlphabet, nanoid } from "nanoid";
import { getEndpoint } from "~/lib/utils";
import { AccountError, errors } from "../config";
const prisma = new PrismaClient();

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const idLength = 8;

// Create the custom ID generator function
const generateId = customAlphabet(alphabet, idLength);

/* S

*** WARNING ***

These constraints are not supported by Prisma Client, because Prisma currently does not fully support check constraints. Read more: https://pris.ly/d/check-constraints
  - Model: "project_endpoints", constraint: "project_endpoints_xata_id_length_xata_id"
  - Model: "project_requests", constraint: "project_requests_xata_id_length_xata_id"
  - Model: "projects", constraint: "projects_xata_id_length_xata_id"
  - Model: "users", constraint: "users_xata_id_length_xata_id"
*/

type Users = {
  email: string; // unqiue
  password: string;
};

type Projects = {
  projectId: string; // unqiue
  projectLabel: string;
  baseUrl: string;
  /** The `userId` of the creator */
  createdBy: string;
  serviceType: "solidstart"; // more to come
};

type ProjectRequests = {
  projectId: string;
  error: {
    name: string;
    file: string;
    line: number;
    column: number;
    message: string;
    function: string;
  } | null;
  stack:
    | {
        file: string;
        line: number;
        column: number;
        function: string;
        method: string | null;
      }[]
    | null;
  request: {
    method: string;
    url: string;
    params: Record<string, string> | null;
    query: Record<string, string> | null;
    headers: Record<string, string> | null;
  };
  response: {
    status: number;
    params: Record<string, string> | null;
    headers: Record<string, string> | null;
  } | null;
  timestamp: string;
  system: {
    ip: string | null;
    arch: string;
    platform: string;
  };
};

// Helps to get an overview of all the endpoints
type ProjectEndpoints = {
  projectId: string;
  requestUrl: string;
};

export const getUserRecord = async (args: Users) => {
  "use server";

  const doesUserExist = await prisma.users.findFirst({
    where: {
      email: args.email,
    },
  });

  if (!doesUserExist) {
    throw new AccountError(
      errors.USER_NOT_FOUND.message,
      errors.USER_NOT_FOUND.name
    );
  }

  const isValid = await bcrypt.compare(
    args.password,
    doesUserExist.hashPassword
  );

  if (!isValid) {
    throw new AccountError(
      errors.PASSWORD_MISMATCH.message,
      errors.PASSWORD_MISMATCH.name
    );
  }

  return doesUserExist;
};

export const createUser = async (args: Users) => {
  "use server";

  const doesUserExist = await prisma.users.findFirst({
    where: {
      email: args.email,
    },
  });

  if (doesUserExist) {
    // TODO throw an error here then redirect later in a query fn
    // throw redirect("/login");
    return "User already exists";
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(args.password, salt);

  const userRecord = await prisma.users.create({
    data: {
      xata_id: nanoid(),
      email: args.email,
      hashPassword: hash,
    },
  });

  if (!userRecord) {
    return "Could not create account";
    // throw new Error("Could not create user record");
  }

  return userRecord;
};

export const createProject = async (args: Projects) => {
  "use server";

  let new_record = await prisma.projects.create({
    data: {
      xata_id: nanoid(),
      baseUrl: args.baseUrl,
      projectId: args.projectId,
      createdBy: args.createdBy,
      serviceType: args.serviceType,
      projectLabel: args.projectLabel,
    },
  });

  if (!new_record) {
    throw new Error("Unable to create project, please retry.");
  }

  return new_record;
};

export const createRequest = async (args: ProjectRequests) => {
  "use server";

  const endpoint = getEndpoint(args.request.url);

  const result = await prisma.$transaction(async (tx) => {
    const doesProjectExist = await tx.projects.findFirst({
      where: {
        projectId: args.projectId,
      },
    });

    if (!doesProjectExist) {
      throw new Error(`Could not find project with id: ${args.projectId}.`);
    }

    const new_request = await tx.project_requests.create({
      data: {
        xata_id: nanoid(),
        projectId: doesProjectExist.projectId,
        request: args.request as Prisma.JsonObject,
        error: (args.error as Prisma.JsonObject) || undefined,
        response: (args.response as Prisma.JsonObject) || undefined,
        stack: (args.stack as Prisma.JsonArray) || undefined,
        system: args.system as Prisma.JsonObject,
        timestamp: args.timestamp,
      },
    });

    if (!new_request || !new_request.xata_id) {
      throw new Error("Was unable to insert the new request.");
    }

    const doesEndpointExist = await tx.project_endpoints.findUnique({
      where: {
        projectId: doesProjectExist.projectId,
        requestUrl: endpoint,
      },
    });

    if (!doesEndpointExist) {
      const storeEndpoint = await tx.project_endpoints.create({
        data: {
          xata_id: nanoid(),
          projectId: args.projectId,
          requestUrl: endpoint,
        },
      });

      if (!storeEndpoint) {
        throw new Error(`Could not store the project endpoint: ${endpoint}`);
      }
    }

    return new_request;
  });

  return result;
};
