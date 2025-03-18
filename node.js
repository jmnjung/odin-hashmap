/**
 * A node in a singly linked list for hash map and hash set.
 */
export default class Node {
  /**
   * @param {*} key
   * @param {*} value
   * @param {?Node} nextNode
   */
  constructor(key = null, value = null, nextNode = null) {
    this.key = String(key);
    this.value = String(value);
    this.nextNode = nextNode;
  }
}
