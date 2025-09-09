import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LinkButton, { type LinkItem } from './LinkButton';

describe('LinkButton', () => {
  const item: LinkItem = {
    label: 'Follow on Instagram',
    href: 'https://instagram.com/example',
    icon: 'instagram',
  };

  it('renders a link with label and href', () => {
    render(<LinkButton item={item} />);
    const link = screen.getByRole('link', { name: /follow on instagram/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', item.href);
  });

  it('includes an SVG icon', () => {
    render(<LinkButton item={item} />);
    const link = screen.getByRole('link', { name: /follow on instagram/i });
    const svgs = link.querySelectorAll('svg');
    // One for the icon, one for the arrow
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });
});

