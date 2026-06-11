export function Legend() {
  return (
    <section className="mt-5 rounded-3xl border border-amber-900/25 bg-stone-950/70 p-4 text-sm text-stone-300">
      <h2 className="text-xs uppercase tracking-[0.35em] text-amber-300/80">首版範囲 / V1 Coverage</h2>
      <p className="mt-3">近畿・関東・中部</p>
      <div className="mt-4 flex flex-wrap gap-4">
        <span>Hover</span>
        <span>Selected</span>
        <span>Modern Region → Sengoku Note</span>
      </div>
    </section>
  )
}
