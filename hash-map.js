import LinkedList from "./linked-list.js";

/**
 * A hash table mapping strings.
 */
export default class HashMap {
  /**
   * @param {number} loadFactor
   * @param {number} capacity
   */
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(this.capacity);
  }

  /**
   * Hashes the given key to the index of a bucket.
   * @param {*} key
   * @returns {number}
   */
  hash(key) {
    const stringKey = String(key);

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < stringKey.length; i++) {
      hashCode =
        (primeNumber * hashCode + stringKey.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  /**
   * Gets the bucket for the given key.
   * @param {*} key
   * @returns {LinkedList}
   */
  at(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === undefined) {
      this.buckets[index] = new LinkedList();
    }

    return this.buckets[index];
  }

  /**
   * Evaluates whether this hash map should be resized.
   * @returns {boolean}
   */
  isLoaded() {
    return this.size / this.capacity > this.loadFactor;
  }

  /**
   * Inserts the given key-value pair into this hash map.
   * @param {*} key
   * @param {*} value
   */
  set(key, value) {
    const bucket = this.at(key);
    const node = bucket.find(key);

    if (node === null) {
      bucket.append(key, value);
      this.size++;
    } else {
      node.value = String(value);
    }

    if (this.isLoaded()) {
      this.resize();
    }
  }

  /**
   * Doubles this hash map's capacity and resets the existing key-value pairs.
   */
  resize() {
    const pairs = this.entries;

    this.clear();
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);

    pairs.forEach(([key, value]) => this.set(key, value));
  }

  /**
   * Gets the value if the given key exists in this hash map.
   * @param {*} key
   * @returns {?string}
   */
  get(key) {
    const bucket = this.at(key);
    const node = bucket.find(key);

    return node === null ? null : node.value;
  }

  /**
   * Checks whether this hash map contains the given key.
   * @param {*} key
   * @returns {boolean}
   */
  has(key) {
    const bucket = this.at(key);
    return bucket.contains(key);
  }

  /**
   * Removes the key-value pair if the given key exists in this hash map.
   * @param {*} key
   * @returns {boolean}
   */
  remove(key) {
    const bucket = this.at(key);
    const success = bucket.remove(key);

    if (success) {
      this.size -= 1;
    }

    return success;
  }

  /**
   * Clears this hash map.
   */
  clear() {
    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        bucket.clear();
      }
    });

    this.size = 0;
  }

  /**
   * Gets the size of this hash map.
   */
  get length() {
    return this.size;
  }

  /**
   * Gets the keys contained in this hash map.
   * @returns {Array<string>}
   */
  get keys() {
    const result = [];

    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        result.push(...bucket.keys);
      }
    });

    return result;
  }

  /**
   * Gets the values contained in this hash map.
   * @returns {Array<string>}
   */
  get values() {
    const result = [];

    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        result.push(...bucket.values);
      }
    });

    return result;
  }

  /**
   * Gets the key-value pairs contained in this hash map.
   * @returns {Array<[string, string]>}
   */
  get entries() {
    const result = [];

    this.buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        result.push(...bucket.entries);
      }
    });

    return result;
  }

  /**
   * Gets a string representation of this hash map.
   * @returns {string}
   */
  toString() {
    if (this.size === 0) {
      return "{}";
    }

    const pairs = this.entries;
    const maps = pairs.map(([key, value]) => `${key} -> ${value}`);
    const stringMaps = maps.join(",\n  ");

    return `{\n  ${stringMaps}\n}`;
  }
}
