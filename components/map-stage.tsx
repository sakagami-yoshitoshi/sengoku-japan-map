import { RegionData, RegionId } from '@/types/region'
import { JapanRegionsMap } from './japan-regions-map'
import { Legend } from './legend'

export function MapStage(props: {
  activeRegion: RegionData
  regions: RegionData[]
  selectedRegionId: RegionId
  hoveredRegionId: RegionId | null
  onHover: (id: RegionId | null) => void
  onSelect: (id: RegionId) => void
}) {
  const { activeRegion } = props

  return (
    <section className="sengoku-surface rounded-[2rem] border border-amber-900/25 bg-stone-900/70 p-3 shadow-2xl shadow-black/25 backdrop-blur md:p-4 lg:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-900/20 bg-black/10 px-4 py-3 text-sm text-stone-300">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-amber-300/80">Current Focus</p>
          <p className="mt-1 text-sm text-stone-100">
            {activeRegion.modern.ja} <span className="text-stone-400">/ {activeRegion.modern.romaji}</span>
          </p>
        </div>
        <p className="text-xs text-stone-400">Move across regions to preview, then click to lock the panel</p>
      </div>

      <JapanRegionsMap {...props} />
      <p className="mt-4 text-sm leading-7 text-stone-300">クリックして戦国時代の地域情報を見る</p>
      <Legend />
    </section>
  )
}
