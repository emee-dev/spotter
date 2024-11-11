import { A, useSubmission } from "@solidjs/router";
import { RotateCw } from "lucide-solid";
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
import { loginFormAction } from "~/lib/auth/action";

export default function LoginPage() {
  const submission = useSubmission(loginFormAction);

  return (
    <div class="flex h-screen w-full items-center justify-center">
      <Card class="mx-auto w-[24rem] md:w-[500px] ">
        <CardHeader>
          <CardTitle class="text-2xl">Welcome back</CardTitle>
          <CardDescription>Enter your email below to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="grid gap-4" action={loginFormAction} method="post">
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
                <A href="#" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </A>
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
                  type="submit"
                  class="w-full mb-2 flex transition-all items-center"
                >
                  Submitting <RotateCw class="ml-2 size-4 animate-spin" />
                </Button>
              )}
            </Show>
            {/* <input type="hidden" name="type" value="login" /> */}
          </form>
          <div>{submission.error?.message || "No error"}</div>
          <div class="mt-5 text-center text-sm">
            Don't have an account?{" "}
            <A href="/register" class="underline">
              Create one now
            </A>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
