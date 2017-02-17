import BloomFilter from '../bloom-filter'

const length = Math.pow(2, 8)

it('throws on length greater than 2^32', () => {
  expect(() => new BloomFilter(Math.pow(2, 32) + 1)).toThrowError(RangeError)
})

check.it('containsMaybe(str) be false after creation', [gen.resize(25, gen.array(gen.string)), gen.intWithin(1, 16)], (strs, hashCount) => {
  const filter = new BloomFilter(length, hashCount)

  for (const str of strs) {
    expect(filter.containsMaybe(str)).toBe(false)
  }
})

check.it('containsMaybe(str) be true after add(str)', [gen.resize(25, gen.array(gen.string)), gen.intWithin(1, 16)], (strs, hashCount) => {
  const filter = new BloomFilter(length, hashCount)

  for (const str of strs) {
    filter.add(str)
  }

  for (const str of strs) {
    expect(filter.containsMaybe(str)).toBe(true)
  }
})
