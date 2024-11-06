import Features from "~/components/features-vertical";
import Section from "~/components/section";
import { MousePointerClick, Code, ArrowUpDown } from "lucide-solid";

const data = [
  {
    id: 1,
    title: "1. Install solidstart sdk",
    content: "Install the solidstart sdk into your project.",
    image: "/customization.webp",
    icon: MousePointerClick,
  },
  {
    id: 2,
    title: "2. Create project on your dashboard",
    content: "Create a new project, copy your apikey and project id.",
    image: "/validation.webp",
    icon: ArrowUpDown,
  },
  {
    id: 3,
    title: "3. Wrap your route handlers",
    content:
      "Wrap your http route handlers and actions with our special functions.",
    image: "/code.webp",
    icon: Code,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Just 3 steps to go">
      <Features data={data} />
    </Section>
  );
}
