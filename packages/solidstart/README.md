# Spotter

A full-stack observability framework with native SolidStart support, making API debugging simpler and more efficient.

## Github Repository

Visit the GitHub repository [HERE](https://github.com/emee-dev/spotter.git).

## Demo

See the working demo [CodesandBox](https://codesandbox.io/p/github/emee-dev/spotter.dev-demo/main?import=true). You will need to get an API key from [Spotter.dev](https://spotter-rust.vercel.app/).

Demo source code can be found [Github](https://github.com/emee-dev/spotter.dev-demo.git)

## Installation

Install the package for SolidStart:

```bash
npm install @spotter.dev/solidstart

# or

pnpm install @spotter.dev/solidstart
```

To proceed, clone the repository:

```bash
git clone https://github.com/emee-dev/spotter.git
```

## Environment Variables

Set up your `.env.local` file with the following variables:

```bash
SPOTTER_API_KEY="spotter_xxxxxxxxxxxxx"
SPOTTER_PROJECT_ID="project_id"
```

## Usage

Initialize the SDK in `src/app.tsx`:

```typescript
import { Spotter } from "@spotter/solidstart";

Spotter.init({
  apikey: "your_api_key",
  projectId: "your_project_id",
});

export default function App() {
  return <Router>...</Router>;
}
```

To monitor requests, wrap route handlers in `withSpotter`:

```typescript
import type { APIEvent } from "@solidjs/start/server";
import { withSpotter } from "@spotter/solidstart";

export const GET = withSpotter(async (event) => {
  return Response.json({ message: "Hello" });
});
```

## Roadmap

- [x] Request observability
- [x] Schema inference
- [ ] Action observability
- [ ] Payload masking
- [ ] Security evaluations
- [ ] Webhook support
- [ ] Automatic OpenAPI generation

View all planned features and issues [HERE](https://github.com/emee-dev/spotter/issues).

## Contributing

Contributions are encouraged! Steps to contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE.txt` for details.

## Contact

Emmanuel Ajike - [@emee-dev](https://x.com/__emee_) - emmanuelajike2000@gmail.com

## Acknowledgments

Special thanks to:

- [SolidStart](https://solidjs.com/docs/latest/start)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
