const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null
  }

  root() {
    return this._root;
  }

  add(data) {
    const addTo = (node) => {

      if (node === null) {
        return new Node(data);
      }

      if (data !== node.data) {
        const prop = data < node.data ? 'left' : 'right';
        node[prop] = addTo(node[prop]);
      }

      return node;
    }

    this._root = addTo(this._root);
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    const findIn = (node) => {
      if (node === null || data === node.data) {
        return node;
      }

      return findIn(data < node.data ? node.left : node.right);
    }

    return findIn(this._root);
  }

  remove(data) {
    const removeFrom = (node, value) => {
      if (node === null) {
        return node;
      }

      if (value < node.data) {
        node.left = removeFrom(node.left, value);
        return node;
      }

      if (value > node.data) {
        node.right = removeFrom(node.right, value);
        return node;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      node.data = this.min(node.right);
      node.right = removeFrom(node.right, node.data);

      return node;
    }

    this._root = removeFrom(this._root, data);
  }

  min(node = this._root) {
    while (node?.left) {
      node = node.left;
    }

    return node?.data;
  }

  max(node = this._root) {
    while (node?.right) {
      node = node.right;
    }

    return node?.data;
  }
}

module.exports = {
  BinarySearchTree
};