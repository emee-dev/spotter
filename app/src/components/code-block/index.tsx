import { codeToHtml } from "shiki";
import { createResource, onCleanup } from "solid-js";
import { cn } from "~/lib/utils";

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

  onCleanup(() => {
    if (containerRef) {
      containerRef.innerHTML = "";
    }
  });

  // createEffect(() => {
  //   if (html() && containerRef) {
  //     containerRef.innerHTML = html() as string;
  //   }
  // });

  return (
    <div
      ref={containerRef}
      class={cn(
        "[&>*]:p-3 [&>*]:rounded-lg [&>*]:font-mono [&>*]:text-sm",
        props.class
      )}
      innerHTML={html()}
    ></div>
  );
};

export default CodeBlock;
