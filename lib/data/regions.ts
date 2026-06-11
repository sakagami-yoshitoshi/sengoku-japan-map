import { RegionData, RegionId } from '@/types/region'

export const regions: RegionData[] = [
  {
    id: 'kinki',
    modern: { ja: '近畿地方', romaji: 'Kinki' },
    prefectures: [
      { ja: '京都府', romaji: 'Kyoto' },
      { ja: '大阪府', romaji: 'Osaka' },
      { ja: '奈良県', romaji: 'Nara' },
      { ja: '兵庫県', romaji: 'Hyogo' },
    ],
    historical: {
      oldProvinces: [
        { ja: '山城国', romaji: 'Yamashiro' },
        { ja: '摂津国', romaji: 'Settsu' },
        { ja: '河内国', romaji: 'Kawachi' },
        { ja: '大和国', romaji: 'Yamato' },
      ],
      keyFigures: [
        { ja: '織田信長', romaji: 'Oda Nobunaga' },
        { ja: '豊臣秀吉', romaji: 'Toyotomi Hideyoshi' },
        { ja: '明智光秀', romaji: 'Akechi Mitsuhide' },
      ],
      summary: {
        ja: '近畿は戦国後期の政治中枢であり、畿内支配をめぐる大名たちの争いが集中した。',
        romaji: 'Kinki was the late Sengoku political center, where control of Kinai drew intense rivalry among major daimyo.',
      },
    },
    ui: { svgRegionIds: ['kinki'], theme: 'gold' },
  },
  {
    id: 'kanto',
    modern: { ja: '関東地方', romaji: 'Kanto' },
    prefectures: [
      { ja: '東京都', romaji: 'Tokyo' },
      { ja: '神奈川県', romaji: 'Kanagawa' },
      { ja: '埼玉県', romaji: 'Saitama' },
      { ja: '千葉県', romaji: 'Chiba' },
    ],
    historical: {
      oldProvinces: [
        { ja: '武蔵国', romaji: 'Musashi' },
        { ja: '相模国', romaji: 'Sagami' },
        { ja: '上野国', romaji: 'Kozuke' },
        { ja: '下総国', romaji: 'Shimosa' },
      ],
      keyFigures: [
        { ja: '北条氏康', romaji: 'Hojo Ujiyasu' },
        { ja: '徳川家康', romaji: 'Tokugawa Ieyasu' },
        { ja: '上杉謙信', romaji: 'Uesugi Kenshin' },
      ],
      summary: {
        ja: '関東では後北条氏を中心に広域支配が進み、周辺勢力との均衡が戦国情勢を形づくった。',
        romaji: 'In Kanto, the Later Hojo expanded regional control while constant balance against rival powers shaped the Sengoku landscape.',
      },
    },
    ui: { svgRegionIds: ['kanto'], theme: 'crimson' },
  },
  {
    id: 'chubu',
    modern: { ja: '中部地方', romaji: 'Chubu' },
    prefectures: [
      { ja: '愛知県', romaji: 'Aichi' },
      { ja: '岐阜県', romaji: 'Gifu' },
      { ja: '長野県', romaji: 'Nagano' },
      { ja: '静岡県', romaji: 'Shizuoka' },
    ],
    historical: {
      oldProvinces: [
        { ja: '尾張国', romaji: 'Owari' },
        { ja: '美濃国', romaji: 'Mino' },
        { ja: '甲斐国', romaji: 'Kai' },
        { ja: '信濃国', romaji: 'Shinano' },
      ],
      keyFigures: [
        { ja: '武田信玄', romaji: 'Takeda Shingen' },
        { ja: '織田信長', romaji: 'Oda Nobunaga' },
        { ja: '今川義元', romaji: 'Imagawa Yoshimoto' },
      ],
      summary: {
        ja: '中部は東国と畿内を結ぶ要衝であり、名門大名の軍事拠点と交通の結節点が重なった。',
        romaji: 'Chubu linked eastern Japan with Kinai, combining strategic highways with the military heartlands of major Sengoku clans.',
      },
    },
    ui: { svgRegionIds: ['chubu'], theme: 'indigo' },
  },
]

export const defaultRegionId: RegionId = 'kinki'

export function getRegionById(id: RegionId) {
  return regions.find((region) => region.id === id) ?? regions[0]
}
