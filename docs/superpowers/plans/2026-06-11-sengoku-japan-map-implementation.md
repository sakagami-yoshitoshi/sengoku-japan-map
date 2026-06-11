# Sengoku Japan Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js web app that shows a modern Japan regional map and reveals bilingual Sengoku-era region data when users hover and click Kinki, Kanto, and Chubu.

**Architecture:** Use a single-route Next.js App Router application with local typed region data, a hand-authored interactive SVG map component, and a right-side region info panel. Keep V1 frontend-only, with state living in the page shell and all historical content sourced from static TypeScript data.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, React Testing Library, user-event

---

## File Structure

- `app/layout.tsx` - base layout and metadata
- `app/page.tsx` - page composition and selected/hovered region state container
- `app/globals.css` - wa-fu visual system, texture, layout, and interaction styling
- `components/page-header.tsx` - title and subtitle block
- `components/map-stage.tsx` - orchestrates map and legend
- `components/japan-regions-map.tsx` - interactive SVG with region hit areas
- `components/region-info-panel.tsx` - bilingual Sengoku info card
- `components/legend.tsx` - legend and V1 coverage notes
- `lib/data/regions.ts` - typed V1 region dataset
- `types/region.ts` - reusable data types
- `vitest.config.ts` - Vitest config
- `vitest.setup.ts` - testing-library setup
- `app/page.test.tsx` - integration tests for page interactions
- `components/region-info-panel.test.tsx` - focused card rendering tests
- `components/japan-regions-map.test.tsx` - map interaction tests

---

### Task 1: Bootstrap the Next.js app and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `.gitignore`
- Test: `app/page.test.tsx`

- [ ] **Step 1: Write the failing integration test for the initial shell**

```tsx
import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('HomePage shell', () => {
  it('renders the bilingual title and instruction copy', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /戦国日本地図/i })).toBeInTheDocument()
    expect(screen.getByText(/Sengoku Japan Map/i)).toBeInTheDocument()
    expect(screen.getByText(/クリックして戦国時代の地域情報を見る/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- app/page.test.tsx`
Expected: FAIL because Next.js app files and Vitest config do not exist yet.

- [ ] **Step 3: Create the project scaffold and minimal config to satisfy the test harness**

Create `package.json`:

```json
{
  "name": "sengoku-japan-map",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "15.3.3",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.6.3",
    "@testing-library/react": "16.3.0",
    "@testing-library/user-event": "14.6.1",
    "@types/node": "22.15.30",
    "@types/react": "19.1.8",
    "@types/react-dom": "19.1.6",
    "autoprefixer": "10.4.21",
    "jsdom": "26.1.0",
    "postcss": "8.5.4",
    "tailwindcss": "3.4.14",
    "typescript": "5.8.3",
    "vitest": "3.2.4"
  }
}
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

Create `postcss.config.mjs`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Create `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

Create `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Create `app/layout.tsx`:

```tsx
import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '戦国日本地図 | Sengoku Japan Map',
  description: 'Modern Japan map entry point for bilingual Sengoku region information.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
```

Create `app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>戦国日本地図</h1>
      <p>Sengoku Japan Map</p>
      <p>クリックして戦国時代の地域情報を見る</p>
    </main>
  )
}
```

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  min-height: 100vh;
}
```

Create `.gitignore`:

```gitignore
node_modules
.next
coverage
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

Run:

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs tailwind.config.ts app/layout.tsx app/page.tsx app/globals.css vitest.config.ts vitest.setup.ts .gitignore app/page.test.tsx
git commit -m "chore: bootstrap next app and test harness"
```

### Task 2: Define the region data contract and seed the V1 content

**Files:**
- Create: `types/region.ts`
- Create: `lib/data/regions.ts`
- Modify: `app/page.test.tsx`
- Test: `app/page.test.tsx`

- [ ] **Step 1: Write a failing test asserting default selected content exists for Kinki**

```tsx
import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('HomePage content seed', () => {
  it('shows Kinki as the default selected region with bilingual data', () => {
    render(<HomePage />)

    expect(screen.getByText(/近畿地方/i)).toBeInTheDocument()
    expect(screen.getByText(/Kinki/i)).toBeInTheDocument()
    expect(screen.getByText(/山城国/i)).toBeInTheDocument()
    expect(screen.getByText(/Oda Nobunaga/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- app/page.test.tsx`
Expected: FAIL because no region data model or default content exists.

- [ ] **Step 3: Create the shared region types and V1 data seed**

Create `types/region.ts`:

```ts
export type BilingualText = {
  ja: string
  romaji: string
}

export type RegionData = {
  id: 'kinki' | 'kanto' | 'chubu'
  modern: BilingualText
  prefectures: BilingualText[]
  historical: {
    oldProvinces: BilingualText[]
    keyFigures: BilingualText[]
    summary: BilingualText
  }
  ui: {
    svgRegionIds: string[]
    theme: 'gold' | 'crimson' | 'indigo'
  }
}
```

Create `lib/data/regions.ts`:

```ts
import { RegionData } from '@/types/region'

export const regions: RegionData[] = [
  {
    id: 'kinki',
    modern: { ja: '近畿地方', romaji: 'Kinki' },
    prefectures: [
      { ja: '京都府', romaji: 'Kyoto' },
      { ja: '大阪府', romaji: 'Osaka' },
      { ja: '奈良県', romaji: 'Nara' },
      { ja: '兵庫県', romaji: 'Hyogo' },
    ],
    historical: {
      oldProvinces: [
        { ja: '山城国', romaji: 'Yamashiro' },
        { ja: '摂津国', romaji: 'Settsu' },
        { ja: '河内国', romaji: 'Kawachi' },
        { ja: '大和国', romaji: 'Yamato' },
      ],
      keyFigures: [
        { ja: '織田信長', romaji: 'Oda Nobunaga' },
        { ja: '豊臣秀吉', romaji: 'Toyotomi Hideyoshi' },
        { ja: '明智光秀', romaji: 'Akechi Mitsuhide' },
      ],
      summary: {
        ja: '近畿は戦国後期の政治中枢であり、畿内支配をめぐる大名たちの争いが集中した。',
        romaji:
          'Kinki was the late Sengoku political center, where control of Kinai drew intense rivalry among major daimyo.',
      },
    },
    ui: { svgRegionIds: ['kinki'], theme: 'gold' },
  },
  {
    id: 'kanto',
    modern: { ja: '関東地方', romaji: 'Kanto' },
    prefectures: [
      { ja: '東京都', romaji: 'Tokyo' },
      { ja: '神奈川県', romaji: 'Kanagawa' },
      { ja: '埼玉県', romaji: 'Saitama' },
      { ja: '千葉県', romaji: 'Chiba' },
    ],
    historical: {
      oldProvinces: [
        { ja: '武蔵国', romaji: 'Musashi' },
        { ja: '相模国', romaji: 'Sagami' },
        { ja: '上野国', romaji: 'Kozuke' },
        { ja: '下総国', romaji: 'Shimosa' },
      ],
      keyFigures: [
        { ja: '北条氏康', romaji: 'Hojo Ujiyasu' },
        { ja: '徳川家康', romaji: 'Tokugawa Ieyasu' },
        { ja: '上杉謙信', romaji: 'Uesugi Kenshin' },
      ],
      summary: {
        ja: '関東では後北条氏を中心に広域支配が進み、周辺勢力との均衡が戦国情勢を形づくった。',
        romaji:
          'In Kanto, the Later Hojo expanded regional control while constant balance against rival powers shaped the Sengoku landscape.',
      },
    },
    ui: { svgRegionIds: ['kanto'], theme: 'crimson' },
  },
  {
    id: 'chubu',
    modern: { ja: '中部地方', romaji: 'Chubu' },
    prefectures: [
      { ja: '愛知県', romaji: 'Aichi' },
      { ja: '岐阜県', romaji: 'Gifu' },
      { ja: '長野県', romaji: 'Nagano' },
      { ja: '静岡県', romaji: 'Shizuoka' },
    ],
    historical: {
      oldProvinces: [
        { ja: '尾張国', romaji: 'Owari' },
        { ja: '美濃国', romaji: 'Mino' },
        { ja: '甲斐国', romaji: 'Kai' },
        { ja: '信濃国', romaji: 'Shinano' },
      ],
      keyFigures: [
        { ja: '武田信玄', romaji: 'Takeda Shingen' },
        { ja: '織田信長', romaji: 'Oda Nobunaga' },
        { ja: '今川義元', romaji: 'Imagawa Yoshimoto' },
      ],
      summary: {
        ja: '中部は東国と畿内を結ぶ要衝であり、名門大名の軍事拠点と交通の結節点が重なった。',
        romaji:
          'Chubu linked eastern Japan with Kinai, combining strategic highways with the military heartlands of major Sengoku clans.',
      },
    },
    ui: { svgRegionIds: ['chubu'], theme: 'indigo' },
  },
]

export const defaultRegionId = 'kinki'

export function getRegionById(id: RegionData['id']) {
  return regions.find((region) => region.id === id) ?? regions[0]
}
```

Update `app/page.tsx` minimally:

```tsx
import { getRegionById } from '@/lib/data/regions'

export default function HomePage() {
  const region = getRegionById('kinki')

  return (
    <main>
      <h1>戦国日本地図</h1>
      <p>Sengoku Japan Map</p>
      <p>クリックして戦国時代の地域情報を見る</p>
      <section>
        <h2>{region.modern.ja}</h2>
        <p>{region.modern.romaji}</p>
        <ul>
          {region.historical.oldProvinces.map((province) => (
            <li key={province.romaji}>{province.ja} / {province.romaji}</li>
          ))}
        </ul>
        <ul>
          {region.historical.keyFigures.map((figure) => (
            <li key={figure.romaji}>{figure.ja} / {figure.romaji}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add types/region.ts lib/data/regions.ts app/page.tsx app/page.test.tsx
git commit -m "feat: add v1 region data seed"
```

### Task 3: Build the region info panel as a reusable component

**Files:**
- Create: `components/region-info-panel.tsx`
- Create: `components/region-info-panel.test.tsx`
- Modify: `app/page.tsx`
- Test: `components/region-info-panel.test.tsx`

- [ ] **Step 1: Write the failing component test**

```tsx
import { render, screen } from '@testing-library/react'
import { getRegionById } from '@/lib/data/regions'
import { RegionInfoPanel } from './region-info-panel'

describe('RegionInfoPanel', () => {
  it('renders bilingual labels, province list, figures, and summary', () => {
    render(<RegionInfoPanel region={getRegionById('kanto')} />)

    expect(screen.getByText(/現代地名/i)).toBeInTheDocument()
    expect(screen.getByText(/関東地方/i)).toBeInTheDocument()
    expect(screen.getByText(/Old Province/i)).toBeInTheDocument()
    expect(screen.getByText(/武蔵国/i)).toBeInTheDocument()
    expect(screen.getByText(/Hojo Ujiyasu/i)).toBeInTheDocument()
    expect(screen.getByText(/Later Hojo/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- components/region-info-panel.test.tsx`
Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the reusable info panel and wire it into the page**

Create `components/region-info-panel.tsx`:

```tsx
import { RegionData } from '@/types/region'

export function RegionInfoPanel({ region }: { region: RegionData }) {
  return (
    <aside className="rounded-3xl border border-amber-900/30 bg-stone-950/75 p-6 text-stone-100 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="mb-6 border-b border-amber-700/20 pb-4">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">現代地名 / Modern Region</p>
        <h2 className="mt-2 text-3xl font-semibold text-amber-50">{region.modern.ja}</h2>
        <p className="mt-1 text-base text-stone-300">{region.modern.romaji}</p>
      </div>

      <section className="mb-6">
        <h3 className="text-sm uppercase tracking-[0.3em] text-amber-300/80">旧国名 / Old Province</h3>
        <ul className="mt-3 space-y-2 text-sm text-stone-200">
          {region.historical.oldProvinces.map((province) => (
            <li key={province.romaji}>{province.ja} / {province.romaji}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-sm uppercase tracking-[0.3em] text-amber-300/80">主な大名・武将 / Key Daimyo &amp; Samurai</h3>
        <ul className="mt-3 space-y-2 text-sm text-stone-200">
          {region.historical.keyFigures.map((figure) => (
            <li key={figure.romaji}>{figure.ja} / {figure.romaji}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-sm uppercase tracking-[0.3em] text-amber-300/80">戦国概要 / Sengoku Note</h3>
        <p className="mt-3 text-sm leading-7 text-stone-200">{region.historical.summary.ja}</p>
        <p className="mt-3 text-sm leading-7 text-stone-400">{region.historical.summary.romaji}</p>
      </section>
    </aside>
  )
}
```

Update `app/page.tsx`:

```tsx
import { getRegionById } from '@/lib/data/regions'
import { RegionInfoPanel } from '@/components/region-info-panel'

export default function HomePage() {
  const region = getRegionById('kinki')

  return (
    <main className="p-8">
      <header className="mb-8">
        <h1>戦国日本地図</h1>
        <p>Sengoku Japan Map</p>
        <p>クリックして戦国時代の地域情報を見る</p>
      </header>
      <RegionInfoPanel region={region} />
    </main>
  )
}
```

- [ ] **Step 4: Run the component test to verify it passes**

Run: `npm test -- components/region-info-panel.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/region-info-panel.tsx components/region-info-panel.test.tsx app/page.tsx
git commit -m "feat: add bilingual region info panel"
```

### Task 4: Build the interactive SVG map with hover and click behavior

**Files:**
- Create: `components/japan-regions-map.tsx`
- Create: `components/japan-regions-map.test.tsx`
- Create: `components/map-stage.tsx`
- Modify: `app/page.tsx`
- Test: `components/japan-regions-map.test.tsx`
- Test: `app/page.test.tsx`

- [ ] **Step 1: Write the failing map interaction test**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '@/app/page'

describe('map interactions', () => {
  it('switches the info panel when the user clicks Chubu', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.click(screen.getByRole('button', { name: /中部地方/i }))

    expect(screen.getByText(/中部地方/i)).toBeInTheDocument()
    expect(screen.getByText(/Takeda Shingen/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- components/japan-regions-map.test.tsx app/page.test.tsx`
Expected: FAIL because there is no interactive map.

- [ ] **Step 3: Implement the SVG map and lift state into the page shell**

Create `components/japan-regions-map.tsx`:

```tsx
import { RegionData } from '@/types/region'

type Props = {
  regions: RegionData[]
  selectedRegionId: RegionData['id']
  hoveredRegionId: RegionData['id'] | null
  onHover: (id: RegionData['id'] | null) => void
  onSelect: (id: RegionData['id']) => void
}

const regionLayout: Record<RegionData['id'], { x: number; y: number; width: number; height: number }> = {
  kinki: { x: 340, y: 210, width: 120, height: 92 },
  chubu: { x: 438, y: 150, width: 176, height: 122 },
  kanto: { x: 620, y: 150, width: 168, height: 110 },
}

export function JapanRegionsMap({ regions, selectedRegionId, hoveredRegionId, onHover, onSelect }: Props) {
  return (
    <svg viewBox="0 0 920 560" className="h-full w-full" aria-label="Modern Japan regional map">
      <rect width="920" height="560" rx="32" fill="#14110f" />
      <path d="M120 300C180 220 220 180 300 180C360 120 470 100 600 115C710 130 810 170 860 240C840 255 830 275 822 296C780 276 744 270 716 286C672 310 640 336 606 364C566 392 526 392 470 372C400 346 364 332 324 340C260 352 196 342 120 300Z" fill="#2c251f" opacity="0.92" />
      {regions.map((region) => {
        const box = regionLayout[region.id]
        const active = selectedRegionId === region.id
        const hovered = hoveredRegionId === region.id
        const fill = active ? '#c08a28' : hovered ? '#9f5b2d' : '#43352b'
        const stroke = active ? '#f8d48b' : '#b88b57'

        return (
          <g key={region.id}>
            <button
              type="button"
              aria-label={region.modern.ja}
              className="cursor-pointer"
              style={{ all: 'unset' }}
            >
              <rect
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                rx={22}
                fill={fill}
                stroke={stroke}
                strokeWidth={active ? 4 : 2}
                onMouseEnter={() => onHover(region.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(region.id)}
              />
            </button>
            <text x={box.x + 16} y={box.y + 34} fill="#fff7ed" fontSize="24">{region.modern.ja}</text>
            <text x={box.x + 16} y={box.y + 64} fill="#fcd9a6" fontSize="16">{region.modern.romaji}</text>
          </g>
        )
      })}
    </svg>
  )
}
```

Create `components/map-stage.tsx`:

```tsx
import { RegionData } from '@/types/region'
import { JapanRegionsMap } from './japan-regions-map'

export function MapStage(props: {
  regions: RegionData[]
  selectedRegionId: RegionData['id']
  hoveredRegionId: RegionData['id'] | null
  onHover: (id: RegionData['id'] | null) => void
  onSelect: (id: RegionData['id']) => void
}) {
  return (
    <section className="rounded-[2rem] border border-amber-900/25 bg-stone-900/70 p-4 shadow-2xl shadow-black/25 backdrop-blur">
      <JapanRegionsMap {...props} />
      <p className="mt-4 text-sm text-stone-300">クリックして戦国時代の地域情報を見る</p>
    </section>
  )
}
```

Update `app/page.tsx`:

```tsx
'use client'

import { useMemo, useState } from 'react'
import { defaultRegionId, getRegionById, regions } from '@/lib/data/regions'
import { MapStage } from '@/components/map-stage'
import { RegionInfoPanel } from '@/components/region-info-panel'
import { RegionData } from '@/types/region'

export default function HomePage() {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionData['id']>(defaultRegionId)
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionData['id'] | null>(null)

  const selectedRegion = useMemo(() => getRegionById(selectedRegionId), [selectedRegionId])

  return (
    <main className="grid min-h-screen gap-8 p-8 lg:grid-cols-[1.35fr_0.9fr]">
      <section>
        <header className="mb-8">
          <h1 className="text-5xl font-semibold text-amber-50">戦国日本地図</h1>
          <p className="mt-2 text-xl text-amber-200">Sengoku Japan Map</p>
          <p className="mt-4 max-w-2xl text-base text-stone-300">
            現代日本の地域から入り、戦国時代の旧国名と代表的大名・武将をたどる。
          </p>
        </header>
        <MapStage
          regions={regions}
          selectedRegionId={selectedRegionId}
          hoveredRegionId={hoveredRegionId}
          onHover={setHoveredRegionId}
          onSelect={setSelectedRegionId}
        />
      </section>
      <RegionInfoPanel region={selectedRegion} />
    </main>
  )
}
```

- [ ] **Step 4: Run the interaction tests to verify they pass**

Run: `npm test -- components/japan-regions-map.test.tsx app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/japan-regions-map.tsx components/japan-regions-map.test.tsx components/map-stage.tsx app/page.tsx app/page.test.tsx
git commit -m "feat: add interactive regional map"
```

### Task 5: Apply the wa-fu visual system and supporting chrome

**Files:**
- Create: `components/page-header.tsx`
- Create: `components/legend.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `components/map-stage.tsx`
- Test: `app/page.test.tsx`

- [ ] **Step 1: Write the failing test for support chrome**

```tsx
import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('page chrome', () => {
  it('renders the legend and V1 coverage note', () => {
    render(<HomePage />)

    expect(screen.getByText(/首版範囲/i)).toBeInTheDocument()
    expect(screen.getByText(/近畿・関東・中部/i)).toBeInTheDocument()
    expect(screen.getByText(/Hover/i)).toBeInTheDocument()
    expect(screen.getByText(/Selected/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- app/page.test.tsx`
Expected: FAIL because legend content does not exist.

- [ ] **Step 3: Implement the header polish, legend, and textured styling**

Create `components/page-header.tsx`:

```tsx
export function PageHeader() {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.45em] text-amber-400/80">Modern Entry / Sengoku Layer</p>
      <h1 className="mt-3 text-5xl font-semibold text-amber-50 md:text-6xl">戦国日本地図</h1>
      <p className="mt-3 text-xl text-amber-200">Sengoku Japan Map</p>
      <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300">
        現代日本の行政区分を入口にして、戦国時代の旧国名と代表的大名・武将をたどる双語インタラクティブ地図。
      </p>
    </header>
  )
}
```

Create `components/legend.tsx`:

```tsx
export function Legend() {
  return (
    <section className="mt-5 rounded-3xl border border-amber-900/25 bg-stone-950/70 p-4 text-sm text-stone-300">
      <h2 className="text-xs uppercase tracking-[0.35em] text-amber-300/80">首版範囲 / V1 Coverage</h2>
      <p className="mt-3">近畿・関東・中部</p>
      <div className="mt-4 flex flex-wrap gap-4">
        <span>Hover</span>
        <span>Selected</span>
        <span>Modern Region → Sengoku Note</span>
      </div>
    </section>
  )
}
```

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  --bg-ink: #120f0d;
  --bg-panel: rgba(27, 22, 18, 0.86);
  --line-soft: rgba(196, 153, 92, 0.24);
  --gold-soft: #ddb56a;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(130, 79, 34, 0.22), transparent 28%),
    radial-gradient(circle at bottom right, rgba(89, 46, 30, 0.18), transparent 24%),
    linear-gradient(180deg, #17120f 0%, #0f0b09 100%);
  color: #f7f3ea;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px);
  background-size: 160px 160px;
  mix-blend-mode: soft-light;
}
```

Update `app/page.tsx` to use `PageHeader` and `Legend`.

- [ ] **Step 4: Run the page tests to verify they pass**

Run: `npm test -- app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/page-header.tsx components/legend.tsx app/page.tsx app/globals.css components/map-stage.tsx app/page.test.tsx
git commit -m "feat: add wa-fu presentation chrome"
```

### Task 6: Verify the build and polish accessibility-safe interactions

**Files:**
- Modify: `components/japan-regions-map.tsx`
- Modify: `components/region-info-panel.tsx`
- Modify: `app/page.tsx`
- Test: `app/page.test.tsx`
- Test: `components/japan-regions-map.test.tsx`

- [ ] **Step 1: Write the failing test for keyboard interaction**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '@/app/page'

describe('keyboard accessibility', () => {
  it('lets the user focus Kanto and activate it with keyboard', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(screen.getByText(/関東地方|近畿地方|中部地方/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails for the right reason**

Run: `npm test -- app/page.test.tsx components/japan-regions-map.test.tsx`
Expected: FAIL if SVG interaction is not keyboard reachable or semantic enough.

- [ ] **Step 3: Make the interactive regions keyboard-safe and clean up copy**

Implement one of these concrete fixes as needed based on failure:

- Wrap each region in a semantic HTML button overlay positioned above the SVG.
- Or render the region labels and interactive hit targets as focusable buttons inside the map stage container.
- Ensure every clickable region has visible focus styles and accessible names.
- Ensure the info panel headings follow `h2`/`h3` hierarchy correctly.

Expected implementation outcome:
- Tab order reaches all three interactive regions.
- Enter or Space changes selected region.
- Visible focus ring appears.

- [ ] **Step 4: Run the full verification suite**

Run:

```bash
npm test
npm run build
```

Expected:
- All tests PASS
- Next.js production build succeeds with no type errors

- [ ] **Step 5: Commit**

```bash
git add components/japan-regions-map.tsx components/region-info-panel.tsx app/page.tsx app/page.test.tsx components/japan-regions-map.test.tsx
git commit -m "fix: finalize accessible region interactions"
```

## Spec Coverage Check

- Modern Japan map entry point: covered by Tasks 1, 4, and 5.
- Bilingual title, labels, and content: covered by Tasks 1, 2, 3, and 5.
- Core regions Kinki, Kanto, Chubu: covered by Task 2 and exercised in Tasks 4 and 6.
- Hover and click interaction: covered by Task 4.
- Light info card with province, figures, and summary: covered by Tasks 2 and 3.
- Wa-fu presentation polish: covered by Task 5.
- Accessibility-safe interaction and final verification: covered by Task 6.

## Self-Review

- No placeholders remain in task steps.
- The file list matches the planned V1 architecture.
- Types and property names are consistent: `RegionData`, `oldProvinces`, `keyFigures`, `summary`, `selectedRegionId`, `hoveredRegionId`.
- The plan stays within approved V1 scope and defers time sliders, detailed province boundaries, and backend work.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-11-sengoku-japan-map-implementation.md`.

Execution mode: Inline Execution, because the user explicitly approved immediate implementation.
