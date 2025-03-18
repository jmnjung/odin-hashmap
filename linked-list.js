import Node from "./node.js";

/**
 * A singly linked list to contain strings.
 */
export default class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * Appends a new node with the given key and value to this linked list.
   * @param {*} key
   * @param {*} value
   */
  append(key, value = null) {
    const newNode = new Node(key, value);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let currNode = this.head;

      while (currNode !== null && currNode.nextNode !== null) {
        currNode = currNode.nextNode;
      }

      currNode.nextNode = newNode;
    }
  }

  /**
   * Checks whether this linked list contains the given key.
   * @param {*} key
   * @returns {boolean}
   */
  contains(key) {
    const stringKey = String(key);

    let currNode = this.head;

    while (currNode !== null) {
      if (currNode.key === stringKey) {
        return true;
      }
      currNode = currNode.nextNode;
    }

    return false;
  }

  /**
   * Finds the node with the given key if it exists in this linked list.
   * @param {*} key
   * @returns {?Node}
   */
  find(key) {
    const stringKey = String(key);

    let currNode = this.head;

    while (currNode !== null) {
      if (currNode.key === stringKey) {
        return currNode;
      }
      currNode = currNode.nextNode;
    }

    return null;
  }

  /**
   * Removes the node with the given key if it exists in this linked list.
   * @param {*} key
   * @returns {boolean}
   */
  remove(key) {
    if (!this.contains(key)) {
      return false;
    }

    const oldNode = this.find(key);

    if (this.head === oldNode) {
      this.head = this.head.nextNode;
    } else {
      let currNode = this.head;

      while (currNode !== null && currNode.nextNode !== oldNode) {
        currNode = currNode.nextNode;
      }

      currNode.nextNode = currNode.nextNode.nextNode;
    }

    return true;
  }

  /**
   * Clears this linked list.
   */
  clear() {
    this.head = null;
  }

  /**
   * Gets the keys of nodes in this linked list.
   * @returns {Array<string>}
   */
  get keys() {
    const result = [];

    let currNode = this.head;

    while (currNode !== null) {
      result.push(currNode.key);
      currNode = currNode.nextNode;
    }

    return result;
  }

  /**
   * Gets the values of nodes in this linked list.
   * @returns {Array<string>}
   */
  get values() {
    const result = [];

    let currNode = this.head;

    while (currNode !== null) {
      result.push(currNode.value);
      currNode = currNode.nextNode;
    }

    return result;
  }

  /**
   * Gets the key-value pairs of nodes in this linked list.
   * @returns {Array<[string, string]>}
   */
  get entries() {
    const result = [];

    let currNode = this.head;

    while (currNode !== null) {
      result.push([currNode.key, currNode.value]);
      currNode = currNode.nextNode;
    }

    return result;
  }
}
