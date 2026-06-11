import { RegionData, RegionId } from '@/types/region'
import { JapanRegionsMap } from './japan-regions-map'
import { Legend } from './legend'

export function MapStage(props: {
  regions: RegionData[]
  selectedRegionId: RegionId
  hoveredRegionId: RegionId | null
  onHover: (id: RegionId | null) => void
  onSelect: (id: RegionId) => void
}) {
  return (
    <section className="rounded-[2rem] border border-amber-900/25 bg-stone-900/70 p-4 shadow-2xl shadow-black/25 backdrop-blur">
      <JapanRegionsMap {...props} />
      <p className="mt-4 text-sm text-stone-300">クリックして戦国時代の地域情報を見る</p>
      <Legend />
    </section>
  )
}
