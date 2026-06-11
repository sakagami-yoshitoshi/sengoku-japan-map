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
  {
    id: 'chugoku',
    modern: { ja: '中国地方', romaji: 'Chugoku' },
    prefectures: [
      { ja: '広島県', romaji: 'Hiroshima' },
      { ja: '岡山県', romaji: 'Okayama' },
      { ja: '山口県', romaji: 'Yamaguchi' },
      { ja: '鳥取県', romaji: 'Tottori' },
    ],
    historical: {
      oldProvinces: [
        { ja: '安芸国', romaji: 'Aki' },
        { ja: '備前国', romaji: 'Bizen' },
        { ja: '周防国', romaji: 'Suo' },
        { ja: '出雲国', romaji: 'Izumo' },
      ],
      keyFigures: [
        { ja: '毛利元就', romaji: 'Mori Motonari' },
        { ja: '大内義隆', romaji: 'Ouchi Yoshitaka' },
        { ja: '尼子晴久', romaji: 'Amago Haruhisa' },
      ],
      summary: {
        ja: '中国地方では大内・尼子・毛利が覇権を争い、西国の勢力均衡を左右した。',
        romaji: 'In Chugoku, the Ouchi, Amago, and Mori clans fought for supremacy and shaped the western balance of power.',
      },
    },
    ui: { svgRegionIds: ['chugoku'], theme: 'gold' },
  },
  {
    id: 'shikoku',
    modern: { ja: '四国地方', romaji: 'Shikoku' },
    prefectures: [
      { ja: '愛媛県', romaji: 'Ehime' },
      { ja: '香川県', romaji: 'Kagawa' },
      { ja: '高知県', romaji: 'Kochi' },
      { ja: '徳島県', romaji: 'Tokushima' },
    ],
    historical: {
      oldProvinces: [
        { ja: '伊予国', romaji: 'Iyo' },
        { ja: '讃岐国', romaji: 'Sanuki' },
        { ja: '土佐国', romaji: 'Tosa' },
        { ja: '阿波国', romaji: 'Awa' },
      ],
      keyFigures: [
        { ja: '長宗我部元親', romaji: 'Chosokabe Motochika' },
        { ja: '河野通直', romaji: 'Kono Michinao' },
        { ja: '三好長慶', romaji: 'Miyoshi Nagayoshi' },
      ],
      summary: {
        ja: '四国では長宗我部氏の台頭が進み、畿内勢力や豊臣政権との接続点となった。',
        romaji: 'In Shikoku, the rise of the Chosokabe clan connected island warfare with Kinai politics and later Toyotomi expansion.',
      },
    },
    ui: { svgRegionIds: ['shikoku'], theme: 'indigo' },
  },
  {
    id: 'kyushu',
    modern: { ja: '九州地方', romaji: 'Kyushu' },
    prefectures: [
      { ja: '鹿児島県', romaji: 'Kagoshima' },
      { ja: '熊本県', romaji: 'Kumamoto' },
      { ja: '福岡県', romaji: 'Fukuoka' },
      { ja: '大分県', romaji: 'Oita' },
    ],
    historical: {
      oldProvinces: [
        { ja: '薩摩国', romaji: 'Satsuma' },
        { ja: '肥後国', romaji: 'Higo' },
        { ja: '筑前国', romaji: 'Chikuzen' },
        { ja: '豊後国', romaji: 'Bungo' },
      ],
      keyFigures: [
        { ja: '島津義久', romaji: 'Shimazu Yoshihisa' },
        { ja: '大友宗麟', romaji: 'Otomo Sorin' },
        { ja: '龍造寺隆信', romaji: 'Ryuzoji Takanobu' },
      ],
      summary: {
        ja: '九州では島津・大友・龍造寺が激しく競合し、豊臣の九州征伐まで大規模な地域戦争が続いた。',
        romaji: 'In Kyushu, the Shimazu, Otomo, and Ryuzoji fought intense regional wars until Toyotomi intervention reshaped the island.',
      },
    },
    ui: { svgRegionIds: ['kyushu'], theme: 'crimson' },
  },
  {
    id: 'tohoku',
    modern: { ja: '東北地方', romaji: 'Tohoku' },
    prefectures: [
      { ja: '宮城県', romaji: 'Miyagi' },
      { ja: '山形県', romaji: 'Yamagata' },
      { ja: '福島県', romaji: 'Fukushima' },
      { ja: '青森県', romaji: 'Aomori' },
    ],
    historical: {
      oldProvinces: [
        { ja: '陸奥国', romaji: 'Mutsu' },
        { ja: '出羽国', romaji: 'Dewa' },
        { ja: '岩代国', romaji: 'Iwashiro' },
        { ja: '津軽', romaji: 'Tsugaru' },
      ],
      keyFigures: [
        { ja: '伊達政宗', romaji: 'Date Masamune' },
        { ja: '最上義光', romaji: 'Mogami Yoshiaki' },
        { ja: '南部晴政', romaji: 'Nanbu Harumasa' },
      ],
      summary: {
        ja: '東北は広大な旧領と在地勢力がせめぎ合い、伊達氏をはじめとする戦国大名が独自の統合を進めた。',
        romaji: 'Tohoku remained a vast frontier of local power, where clans such as the Date forged their own paths toward regional unification.',
      },
    },
    ui: { svgRegionIds: ['tohoku'], theme: 'gold' },
  },
  {
    id: 'hokkaido',
    modern: { ja: '北海道地方', romaji: 'Hokkaido' },
    prefectures: [
      { ja: '北海道', romaji: 'Hokkaido' },
    ],
    historical: {
      oldProvinces: [
        { ja: '蝦夷地', romaji: 'Ezochi' },
        { ja: '渡島半島', romaji: 'Oshima Peninsula' },
        { ja: '松前', romaji: 'Matsumae' },
        { ja: '上ノ国', romaji: 'Kaminokuni' },
      ],
      keyFigures: [
        { ja: '松前慶広', romaji: 'Matsumae Yoshihiro' },
        { ja: '蠣崎季広', romaji: 'Kakizaki Suehiro' },
        { ja: '豊臣秀吉', romaji: 'Toyotomi Hideyoshi' },
      ],
      summary: {
        ja: '戦国末期の北海道は蝦夷地として和人拠点とアイヌ勢力が接する北方辺境であり、1590年には豊臣秀吉が松前氏の所領と守備役を公認して全国秩序へ組み込んだ。',
        romaji: 'At the end of the Sengoku age, Hokkaido was the northern frontier of Ezochi, where Wajin footholds met Ainu power. In 1590, Toyotomi Hideyoshi recognized the Matsumae domain and its defensive role, bringing the region into the late unification order.',
      },
    },
    ui: { svgRegionIds: ['hokkaido'], theme: 'indigo' },
  },
]

export const defaultRegionId: RegionId = 'kinki'

export function getRegionById(id: RegionId) {
  return regions.find((region) => region.id === id) ?? regions[0]
}
