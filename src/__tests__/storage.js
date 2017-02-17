import Storage from '../storage'

const length = Math.pow(2, 8)

check.it('contains(n) be false after creation', [gen.array(gen.intWithin(0, length - 1))], (ns) => {
  const storage = new Storage(length)

  for (const n of ns) {
    expect(storage.contains(n)).toBe(false)
  }
})

check.it('contains(n) be true after add(n)', [gen.array(gen.intWithin(0, length - 1))], (ns) => {
  const storage = new Storage(length)

  for (const n of ns) {
    storage.add(n)
  }

  for (const n of ns) {
    expect(storage.contains(n)).toBe(true)
  }
})
