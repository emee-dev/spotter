import { For } from "solid-js";
import Section from "~/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { siteConfig } from "~/lib/config";

export default function FAQ() {
  return (
    <Section title="FAQ" subtitle="Frequently asked questions">
      <div class="mx-auto my-12 md:max-w-[800px]">
        <Accordion
          collapsible
          multiple={false}
          class="flex w-full flex-col items-center justify-center space-y-2"
        >
          <For each={siteConfig.faqs}>
            {(faq, index) => (
              <AccordionItem
                value={faq.question}
                class="w-full border rounded-lg overflow-hidden"
              >
                <AccordionTrigger class="px-4">{faq.question}</AccordionTrigger>
                <AccordionContent class="px-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            )}
          </For>
        </Accordion>
      </div>
    </Section>
  );
}
