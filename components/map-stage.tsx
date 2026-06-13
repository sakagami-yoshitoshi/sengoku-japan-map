import { PrefectureContext, PrefectureData, PrefectureId, prefectures } from '@/lib/data/prefectures'
import { JapanRegionsMap } from './japan-regions-map'
import { RegionInfoPanel } from './region-info-panel'

export function MapStage(props: {
  selectedPrefecture: PrefectureData | null
  selectedContext: PrefectureContext | null
  selectedPrefectureId: PrefectureId | null
  hoveredPrefectureId: PrefectureId | null
  onHover: (id: PrefectureId | null) => void
  onSelect: (id: PrefectureId | null) => void
}) {
  const hasSelection = Boolean(props.selectedPrefecture && props.selectedContext)

  return (
    <section className="sengoku-surface relative flex min-h-0 flex-1 overflow-hidden rounded-[2rem] border border-amber-900/25 bg-stone-900/70 p-2 shadow-2xl shadow-black/25 backdrop-blur md:p-3">
      <div className="grid h-full min-h-0 w-full gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(21rem,2fr)] lg:gap-4">
        <div className="flex min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-[1.8rem] border border-amber-900/20 bg-[#120f0d] p-2 lg:p-3">
          <div className="aspect-[13/10] h-auto max-h-full w-full max-w-full overflow-hidden rounded-[1.5rem] border border-amber-900/20 bg-[#120f0d] lg:h-full lg:w-auto lg:min-w-0">
            <JapanRegionsMap
              hoveredPrefectureId={props.hoveredPrefectureId}
              prefectures={prefectures}
              selectedContext={props.selectedContext}
              selectedPrefecture={props.selectedPrefecture}
              selectedPrefectureId={props.selectedPrefectureId}
              onHover={props.onHover}
              onSelect={props.onSelect}
            />
          </div>
        </div>

        <aside
          className={[
            'hidden min-h-0 overflow-hidden rounded-[1.8rem] border bg-stone-950/88 lg:flex lg:flex-col',
            hasSelection
              ? 'border-amber-500/35 shadow-[0_0_0_1px_rgba(251,191,36,0.10)]'
              : 'border-amber-900/20',
          ].join(' ')}
        >
          <div className={[
            'border-b px-6 py-5',
            hasSelection
              ? 'border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-stone-950/20 to-indigo-500/10'
              : 'border-amber-900/25',
          ].join(' ')}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.28em] text-amber-300/80">Sengoku Info</p>
                <h2 className="mt-2.5 text-2xl font-semibold text-amber-50">都道府県戦国解説</h2>
                <p className="mt-2 text-base leading-7 text-stone-300">
                  右栏与左侧地图等高显示。点击左侧都道府县后，在这里查看对应地区的战国时代信息。
                </p>
              </div>

              {hasSelection ? (
                <div className="rounded-full border border-amber-500/30 bg-amber-400/10 px-3 py-1.5 text-sm font-medium text-amber-100">
                  Current Focus
                </div>
              ) : null}
            </div>
          </div>

          <div className="min-h-0 flex-1 p-4">
            {props.selectedPrefecture && props.selectedContext ? (
              <RegionInfoPanel
                prefecture={props.selectedPrefecture}
                context={props.selectedContext}
                onClose={() => props.onSelect(null)}
                className="h-full overflow-y-auto"
              />
            ) : (
              <div
                className="flex h-full flex-col justify-between rounded-[1.6rem] border border-amber-800/20 bg-stone-950/72 p-6 text-stone-200"
                aria-label="Sengoku info placeholder"
              >
                <div>
                  <p className="text-[12px] uppercase tracking-[0.28em] text-amber-300/80">Map Guidance</p>
                  <h3 className="mt-2.5 text-2xl font-semibold text-amber-50">先点击左侧地图</h3>
                  <p className="mt-3 text-base leading-8 text-stone-300">
                    默认视图现在按参考图保留完整全国构图：北海道完整出现，四大岛以斜向主轴铺开，同时保留适量海域与大陆边缘作为空间参照。
                  </p>
                </div>

                <div className="space-y-3 rounded-[1.3rem] border border-amber-800/20 bg-black/20 p-5 text-base leading-7 text-stone-300">
                  <p><span className="text-amber-200">点击地图空白处</span>：关闭当前说明并回到全国视图</p>
                  <p><span className="text-amber-200">Esc</span>：关闭当前说明</p>
                  <p><span className="text-amber-200">桌面优先</span>：左右栏等高，整页保持无滚动</p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
