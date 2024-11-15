import { cn } from "~/lib/utils";
import { Play, XIcon } from "lucide-solid";
import ThumbnailImage from "~/assets/home.png";
import { createSignal } from "solid-js";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroImageProps {
  animationStyle?: AnimationStyle;
  imageSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const AnimatePresence = (props: any) => {
  return <>{props.children}</>;
};

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

/* 
default props
{
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}

*/

export default function HeroImageDialog({
  animationStyle = "from-center",
  imageSrc,
  thumbnailSrc,
  thumbnailAlt = "Image thumbnail",
  className,
}: HeroImageProps) {
  const [isImageOpen, setIsImageOpen] = createSignal(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div class={cn("relative", className)}>
      <div
        class="relative cursor-pointer group rounded-md p-2 ring-1 ring-slate-200/50 dark:bg-gray-900/70 dark:ring-white/10 backdrop-blur-md"
        onClick={() => setIsImageOpen(true)}
      >
        <img
          src={ThumbnailImage}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          class="transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md border"
        />
        <div class="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
          <div class="z-30 bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md size-28">
            <div
              class={`flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary shadow-md rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100`}
            >
              <Play
                class="size-8 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isImageOpen() && (
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div
              {...selectedAnimation}
              class="relative w-full max-w-4xl aspect-video mx-4 md:mx-0"
            >
              <button
                onClick={() => setIsImageOpen(false)}
                class="absolute -top-16 right-0 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black"
              >
                <XIcon class="size-5" />
              </button>
              <div class="size-full border-2 border-white rounded-2xl overflow-hidden isolate z-[1] relative">
                <img
                  src={imageSrc}
                  alt="Full-size image"
                  class="size-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
