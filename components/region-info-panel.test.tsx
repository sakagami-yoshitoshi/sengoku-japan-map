import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getPrefectureById, PREFECTURE_CONTEXTS } from '@/lib/data/prefectures'
import { RegionInfoPanel } from './region-info-panel'

describe('RegionInfoPanel', () => {
  it('renders prefecture labels, context, figures, and summary', () => {
    const prefecture = getPrefectureById(13)
    render(<RegionInfoPanel prefecture={prefecture} context={PREFECTURE_CONTEXTS[prefecture.contextKey]} />)

    expect(screen.getByText(/現代都道府県/i)).toBeInTheDocument()
    expect(screen.getByText(/東京都/i)).toBeInTheDocument()
    expect(screen.getByText(/Sengoku Context/i)).toBeInTheDocument()
    expect(screen.getByText(/関東地方/i)).toBeInTheDocument()
    expect(screen.getByText(/Hojo Ujiyasu/i)).toBeInTheDocument()
    expect(screen.getByText(/In Kanto, the Later Hojo/i)).toBeInTheDocument()
  })

  it('renders a close button when onClose is provided', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const prefecture = getPrefectureById(13)

    render(
      <RegionInfoPanel
        prefecture={prefecture}
        context={PREFECTURE_CONTEXTS[prefecture.contextKey]}
        onClose={onClose}
      />,
    )

    await user.click(screen.getByRole('button', { name: /close region details/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
