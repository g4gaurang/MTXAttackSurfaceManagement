# MTX Attack Surface Management prototype

This repository contains an interactive static landing page for MTX Attack Surface Management. It presents outside\-in asset discovery, ownership validation, exposure prioritization, remediation workflow, and verification as a connected product experience.

The prototype performs no scanning and sends no information to a backend. Assets, findings, addresses, people, metrics, tickets, and workflow events are fictional.

## Technology stack

* React
* TypeScript
* Vite
* Responsive CSS
* Lucide React icons
* Recharts
* Semantic HTML and accessible SVG

## Local setup

Node.js 22 and npm are recommended.

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

The production site is written to `dist/`. Vite uses a relative base path, so generated assets work when the site is hosted under a repository subdirectory.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` builds and publishes `dist/` after a push to `main`. In the repository settings:

1. Open **Settings**, then **Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push or merge an update to `main`.
4. Review the **Deploy static site to GitHub Pages** workflow.

The expected project URL is:

`https://g4gaurang.github.io/MTXAttackSurfaceManagement/`

The URL is derived from the configured GitHub remote. Availability depends on repository access and Pages settings.

## Fictional data disclaimer

Sample content uses reserved `.example` domains and RFC documentation address ranges. Product figures are labeled as illustrative product data. They are not MTX results or customer results.

## Authorized use

External discovery activities must follow written authorization, applicable law, provider policies, and established rules of engagement. This interface is a product demonstration and does not include reconnaissance, DNS requests, port scanning, live customer data, or offensive instructions.

## Product claims review

Before external publication, MTX should validate:

* Product maturity labels
* Supported integration methods and system categories
* Scan cadence and processing behavior
* Implementation service scope
* Managed service availability and coverage hours
* Platform security, privacy, certification, and deployment claims

Avoid language that suggests definitive asset ownership before validation, universal discovery, objective risk certainty, or replacement of enterprise record systems.

## Updating content and sample data

Fictional assets, findings, discovery sources, lifecycle stages, timeline events, role views, and chart data are located in `src/data.ts`. Asset categories appear in both the data records and the platform\-scope presentation. Update these together and retain the fictional\-data labels.

Page components and interaction state are located in `src/App.tsx`. Visual design, responsive breakpoints, reduced\-motion behavior, and focus treatment are located in `src/styles.css`.

## Replacing the contact action

The form in `src/App.tsx` currently handles submission in browser memory and displays a local confirmation. To connect an approved contact service:

1. Complete privacy, consent, retention, and security review.
2. Replace the local submit handler with the approved endpoint.
3. Add failure, loading, and success states.
4. Update the form notice to describe transmission and data handling.
5. Do not place API credentials in browser code.
