export function Legend() {
  return (
    <section className="mt-5 rounded-3xl border border-amber-900/25 bg-stone-950/70 p-4 text-sm text-stone-300 md:p-5">
      <h2 className="text-xs uppercase tracking-[0.35em] text-amber-300/80">首版範囲 / V1 Coverage</h2>
      <p className="mt-3">近畿・関東・中部</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs sm:gap-3">
        <span className="rounded-full border border-amber-900/30 bg-stone-900/80 px-3 py-1.5">Hover</span>
        <span className="rounded-full border border-amber-700/40 bg-amber-700/20 px-3 py-1.5 text-amber-100">Selected</span>
        <span className="rounded-full border border-stone-700/50 bg-stone-900/60 px-3 py-1.5">Modern Region → Sengoku Note</span>
      </div>
    </section>
  )
}
