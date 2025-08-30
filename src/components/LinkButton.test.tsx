import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LinkButton from './LinkButton'

describe('LinkButton', () => {
  it('renders an anchor with label and href', () => {
    const item = { label: 'Visit Site', href: '/go', icon: 'site' as const }
    const { container } = render(<LinkButton item={item} />)

    const link = screen.getByRole('link', { name: /visit site/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', item.href)

    // Renders icon + chevron svgs
    const svgs = container.querySelectorAll('a svg')
    expect(svgs.length).toBeGreaterThanOrEqual(2)

    // Has base styling class
    expect(link.className).toContain('rounded-full')
  })
})
