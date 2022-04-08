# Next & Tailwind Sample

This repo uses Next and TailwindCSS to build a fake vehicle manager web app as
an experiment in learning the technologies. It is by no means complete and will
be polished over time...!

## Getting started

I have used `pnpm` as the package manager so this will need installing first:

```
npm install -g pnpm
```

You can then install the project dependencies:

```
pnpm install
```

If you prefer to use `npm` then delete `pnpm-lock.yaml` and run `npm install`
instead. You can then use `npm run <command>` instead of `pnpm <command>`.

## Tailwind CSS

In order to experiment I have created a small library of components that use
Tailwind for the styling. These can be found in the `components` folder. I have
used Storybook to develop all the components which can be started with:

```
pnpm storybook
```

I have made a first pass at adding support for dark mode for each component but
this is still a work-in-progress. The Storybook config includes a dark mode
addon which can be used to toggle between light/dark themes to aid development.

This is my first time using Tailwind and I am quite pleased with the results.
To make managing conditional classes easier I have opted to use the `clsx`
package (a smaller alternative to the popular `classnames` package.)

I found that the [**Tailwind CSS IntelliSense**](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
VS Code extension is an absolute must-have when working with classes.

My only real complaint about Tailwind is the horizontal scrolling required when
using the `className` prop and am keen to find ways to make this easier to
manage.

I have not attempted to use any Tailwind extensions and have stuck to the
default font and colour scheme. I would like to spend some time investigating
the official Typography extension and adding semantic colours (e.g. `primary`,
`secondary`, etc.) to the config rather than using hard-coded colours. This is
the pattern used by Tailwind-based libs such as [DaisyUI](https://daisyui.com/)
for example.

## Next.js

This is also my first foray into using Next.js after years using building SPAs
using `create-react-app` and more recently Vite. I am impressed with the
developer experience and have messed with client-side data fetching, SSG and
SSR. For the purproses of this demo the `main` branch uses client-side data
fetching via `react-query` and some fake data added to Next API routes (in
itself an excellent way to put together a BFF.)

### Folder structure

The default out-of-the-box Next.js settings eschews a `src` folder in favour of
root-level folders for pages, components, etc. Although I am not crazy about
this pattern I have stuck to it simply because it's the default 😀

I have added additional folders and ended up with the following structure:

| Folder       | Description                                              |
| ------------ | -------------------------------------------------------- |
| `components` | Stand-alone React components                             |
| `containers` | Higher-level components that fetch data. Used by `pages` |
| `mocks`      | Some fake data used by the API and Storybook             |
| `pages`      | The Next.js pages, routes and API                        |
| `providers`  | Good old React Context providers                         |
| `queries`    | React Query specifics                                    |
| `types`      | Some useful types for the API data                       |
| `utils`      | Utility functions                                        |

To make these folders easier to access I have configured aliases for TypeScript,
Storybook and Vitest. For example:

```tsx
import { Button } from "@/components";
import { ThemeProvider } from "@/providers";
import { useVehicles } from "@/queries";
import type { Vehicle } from "@/types";
```

And so on. Turns out this is a common pattern.

The pages themselves are very lightweight and just render things imported from
the `containers` folder. I did wrestle with this: I could have done away with
the need for the `containers` folder and simply had all that code in each page
but wasn't sure that was an accepted Next.js pattern. Another complication with
lots of code in each page is Storybook: without messing with the default Next.js
page config the stories for this code would need to reside in a different folder
and I felt this was getting messy.

I am interested to hear about better guidance around accepted standards for
structuting a Next.js app. Perhaps using atomic design would mean composite
components have more structure.

### SSG and SSR

I experimented with `getStaticProps` and `getServerSideProps` to get a feel for
how these approaches work. Additional repo branches are available that have all
the data fetching shifted to one of these patterns. While SSG in particular
seems like a good fit for ecommerce apps, SSR does have some real benefits. I
would love to see a real-world example of using `getServerSideProps` to handle
data fetching as it can reduce the complexity of the client code considerably.

## Testing

For unit testing I have opted to use [Vitest](https://vitest.dev/). It is faster
than Jest, easier to configure and is actively developed.

On top of `vitest` I have added React Testing Library and the `jest-dom`
matchers.

You can run the tests and start the watcher with:

```
pnpm test
```

To run all tests and generate a coverage report:

```
pnpm test:coverage
```

There is a small `setupTests.ts` file that wires up `jest-dom` and a few other
packages.

Note that instead of using `jest`-style globals (`it`, `expect`, etc.) I have
opted to import these in each test if required. This also avoids a potential
TypeScript issue with `jest` and `vitest` (the `@testing-library/jest-dom`
package pulls in the `jest` types which clashes with `vitest` globals.)

I may enhance testing with the addition of some e2e tests using Cypress at some
point for completeness.

## Extras & Notes

Also:

- I have added additional `eslint` packages for Storybook and React Testing
  Library.
- I included `storybook-addon-next-router` to make working with Next.js routes
  in stories easier.
- To test the containers I am using [Mock Service Worker](https://mswjs.io/) for
  the networking. This could also be extended to Storybook if necessary.
- The Create Vehicle form uses `Formik` to manage the form state.
- I have used `react-intl` for i18n. I would normally use a `babel` plugin to
  auto-generate message IDs but once this is added Next.js will no longer use the
  super-fast SWC plugin and falls back to `babel` itself. As this is a demo of
  Next.js I thought it worth keeping SWC enabled. Support for the `react-intl`
  plugin is [hopefully on the radar](https://github.com/vercel/next.js/discussions/30174#discussioncomment-1539820).
- Some of the components are polymorphic via a MUI-style `component` prop.
  Getting TS to play nicely here is quite painful. Adding support for refs to
  these polymorphic components is beyond me at the moment!
- I have used [Heroicons](https://heroicons.com/) for a handful of nice SVGs.
- I have kept the components simple and I "use the platform" where possible. This
  means I don't have a fancy `Select` component, have not added support for focus
  trapping to the `Dialog`, etc. Nor is there much in the way of animations!
- I probably need to add more comments!
- To beef up the components I could add MDX docs instead of TSX stories. I have
  found MDX a much better format to use for publishing component docs using
  Storybook.
- I found getting dark mode right quite hard so it is not complete.
- More code could be probably be shared.
- Storybook is configured using webpack 5 but the HMR performance is not very
  good. Any tips to speed it up are welcome (Vite is a potential but it's quite
  a lot of config and the builder is still a little buggy.)
