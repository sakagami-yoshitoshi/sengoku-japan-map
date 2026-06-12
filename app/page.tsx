'use client'

import { useMemo, useState } from 'react'
import { MapStage } from '@/components/map-stage'
import { PageHeader } from '@/components/page-header'
import { getPrefectureById, PREFECTURE_CONTEXTS, PrefectureId } from '@/lib/data/prefectures'

export default function HomePage() {
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<PrefectureId | null>(null)
  const [hoveredPrefectureId, setHoveredPrefectureId] = useState<PrefectureId | null>(null)

  const selectedPrefecture = useMemo(
    () => (selectedPrefectureId ? getPrefectureById(selectedPrefectureId) : null),
    [selectedPrefectureId],
  )

  const selectedContext = useMemo(
    () => (selectedPrefecture ? PREFECTURE_CONTEXTS[selectedPrefecture.contextKey] : null),
    [selectedPrefecture],
  )

  return (
    <main className="sengoku-shell flex min-h-screen flex-col overflow-hidden p-3 md:p-4 lg:p-5">
      <PageHeader />
      <MapStage
        hoveredPrefectureId={hoveredPrefectureId}
        selectedContext={selectedContext}
        selectedPrefecture={selectedPrefecture}
        selectedPrefectureId={selectedPrefectureId}
        onHover={setHoveredPrefectureId}
        onSelect={setSelectedPrefectureId}
      />
    </main>
  )
}
