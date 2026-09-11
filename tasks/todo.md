# MTX ASM prototype plan

## Implementation

* [x] Inspect the repository, active branch, and Git remote.
* [x] Confirm the repository contains only an initial README.
* [x] Initialize a React, TypeScript, and Vite application with relative production paths.
* [x] Build a semantic single-page product experience with shared local data.
* [x] Add the required product interactions, responsive behavior, and accessible alternatives.
* [x] Add GitHub Pages deployment automation and project documentation.

## Verification

* [x] Run ESLint with no errors.
* [x] Run the Vite production build with no errors.
* [x] Confirm production files use repository-relative asset paths.
* [x] Exercise interactive controls with keyboard and pointer input.
* [x] Review desktop, laptop, tablet, and mobile layouts.
* [x] Search content for prohibited claims, real domains, real public IP addresses, and unsupported evidence.
* [x] Confirm that sample data is fictional and no browser network requests are present.

## Delivery

* [x] Commit and push the implementation.
* [x] Create a draft pull request into `main`.
* [x] Record repository URL, expected Pages URL, build result, deployment state, and remaining settings.

## Review

The production build and ESLint pass. Manual browser testing covered the required interactions at desktop and mobile widths, plus focused checks at 1024 and 768 pixels. The browser console contains no application errors or warnings. Generated production assets use `./` paths. Content scans found no prohibited claims, public domains, public addresses, network request code, customer references, or unsupported certifications. Sample addresses are limited to RFC documentation ranges.
