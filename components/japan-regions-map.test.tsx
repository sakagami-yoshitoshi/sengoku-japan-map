import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { regions } from '@/lib/data/regions'
import { JapanRegionsMap } from './japan-regions-map'

describe('JapanRegionsMap', () => {
  it('calls selection handler when a region is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onHover = vi.fn()

    render(
      <JapanRegionsMap
        regions={regions}
        selectedRegionId="kinki"
        hoveredRegionId={null}
        onHover={onHover}
        onSelect={onSelect}
      />,
    )

    await user.click(screen.getByRole('button', { name: /中部地方/i }))

    expect(onSelect).toHaveBeenCalledWith('chubu')
  })
})
