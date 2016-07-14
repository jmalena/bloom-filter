/* @flow */

export default class {
  length: number;
  memory: Uint32Array;
  chunkCount: number;
  chunkBitCount: number;

  constructor (length: number) {
    this.length = length
    this.chunkBitCount = Uint32Array.BYTES_PER_ELEMENT * 8
    this.chunkCount = Math.ceil(length / this.chunkBitCount)
    this.memory = new Uint32Array(this.chunkCount)
  }

  getChunkIndex (n: number) {
    return (n / this.chunkBitCount) | 0
  }

  getChunkMask (n: number) {
    const bit = n % this.chunkBitCount
    return Math.pow(2, bit) | 0
  }

  add (n: number) {
    const chunkIndex = this.getChunkIndex(n)
    const chunkMask = this.getChunkMask(n)
    this.memory[chunkIndex] |= chunkMask
  }

  contains (n: number) {
    const chunkIndex = this.getChunkIndex(n)
    const chunkMask = this.getChunkMask(n)
    return (this.memory[chunkIndex] & chunkMask) === chunkMask
  }
}
