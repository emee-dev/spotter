// import { createSignal, createEffect, onCleanup } from "solid-js";
// import {
//   createVisibilityObserver,
//   //   useInView,
// } from "@solid-primitives/intersection-observer";
// import { cn } from "~/lib/utils";

// interface NumberTickerProps {
//   value: number;
//   direction?: "up" | "down";
//   delay?: number; // delay in seconds
//   className?: string;
//   decimalPlaces?: number;
// }

// function animateNumber(
//   from: number,
//   to: number,
//   duration: number,
//   callback: (value: number) => void
// ) {
//   let start: number | null = null;
//   function step(timestamp: number) {
//     if (start === null) start = timestamp;
//     const progress = Math.min((timestamp - start) / duration, 1);
//     callback(from + (to - from) * progress);
//     if (progress < 1) requestAnimationFrame(step);
//   }
//   requestAnimationFrame(step);
// }

// export function NumberTicker(props: NumberTickerProps) {
//   let ref: HTMLSpanElement | undefined;
//   const [displayValue, setDisplayValue] = createSignal(
//     props.direction === "down" ? props.value : 0
//   );

//   const useVisibilityObserver = createVisibilityObserver({ threshold: 0.8 });

//   // make sure that you pass the element reference in a thunk if it is undefined initially
//   const visible = useVisibilityObserver(() => ref);

//   createEffect(() => {
//     if (visible()) {
//       setTimeout(() => {
//         animateNumber(
//           props.direction === "down" ? props.value : 0,
//           props.direction === "down" ? 0 : props.value,
//           1000, // 1 second duration
//           (latestValue) => setDisplayValue(latestValue)
//         );
//       }, props?.delay * 1000);
//     }
//   });

//   return (
//     <span
//       ref={ref}
//       class={cn(
//         "inline-block tabular-nums text-black dark:text-white tracking-wider",
//         props.className
//       )}
//     >
//       {displayValue().toFixed(props.decimalPlaces)}
//     </span>
//   );
// }

import { createSignal, createEffect, onMount } from "solid-js";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { cn } from "~/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number; // delay in seconds
  className?: string;
  decimalPlaces?: number;
}

function animateNumber(
  from: number,
  to: number,
  duration: number,
  callback: (value: number) => void
) {
  let start: number | null = null;
  function step(timestamp: number) {
    if (start === null) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    callback(from + (to - from) * progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function NumberTicker(props: NumberTickerProps) {
  let ref: HTMLSpanElement | undefined;
  const [displayValue, setDisplayValue] = createSignal(
    props.direction === "down" ? props.value : 0
  );

  const useVisibilityObserver = createVisibilityObserver({ threshold: 0.8 });
  const visible = useVisibilityObserver(() => ref);

  const startAnimation = () => {
    setTimeout(() => {
      animateNumber(
        props.direction === "down" ? props.value : 0,
        props.direction === "down" ? 0 : props.value,
        1000, // 1 second duration
        (latestValue) => setDisplayValue(latestValue)
      );
    }, (props.delay ?? 0) * 1000);
  };

  // Check visibility on mount and whenever visibility changes
  createEffect(() => {
    if (visible()) {
      startAnimation();
    }
  });

  return (
    <span
      ref={ref}
      class={cn(
        "inline-block tabular-nums text-black dark:text-white tracking-wider",
        props.className
      )}
    >
      {displayValue().toFixed(props.decimalPlaces)}
    </span>
  );
}
