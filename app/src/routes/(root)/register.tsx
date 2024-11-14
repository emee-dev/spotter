import { A, useSubmission } from "@solidjs/router";
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
import { Label } from "~/components/ui/label";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { registerFormAction } from "~/lib/auth/action";

export default function RegisterPage() {
  const submission = useSubmission(registerFormAction);

  return (
    <div class="flex h-screen w-full items-center justify-center">
      <Card class="mx-auto w-[24rem] md:w-[500px] ">
        <CardHeader>
          <CardTitle class="text-2xl">Create account</CardTitle>
          <CardDescription>
            Enter your email below to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form class="grid gap-4" action={registerFormAction} method="post">
            <div class="grid gap-2">
              <TextField>
                <TextFieldLabel for="email">Email</TextFieldLabel>
                <TextFieldInput
                  required
                  id="email"
                  name="email"
                  type="email"
                  class="mt-2"
                  autocomplete="off"
                  placeholder="email@example.com"
                />
              </TextField>
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="#" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <TextField>
                <TextFieldInput
                  required
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                />
              </TextField>
            </div>

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
          </form>
          <Show when={submission.error as Error}>
            {(error) => (
              <div class="text-sm leading-3 tracking-tight text-red-400">
                {error().message}
              </div>
            )}
          </Show>
          <div class="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" class="underline">
              Login now
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
