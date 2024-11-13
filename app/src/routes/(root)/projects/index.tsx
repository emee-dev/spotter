import { formatDateRelative } from "@solid-primitives/date";
import { createAsync, query } from "@solidjs/router";
import { Link, MoreHorizontal } from "lucide-solid";
import { ErrorBoundary, For } from "solid-js";
import ErrorMessage from "~/components/error";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { getLoggedUser } from "~/lib/auth/user";
import { listAllProjects } from "~/lib/db";

const listProjects = query(async () => {
  const user = await getLoggedUser();
  const response = await listAllProjects({ email: user.email });

  return response;
}, "listProjects");

export const route = {
  preload: () => listProjects(),
};

const Projects = () => {
  const projects = createAsync(() => listProjects());

  return (
    <ErrorBoundary
      fallback={(msg, reload) => (
        <div class="flex items-center justify-center">
          <ErrorMessage />
        </div>
      )}
    >
      <div class="flex-1 overflow-auto p-4 space-y-4">
        <For
          each={projects()}
          fallback={
            <div class="flex items-center justify-center">Loading...</div>
          }
        >
          {(item) => {
            const targetDate = new Date(item.xata_createdat);
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            return (
              <ProjectListCard
                baseUrl={item.baseUrl}
                projectId={item.projectId}
                projectLabel={item.projectLabel}
                serviceType={item.serviceType}
                xata_createdat={difference}
              />
            );
          }}
        </For>
      </div>
    </ErrorBoundary>
  );
};

type Projects = {
  baseUrl: string;
  projectId: string;
  serviceType: string;
  projectLabel: string;
  xata_createdat: number;
};

const ProjectListCard = (props: Projects) => {
  return (
    <a href={`/projects/${props.projectId}`}>
      <Card class="flex bg-background font-inter group flex-col sm:flex-row items-start sm:items-center gap-4 p-4  rounded-lg  group">
        <div class="pl-2 flex-1 min-w-0 space-y-1 sm:space-y-3">
          <div class="flex items-center sm:items-center gap-2 flex-wrap">
            <span class="font-medium text-lg leading-3 tracking-tighter">
              {props.projectLabel}
            </span>
            <span class="text-sm hidden text-neutral-600 sm:items-center sm:gap-x-2 sm:flex font-light">
              {props.baseUrl}
              <Link class="size-3 mb-px hidden group-hover:block" />
            </span>
          </div>

          <div class="flex items-center space-x-2 text-sm">
            <div class="font-medium text-xs gap-x-1 flex items-center">
              <img
                src="https://avatars.githubusercontent.com/u/79226042?s=200&v=4"
                class="size-[25px] aspect-square"
              />
              <span>{props.serviceType}</span>
            </div>
            <span class="text-gray-600/75 tracking-tighter">
              {formatDateRelative(props.xata_createdat)}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <Button variant={"outline"} size={"icon"} class="p-1.5  rounded ">
            <MoreHorizontal class="size-4" />
          </Button>
        </div>
      </Card>
    </a>
  );
};

export default Projects;
