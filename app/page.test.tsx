import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from './page'

describe('HomePage shell', () => {
  it('renders the bilingual title and instruction copy', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /戦国日本地図/i })).toBeInTheDocument()
    expect(screen.getByText(/Sengoku Japan Map/i)).toBeInTheDocument()
    expect(screen.getAllByText(/クリックして戦国時代の地域情報を見る/i).length).toBeGreaterThan(0)
  })

  it('shows Kinki as the default selected region with bilingual data', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /近畿地方/i })).toBeInTheDocument()
    expect(screen.getAllByText(/^Kinki$/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/山城国/i)).toBeInTheDocument()
    expect(screen.getByText(/Oda Nobunaga/i)).toBeInTheDocument()
  })

  it('switches the info panel when the user clicks Chubu', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.click(screen.getByRole('button', { name: /中部地方/i }))

    expect(screen.getByRole('heading', { name: /中部地方/i })).toBeInTheDocument()
    expect(screen.getByText(/Takeda Shingen/i)).toBeInTheDocument()
  })

  it('renders the legend and V1 coverage note', () => {
    render(<HomePage />)

    expect(screen.getByText(/首版範囲/i)).toBeInTheDocument()
    expect(screen.getByText(/近畿・関東・中部/i)).toBeInTheDocument()
    expect(screen.getByText(/Hover/i)).toBeInTheDocument()
    expect(screen.getByText(/Selected/i)).toBeInTheDocument()
  })

  it('lets the user focus Chubu and activate it with keyboard', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.tab()
    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { name: /中部地方/i })).toBeInTheDocument()
    expect(screen.getByText(/Takeda Shingen/i)).toBeInTheDocument()
  })
})
