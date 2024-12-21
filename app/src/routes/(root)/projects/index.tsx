import { createAsync, query } from "@solidjs/router";
import { Globe, MoreVertical } from "lucide-solid";
import { createResource, ErrorBoundary, For } from "solid-js";
import ErrorMessage from "~/components/error";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getLoggedUser } from "~/lib/auth/user";
import { listAllProjects } from "~/lib/db";
import { getRelativeTime } from "~/lib/utils";

const listProjects = query(async () => {
  const user = await getLoggedUser();
  const response = await listAllProjects({ email: user.email });

  return response;
}, "listProjects");

// export const route = {
//   preload: () => listProjects(),
// };

const Projects = () => {
  // const projects = createAsync(() => listProjects(), { deferStream: true });
  const [projects] = createResource(async () => await listProjects());

  return (
    <ErrorBoundary
      fallback={(err, reset) => <ErrorMessage err={err} reset={reset} />}
    >
      <div class="flex-1 overflow-auto p-4 space-y-4">
        <For
          each={projects()}
          fallback={
            <div class="flex items-center justify-center">Loading...</div>
          }
        >
          {(item) => (
            <ProjectCard
              baseUrl={item.baseUrl}
              projectId={item.projectId}
              projectLabel={item.projectLabel}
              serviceType={item.serviceType}
              xata_createdat={item.xata_createdat}
            />
          )}
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
  xata_createdat: Date;
};

function ProjectCard(props: Projects) {
  return (
    <a href={`/projects/${props.projectId}`}>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {props.projectLabel}
          </CardTitle>
          {/* <Button variant="ghost" size="icon">
            <MoreVertical class="w-4 h-4" />
            <span class="sr-only">More options</span>
          </Button> */}
        </CardHeader>
        <CardContent>
          <div class="text-sm text-muted-foreground overflow-hidden overflow-ellipsis whitespace-nowrap">
            <Globe class="inline w-3 h-3 mr-1" />
            {props.baseUrl}
          </div>
        </CardContent>
        <CardFooter>
          <div class="flex items-center text-xs text-muted-foreground">
            <div class="w-2 h-2 mr-2 rounded-full bg-green-500" />
            {"active"}
            <span class="mx-2">•</span>
            Last updated {getRelativeTime(props.xata_createdat)}
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}

export default Projects;
