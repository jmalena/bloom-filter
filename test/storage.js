import test from 'ava'
import j from 'jsverify'
import Storage from '../src/storage'

test('contains(n) be false after creation', t => {
  const length = Math.pow(2, 8)

  j.assert(j.forall(j.array(j.nat(length - 1)), (ns) => {
    const storage = new Storage(length)

    for (const n of ns) {
      if (storage.contains(n)) {
        return false
      }
    }

    return true
  }))
})

test('contains(n) be true after add(n)', t => {
  const length = Math.pow(2, 8)

  j.assert(j.forall(j.array(j.nat(length - 1)), (ns) => {
    const storage = new Storage(length)

    for (const n of ns) {
      storage.add(n)
    }

    for (const n of ns) {
      if (!storage.contains(n)) {
        return false
      }
    }

    return true
  }))
})
