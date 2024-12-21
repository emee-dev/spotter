import { Button } from "~/components/ui/button";

function ErrorMessage(props: { err?: any; reset: () => void }) {
  return (
    <div class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md text-center">
        <div class="mx-auto h-12 w-12 text-primary" />
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p class="mt-4 text-muted-foreground">
          {props.err?.message || "An unexpected error has occurred."}
          {/* {"An unexpected error has occurred."} */}
          {console.log(props.err.toString())}
        </p>
        <div class="mt-6">
          <Button
            onClick={props.reset}
            class="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try Again
          </Button>
          <a
            href="#"
            class="ml-4 inline-flex items-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
