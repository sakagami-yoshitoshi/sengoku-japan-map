export type BilingualText = {
  ja: string
  romaji: string
}

export type RegionId = 'kinki' | 'kanto' | 'chubu' | 'chugoku' | 'shikoku' | 'kyushu' | 'tohoku' | 'hokkaido'

export type RegionData = {
  id: RegionId
  modern: BilingualText
  prefectures: BilingualText[]
  historical: {
    oldProvinces: BilingualText[]
    keyFigures: BilingualText[]
    summary: BilingualText
  }
  ui: {
    svgRegionIds: string[]
    theme: 'gold' | 'crimson' | 'indigo'
  }
}
