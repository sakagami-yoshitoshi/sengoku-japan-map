import { RegionData, RegionId } from '@/types/region'

type Props = {
  regions: RegionData[]
  selectedRegionId: RegionId
  hoveredRegionId: RegionId | null
  onHover: (id: RegionId | null) => void
  onSelect: (id: RegionId) => void
}

const regionLayout: Record<RegionId, { top: string; left: string; width: string; height: string }> = {
  kinki: { top: '43%', left: '35%', width: '18%', height: '17%' },
  chubu: { top: '28%', left: '48%', width: '22%', height: '21%' },
  kanto: { top: '27%', left: '71%', width: '19%', height: '19%' },
}

export function JapanRegionsMap({ regions, selectedRegionId, hoveredRegionId, onHover, onSelect }: Props) {
  return (
    <div className="relative aspect-[23/14] w-full overflow-hidden rounded-[2rem] border border-amber-900/25 bg-[#16110f]">
      <svg viewBox="0 0 920 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#100c0a" />
            <stop offset="100%" stopColor="#211814" />
          </linearGradient>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#2c251f" />
            <stop offset="100%" stopColor="#3a2d24" />
          </linearGradient>
        </defs>
        <rect width="920" height="560" rx="32" fill="url(#sea)" />
        <path d="M120 300C180 220 220 180 300 180C360 120 470 100 600 115C710 130 810 170 860 240C840 255 830 275 822 296C780 276 744 270 716 286C672 310 640 336 606 364C566 392 526 392 470 372C400 346 364 332 324 340C260 352 196 342 120 300Z" fill="url(#land)" opacity="0.96" />
        <path d="M118 304C179 222 219 182 299 182C360 122 468 102 599 116C709 131 809 172 858 240" fill="none" stroke="#6f5943" strokeWidth="4" opacity="0.4" />
      </svg>

      {regions.map((region) => {
        const box = regionLayout[region.id]
        const active = selectedRegionId === region.id
        const hovered = hoveredRegionId === region.id

        return (
          <button
            key={region.id}
            type="button"
            aria-label={region.modern.ja}
            aria-pressed={active}
            className={[
              'absolute rounded-[1.4rem] border px-4 py-3 text-left transition duration-150 ease-out',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200/80',
              active
                ? 'border-amber-200 bg-amber-700/75 text-amber-50 shadow-[0_0_0_1px_rgba(255,235,180,0.25),0_18px_45px_rgba(0,0,0,0.35)]'
                : hovered
                  ? 'border-orange-300/70 bg-orange-800/65 text-orange-50'
                  : 'border-amber-800/45 bg-stone-800/65 text-stone-100 hover:border-amber-500/60 hover:bg-stone-700/80',
            ].join(' ')}
            style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
            onMouseEnter={() => onHover(region.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(region.id)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(region.id)}
          >
            <span className="block text-lg font-semibold">{region.modern.ja}</span>
            <span className="mt-1 block text-sm opacity-90">{region.modern.romaji}</span>
          </button>
        )
      })}
    </div>
  )
}
