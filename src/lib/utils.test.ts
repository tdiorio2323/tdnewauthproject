import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names and dedupes Tailwind conflicts', () => {
    const cond: boolean = false
    expect(cn('p-2', cond && 'hidden', 'p-3')).toBe('p-3')
    expect(cn('text-sm', 'font-medium')).toContain('text-sm')
  })
})
