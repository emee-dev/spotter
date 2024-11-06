export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "acme.ai",
  description: "Automate your workflow with AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["SaaS", "Template", "Next.js", "React", "Tailwind CSS"],
  links: {
    email: "support@acme.ai",
    twitter: "https://twitter.com/magicuidesign",
    discord: "https://discord.gg/87p2vpsat5",
    github: "https://github.com/magicuidesign/magicui",
    instagram: "https://instagram.com/magicuidesign/",
  },
  faqs: [
    {
      question: "What is this tool for?",
      answer: (
        <span>
          This tool simplifies the form-building process for developers,
          particularly those using Next.js and related technologies.
        </span>
      ),
    },
    {
      question: "Is this tool free?",
      answer: <span>Yes, this tool is completely free and open-source.</span>,
    },
    {
      question: "How often is it updated?",
      answer: (
        <span>
          I strive to update it weekly based on user feedback, but I guarantee
          at least a monthly update.
        </span>
      ),
    },
    {
      question: "I encountered a bug; what should I do?",
      answer: (
        <span>
          Shh! Bugs are our little secret. Please DM me or open an issue on
          GitHub, and I’ll address it as soon as possible. Your assistance in
          fixing it would be greatly appreciated.
        </span>
      ),
    },
    {
      question: "How can I contribute?",
      answer: (
        <span>
          Please refer to the contribution guide on GitHub. You can also DM me
          on Twitter to discuss how you can help.
        </span>
      ),
    },
  ],
};

export type SiteConfig = typeof siteConfig;
