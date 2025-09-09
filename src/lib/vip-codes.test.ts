import { describe, it, expect } from 'vitest';
import { generateVipCode } from './vip-codes';

describe('generateVipCode', () => {
  it('returns an 8-character uppercase alphanumeric code', () => {
    const code = generateVipCode();
    expect(code).toHaveLength(8);
    expect(/^[A-Z0-9]{8}$/.test(code)).toBe(true);
  });

  it('generates different values across multiple calls', () => {
    const samples = new Set(Array.from({ length: 20 }, () => generateVipCode()));
    // High probability of uniqueness across 20 samples
    expect(samples.size).toBeGreaterThan(15);
  });
});

