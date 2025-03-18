import LinkedList from "./linked-list.js";

/**
 * A hash set containing strings.
 */
export default class HashSet {
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
   * Evaluates whether this hash set should be resized.
   * @returns {boolean}
   */
  isLoaded() {
    return this.size / this.capacity > this.loadFactor;
  }

  /**
   * Inserts the given key into this hash set.
   * @param {*} key
   */
  add(key) {
    const bucket = this.at(key);
    const node = bucket.find(key);

    if (node === null) {
      bucket.append(key);
      this.size++;
    }

    if (this.isLoaded()) {
      this.resize();
    }
  }

  /**
   * Doubles this hash set's capacity and resets the existing keys.
   */
  resize() {
    const keys = this.keys;

    this.clear();
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);

    keys.forEach((key) => this.add(key));
  }

  /**
   * Checks whether this hash set contains the given key.
   * @param {*} key
   * @returns {boolean}
   */
  has(key) {
    const bucket = this.at(key);
    return bucket.contains(key);
  }

  /**
   * Removes the key if the given key exists in this hash set.
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
   * Clears this hash set.
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
   * Gets the size of this hash set.
   */
  get length() {
    return this.size;
  }

  /**
   * Gets the keys contained in this hash set.
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
   * Gets a string representation of this hash set.
   * @returns {string}
   */
  toString() {
    if (this.size === 0) {
      return "{}";
    }

    const keys = this.keys;
    const stringKeys = keys.join(", ");

    return `{ ${stringKeys} }`;
  }
}
