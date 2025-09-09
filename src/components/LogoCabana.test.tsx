import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LogoCabana from './LogoCabana';

describe('LogoCabana', () => {
  it('matches snapshot of key attributes', () => {
    const { container } = render(<LogoCabana className="h-6 w-6" />);
    const svg = container.querySelector('svg')!;

    const snapshot = {
      nodeName: svg.nodeName.toLowerCase(),
      viewBox: svg.getAttribute('viewBox'),
      class: svg.getAttribute('class'),
      hasDefs: !!svg.querySelector('defs'),
      hasPath: !!svg.querySelector('path'),
      ariaHidden: svg.getAttribute('aria-hidden'),
    };

    expect(snapshot).toMatchInlineSnapshot(
      `
      {
        "ariaHidden": "true",
        "class": "h-6 w-6",
        "hasDefs": true,
        "hasPath": true,
        "nodeName": "svg",
        "viewBox": "0 0 64 64",
      }
      `,
    );
  });
});
