# Sengoku Japan Map

A bilingual web prototype for exploring Japan's Sengoku period through a modern regional map interface.

This project uses modern Japanese regional geography as the entry point, then layers in Sengoku-era province names, notable daimyo/samurai, and short historical notes. The current build is a **work-in-progress prototype**, not a polished first release.

## Current state

Implemented so far:

- Next.js 15 + React 19 application
- Interactive regional map built with MapLibre GL and OpenStreetMap raster tiles
- Eight selectable regions, including **Hokkaido**
- Right-side bilingual information panel for each selected region
- Mobile-responsive layout and map/info-panel interaction flow
- Static export support for shareable web output
- Basic test coverage for the page shell, map interactions, and info panel

Still in progress:

- Historical accuracy/content refinement
- Visual polish and hierarchy improvements
- Export presentation quality
- Release-level QA and packaging

## Tech stack

- Next.js 15
- React 19
- TypeScript
- MapLibre GL
- Tailwind CSS
- Vitest + Testing Library

## Project structure

```text
app/
  page.tsx                  # main page shell
components/
  map-stage.tsx             # map section wrapper
  japan-regions-map.tsx     # MapLibre region map
  region-info-panel.tsx     # selected region detail panel
  page-header.tsx           # hero/header copy
  legend.tsx                # map legend UI
lib/
  data/regions.ts           # Sengoku region dataset
  map/region-map-data.ts    # simplified region geometry payload
  map/region-view-bounds.ts # per-region camera framing
  map/osm-raster-style.ts   # base raster style
types/
  region.ts                 # shared type definitions
```

## Local development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Test and build

Run tests:

```bash
npm test
```

Production build:

```bash
npm run build
```

## Static export

This repo is configured for static export via Next.js.

Generate the static site:

```bash
npm run export:static
```

The exported files are written to:

```text
out/
```

Preview the export locally:

```bash
python -m http.server 3610 --directory out
```

Then open:

```text
http://127.0.0.1:3610
```

## Notes on map data

- The current map uses a simplified regional geometry payload to keep bundle size manageable.
- The geographic layer is intended as a modern navigation surface, not a literal reconstruction of Sengoku political borders.
- Historical content and geographic presentation are still being iterated.

## Repository status

The repository now contains:

- the working Next.js source project
- static export support
- test coverage for key UI flows

But it should still be treated as an **active prototype** rather than a final release candidate.

## License

No license has been assigned yet.
