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
          This tool simplifies the fullstack web development experience,
          offering incredible overview of all that happens in your product.
        </span>
      ),
    },
    {
      question: "Is this tool free?",
      answer: (
        <span>
          Yes, this tool is completely free and open-source. You may want to
          support us by getting a paid plan.
        </span>
      ),
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

export const errors = {
  UNAUTHORIZED: {
    name: "UNAUTHORIZED",
    message: "You are not authorized to access this resource. Please login.",
  },
  INVALID_CREDENTIALS: {
    name: "INVALID_CREDENTIALS",
    message: "The email or password provided is incorrect. Please try again.",
  },
  USER_NOT_FOUND: {
    name: "USER_NOT_FOUND",
    message: "User does not exist. Please register first.",
  },
  USER_ALREADY_EXISTS: {
    name: "USER_ALREADY_EXISTS",
    message: "An account with this email already exists. Please log in.",
  },
  PASSWORD_TOO_WEAK: {
    name: "PASSWORD_TOO_WEAK",
    message:
      "Password is too weak. Please use a stronger password with at least 8 characters, including numbers and symbols.",
  },
  EMAIL_INVALID: {
    name: "EMAIL_INVALID",
    message:
      "The email provided is not valid. Please enter a valid email address.",
  },
  PASSWORD_MISMATCH: {
    name: "PASSWORD_MISMATCH",
    message: "The passwords do not match. Please re-enter your password.",
  },
  MISSING_FIELDS: {
    name: "MISSING_FIELDS",
    message: "All fields are required. Please complete the form and try again.",
  },
  ACCOUNT_LOCKED: {
    name: "ACCOUNT_LOCKED",
    message:
      "Your account is locked due to multiple unsuccessful login attempts. Please reset your password or try again later.",
  },
  SERVER_ERROR: {
    name: "SERVER_ERROR",
    message: "An unexpected error occurred. Please try again later.",
  },
  TOKEN_EXPIRED: {
    name: "TOKEN_EXPIRED",
    message: "Your session has expired. Please log in again.",
  },
  PERMISSION_DENIED: {
    name: "PERMISSION_DENIED",
    message:
      "You do not have the required permissions to access this resource.",
  },
  INVALID_INPUT: {
    name: "INVALID_INPUT",
    message: "One or more inputs are invalid. Please check and try again.",
  },
  CAPTCHA_REQUIRED: {
    name: "CAPTCHA_REQUIRED",
    message: "Please complete the CAPTCHA verification to continue.",
  },
} as const;

export class AccountError extends Error {
  name: keyof typeof errors;
  constructor(message: string, name: keyof typeof errors) {
    super(message);
    this.name = name;
  }
}

export type SiteConfig = typeof siteConfig;
