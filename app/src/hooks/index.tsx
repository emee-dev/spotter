import { createEffect, createSignal, on } from "solid-js";

function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Async: Copying to clipboard was successful!");
      },
      (err) => {
        console.log("Async: Could not copy text: ", err);
      }
    );
    return;
  }
}

export const createCopy = async () => {
  const [isCopied, setCopied] = createSignal(false);

  createEffect(
    on(
      isCopied,
      () => {
        if (isCopied()) {
          //   copyToClipboard(props.content);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }
      },
      { defer: true }
    )
  );

  const setCopyValue = (str: string) => {
    setCopied(true);
    copyToClipboard(str);
  };

  return [isCopied, setCopyValue];
};
