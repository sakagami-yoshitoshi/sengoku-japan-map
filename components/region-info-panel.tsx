import { RegionData } from '@/types/region'

export function RegionInfoPanel({ region }: { region: RegionData }) {
  return (
    <aside className="rounded-3xl border border-amber-900/30 bg-stone-950/75 p-6 text-stone-100 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="mb-6 border-b border-amber-700/20 pb-4">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">現代地名 / Modern Region</p>
        <h2 className="mt-2 text-3xl font-semibold text-amber-50">{region.modern.ja}</h2>
        <p className="mt-1 text-base text-stone-300">{region.modern.romaji}</p>
      </div>

      <section className="mb-6">
        <h3 className="text-sm uppercase tracking-[0.3em] text-amber-300/80">旧国名 / Old Province</h3>
        <ul className="mt-3 space-y-2 text-sm text-stone-200">
          {region.historical.oldProvinces.map((province) => (
            <li key={province.romaji}>{province.ja} / {province.romaji}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-sm uppercase tracking-[0.3em] text-amber-300/80">主な大名・武将 / Key Daimyo &amp; Samurai</h3>
        <ul className="mt-3 space-y-2 text-sm text-stone-200">
          {region.historical.keyFigures.map((figure) => (
            <li key={figure.romaji}>{figure.ja} / {figure.romaji}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-sm uppercase tracking-[0.3em] text-amber-300/80">戦国概要 / Sengoku Note</h3>
        <p className="mt-3 text-sm leading-7 text-stone-200">{region.historical.summary.ja}</p>
        <p className="mt-3 text-sm leading-7 text-stone-400">{region.historical.summary.romaji}</p>
      </section>
    </aside>
  )
}
