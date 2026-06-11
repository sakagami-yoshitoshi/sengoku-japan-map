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

  return (
    <main className="grid min-h-screen gap-8 p-6 md:p-8 lg:grid-cols-[1.35fr_0.9fr] lg:p-10">
      <section>
        <PageHeader />
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
