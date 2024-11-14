import bcrypt from "bcrypt";
import jsonToZod from "json-schema-to-zod";
import { nanoid } from "nanoid";
import toJsonSchema from "to-json-schema";
import { getEndpoint } from "~/lib/utils";
import { AccountError, errors } from "../config";
import prisma, { Prisma } from "./prisma";
// @ts-expect-error ts error
import { format } from "prettier";

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

export type Projects = {
  projectId: string; // unqiue
  projectLabel: string;
  baseUrl: string;
  /** The `email` of the creator */
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

  let doesUserExist = await prisma.users.findFirst({
    where: {
      email: args.createdBy,
    },
  });

  if (!doesUserExist) {
    throw new Error("Unable to create project, try again.");
  }

  let new_record = await prisma.projects.create({
    data: {
      xata_id: nanoid(),
      baseUrl: args.baseUrl,
      projectId: args.projectId,
      createdBy: doesUserExist.email,
      serviceType: args.serviceType,
      projectLabel: args.projectLabel,
    },
  });

  if (!new_record) {
    throw new Error("Unable to create project, please retry.");
  }

  return new_record;
};

export const getProjectStatsById = async (args: { projectId: string }) => {
  "use server";

  const record = await prisma.projects.findFirst({
    where: {
      projectId: args.projectId,
    },
  });

  if (!record) {
    throw new Error("Unable to find record, please try again.");
  }

  // Run the count queries in parallel
  const [requestCount, endpointsCount] = await Promise.all([
    prisma.project_requests.count({
      where: {
        projectId: args.projectId,
      },
    }),
    prisma.project_endpoints.count({
      where: {
        projectId: args.projectId,
      },
    }),
  ]);

  const stats = [
    {
      label: "Requests",
      value: requestCount || 0,
      icon: "Box",
      color: "text-blue-500",
    },
    {
      label: "Endpoints",
      value: endpointsCount || 0,
      icon: "Radio",
      color: "text-purple-500",
    },
  ] as const;

  return stats;
};

export const createRequest = async (
  args: ProjectRequests & {
    requestSchema: string;
    responseSchema: string | null;
  }
) => {
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
        requestSchema: args.requestSchema || undefined,
        responseSchema: args.responseSchema || undefined,
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

export const getRequestById = async (args: { xata_id: string }) => {
  "use server";

  const record = await prisma.project_requests.findFirst({
    where: {
      xata_id: args.xata_id,
    },
  });

  if (!record) {
    throw new Error("Unable to find request, please try again.");
  }

  return record;
};

export const listAllProjects = async (args: { email: string }) => {
  "use server";

  const doesUserExist = await prisma.users.findFirst({
    where: {
      email: args.email,
    },
  });

  if (!doesUserExist) {
    throw new Error("User does not exist");
  }

  const findRecords = await prisma.projects.findMany({
    where: {
      createdBy: args.email,
    },
  });

  return findRecords || [];
};

export const listAllRequests = async (args: {
  projectId: string;
  page?: number;
  pageSize?: number;
}) => {
  "use server";

  const { projectId, page = 1, pageSize = 10 } = args;

  const [count, records] = await prisma.$transaction([
    prisma.project_requests.count(),
    prisma.project_requests.findMany({
      where: {
        projectId: projectId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return { count, records };
};

export const listAllEndpoints = async (args: {
  projectId: string;
  page?: number;
  pageSize?: number;
}) => {
  "use server";

  const { projectId, page = 1, pageSize = 10 } = args;

  const [count, records] = await prisma.$transaction([
    prisma.project_endpoints.count(),
    prisma.project_endpoints.findMany({
      where: {
        projectId: projectId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return { count, records };
};
