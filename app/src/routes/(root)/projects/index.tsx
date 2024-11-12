import { MoreHorizontal } from "lucide-solid";
import { For } from "solid-js";
import { Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

const Projects = () => {
  return (
    <div class="flex-1 overflow-auto p-4 space-y-4">
      {
        <For
          each={[
            {
              id: "1",
              projectLabel: "Ecommerce service",
              baseUrl: "http://localhost:3000",
              platform: "mac",
              timestamp: "27828228",
            },
          ]}
        >
          {(item) => (
            <ProjectListCard
              id={item.id}
              baseUrl={item.baseUrl}
              platform={item.platform}
              projectLabel={item.projectLabel}
              timestamp={item.timestamp}
            />
          )}
        </For>
      }
    </div>
  );
};

const ProjectListCard = (props: {
  id: string;
  projectLabel: string;
  baseUrl: string;
  platform: string;
  timestamp: string;
}) => {
  return (
    <Card class="flex bg-background font-geistsans flex-col sm:flex-row items-start sm:items-center gap-4 p-4  rounded-lg  group">
      <div class="pl-2 flex-1 min-w-0 space-y-1 sm:space-y-2">
        <div class="flex items-start sm:items-center gap-2 flex-wrap">
          {/* <span class="font-medium text-sm">{error().name}</span> */}
          <span class="font-medium text-sm">{props.projectLabel}</span>
          <span class=" text-sm hidden sm:inline font-light">
            {props.baseUrl}
          </span>
        </div>

        <div class="text-sm  space-x-3 truncate">
          {/* <span>{props.request.method}</span> */}{" "}
          <span>{props.baseUrl}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span class="font-medium text-xs ">{props.platform}</span>
          <span class="text-gray-600/75">{props.timestamp}</span>
        </div>
      </div>
      <div class="flex items-center gap-4 w-full sm:w-auto">
        <Button
          variant={"outline"}
          size={"icon"}
          class="p-1.5 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal class="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export default Projects;
