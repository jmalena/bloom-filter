import {check, gen} from 'jest-check'
import fnv32a from '../fnv32a'

check.it('is unsigned 32-bit integer', [gen.string], (str) => {
  const hash = fnv32a(str)

  expect(hash).toBeGreaterThanOrEqual(0)
  expect(hash).toBeLessThan(Math.pow(2, 32))
})

it('hash', () => {
  expect(fnv32a('')).toBe(0x811c9dc5)
  expect(fnv32a('babe')).toBe(0x41b1ba1d)
})
