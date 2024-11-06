import { A } from "@solidjs/router";
import { createSignal, Match, Show, Switch } from "solid-js";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = createSignal<"email" | "visitorId">(
    "email"
  );

  return (
    <div class="flex h-screen w-full items-center justify-center">
      <Card class="mx-auto w-[24rem] md:w-[500px] ">
        <CardHeader>
          <CardTitle class="text-2xl">Welcome back</CardTitle>
          <CardDescription>Enter your email below to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="grid gap-4">
            <div class="grid gap-2">
              <Label for="login-method" class="mb-2">
                How would you like to sign in?
              </Label>
              <Select
                value={loginMethod()}
                onChange={setLoginMethod}
                options={["email", "visitorId"]}
                placeholder="Select a login method"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
              >
                <SelectTrigger>
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="grid gap-2">
              {
                <TextField>
                  <Switch
                    fallback={
                      <>
                        <TextFieldLabel for="email">Visitor Id</TextFieldLabel>
                        <TextFieldInput
                          required
                          disabled
                          type="text"
                          id="visitorId"
                          autocomplete="off"
                          placeholder="Visitor Id"
                          class="mt-2"
                        />
                      </>
                    }
                  >
                    <Match when={loginMethod() === "email"}>
                      <TextFieldLabel for="email">Email</TextFieldLabel>
                      <TextFieldInput
                        required
                        id="email"
                        type="email"
                        class="mt-2"
                        autocomplete="off"
                        placeholder="email@example.com"
                      />
                    </Match>
                  </Switch>
                </TextField>
              }
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
                  type="password"
                  placeholder="Your password"
                />
              </TextField>
            </div>
            <Button type="submit" class="w-full mb-2">
              Sign In
            </Button>
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            {/* <Button variant="outline" class="w-full">
              Sign In with Your Browser
            </Button> */}
          </form>
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
