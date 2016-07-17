/* @flow */

import Storage from './storage'
import fnv32 from './hash/fnv32'
import fnv32a from './hash/fnv32a'

export default class {
  storage: Storage;
  hashCount: number;

  constructor (length: number, hashCount: number) {
    if (length > Math.pow(2, 32)) { // not enough hashs
      throw new RangeError('Maximum length is ' + Math.pow(2, 32))
    }

    this.storage = new Storage(length)
    this.hashCount = hashCount
  }

  add (str: string) {
    const hash1 = fnv32(str)
    const hash2 = fnv32a(str)

    for (let i = 0; i < this.hashCount; i++) {
      const hash = (hash1 + i * hash2) % this.storage.length
      this.storage.add(hash)
    }
  }

  containsMaybe (str: string) {
    const hash1 = fnv32(str)
    const hash2 = fnv32a(str)

    for (let i = 0; i < this.hashCount; i++) {
      const hash = (hash1 + i * hash2) % this.storage.length

      if (!this.storage.contains(hash)) {
        return false
      }
    }

    return true
  }
}
