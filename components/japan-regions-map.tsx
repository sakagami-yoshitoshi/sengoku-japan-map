'use client'

import { useEffect, useRef, useState } from 'react'
import { PrefectureContext, PrefectureData, PrefectureId } from '@/lib/data/prefectures'
import { OSM_RASTER_STYLE } from '@/lib/map/osm-raster-style'
import { PREFECTURE_VIEW_BOUNDS } from '@/lib/map/prefecture-view-bounds'

type Props = {
  prefectures: PrefectureData[]
  selectedPrefecture: PrefectureData | null
  selectedContext: PrefectureContext | null
  selectedPrefectureId: PrefectureId | null
  hoveredPrefectureId: PrefectureId | null
  onHover: (id: PrefectureId | null) => void
  onSelect: (id: PrefectureId | null) => void
}

const PREFECTURE_SOURCE_ID = 'sengoku-prefectures'
const PREFECTURE_FILL_LAYER_ID = 'sengoku-prefectures-fill'
const PREFECTURE_LINE_LAYER_ID = 'sengoku-prefectures-line'

const DEFAULT_BEARING = -18
const DEFAULT_JAPAN_CENTER: [number, number] = [137, 37]
const DEFAULT_JAPAN_ZOOM = 5.2

function ensureMapSized(map: any) {
  try {
    map.resize()
  } catch {}
}

function publishMapState(map: any) {
  if (typeof window === 'undefined') return
  ;(window as any).__sengokuMapState = {
    bearing: map.getBearing?.(),
    center: map.getCenter?.(),
    zoom: map.getZoom?.(),
  }
}

function fitToJapan(map: any, duration: number) {
  ensureMapSized(map)
  map.easeTo({
    bearing: DEFAULT_BEARING,
    center: DEFAULT_JAPAN_CENTER,
    duration,
    essential: true,
    zoom: DEFAULT_JAPAN_ZOOM,
  })
}

export function JapanRegionsMap({
  prefectures,
  selectedPrefecture,
  selectedContext,
  selectedPrefectureId,
  hoveredPrefectureId,
  onHover,
  onSelect,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const loadedRef = useRef(false)
  const onHoverRef = useRef(onHover)
  const onSelectRef = useRef(onSelect)
  const [mapError, setMapError] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)

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
        const [{ default: maplibregl }, geojsonResponse] = await Promise.all([
          import('maplibre-gl'),
          fetch('/data/japan-prefectures.geojson'),
        ])

        if (!geojsonResponse.ok) {
          throw new Error(`Prefecture GeoJSON failed to load (${geojsonResponse.status})`)
        }

        const prefectureGeojson = await geojsonResponse.json()

        if (cancelled || !mapContainerRef.current) {
          return
        }

        const map = new maplibregl.Map({
          bearing: DEFAULT_BEARING,
          center: DEFAULT_JAPAN_CENTER,
          container: mapContainerRef.current,
          cooperativeGestures: true,
          dragRotate: false,
          maxZoom: 10,
          minZoom: 3,
          pitchWithRotate: false,
          style: OSM_RASTER_STYLE as any,
          touchPitch: false,
          zoom: DEFAULT_JAPAN_ZOOM,
        })

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), 'top-right')
        mapRef.current = map
        publishMapState(map)
        requestAnimationFrame(() => ensureMapSized(map))
        setTimeout(() => ensureMapSized(map), 80)

        map.on('load', () => {
          if (cancelled) return

          loadedRef.current = true

          if (!map.getSource(PREFECTURE_SOURCE_ID)) {
            map.addSource(PREFECTURE_SOURCE_ID, {
              type: 'geojson',
              data: prefectureGeojson as any,
              promoteId: 'prefectureId',
            })
          }

          map.addLayer({
            id: PREFECTURE_FILL_LAYER_ID,
            type: 'fill',
            source: PREFECTURE_SOURCE_ID,
            paint: {
              'fill-color': [
                'match',
                ['get', 'contextKey'],
                'hokkaido', '#4f46e5',
                'tohoku', '#b88a3b',
                'kanto', '#c2410c',
                'chubu', '#4338ca',
                'kinki', '#d97706',
                'chugoku', '#a16207',
                'shikoku', '#5b21b6',
                'kyushu', '#b91c1c',
                'okinawa', '#b91c1c',
                '#b88a3b',
              ],
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 0.78,
                ['boolean', ['feature-state', 'hovered'], false], 0.58,
                0.28,
              ],
            },
          })

          map.addLayer({
            id: PREFECTURE_LINE_LAYER_ID,
            type: 'line',
            source: PREFECTURE_SOURCE_ID,
            paint: {
              'line-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], '#fde68a',
                ['boolean', ['feature-state', 'hovered'], false], '#fdba74',
                '#f3d49b',
              ],
              'line-opacity': 0.92,
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 3.4,
                ['boolean', ['feature-state', 'hovered'], false], 2.25,
                0.95,
              ],
            },
          })

          map.on('click', PREFECTURE_FILL_LAYER_ID, (event: any) => {
            const prefectureId = event.features?.[0]?.properties?.prefectureId as PrefectureId | undefined
            if (!prefectureId) return
            onSelectRef.current(prefectureId)
            fitToPrefecture(prefectureId)
          })

          map.on('click', (event: any) => {
            const hits = map.queryRenderedFeatures(event.point, { layers: [PREFECTURE_FILL_LAYER_ID] })
            if (hits.length === 0) {
              onSelectRef.current(null)
              fitToJapan(map, 900)
            }
          })

          map.on('mousemove', PREFECTURE_FILL_LAYER_ID, (event: any) => {
            const prefectureId = event.features?.[0]?.properties?.prefectureId as PrefectureId | undefined
            map.getCanvas().style.cursor = prefectureId ? 'pointer' : ''
            onHoverRef.current(prefectureId ?? null)
          })

          map.on('mouseleave', PREFECTURE_FILL_LAYER_ID, () => {
            map.getCanvas().style.cursor = ''
            onHoverRef.current(null)
          })

          fitToJapan(map, 0)
          setTimeout(() => {
            fitToJapan(map, 0)
            publishMapState(map)
          }, 120)
          map.on('moveend', () => publishMapState(map))
          setMapReady(true)
        })

        map.on('error', (event: any) => {
          const detail = event?.error?.message ?? event?.error?.statusText ?? 'Unknown map error'
          console.error('Map stage error:', detail, event)
          setMapError(`Map layer failed to load: ${detail}`)
        })
      } catch (error: any) {
        setMapError(error?.message ?? 'MapLibre GL failed to initialize in this environment.')
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

    for (const prefecture of prefectures) {
      map.setFeatureState(
        { source: PREFECTURE_SOURCE_ID, id: prefecture.id },
        {
          hovered: hoveredPrefectureId === prefecture.id,
          selected: selectedPrefectureId === prefecture.id,
        },
      )
    }
  }, [hoveredPrefectureId, prefectures, selectedPrefectureId])

  useEffect(() => {
    if (!loadedRef.current || !mapRef.current || !selectedPrefectureId) {
      return
    }

    fitToPrefecture(selectedPrefectureId)
  }, [selectedPrefectureId])

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        ensureMapSized(mapRef.current)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onSelect(null)
        if (mapRef.current) {
          fitToJapan(mapRef.current, 900)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSelect])

  const fitToPrefecture = (prefectureId: PrefectureId) => {
    const map = mapRef.current
    const bounds = PREFECTURE_VIEW_BOUNDS[prefectureId]
    if (!map || !bounds || !loadedRef.current) {
      return
    }

    ensureMapSized(map)
    map.fitBounds(bounds, {
      duration: 900,
      padding: { top: 72, right: 72, bottom: 72, left: 72 },
    })
  }

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden rounded-[1.5rem] border border-amber-900/20 bg-[#120f0d]">
      <div className="sr-only" aria-label="Prefecture quick controls">
        {prefectures.map((prefecture) => (
          <button
            key={prefecture.id}
            type="button"
            onClick={() => {
              onSelect(prefecture.id)
              fitToPrefecture(prefecture.id)
            }}
          >
            {prefecture.modern.ja}
          </button>
        ))}
      </div>

      <div className="h-full w-full">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>

      {!mapReady && !mapError ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-950/70 to-stone-900/30 text-sm text-stone-300">
          Loading prefecture map stage...
        </div>
      ) : null}

      {mapError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-orange-500/30 bg-black/70 p-4 text-sm leading-6 text-orange-100 backdrop-blur">
          <p className="font-semibold text-orange-200">Map stage warning</p>
          <p className="mt-1">{mapError}</p>
        </div>
      ) : null}

      <div className="landscape-enforcer absolute inset-0 z-40 hidden items-center justify-center bg-stone-950/96 p-8 text-center text-stone-100 backdrop-blur-lg lg:hidden">
        <div className="max-w-sm rounded-[1.8rem] border border-amber-700/30 bg-black/40 p-6 shadow-2xl shadow-black/40">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-300/80">Landscape recommended</p>
          <h2 className="mt-3 text-xl font-semibold text-amber-50">请横屏浏览 / Rotate to landscape</h2>
          <p className="mt-3 text-sm leading-7 text-stone-300">
            当前桌面版使用 3:2 地图视窗与右侧等高说明栏，以最大化地图可读性并避免页面滚动。
          </p>
        </div>
      </div>
    </div>
  )
}
