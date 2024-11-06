import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-solid";
import { createSignal } from "solid-js";

export default function CodeBlock() {
  const [isCopied, setIsCopied] = createSignal(false);
  const [isExpanded, setIsExpanded] = createSignal(false);

  const codeSnippet = `const JavaScriptCodeBlock = () => {
  return (
    <pre class="rounded-lg p-4 bg-muted border overflow-x-auto">
      <code class="text-sm font-mono">
        {/* Your JavaScript code goes here */}
      </code>
    </pre>
  );
};`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded());
  };

  return (
    <Card class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <CardHeader class="pb-0">
        <CardTitle class="text-lg sm:text-xl md:text-2xl">
          Code Snippet
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-xs sm:text-sm text-muted-foreground">
          Example usage of the component in your app.
        </p>
        <div class="w-full relative">
          <div class="absolute top-2 right-2 flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8"
              onClick={() => {
                toggleExpand();
              }}
              aria-label={
                isExpanded() ? "Collapse code block" : "Expand code block"
              }
            >
              {isExpanded() ? (
                <ChevronUp class="h-4 w-4" />
              ) : (
                <ChevronDown class="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8"
              onClick={copyToClipboard}
              aria-label="Copy code to clipboard"
            >
              {isCopied() ? (
                <Check class="h-4 w-4" />
              ) : (
                <Copy class="h-4 w-4" />
              )}
            </Button>
          </div>
          <div class={`relative ${isExpanded() ? "" : "h-16 overflow-hidden"}`}>
            <pre class="rounded-lg p-2 sm:p-4 bg-muted border overflow-x-auto">
              <code class="text-xs sm:text-sm md:text-base font-mono">
                {codeSnippet}
              </code>
            </pre>
            {!isExpanded() && (
              <div class="absolute inset-0 bg-muted/50 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  class="text-muted-foreground hover:text-foreground"
                  onClick={() => toggleExpand()}
                >
                  <ChevronDown class="h-4 w-4 mr-2" />
                  Expand code
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
