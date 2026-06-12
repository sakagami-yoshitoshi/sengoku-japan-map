import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from './page'

describe('HomePage shell', () => {
  it('renders the compact bilingual title without the redundant top-right explanation', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /戦国日本地図/i })).toBeInTheDocument()
    expect(screen.getByText(/Sengoku Japan Map/i)).toBeInTheDocument()
    expect(screen.queryByText(/地図を主役にした一画面閲覧版/i)).not.toBeInTheDocument()
  })

  it('shows the desktop side-panel placeholder before selection', () => {
    render(<HomePage />)

    expect(screen.getByLabelText(/Sengoku info placeholder/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Sengoku details/i)).not.toBeInTheDocument()
  })

  it('shows prefecture details in the right-side panel after the user clicks Tokyo', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.click(screen.getByRole('button', { name: /東京都/i }))

    expect(screen.getByRole('heading', { name: /東京都/i })).toBeInTheDocument()
    expect(screen.getByText(/^Kanto$/i)).toBeInTheDocument()
    expect(screen.getByText(/Hojo Ujiyasu/i)).toBeInTheDocument()
  })

  it('shows Okinawa with Ryukyu context after selection', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.click(screen.getByRole('button', { name: /沖縄県/i }))

    expect(screen.getByRole('heading', { name: /沖縄県/i })).toBeInTheDocument()
    expect(screen.getByText(/Okinawa \/ Ryukyu/i)).toBeInTheDocument()
    expect(screen.getByText(/Sho Nei/i)).toBeInTheDocument()
  })

  it('lets the user focus Tokyo and activate it with keyboard', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    for (let i = 0; i < 13; i += 1) {
      await user.tab()
    }
    await user.keyboard('{Enter}')

    expect(screen.getByRole('heading', { name: /東京都/i })).toBeInTheDocument()
    expect(screen.getByText(/Tokugawa Ieyasu/i)).toBeInTheDocument()
  })

  it('closes the right-side details when escape is pressed', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.click(screen.getByRole('button', { name: /熊本県/i }))
    expect(screen.getByRole('heading', { name: /熊本県/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('heading', { name: /熊本県/i })).not.toBeInTheDocument()
    expect(screen.getByLabelText(/Sengoku info placeholder/i)).toBeInTheDocument()
  })
})
