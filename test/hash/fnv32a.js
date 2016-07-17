import test from 'ava'
import j from 'jsverify'
import fnv32a from '../../src/hash/fnv32a'

test('is unsigned 32-bit integer', t => {
  j.assert(j.forall(j.string, (str) => {
    const hash = fnv32a(str)
    return hash >= 0 && hash < Math.pow(2, 32)
  }))
})

test('hash', t => {
  t.is(fnv32a(''), 0x811c9dc5)
  t.is(fnv32a('babe'), 0x41b1ba1d)
})
