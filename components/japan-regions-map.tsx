'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { JAPAN_BOUNDS, OSM_RASTER_STYLE, REGION_BOUNDS, REGION_FEATURE_COLLECTION } from '@/lib/map/region-map-data'
import { RegionData, RegionId } from '@/types/region'

type Props = {
  regions: RegionData[]
  selectedRegionId: RegionId
  hoveredRegionId: RegionId | null
  onHover: (id: RegionId | null) => void
  onSelect: (id: RegionId) => void
}

const REGION_SOURCE_ID = 'sengoku-regions'
const REGION_FILL_LAYER_ID = 'sengoku-regions-fill'
const REGION_LINE_LAYER_ID = 'sengoku-regions-line'

export function JapanRegionsMap({ regions, selectedRegionId, hoveredRegionId, onHover, onSelect }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const loadedRef = useRef(false)
  const onHoverRef = useRef(onHover)
  const onSelectRef = useRef(onSelect)
  const [mapError, setMapError] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)

  const quickJumpLabel = useMemo(() => 'MapLibre GL · OpenStreetMap geographic stage', [])

  useEffect(() => {
    onHoverRef.current = onHover
    onSelectRef.current = onSelect
  }, [onHover, onSelect])

  useEffect(() => {
    if (isJsdom || !mapContainerRef.current || mapRef.current) {
      return
    }

    let cancelled = false

    const initializeMap = async () => {
      try {
        const maplibregl = (await import('maplibre-gl')).default
        if (cancelled || !mapContainerRef.current) {
          return
        }

        const map = new maplibregl.Map({
          center: [137.9, 36.2],
          container: mapContainerRef.current,
          cooperativeGestures: true,
          dragRotate: false,
          maxZoom: 8,
          minZoom: 3.6,
          pitchWithRotate: false,
          style: OSM_RASTER_STYLE as any,
          touchPitch: false,
          zoom: 4.45,
        })

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), 'top-right')
        mapRef.current = map

        map.on('load', () => {
          if (cancelled) return

          loadedRef.current = true

          if (!map.getSource(REGION_SOURCE_ID)) {
            map.addSource(REGION_SOURCE_ID, {
              type: 'geojson',
              data: REGION_FEATURE_COLLECTION as any,
              promoteId: 'regionId',
            })
          }

          map.addLayer({
            id: REGION_FILL_LAYER_ID,
            type: 'fill',
            source: REGION_SOURCE_ID,
            paint: {
              'fill-color': [
                'match',
                ['get', 'theme'],
                'crimson', '#c2410c',
                'indigo', '#4338ca',
                '#b88a3b',
              ],
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 0.52,
                ['boolean', ['feature-state', 'hovered'], false], 0.38,
                0.2,
              ],
            },
          })

          map.addLayer({
            id: REGION_LINE_LAYER_ID,
            type: 'line',
            source: REGION_SOURCE_ID,
            paint: {
              'line-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], '#fde68a',
                ['boolean', ['feature-state', 'hovered'], false], '#fdba74',
                '#f3d49b',
              ],
              'line-opacity': 0.9,
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 3,
                ['boolean', ['feature-state', 'hovered'], false], 2.2,
                1.4,
              ],
            },
          })

          map.on('click', REGION_FILL_LAYER_ID, (event: any) => {
            const regionId = event.features?.[0]?.properties?.regionId as RegionId | undefined
            if (!regionId) return
            onSelectRef.current(regionId)
            fitToRegion(regionId)
          })

          map.on('mousemove', REGION_FILL_LAYER_ID, (event: any) => {
            const regionId = event.features?.[0]?.properties?.regionId as RegionId | undefined
            map.getCanvas().style.cursor = regionId ? 'pointer' : ''
            onHoverRef.current(regionId ?? null)
          })

          map.on('mouseleave', REGION_FILL_LAYER_ID, () => {
            map.getCanvas().style.cursor = ''
            onHoverRef.current(null)
          })

          map.fitBounds(JAPAN_BOUNDS, { duration: 0, padding: 28 })
          setMapReady(true)
        })

        map.on('error', (event: any) => {
          const detail = event?.error?.message ?? event?.error?.statusText ?? 'Unknown map error'
          console.error('Map stage error:', detail, event)
          setMapError(`Map layer failed to load: ${detail}`)
        })
      } catch {
        setMapError('MapLibre GL failed to initialize in this environment.')
      }
    }

    initializeMap()

    return () => {
      cancelled = true
      loadedRef.current = false
      setMapReady(false)
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [isJsdom])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !loadedRef.current) {
      return
    }

    for (const region of regions) {
      map.setFeatureState(
        { source: REGION_SOURCE_ID, id: region.id },
        {
          hovered: hoveredRegionId === region.id,
          selected: selectedRegionId === region.id,
        },
      )
    }
  }, [hoveredRegionId, regions, selectedRegionId])

  const fitToRegion = (regionId: RegionId) => {
    const map = mapRef.current
    const bounds = REGION_BOUNDS[regionId]
    if (!map || !bounds || !loadedRef.current) {
      return
    }

    map.fitBounds(bounds, {
      duration: 900,
      padding: { top: 52, right: 40, bottom: 52, left: 40 },
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {regions.map((region) => {
          const active = selectedRegionId === region.id
          const hovered = hoveredRegionId === region.id

          return (
            <button
              key={region.id}
              type="button"
              aria-label={region.modern.ja}
              aria-pressed={active}
              className={[
                'rounded-full border px-3 py-2 text-sm transition duration-150 ease-out',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200/80',
                active
                  ? 'border-amber-200 bg-amber-700/70 text-amber-50'
                  : hovered
                    ? 'border-orange-300/60 bg-orange-800/55 text-orange-50'
                    : 'border-amber-900/30 bg-stone-900/70 text-stone-200 hover:border-amber-700/60 hover:bg-stone-800/80',
              ].join(' ')}
              onMouseEnter={() => onHover(region.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(region.id)}
              onBlur={() => onHover(null)}
              onClick={() => {
                onSelect(region.id)
                fitToRegion(region.id)
              }}
            >
              {region.modern.ja}
            </button>
          )
        })}
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-amber-900/25 bg-[#120f0d] sm:h-[480px] lg:h-[560px]">
        <div ref={mapContainerRef} className="h-full w-full" />

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-amber-900/30 bg-black/45 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-amber-100/90 backdrop-blur">
          {quickJumpLabel}
        </div>

        {!mapReady && !mapError ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-950/70 to-stone-900/30 text-sm text-stone-300">
            Loading geographic map stage...
          </div>
        ) : null}

        {mapError ? (
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-orange-500/30 bg-black/70 p-4 text-sm leading-6 text-orange-100 backdrop-blur">
            <p className="font-semibold text-orange-200">Map stage warning</p>
            <p className="mt-1">{mapError}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
