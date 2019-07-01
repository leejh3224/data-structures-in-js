/* eslint-disable no-param-reassign */
class Node {
  constructor(key, left = null, right = null, parent = null) {
    if (!key || key < 0) {
      throw new Error('key is invalid!');
    }

    this.key = key;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
    this.nodes = [];
  }

  /**
   * checks RI (representation invariant) of BST
   * 1. key of the left subtree must be smaller or equal to key of the node
   * 2. key of the right subtree must be bigger or equal to key of the node
   */
  checkRI() {
    return this.nodes.every((node) => {
      let invariant = false;

      if (node.left) {
        invariant = node.key >= node.left.key;
      }

      if (node.right) {
        invariant = node.key <= node.right.key;
      }

      if (!node.left && !node.right) {
        invariant = true;
      }

      return invariant;
    });
  }

  find() {
    this.x = '';
  }

  insert(key, entry = this.root) {
    if (!key || typeof key !== 'number') {
      throw new Error('key is invalid!');
    }

    if (!this.root) {
      this.root = new Node(key);
      this.nodes.push(this.root);
    } else {
      // for convenience
      if (key === entry.key) {
        throw new Error('duplicated key');
      }

      if (key > entry.key) {
        if (!entry.right) {
          entry.right = new Node(key);
          this.nodes.push(entry.right);
        } else {
          this.insert(key, entry.right);
        }
      } else if (key < entry.key) {
        if (!entry.left) {
          entry.left = new Node(key);
          this.nodes.push(entry.left);
        } else {
          this.insert(key, entry.left);
        }
      }
    }
  }
}

module.exports = BinarySearchTree;
