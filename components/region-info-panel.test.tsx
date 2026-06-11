import { render, screen } from '@testing-library/react'
import { getRegionById } from '@/lib/data/regions'
import { RegionInfoPanel } from './region-info-panel'

describe('RegionInfoPanel', () => {
  it('renders bilingual labels, province list, figures, and summary', () => {
    render(<RegionInfoPanel region={getRegionById('kanto')} />)

    expect(screen.getByText(/現代地名/i)).toBeInTheDocument()
    expect(screen.getByText(/関東地方/i)).toBeInTheDocument()
    expect(screen.getByText(/Old Province/i)).toBeInTheDocument()
    expect(screen.getByText(/武蔵国/i)).toBeInTheDocument()
    expect(screen.getByText(/Hojo Ujiyasu/i)).toBeInTheDocument()
    expect(screen.getByText(/Later Hojo/i)).toBeInTheDocument()
  })
})
