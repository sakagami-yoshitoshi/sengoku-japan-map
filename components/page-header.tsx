export function PageHeader() {
  return (
    <header className="mb-3 flex items-end justify-between gap-4 rounded-[1.5rem] border border-amber-900/25 bg-stone-950/58 px-5 py-4 backdrop-blur md:mb-4 md:px-6 md:py-4.5">
      <div className="min-w-0">
        <p className="text-sm uppercase tracking-[0.32em] text-amber-400/85 md:text-[0.95rem]">
          Modern Entry / Sengoku Layer
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <h1 className="text-3xl font-semibold text-amber-50 md:text-[2.2rem]">戦国日本地図</h1>
          <p className="text-lg text-amber-200 md:text-xl">Sengoku Japan Map</p>
        </div>
      </div>
    </header>
  )
}
