/* @flow */

export default function (str: string) {
  let hash = 0x811c9dc5

  for (let i = 0; i < str.length; i++) {
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
    hash ^= str.charCodeAt(i)
  }

  return hash >>> 0
}
