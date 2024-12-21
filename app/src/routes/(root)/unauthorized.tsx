import { A } from "@solidjs/router";
import { AlertCircle } from "lucide-solid";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

export default function UnauthorizedAccess() {
  return (
    <div class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card class="mx-auto max-w-md w-full">
        <CardHeader>
          <div class="flex justify-center">
            <AlertCircle class="size-8 text-destructive" aria-hidden="true" />
          </div>
          <CardTitle class="mt-4 text-center text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Unauthorized Access
          </CardTitle>
          <CardDescription class="mt-2 text-base text-center text-muted-foreground">
            Sorry, you don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-center">
          <p class="text-muted-foreground">
            Please log in or return to the homepage.
          </p>
        </CardContent>
        <CardFooter class="flex flex-col space-y-3">
          <a href="/login" class="w-full">
            <Button class="w-full">Log In</Button>
          </a>
          <a href="/" class="w-full">
            <Button variant="outline" class="w-full">
              Go to Homepage
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
