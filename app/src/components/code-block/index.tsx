import { codeToHtml } from "shiki";
import { createEffect, createResource, onCleanup, Show } from "solid-js";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Copy } from "lucide-solid";
import { createCopy } from "~/hooks";

const CodeBlock = (props: {
  code: string;
  lang: "json" | "javascript";
  class?: string;
}) => {
  let containerRef!: HTMLDivElement;

  const [html] = createResource(async () => {
    return (await codeToHtml(props.code, {
      lang: props.lang,
      theme: "slack-dark",
    })) as string;
  });

  const [_, setCopyValue] = createCopy();

  onCleanup(() => {
    if (containerRef) {
      containerRef.innerHTML = "";
    }
  });

  createEffect(() => {
    if (html() && containerRef) {
      containerRef.innerHTML = html() as string;
    }
  });

  return (
    <Show
      when={!html.loading}
      fallback={
        <div class={cn("p-3 rounded-lg font-mono text-sm", props.class)}>
          Loading code block
        </div>
      }
    >
      <>
        <Button
          variant="outline"
          size="icon"
          class="absolute top-2 right-2 size-7"
          onClick={() => {
            setCopyValue(props.code);
          }}
        >
          <Copy class="size-4" />
        </Button>
        <div
          ref={containerRef}
          class={cn(
            "[&>*]:p-3 [&>*]:rounded-lg [&>*]:font-mono [&>*]:text-sm",
            props.class
          )}
        ></div>
      </>
    </Show>
  );
};

export default CodeBlock;
