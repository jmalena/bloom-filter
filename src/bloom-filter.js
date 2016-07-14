/* @flow */

import {murmurHash32} from 'murmurhash-native'
import Storage from './storage'

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

    getHash (str: string, seed: number) {
        return murmurHash32(str, seed) % this.storage.length
    }

    add (str: string) {
        for (let i = 0; i < this.hashCount; i++) {
            const hash = this.getHash(str, i)
            this.storage.add(hash)
        }
    }

    containsMaybe (str: string) {
        for (let i = 0; i < this.hashCount; i++) {
            const hash = this.getHash(str, i)

            if(!this.storage.contains(hash)) {
                return false
            }
        }

        return true
    }
}
