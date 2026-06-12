import { PrefectureContext, PrefectureData } from '@/lib/data/prefectures'

type Props = {
  prefecture: PrefectureData
  context: PrefectureContext
  onClose?: () => void
  className?: string
}

export function RegionInfoPanel({ prefecture, context, onClose, className }: Props) {
  return (
    <aside
      className={[
        'sengoku-panel rounded-[1.6rem] border border-amber-700/30 bg-stone-950/92 p-5 text-stone-100 shadow-2xl shadow-black/45 backdrop-blur-xl md:p-6',
        className ?? '',
      ].join(' ')}
      aria-label={`${prefecture.modern.ja} Sengoku details`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-amber-700/20 pb-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.28em] text-amber-300/85">現代都道府県 / Prefecture</p>
          <h2 className="mt-2.5 text-2xl font-semibold text-amber-50 md:text-[2rem]">{prefecture.modern.ja}</h2>
          <p className="mt-1.5 text-base text-stone-300 md:text-lg">{prefecture.modern.romaji}</p>
        </div>

        {onClose ? (
          <button
            type="button"
            className="rounded-full border border-amber-700/30 bg-stone-900/85 px-3 py-1.5 text-sm text-stone-300 transition hover:border-amber-400/50 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80"
            onClick={onClose}
            aria-label="Close region details"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-4 text-base leading-8">
        <section className="rounded-[1.35rem] border border-amber-800/20 bg-black/20 p-4">
          <p className="text-[12px] uppercase tracking-[0.24em] text-amber-300/80">地域レイヤー / Sengoku Context</p>
          <p className="mt-2.5 text-xl font-medium text-amber-50">{context.area.ja}</p>
          <p className="mt-1 text-base text-stone-400">{context.area.romaji}</p>
        </section>

        <section className="rounded-[1.35rem] border border-amber-800/20 bg-black/20 p-4">
          <p className="text-[12px] uppercase tracking-[0.24em] text-amber-300/80">代表的人物 / Representative Figures</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {context.representativeFigures.map((figure) => (
              <div
                key={`${figure.ja}-${figure.romaji}`}
                className="rounded-full border border-amber-700/25 bg-stone-900/80 px-3.5 py-2 text-sm leading-6 text-stone-100"
              >
                <span className="font-medium text-amber-100">{figure.ja}</span>
                <span className="text-stone-400"> / {figure.romaji}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.35rem] border border-amber-800/20 bg-black/20 p-4">
          <p className="text-[12px] uppercase tracking-[0.24em] text-amber-300/80">戦国概要 / Sengoku Note</p>
          <div className="mt-3 space-y-3">
            <p className="text-base leading-8 text-stone-200">{context.summary.ja}</p>
            <p className="border-t border-amber-800/15 pt-3 text-[0.98rem] leading-8 text-stone-400">{context.summary.romaji}</p>
          </div>
        </section>
      </div>
    </aside>
  )
}
