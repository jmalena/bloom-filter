/* @flow */

import Storage from './storage'
import fnv32 from './hash/fnv32'
import fnv32a from './hash/fnv32a'

type hashFn = (str: string) => number;

export default class {
  storage: Storage;
  hashCount: number;
  hashFn1: hashFn;
  hashFn2: hashFn;

  constructor (length: number, hashCount: number, hashFn1: hashFn = fnv32, hashFn2: hashFn = fnv32a) {
    if (length > Math.pow(2, 32)) { // not enough hashs
      throw new RangeError('Maximum length is ' + Math.pow(2, 32))
    }

    this.storage = new Storage(length)
    this.hashCount = hashCount
    this.hashFn1 = hashFn1
    this.hashFn2 = hashFn2
  }

  add (str: string) {
    const hash1 = this.hashFn1(str)
    const hash2 = this.hashFn2(str)

    for (let i = 0; i < this.hashCount; i++) {
      const hash = (hash1 + i * hash2) % this.storage.length
      this.storage.add(hash)
    }
  }

  containsMaybe (str: string) {
    const hash1 = this.hashFn1(str)
    const hash2 = this.hashFn2(str)

    for (let i = 0; i < this.hashCount; i++) {
      const hash = (hash1 + i * hash2) % this.storage.length

      if (!this.storage.contains(hash)) {
        return false
      }
    }

    return true
  }
}
