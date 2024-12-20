// import { codeToHtml } from "shiki";
// import { createEffect, on } from "solid-js";
// import { cn } from "~/lib/utils";

// const CodeBlock = (props: {
//   code: string;
//   lang: "json" | "javascript";
//   class?: string;
// }) => {
//   let containerRef!: HTMLDivElement;
//   const blockProps = () => props.code;

//   createEffect(
//     on(blockProps, async (code) => {
//       const html = await codeToHtml(code, {
//         lang: props.lang,
//         theme: "slack-dark",
//       });

//       if (containerRef) {
//         containerRef.innerHTML = html;
//       }
//     })
//   );

//   return (
//     <div
//       ref={containerRef}
//       class={cn(
//         "[&>*]:p-3 [&>*]:rounded-lg [&>*]:font-mono [&>*]:text-sm",
//         props.class
//       )}
//     ></div>
//   );
// };

// export default CodeBlock;

import { codeToHtml } from "shiki";
import { createResource, Suspense, onCleanup, createEffect } from "solid-js";
import { cn } from "~/lib/utils";

const CodeBlock = (props: {
  code: string;
  lang: "json" | "javascript";
  class?: string;
}) => {
  let containerRef!: HTMLDivElement;

  // Use createResource to fetch the highlighted HTML
  const [html] = createResource(async () => {
    return (await codeToHtml(props.code, {
      lang: props.lang,
      theme: "slack-dark",
    })) as string;
  });

  // Cleanup previous HTML before setting the new one
  onCleanup(() => {
    if (containerRef) containerRef.innerHTML = "";
  });

  // Render highlighted HTML in the containerRef
  createEffect(() => {
    if (html() && containerRef) {
      containerRef.innerHTML = html() as string;
    }
  });

  return (
    <div
      ref={containerRef}
      class={cn(
        "[&>*]:p-3 [&>*]:rounded-lg [&>*]:font-mono [&>*]:text-sm",
        props.class
      )}
    ></div>
  );
};

export default CodeBlock;


