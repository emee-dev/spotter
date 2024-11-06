import { A } from "@solidjs/router";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

export default function Page() {
  return (
    <div class="flex h-screen w-full items-center justify-center px-4">
      <Card class="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle class="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <A href="#" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </A>
              </div>
              <input id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full">
              Login
            </Button>
            <Button variant="outline" class="w-full">
              Login with Google
            </Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <A href="#" class="underline">
              Sign up
            </A>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
