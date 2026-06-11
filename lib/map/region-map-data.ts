import { RegionId } from '@/types/region'

export const JAPAN_BOUNDS: [[number, number], [number, number]] = [
  [128.0, 30.2],
  [146.5, 45.8],
]

export const REGION_BOUNDS: Record<RegionId, [[number, number], [number, number]]> = {
  kyushu: [
    [128.3, 30.8],
    [132.2, 34.3],
  ],
  chugoku: [
    [130.3, 33.9],
    [135.0, 35.9],
  ],
  shikoku: [
    [132.0, 32.8],
    [134.9, 34.6],
  ],
  kinki: [
    [134.2, 33.8],
    [136.9, 36.0],
  ],
  chubu: [
    [136.0, 34.1],
    [139.9, 38.6],
  ],
  kanto: [
    [138.8, 34.8],
    [141.4, 37.3],
  ],
  tohoku: [
    [139.0, 36.6],
    [142.4, 41.8],
  ],
}

export const REGION_FEATURE_COLLECTION = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { regionId: 'kyushu', nameJa: '九州地方', theme: 'crimson' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [128.45, 31.05],
          [129.55, 31.0],
          [130.65, 31.2],
          [131.7, 31.8],
          [131.95, 32.7],
          [131.7, 33.65],
          [130.9, 34.05],
          [129.95, 33.85],
          [128.95, 33.3],
          [128.4, 32.2],
          [128.45, 31.05],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { regionId: 'chugoku', nameJa: '中国地方', theme: 'gold' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [130.35, 34.05],
          [131.25, 34.0],
          [132.45, 34.0],
          [133.8, 34.12],
          [134.75, 34.32],
          [134.45, 35.2],
          [133.45, 35.55],
          [132.15, 35.55],
          [130.95, 35.35],
          [130.4, 34.65],
          [130.35, 34.05],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { regionId: 'shikoku', nameJa: '四国地方', theme: 'indigo' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [132.05, 33.15],
          [132.95, 33.08],
          [133.95, 33.18],
          [134.75, 33.55],
          [134.45, 34.2],
          [133.45, 34.25],
          [132.35, 34.0],
          [132.0, 33.45],
          [132.05, 33.15],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { regionId: 'kinki', nameJa: '近畿地方', theme: 'gold' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [134.35, 34.15],
          [135.2, 34.0],
          [136.2, 34.12],
          [136.75, 34.75],
          [136.45, 35.45],
          [135.75, 35.72],
          [134.85, 35.65],
          [134.3, 35.05],
          [134.35, 34.15],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { regionId: 'chubu', nameJa: '中部地方', theme: 'indigo' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [136.05, 34.25],
          [137.1, 34.15],
          [138.45, 34.32],
          [139.55, 35.15],
          [139.7, 36.2],
          [139.15, 37.45],
          [138.0, 37.95],
          [136.95, 37.75],
          [136.15, 36.55],
          [136.05, 34.25],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { regionId: 'kanto', nameJa: '関東地方', theme: 'crimson' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [138.95, 34.85],
          [140.0, 34.85],
          [141.15, 35.3],
          [141.15, 36.55],
          [140.7, 37.08],
          [139.7, 36.95],
          [139.0, 36.3],
          [138.95, 34.85],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { regionId: 'tohoku', nameJa: '東北地方', theme: 'gold' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [139.05, 36.7],
          [140.0, 36.72],
          [141.2, 37.2],
          [141.95, 38.6],
          [142.05, 40.35],
          [141.55, 41.55],
          [140.55, 41.7],
          [139.65, 40.85],
          [139.05, 39.1],
          [139.05, 36.7],
        ]],
      },
    },
  ],
} as const

export const OSM_RASTER_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm-base',
      type: 'raster',
      source: 'osm',
    },
  ],
} as const
