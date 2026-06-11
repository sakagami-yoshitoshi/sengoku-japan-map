import { RegionData, RegionId } from '@/types/region'

type Props = {
  regions: RegionData[]
  selectedRegionId: RegionId
  hoveredRegionId: RegionId | null
  onHover: (id: RegionId | null) => void
  onSelect: (id: RegionId) => void
}

type RegionVisual = {
  top: string
  left: string
  width: string
  height: string
  clipPath: string
  labelClassName: string
}

const regionLayout: Record<RegionId, RegionVisual> = {
  kyushu: {
    top: '56%',
    left: '11%',
    width: '17%',
    height: '18%',
    clipPath: 'polygon(20% 24%, 56% 8%, 83% 24%, 92% 54%, 76% 88%, 34% 96%, 8% 70%, 6% 42%)',
    labelClassName: 'flex h-full flex-col items-center justify-center px-2 text-center',
  },
  chugoku: {
    top: '42%',
    left: '19%',
    width: '18%',
    height: '16%',
    clipPath: 'polygon(8% 44%, 24% 16%, 66% 12%, 92% 30%, 96% 62%, 70% 88%, 28% 90%, 6% 64%)',
    labelClassName: 'flex h-full flex-col items-center justify-center px-2 text-center',
  },
  shikoku: {
    top: '61%',
    left: '31%',
    width: '15%',
    height: '10%',
    clipPath: 'polygon(8% 50%, 28% 24%, 76% 18%, 94% 50%, 74% 82%, 28% 84%)',
    labelClassName: 'flex h-full flex-col items-center justify-center px-2 text-center',
  },
  kinki: {
    top: '43%',
    left: '34%',
    width: '19%',
    height: '18%',
    clipPath: 'polygon(18% 18%, 63% 6%, 90% 26%, 84% 72%, 48% 94%, 8% 70%, 10% 34%)',
    labelClassName: 'flex h-full flex-col items-center justify-center px-2 text-center',
  },
  chubu: {
    top: '27%',
    left: '47%',
    width: '24%',
    height: '23%',
    clipPath: 'polygon(8% 40%, 20% 16%, 53% 6%, 83% 14%, 95% 40%, 81% 76%, 46% 95%, 14% 82%)',
    labelClassName: 'flex h-full flex-col items-center justify-center px-3 text-center',
  },
  kanto: {
    top: '26%',
    left: '71%',
    width: '18%',
    height: '21%',
    clipPath: 'polygon(12% 24%, 44% 8%, 78% 19%, 92% 48%, 84% 82%, 42% 96%, 12% 74%, 4% 42%)',
    labelClassName: 'flex h-full flex-col items-center justify-center px-2 text-center',
  },
  tohoku: {
    top: '10%',
    left: '69%',
    width: '19%',
    height: '16%',
    clipPath: 'polygon(20% 30%, 44% 8%, 78% 14%, 94% 40%, 86% 80%, 46% 94%, 12% 72%, 4% 44%)',
    labelClassName: 'flex h-full flex-col items-center justify-center px-2 text-center',
  },
}

export function JapanRegionsMap({ regions, selectedRegionId, hoveredRegionId, onHover, onSelect }: Props) {
  return (
    <div className="relative aspect-[23/14] w-full overflow-hidden rounded-[2rem] border border-amber-900/25 bg-[#16110f]">
      <svg viewBox="0 0 920 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#100c0a" />
            <stop offset="45%" stopColor="#1a1310" />
            <stop offset="100%" stopColor="#241914" />
          </linearGradient>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#2b231d" />
            <stop offset="40%" stopColor="#3b2d24" />
            <stop offset="100%" stopColor="#4b382b" />
          </linearGradient>
          <radialGradient id="goldGlow" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#a46c30" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#a46c30" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="920" height="560" rx="32" fill="url(#sea)" />
        <rect width="920" height="560" rx="32" fill="url(#goldGlow)" />

        <g opacity="0.95">
          <path d="M126 308C164 280 201 248 231 221C252 203 278 181 314 177C345 173 360 162 376 141C393 118 427 108 473 108C523 108 575 112 611 124C654 138 690 145 731 153C770 160 808 176 832 203C818 214 804 225 789 234C761 252 744 271 733 289C717 314 699 332 666 344C629 358 615 384 585 397C550 413 512 407 472 390C432 373 401 359 365 358C333 357 305 369 270 369C223 369 176 350 126 308Z" fill="url(#land)" />
          <path d="M730 153C766 129 796 118 830 116C820 144 816 165 820 188C800 180 784 173 768 169C752 165 742 160 730 153Z" fill="url(#land)" opacity="0.92" />
          <path d="M825 106C839 92 856 84 875 84C868 105 868 118 874 129C855 128 839 121 825 106Z" fill="url(#land)" opacity="0.82" />
          <path d="M363 380C384 392 397 408 399 430C373 430 350 424 332 408C340 395 349 387 363 380Z" fill="url(#land)" opacity="0.78" />
          <path d="M165 416C190 398 222 392 248 398C246 423 235 446 214 462C193 454 175 440 165 416Z" fill="url(#land)" opacity="0.82" />
        </g>

        <g opacity="0.42" stroke="#8c6b4f" strokeWidth="3" fill="none">
          <path d="M128 309C168 280 203 247 231 221C251 203 279 181 314 177C346 173 361 161 376 141C393 119 428 108 473 108C523 108 574 112 611 124C655 138 689 145 731 153" />
          <path d="M732 153C771 130 801 119 830 116" />
          <path d="M270 369C304 369 333 357 365 358C401 359 432 373 472 390C512 407 549 413 585 397C616 383 629 358 666 344" />
          <path d="M168 416C189 401 219 396 244 401" />
        </g>

        <g opacity="0.15" stroke="#f4d8a3" strokeWidth="1.5" fill="none">
          <path d="M100 440C152 406 204 390 262 388" />
          <path d="M448 82C558 82 659 106 742 145" />
          <path d="M620 438C696 410 755 366 806 310" />
        </g>
      </svg>

      <div className="absolute inset-0">
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
                'absolute overflow-hidden text-left transition duration-200 ease-out',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200/80',
                active
                  ? 'bg-amber-700/78 text-amber-50 shadow-[0_0_0_1px_rgba(255,235,180,0.32),0_20px_44px_rgba(0,0,0,0.34)]'
                  : hovered
                    ? 'bg-orange-800/72 text-orange-50 shadow-[0_16px_32px_rgba(0,0,0,0.22)]'
                    : 'bg-stone-800/62 text-stone-100 hover:bg-stone-700/82',
              ].join(' ')}
              style={{
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
                clipPath: box.clipPath,
                border: active ? '2px solid rgba(251, 228, 176, 0.95)' : '1px solid rgba(188, 140, 87, 0.7)',
              }}
              onMouseEnter={() => onHover(region.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(region.id)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(region.id)}
            >
              <span className={box.labelClassName}>
                <span className="block text-sm font-semibold leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] sm:text-base lg:text-lg">{region.modern.ja}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] opacity-90 sm:mt-2 sm:text-[11px] lg:text-xs">{region.modern.romaji}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
