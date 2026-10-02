# Finance

An index of financial concepts, from the mechanics of market making and options pricing to the ways retail brokerages earn revenue. Each concept is explained on its own terms and linked to the ideas it depends on, so the site can be read in any order or followed along its dependency map.

The site is hosted at <https://mvarble.github.io/finance/>.

## How it is built

This repository is a [`@mvarble/mesearch`](https://github.com/mvarble/mesearch) site. It holds only the documents, under `content/`, and a little configuration; everything about how the site is rendered, laid out and mapped is mesearch's. See that project for how the documents become a site.

```sh
npm install
npm run dev     # serve the site while writing
npm run build   # write the static site to build/
```
