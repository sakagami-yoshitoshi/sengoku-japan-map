import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getPrefectureById, prefectures, PREFECTURE_CONTEXTS } from '@/lib/data/prefectures'
import { JapanRegionsMap } from './japan-regions-map'

describe('JapanRegionsMap', () => {
  it('calls selection handler when a prefecture is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onHover = vi.fn()

    render(
      <JapanRegionsMap
        prefectures={prefectures}
        selectedPrefecture={null}
        selectedContext={null}
        selectedPrefectureId={null}
        hoveredPrefectureId={null}
        onHover={onHover}
        onSelect={onSelect}
      />,
    )

    await user.click(screen.getByRole('button', { name: /東京都/i }))

    expect(onSelect).toHaveBeenCalledWith(13)
  })

  it('does not render the side-panel content by itself when a selected prefecture is provided', () => {
    const prefecture = getPrefectureById(47)
    render(
      <JapanRegionsMap
        prefectures={prefectures}
        selectedPrefecture={prefecture}
        selectedContext={PREFECTURE_CONTEXTS[prefecture.contextKey]}
        selectedPrefectureId={47}
        hoveredPrefectureId={null}
        onHover={vi.fn()}
        onSelect={vi.fn()}
      />,
    )

    expect(screen.queryByLabelText(/沖縄県 Sengoku details/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Loading prefecture map stage/i)).toBeInTheDocument()
  })
})
