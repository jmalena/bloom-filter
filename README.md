# Bloom filter

Simple and dependency-free Bloom filter implementation.

Bloom filter is a space-efficient data structure, which can test whether an element is not or is probably a member of a set.

[![Build Status](https://travis-ci.org/jmalena/bloom-filter.svg?branch=master)](https://travis-ci.org/jmalena/bloom-filter)

## Installation

To install latest stable version:

```
npm install @jmalena/bloom-filter --save
```

## Example

```js
import BloomFilter from '@jmalena/bloom-filter'

const filter = new BloomFilter(65536, 2)

filter.add('redrum')

filter.containsMaybe('redrum') // true: "redrum" is probably in a set
filter.containsMaybe('otrozone') // false: "otrozone" is definitely not in a set
```

## API

### `BloomFilter(length, hashCount)`
### `BloomFilter.add(str)`
### `BloomFilter.containsMaybe(str)`

## Configuration

Length and number of hash functions can be calculated using [this site](http://hur.st/bloomfilter).

## Limitations

Currently works only with length up to 2^32, due to JavaScript integer limitations.
