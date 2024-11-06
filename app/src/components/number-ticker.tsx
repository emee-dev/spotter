import { createSignal, createEffect, on } from "solid-js";
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
  const useVisibilityObserver = createVisibilityObserver({});
  const visible = useVisibilityObserver(() => ref);

  // Flag to track if the animation has already run
  let hasAnimated = false;

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

  // Check visibility only on the first change to visible
  createEffect(
    on(
      () => visible(),
      (isVisible) => {
        if (isVisible && !hasAnimated) {
          startAnimation();
          hasAnimated = true;
        }
      }
    )
  );

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
