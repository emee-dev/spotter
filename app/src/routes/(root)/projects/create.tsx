import { useSubmission } from "@solidjs/router";
import { Loader, RotateCw } from "lucide-solid";
import { Show } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { createProjectAction } from "~/lib/db/action";

export default function CreateNewProject() {
  const submission = useSubmission(createProjectAction);

  return (
    <div class="flex h-screen w-full items-center justify-center">
      <Card class="mx-auto w-[24rem] md:w-[500px] ">
        <CardHeader>
          <CardTitle class="text-2xl">Create a new Project</CardTitle>
          <CardDescription>
            Enter your details below to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form class="grid gap-4" action={createProjectAction} method="post">
            <div class="grid gap-2">
              <TextField>
                <TextFieldLabel for="projectLabel">
                  Project Label
                </TextFieldLabel>
                <TextFieldInput
                  required
                  id="projectLabel"
                  name="projectLabel"
                  type="text"
                  class="mt-2"
                  autocomplete="off"
                  placeholder="Ecommerce Mircoservice"
                />
              </TextField>
            </div>
            <div class="grid gap-2">
              <TextField>
                <TextFieldLabel for="baseUrl">Base url</TextFieldLabel>
                <TextFieldInput
                  required
                  id="baseUrl"
                  name="baseUrl"
                  type="text"
                  placeholder="http://localhost:3000/"
                />
              </TextField>
            </div>
            <div class="mt-2">
              <Show
                when={submission.pending}
                fallback={
                  <Button
                    type="submit"
                    class="w-full mb-2 flex transition-all items-center"
                  >
                    Submit
                  </Button>
                }
              >
                {(_) => (
                  <Button
                    disabled
                    type="submit"
                    class="w-full mb-2 flex transition-all items-center"
                  >
                    Submitting <Loader class="ml-2 size-4 animate-spin" />
                  </Button>
                )}
              </Show>
            </div>
          </form>

          <Show when={submission.error as Error}>
            {(error) => (
              <div class="text-sm leading-3 tracking-tight text-red-400">
                {error().message}
              </div>
            )}
          </Show>
        </CardContent>
        <CardContent class="mt-2">
          <a href="/projects">
            <Button
              type="button"
              variant="outline"
              class="w-full mb-2 flex transition-all items-center"
            >
              Discard
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
