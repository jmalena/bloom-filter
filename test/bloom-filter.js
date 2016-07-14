import test from 'ava'
import j from 'jsverify'
import BloomFilter from '../src/bloom-filter'

test('throws on length greater than 2^32', t => {
    t.throws(() => new BloomFilter(Math.pow(2, 32) + 1), RangeError)
})

test('containsMaybe(str) be false after creation', t => {
    const length = Math.pow(2, 8)

    j.assert(j.forall(j.array(j.string), j.integer(1, 16), (strs, hashCount) => {
        const filter = new BloomFilter(length, hashCount)

        for (const str of strs) {
            if (filter.containsMaybe(str)) {
                return false
            }
        }

        return true
    }))
})

test('containsMaybe(str) be true after add(str)', t => {
    const length = Math.pow(2, 8)

    j.assert(j.forall(j.array(j.string), j.integer(1, 16), (strs, hashCount) => {
        const filter = new BloomFilter(length, hashCount)

        for (const str of strs) {
            filter.add(str)
        }

        for (const str of strs) {
            if (!filter.containsMaybe(str)) {
                return false
            }
        }

        return true
    }))
})
