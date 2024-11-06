// import BlurFade from "~/components/magicui/blur-fade";
import Section from "~/components/section";
import { Card, CardContent } from "~/components/ui/card";
import { Repeat2, ShieldClose, Workflow } from "lucide-solid";
import { Dynamic, For } from "solid-js/web";

const problems = [
  {
    title: "API Analytics",
    description:
      "All data is consolidated and easily accessible in one centralized location.  Where you can find all the relevant API information at a glance.",
    icon: Repeat2,
  },
  {
    title: "API Endpoints",
    description:
      "See endpoint-level data and uncover shadow or zombie endpoints. Uncover params, schemas and endpoint payloads.",
    icon: Workflow,
  },
  {
    title: "API Security",
    description:
      "Proactively detect security threats with automated, API specific best practises checks.",
    icon: ShieldClose,
  },
];

export default function Component() {
  return (
    <Section
      title="API OBSERVABILITY"
      subtitle="Gain a deeper understanding of your API consumers and improve developer experience (DX)"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {
          <For each={problems}>
            {(problem, index) => (
              //   <BlurFade key={index} delay={0.2 + index * 0.2} inView>
              <Card class="bg-background border-none shadow-none">
                <CardContent class="p-6 space-y-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Dynamic
                      component={problem.icon}
                      class="size-6 text-primary"
                    />
                  </div>
                  <h3 class="text-xl font-semibold">{problem.title}</h3>
                  <p class="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
              //   </BlurFade>
            )}
          </For>
        }
      </div>
    </Section>
  );
}
