import test from 'ava'
import j from 'jsverify'
import fnv32 from '../../src/hash/fnv32'

test('is unsigned 32-bit integer', t => {
  j.assert(j.forall(j.string, (str) => {
    const hash = fnv32(str)
    return hash >= 0 && hash < Math.pow(2, 32)
  }))
})

test('hash', t => {
  t.is(fnv32(''), 0x811c9dc5)
  t.is(fnv32('babe'), 0x5bf9cdf5)
})
