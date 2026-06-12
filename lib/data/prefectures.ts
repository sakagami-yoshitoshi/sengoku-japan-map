export type BilingualText = { ja: string; romaji: string }

export type PrefectureId = number

export type PrefectureContextKey =
  | 'hokkaido'
  | 'tohoku'
  | 'kanto'
  | 'chubu'
  | 'kinki'
  | 'chugoku'
  | 'shikoku'
  | 'kyushu'
  | 'okinawa'

export type PrefectureContext = {
  area: BilingualText
  representativeFigures: BilingualText[]
  summary: BilingualText
}

export type PrefectureData = {
  id: PrefectureId
  modern: BilingualText
  contextKey: PrefectureContextKey
}

export const PREFECTURE_CONTEXTS: Record<PrefectureContextKey, PrefectureContext> = {
  "hokkaido": {
    "area": {
      "ja": "北海道地方",
      "romaji": "Hokkaido"
    },
    "representativeFigures": [
      {
        "ja": "松前慶広",
        "romaji": "Matsumae Yoshihiro"
      },
      {
        "ja": "蠣崎季広",
        "romaji": "Kakizaki Suehiro"
      },
      {
        "ja": "豊臣秀吉",
        "romaji": "Toyotomi Hideyoshi"
      }
    ],
    "summary": {
      "ja": "北海道は戦国末期には蝦夷地として和人拠点とアイヌ勢力が接する北方辺境であり、松前氏が対外窓口と守備役を担った。",
      "romaji": "In the late Sengoku era, Hokkaido was the northern frontier of Ezochi, where Wajin footholds met Ainu power and the Matsumae house served as gatekeeper and defender."
    }
  },
  "tohoku": {
    "area": {
      "ja": "東北地方",
      "romaji": "Tohoku"
    },
    "representativeFigures": [
      {
        "ja": "伊達政宗",
        "romaji": "Date Masamune"
      },
      {
        "ja": "最上義光",
        "romaji": "Mogami Yoshiaki"
      },
      {
        "ja": "南部晴政",
        "romaji": "Nanbu Harumasa"
      }
    ],
    "summary": {
      "ja": "東北では伊達・最上・南部などの在地勢力が広大な旧領の再編を進め、独自の地域秩序を築いた。",
      "romaji": "In Tohoku, clans such as the Date, Mogami, and Nanbu reshaped broad frontier domains and built their own regional order."
    }
  },
  "kanto": {
    "area": {
      "ja": "関東地方",
      "romaji": "Kanto"
    },
    "representativeFigures": [
      {
        "ja": "北条氏康",
        "romaji": "Hojo Ujiyasu"
      },
      {
        "ja": "徳川家康",
        "romaji": "Tokugawa Ieyasu"
      },
      {
        "ja": "上杉謙信",
        "romaji": "Uesugi Kenshin"
      }
    ],
    "summary": {
      "ja": "関東では後北条氏を軸に広域支配が進み、徳川・上杉など周辺勢力との均衡が戦国情勢を規定した。",
      "romaji": "In Kanto, the Later Hojo anchored regional control while rivalry with Tokugawa and Uesugi forces shaped the Sengoku balance."
    }
  },
  "chubu": {
    "area": {
      "ja": "中部地方",
      "romaji": "Chubu"
    },
    "representativeFigures": [
      {
        "ja": "武田信玄",
        "romaji": "Takeda Shingen"
      },
      {
        "ja": "織田信長",
        "romaji": "Oda Nobunaga"
      },
      {
        "ja": "今川義元",
        "romaji": "Imagawa Yoshimoto"
      }
    ],
    "summary": {
      "ja": "中部は東国と畿内を結ぶ交通の要衝であり、甲斐・信濃・尾張・駿河などの勢力圏がせめぎ合った。",
      "romaji": "Chubu linked eastern Japan with Kinai, where spheres centered on Kai, Shinano, Owari, and Suruga constantly collided."
    }
  },
  "kinki": {
    "area": {
      "ja": "近畿地方",
      "romaji": "Kinki"
    },
    "representativeFigures": [
      {
        "ja": "織田信長",
        "romaji": "Oda Nobunaga"
      },
      {
        "ja": "豊臣秀吉",
        "romaji": "Toyotomi Hideyoshi"
      },
      {
        "ja": "明智光秀",
        "romaji": "Akechi Mitsuhide"
      }
    ],
    "summary": {
      "ja": "近畿は戦国後期の政治中枢であり、畿内支配をめぐる争奪が全国情勢を左右した。",
      "romaji": "Kinki became the late Sengoku political core, and contests over Kinai strongly influenced national power shifts."
    }
  },
  "chugoku": {
    "area": {
      "ja": "中国地方",
      "romaji": "Chugoku"
    },
    "representativeFigures": [
      {
        "ja": "毛利元就",
        "romaji": "Mori Motonari"
      },
      {
        "ja": "大内義隆",
        "romaji": "Ouchi Yoshitaka"
      },
      {
        "ja": "尼子晴久",
        "romaji": "Amago Haruhisa"
      }
    ],
    "summary": {
      "ja": "中国地方では大内・尼子・毛利が覇権を争い、西国の勢力均衡を左右した。",
      "romaji": "In Chugoku, the Ouchi, Amago, and Mori houses fought for supremacy and shaped the western balance of power."
    }
  },
  "shikoku": {
    "area": {
      "ja": "四国地方",
      "romaji": "Shikoku"
    },
    "representativeFigures": [
      {
        "ja": "長宗我部元親",
        "romaji": "Chosokabe Motochika"
      },
      {
        "ja": "河野通直",
        "romaji": "Kono Michinao"
      },
      {
        "ja": "三好長慶",
        "romaji": "Miyoshi Nagayoshi"
      }
    ],
    "summary": {
      "ja": "四国では長宗我部氏の台頭が進み、畿内勢力や豊臣政権との接続点となった。",
      "romaji": "In Shikoku, the rise of the Chosokabe connected island warfare with Kinai politics and later Toyotomi expansion."
    }
  },
  "kyushu": {
    "area": {
      "ja": "九州地方",
      "romaji": "Kyushu"
    },
    "representativeFigures": [
      {
        "ja": "島津義久",
        "romaji": "Shimazu Yoshihisa"
      },
      {
        "ja": "大友宗麟",
        "romaji": "Otomo Sorin"
      },
      {
        "ja": "龍造寺隆信",
        "romaji": "Ryuzoji Takanobu"
      }
    ],
    "summary": {
      "ja": "九州では島津・大友・龍造寺が激しく競合し、豊臣の九州征伐まで大規模な地域戦争が続いた。",
      "romaji": "In Kyushu, the Shimazu, Otomo, and Ryuzoji fought intense regional wars until Toyotomi intervention reshaped the island."
    }
  },
  "okinawa": {
    "area": {
      "ja": "沖縄・琉球",
      "romaji": "Okinawa / Ryukyu"
    },
    "representativeFigures": [
      {
        "ja": "尚真王",
        "romaji": "Sho Shin"
      },
      {
        "ja": "尚寧王",
        "romaji": "Sho Nei"
      },
      {
        "ja": "島津氏",
        "romaji": "Shimazu clan"
      }
    ],
    "summary": {
      "ja": "沖縄は戦国大名の国内秩序には直接属さず、琉球王国として海上交易と対外関係を軸に独自の政治空間を保っていた。",
      "romaji": "Okinawa did not belong directly to the Sengoku daimyo order; as the Ryukyu Kingdom, it maintained its own political world centered on maritime exchange and external diplomacy."
    }
  }
} as const

export const prefectures: PrefectureData[] = [
  {
    "id": 1,
    "modern": {
      "ja": "北海道",
      "romaji": "Hokkaido"
    },
    "contextKey": "hokkaido"
  },
  {
    "id": 2,
    "modern": {
      "ja": "青森県",
      "romaji": "Aomori"
    },
    "contextKey": "tohoku"
  },
  {
    "id": 3,
    "modern": {
      "ja": "岩手県",
      "romaji": "Iwate"
    },
    "contextKey": "tohoku"
  },
  {
    "id": 4,
    "modern": {
      "ja": "宮城県",
      "romaji": "Miyagi"
    },
    "contextKey": "tohoku"
  },
  {
    "id": 5,
    "modern": {
      "ja": "秋田県",
      "romaji": "Akita"
    },
    "contextKey": "tohoku"
  },
  {
    "id": 6,
    "modern": {
      "ja": "山形県",
      "romaji": "Yamagata"
    },
    "contextKey": "tohoku"
  },
  {
    "id": 7,
    "modern": {
      "ja": "福島県",
      "romaji": "Fukushima"
    },
    "contextKey": "tohoku"
  },
  {
    "id": 8,
    "modern": {
      "ja": "茨城県",
      "romaji": "Ibaraki"
    },
    "contextKey": "kanto"
  },
  {
    "id": 9,
    "modern": {
      "ja": "栃木県",
      "romaji": "Tochigi"
    },
    "contextKey": "kanto"
  },
  {
    "id": 10,
    "modern": {
      "ja": "群馬県",
      "romaji": "Gunma"
    },
    "contextKey": "kanto"
  },
  {
    "id": 11,
    "modern": {
      "ja": "埼玉県",
      "romaji": "Saitama"
    },
    "contextKey": "kanto"
  },
  {
    "id": 12,
    "modern": {
      "ja": "千葉県",
      "romaji": "Chiba"
    },
    "contextKey": "kanto"
  },
  {
    "id": 13,
    "modern": {
      "ja": "東京都",
      "romaji": "Tokyo"
    },
    "contextKey": "kanto"
  },
  {
    "id": 14,
    "modern": {
      "ja": "神奈川県",
      "romaji": "Kanagawa"
    },
    "contextKey": "kanto"
  },
  {
    "id": 15,
    "modern": {
      "ja": "新潟県",
      "romaji": "Niigata"
    },
    "contextKey": "chubu"
  },
  {
    "id": 16,
    "modern": {
      "ja": "富山県",
      "romaji": "Toyama"
    },
    "contextKey": "chubu"
  },
  {
    "id": 17,
    "modern": {
      "ja": "石川県",
      "romaji": "Ishikawa"
    },
    "contextKey": "chubu"
  },
  {
    "id": 18,
    "modern": {
      "ja": "福井県",
      "romaji": "Fukui"
    },
    "contextKey": "chubu"
  },
  {
    "id": 19,
    "modern": {
      "ja": "山梨県",
      "romaji": "Yamanashi"
    },
    "contextKey": "chubu"
  },
  {
    "id": 20,
    "modern": {
      "ja": "長野県",
      "romaji": "Nagano"
    },
    "contextKey": "chubu"
  },
  {
    "id": 21,
    "modern": {
      "ja": "岐阜県",
      "romaji": "Gifu"
    },
    "contextKey": "chubu"
  },
  {
    "id": 22,
    "modern": {
      "ja": "静岡県",
      "romaji": "Shizuoka"
    },
    "contextKey": "chubu"
  },
  {
    "id": 23,
    "modern": {
      "ja": "愛知県",
      "romaji": "Aichi"
    },
    "contextKey": "chubu"
  },
  {
    "id": 24,
    "modern": {
      "ja": "三重県",
      "romaji": "Mie"
    },
    "contextKey": "kinki"
  },
  {
    "id": 25,
    "modern": {
      "ja": "滋賀県",
      "romaji": "Shiga"
    },
    "contextKey": "kinki"
  },
  {
    "id": 26,
    "modern": {
      "ja": "京都府",
      "romaji": "Kyoto"
    },
    "contextKey": "kinki"
  },
  {
    "id": 27,
    "modern": {
      "ja": "大阪府",
      "romaji": "Osaka"
    },
    "contextKey": "kinki"
  },
  {
    "id": 28,
    "modern": {
      "ja": "兵庫県",
      "romaji": "Hyogo"
    },
    "contextKey": "kinki"
  },
  {
    "id": 29,
    "modern": {
      "ja": "奈良県",
      "romaji": "Nara"
    },
    "contextKey": "kinki"
  },
  {
    "id": 30,
    "modern": {
      "ja": "和歌山県",
      "romaji": "Wakayama"
    },
    "contextKey": "kinki"
  },
  {
    "id": 31,
    "modern": {
      "ja": "鳥取県",
      "romaji": "Tottori"
    },
    "contextKey": "chugoku"
  },
  {
    "id": 32,
    "modern": {
      "ja": "島根県",
      "romaji": "Shimane"
    },
    "contextKey": "chugoku"
  },
  {
    "id": 33,
    "modern": {
      "ja": "岡山県",
      "romaji": "Okayama"
    },
    "contextKey": "chugoku"
  },
  {
    "id": 34,
    "modern": {
      "ja": "広島県",
      "romaji": "Hiroshima"
    },
    "contextKey": "chugoku"
  },
  {
    "id": 35,
    "modern": {
      "ja": "山口県",
      "romaji": "Yamaguchi"
    },
    "contextKey": "chugoku"
  },
  {
    "id": 36,
    "modern": {
      "ja": "徳島県",
      "romaji": "Tokushima"
    },
    "contextKey": "shikoku"
  },
  {
    "id": 37,
    "modern": {
      "ja": "香川県",
      "romaji": "Kagawa"
    },
    "contextKey": "shikoku"
  },
  {
    "id": 38,
    "modern": {
      "ja": "愛媛県",
      "romaji": "Ehime"
    },
    "contextKey": "shikoku"
  },
  {
    "id": 39,
    "modern": {
      "ja": "高知県",
      "romaji": "Kochi"
    },
    "contextKey": "shikoku"
  },
  {
    "id": 40,
    "modern": {
      "ja": "福岡県",
      "romaji": "Fukuoka"
    },
    "contextKey": "kyushu"
  },
  {
    "id": 41,
    "modern": {
      "ja": "佐賀県",
      "romaji": "Saga"
    },
    "contextKey": "kyushu"
  },
  {
    "id": 42,
    "modern": {
      "ja": "長崎県",
      "romaji": "Nagasaki"
    },
    "contextKey": "kyushu"
  },
  {
    "id": 43,
    "modern": {
      "ja": "熊本県",
      "romaji": "Kumamoto"
    },
    "contextKey": "kyushu"
  },
  {
    "id": 44,
    "modern": {
      "ja": "大分県",
      "romaji": "Oita"
    },
    "contextKey": "kyushu"
  },
  {
    "id": 45,
    "modern": {
      "ja": "宮崎県",
      "romaji": "Miyazaki"
    },
    "contextKey": "kyushu"
  },
  {
    "id": 46,
    "modern": {
      "ja": "鹿児島県",
      "romaji": "Kagoshima"
    },
    "contextKey": "kyushu"
  },
  {
    "id": 47,
    "modern": {
      "ja": "沖縄県",
      "romaji": "Okinawa"
    },
    "contextKey": "okinawa"
  }
]

export function getPrefectureById(id: PrefectureId) {
  return prefectures.find((prefecture) => prefecture.id === id) ?? prefectures[0]
}
