import { createMemo, For } from "solid-js";
import { cn } from "~/lib/utils";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

const Ripple = (props: RippleProps) => {
  const {
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 8,
    className = "",
  } = props;

  const circles = createMemo(() =>
    Array.from({ length: numCircles }, (_, i) => {
      const size = mainCircleSize + i * 70;
      const opacity = mainCircleOpacity - i * 0.03;
      const animationDelay = `${i * 0.06}s`;
      const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
      const borderOpacity = 5 + i * 5;

      return {
        size,
        opacity,
        animationDelay,
        borderStyle,
        borderOpacity: `hsl(var(--foreground), ${borderOpacity / 100})`,
      };
    })
  );

  return (
    <div
      class={cn(
        "absolute inset-0 bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className
      )}
    >
      <For each={circles()}>
        {(circle, i) => (
          <div
            class="absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              opacity: circle.opacity,
              "animation-delay": circle.animationDelay,
              "border-style": circle.borderStyle,
              "border-width": "1px",
              "border-color": circle.borderOpacity,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
            }}
          />
        )}
      </For>
    </div>
  );
};

export default Ripple;
