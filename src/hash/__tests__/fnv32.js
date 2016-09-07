import {check, gen} from 'jest-check'
import fnv32 from '../fnv32'

it('hash', () => {
  expect(fnv32('')).toBe(0x811c9dc5)
  expect(fnv32('babe')).toBe(0x5bf9cdf5)
})

check.it('is unsigned 32-bit integer', [gen.string], (str) => {
  const hash = fnv32(str)

  expect(hash).toBeGreaterThanOrEqual(0)
  expect(hash).toBeLessThan(Math.pow(2, 32))
})
