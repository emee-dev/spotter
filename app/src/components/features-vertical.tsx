import { createEffect, createSignal, For, onCleanup } from "solid-js";
import { Dynamic } from "solid-js/web";
import Safari from "./safari";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export type FeaturesDataProps = {
  id: number;
  title: string;
  content: string;
  image?: string;
  video?: string;
  icon?: any;
};

export type FeaturesProps = {
  collapseDelay?: number;
  ltr?: boolean;
  linePosition?: "left" | "right" | "top" | "bottom";
  data: FeaturesDataProps[];
};

export default function Features({
  collapseDelay = 5000,
  ltr = false,
  linePosition = "left",
  data = [],
}: FeaturesProps) {
  const [currentIndex, setCurrentIndex] = createSignal(-1);
  let carouselRef!: HTMLUListElement;
  let ref!: HTMLDivElement;

  let isInView = false;

  createEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        setCurrentIndex(isInView ? 0 : -1);
      },
      { threshold: 0.5 }
    );
    if (ref) observer.observe(ref);
    onCleanup(() => observer.disconnect());
  });

  const scrollToIndex = (index: number) => {
    const card = carouselRef.querySelectorAll(".card")[index];
    if (card) {
      const offset =
        card.getBoundingClientRect().left -
        carouselRef.getBoundingClientRect().left -
        (carouselRef.clientWidth - card.clientWidth) / 2;
      carouselRef.scrollTo({
        left: carouselRef.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  };

  createEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, collapseDelay);
    onCleanup(() => clearInterval(interval));
  });

  createEffect(() => {
    const handleAutoScroll = () => {
      scrollToIndex((currentIndex() + 1) % data.length);
    };
    const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay);
    onCleanup(() => clearInterval(autoScrollTimer));
  });

  return (
    <section ref={ref} id="features">
      <div class="container">
        <div class="max-w-6xl mx-auto">
          <div class="mx-auto my-12 h-full grid lg:grid-cols-2 gap-10 items-center">
            <div
              class={`hidden lg:flex order-1 lg:order-[0] ${
                ltr ? "lg:order-2 lg:justify-end" : "justify-start"
              }`}
            >
              <Accordion multiple={false} collapsible>
                <For each={data}>
                  {(item, index) => (
                    <AccordionItem
                      class="relative mb-8  last:mb-0"
                      value={`item-${index()}`}
                    >
                      {linePosition === "left" || linePosition === "right" ? (
                        <div
                          class={`absolute bottom-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-neutral-300/50 dark:bg-neutral-300/30 ${
                            linePosition === "right"
                              ? "left-auto right-0"
                              : "left-0 right-auto"
                          }`}
                        >
                          <div
                            class={`absolute left-0 top-0 w-full ${
                              currentIndex() === index() ? "h-full" : "h-0"
                            } origin-top bg-primary transition-all ease-linear dark:bg-white`}
                            style={{
                              "transition-duration":
                                currentIndex() === index()
                                  ? `${collapseDelay}ms`
                                  : "0s",
                            }}
                          ></div>
                        </div>
                      ) : null}
                      <div class="flex items-center relative">
                        <div class="item-box w-12 h-12 bg-primary/10 rounded-full sm:mx-6 mx-2 shrink-0 flex items-center justify-center">
                          <Dynamic
                            component={item.icon}
                            class="w-6 h-6 text-primary"
                          />
                        </div>
                        <div class="">
                          <AccordionTrigger class="text-xl  font-bold">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent class="justify-start text-left leading-4 font-sans text-[16px]">
                            {item.content}
                          </AccordionContent>
                        </div>
                      </div>
                    </AccordionItem>
                  )}
                </For>
              </Accordion>
            </div>
            <div
              class={`h-[350px] min-h-[150px] w-auto flex justify-center ${
                ltr && "lg:order-1"
              }`}
            >
              {data[currentIndex()]?.image ? (
                <Safari
                  src={data[currentIndex()].image}
                  url="https://acme.ai"
                  className="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 object-cover object-left-top p-1 shadow-lg"
                />
              ) : data[currentIndex()]?.video ? (
                <video
                  preload="auto"
                  src={data[currentIndex()].video}
                  class="aspect-auto h-full w-full rounded-lg object-cover shadow-lg"
                  autoplay
                  loop
                  muted
                />
              ) : (
                <div class="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 bg-gray-200 p-1"></div>
              )}
            </div>
            <ul
              ref={(el) => (carouselRef = el)}
              class="flex h-full snap-x flex-nowrap overflow-x-auto py-10 [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden snap-mandatory"
              style={{ padding: "50px calc(50%)" }}
            >
              <For each={data}>
                {(item, index) => (
                  <div
                    class="card relative mr-8 grid h-full max-w-60 shrink-0 items-start justify-center py-4 last:mr-0"
                    onClick={() => setCurrentIndex(index())}
                    style={{ "scroll-snap-align": "center" }}
                  >
                    <div class="absolute bottom-0 left-0 right-auto top-0 h-0.5 w-full overflow-hidden rounded-lg bg-neutral-300/50 dark:bg-neutral-300/30">
                      <div
                        class={`absolute left-0 top-0 h-full ${
                          currentIndex() === index() ? "w-full" : "w-0"
                        } origin-top bg-primary transition-all ease-linear`}
                        style={{
                          "transition-duration":
                            currentIndex() === index()
                              ? `${collapseDelay}ms`
                              : "0s",
                        }}
                      ></div>
                    </div>
                    <h2 class="text-xl font-bold">{item.title}</h2>
                    <p class="mx-0 max-w-sm text-balance text-sm">
                      {item.content}
                    </p>
                  </div>
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
