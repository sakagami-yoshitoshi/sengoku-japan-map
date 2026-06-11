'use client'

import { useMemo, useState } from 'react'
import { MapStage } from '@/components/map-stage'
import { PageHeader } from '@/components/page-header'
import { RegionInfoPanel } from '@/components/region-info-panel'
import { defaultRegionId, getRegionById, regions } from '@/lib/data/regions'
import { RegionId } from '@/types/region'

export default function HomePage() {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>(defaultRegionId)
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null)

  const selectedRegion = useMemo(() => getRegionById(selectedRegionId), [selectedRegionId])
  const activeRegion = useMemo(() => getRegionById(hoveredRegionId ?? selectedRegionId), [hoveredRegionId, selectedRegionId])

  return (
    <main className="grid min-h-screen gap-6 p-4 md:gap-8 md:p-6 lg:grid-cols-[1.2fr_0.92fr] lg:gap-10 lg:p-10">
      <section className="min-w-0">
        <PageHeader />
        <MapStage
          activeRegion={activeRegion}
          regions={regions}
          selectedRegionId={selectedRegionId}
          hoveredRegionId={hoveredRegionId}
          onHover={setHoveredRegionId}
          onSelect={setSelectedRegionId}
        />
      </section>

      <div className="min-w-0 lg:sticky lg:top-10 lg:self-start">
        <RegionInfoPanel key={selectedRegion.id} region={selectedRegion} />
      </div>
    </main>
  )
}
