import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 class="text-2xl font-bold mb-4">404 - Page Not Found</h1>
      <p class="text-xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button>
        <a href="/">Return to Home</a>
      </Button>
    </div>
  );
}
