import { RegionId } from '@/types/region'

export const JAPAN_VIEW_BOUNDS: [[number, number], [number, number]] = [
  [128.0, 30.5],
  [146.2, 41.9],
]

export const REGION_VIEW_BOUNDS: Record<RegionId, [[number, number], [number, number]]> = {
  kyushu: [
    [128.1, 30.8],
    [132.3, 34.4],
  ],
  chugoku: [
    [130.6, 33.8],
    [134.9, 35.9],
  ],
  shikoku: [
    [132.0, 32.7],
    [134.9, 34.6],
  ],
  kinki: [
    [134.2, 33.7],
    [136.9, 35.9],
  ],
  chubu: [
    [136.0, 34.2],
    [139.9, 38.7],
  ],
  kanto: [
    [138.8, 34.8],
    [141.6, 37.3],
  ],
  tohoku: [
    [139.1, 36.7],
    [142.2, 41.8],
  ],
}
