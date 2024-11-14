<!-- Improved compatibility of back-to-top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/emee-dev/spotter.dev-demo">
    <img src="app/public/spotter.svg" alt="Logo" width="120px" height="120px">
  </a>

  <h3 align="center">Spotter</h3>

  <p align="center">
    A fullstack observability framework with first-class SolidStart support.
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#technical-info">Technical Info</a></li>
    <li><a href="#user-interface">User Interface</a></li>
    <li><a href="#observability">Observability</a></li>
    <li><a href="#hosting">Hosting</a></li>
    <li><a href="#dependencies">Dependencies</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

[![Product Screenshot][product-screenshot]](https://example.com)

In fullstack and API development, ensuring secure, reliable, and well-documented API endpoints can be challenging without adequate observability. Common issues in this space include insufficient security measures, inconsistent team collaboration, and gaps in communication.

Here's why Spotter is invaluable:

- Allows the team to focus on solving problems without worrying about endpoint specifications.
- Ensures security best practices are met across API endpoints.
- Provides visibility into parameters, arguments, and schemas for endpoints and actions.
- Offers a comprehensive view of your application infrastructure, whether monolithic or microservices.

The best part? Spotter is open-source and cost-efficient.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [SolidStart][solidstart-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To set up the project locally, follow these steps.

### Prerequisites

To use Spotter, we recommend PNPM:

```sh
npm install pnpm -g
```

Clone the repository:

```sh
git clone https://github.com/emee-dev/spotter.dev-demo.git
```

### Installation

Install the Spotter package for SolidStart:

1. Get a free API Key at [Spotter.dev](https://spotter-rust.vercel.app/).
2. Install the SolidStart SDK:

   ```sh
   npm install @spotter.dev/solidstart

   # or

   pnpm install @spotter.dev/solidstart
   ```

3. Set up environment variables from `.env.example` to `.env.local`:

   ```sh
   SPOTTER_API_KEY="spotter_xxxxxxxxxxxxx"
   SPOTTER_PROJECT_ID="project_id"
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Add request observability
- [ ] Add action observability
- [ ] Add schema inference
- [ ] Payload masking
- [ ] Security best practices evaluation
- [ ] Notifications support (webhooks)
- [ ] Automatic OpenAPI schema generation

See the [open issues](https://github.com/emee-dev/spotter.dev-demo/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Environment Variables

To use Spotter, ensure the following variables are set in your `.env.local` file:

```sh
DATABASE_URL=""
SESSION_SECRET=""
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
UNKEY_ROOT_KEY=""
UNKEY_API_ID=""
```

## Usage

To integrate observability into your SolidStart API/service, initialize the SDK in `src/app.tsx`:

```ts
import { Spotter } from "@spotter/solidstart";

Spotter.init({
  apikey: "your_api_key",
  projectId: "your_project_id",
});

export default function App() {
  return <Router>...code ...</Router>;
}
```

To capture request data, wrap route handlers with `withSpotter` in your API routes:

```ts
import type { APIEvent } from "@solidjs/start/server";
import { withSpotter } from "@spotter/solidstart";

export const GET = withSpotter(async (event) => {
  return Response.json({ message: "Hello" });
});
```

## Technical Info

Spotter is built with SolidStart and primarily uses SSR.

Key technical aspects:

- SolidStart for SSR with server functions and API routes.
- Xata database integration with server functions and actions.

## User Interface

The UI uses:

- @kobalte/core for accessible, low-level Solid.js components.
- @corvu for Solid.js UI primitives.
- @solid-primitives for reusable functions.
- @solidui for Solid.js UI components.

## Observability

The `withSpotter` route wrapper collects information on request and response payloads, and future updates will introduce payload masking for sensitive parameters.

## Hosting

Spotter is hosted on Vercel.

## Dependencies

The primary dependency is the `@unkey` SDK for generating project API keys.

## Contributing

Contributions are welcome! To contribute:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Emmanuel Ajike - [@emee-dev](https://x.com/__emee_) - emmanuelajike2000@gmail.com

Project Link: [https://github.com/emee-dev/spotter.dev-demo](https://github.com/emee-dev/spotter.dev-demo)

## Acknowledgments

This project was inspired by and made possible thanks to:

- [SolidStart](https://solidjs.com/docs/latest/start)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- The open-source community

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/emee-dev/spotter.dev-demo.svg?style=for-the-badge
[contributors-url]: https://github.com/emee-dev/spotter.dev-demo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/emee-dev/spotter.dev-demo.svg?style=for-the-badge
[forks-url]: https://github.com/emee-dev/spotter.dev-demo/network/members
[stars-shield]: https://img.shields.io/github/stars/emee-dev/spotter.dev-demo.svg?style=for-the-badge
[stars-url]: https://github.com/emee-dev/spotter/stargazers
[issues-shield]: https://img.shields.io/github/issues/emee-dev/spotter.dev-demo.svg?style=for-the-badge
[issues-url]: https://github.com/emee-dev/spotter.dev-demo/issues
[license-shield]: https://img.shields.io/github/license/emee-dev/spotter.dev-demo.svg?style=for-the-badge
[license-url]: https://github.com/emee-dev/spotter.dev-demo/blob/main/LICENSE
[product-screenshot]: app/public/product.png
