import { createSignal, onCleanup, onMount } from "solid-js";
import { hasWindow } from "std-env";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

const FlickeringGrid = (props: FlickeringGridProps) => {
  const {
    squareSize = 4,
    gridGap = 6,
    flickerChance = 0.3,
    color = "rgb(0, 0, 0)",
    width,
    height,
    className,
    maxOpacity = 0.3,
  } = props;

  let canvasRef: HTMLCanvasElement | undefined;
  const [isInView, setIsInView] = createSignal(false);

  const toRGBA = (color: string) => {
    // Check if `document` is defined (client-side only)
    if (!hasWindow) return "rgba(255, 0, 0,";

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "rgba(255, 0, 0,";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
    return `rgba(${r}, ${g}, ${b},`;
  };

  const memoizedColor = toRGBA(color);

  const setupCanvas = () => {
    const canvas = canvasRef!;
    const canvasWidth = width || canvas.clientWidth;
    const canvasHeight = height || canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const cols = Math.floor(canvasWidth / (squareSize + gridGap));
    const rows = Math.floor(canvasHeight / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows);
    for (let i = 0; i < squares.length; i++) {
      squares[i] = Math.random() * maxOpacity;
    }

    return {
      width: canvasWidth,
      height: canvasHeight,
      cols,
      rows,
      squares,
      dpr,
    };
  };

  const updateSquares = (squares: Float32Array, deltaTime: number) => {
    for (let i = 0; i < squares.length; i++) {
      if (Math.random() < flickerChance * deltaTime) {
        squares[i] = Math.random() * maxOpacity;
      }
    }
  };

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cols: number,
    rows: number,
    squares: Float32Array,
    dpr: number
  ) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const opacity = squares[i * rows + j];
        ctx.fillStyle = `${memoizedColor}${opacity})`;
        ctx.fillRect(
          i * (squareSize + gridGap) * dpr,
          j * (squareSize + gridGap) * dpr,
          squareSize * dpr,
          squareSize * dpr
        );
      }
    }
  };

  onMount(() => {
    const canvas = canvasRef!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let { width, height, cols, rows, squares, dpr } = setupCanvas();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView()) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(squares, deltaTime);

      drawGrid(ctx, width * dpr, height * dpr, cols, rows, squares, dpr);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      ({ width, height, cols, rows, squares, dpr } = setupCanvas());
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(canvas);
    window.addEventListener("resize", handleResize);

    if (isInView()) {
      animationFrameId = requestAnimationFrame(animate);
    }

    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    });
  });

  return (
    <canvas
      ref={canvasRef}
      class={`size-full pointer-events-none ${className || ""}`}
      style={{
        width: width?.toString() || "100%",
        height: height?.toString() || "100%",
      }}
      width={width}
      height={height}
    />
  );
};

export default FlickeringGrid;
