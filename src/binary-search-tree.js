const Node = require('./base-node');

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
    this.nodes = [];
  }

  get getNodes() {
    return this.nodes.filter((node) => node !== null);
  }

  // utility method for testing
  static build(keys) {
    if (!keys || !keys.length) {
      throw new Error('keys must not be empty!');
    }

    const bst = new BinarySearchTree();

    keys.forEach((key) => {
      bst.insert(key);
    });

    return bst;
  }

  /**
   * checks RI (representation invariant) of BST
   * 1. key of the left subtree must be less than or equal to key of the node
   * 2. key of the right subtree must be greater than or equal to key of the node
   */
  checkRI() {
    return this.getNodes.every((node) => {
      let invariant = false;

      if (node.left) {
        invariant = node.key >= node.left.key;
      }

      if (node.right) {
        invariant = node.key <= node.right.key;
      }

      // root / leaf of the tree
      if (!node.left && !node.right) {
        invariant = true;
      }

      return invariant;
    });
  }

  /**
   * Time Complexity
   * Binary Search takes O(lg N) time.
   */
  find(key, entry = this.root) {
    if (!entry) {
      return null;
    }

    if (key > entry.key) {
      return this.find(key, entry.right);
    }

    if (key < entry.key) {
      return this.find(key, entry.left);
    }

    return entry;
  }

  /**
   * Time Complexity
   * You're going down to the bottom while comparing value of the node at most O(h) time.
   * And setting parent, left or right pointer takes constant time, so it's O(h) time in total.
   */
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
          const right = new Node(key);
          // eslint-disable-next-line no-param-reassign
          entry.right = right;
          right.parent = entry;
          this.nodes.push(entry.right);
        } else {
          this.insert(key, entry.right);
        }
      } else if (key < entry.key) {
        if (!entry.left) {
          const left = new Node(key);
          // eslint-disable-next-line no-param-reassign
          entry.left = left;
          left.parent = entry;
          this.nodes.push(entry.left);
        } else {
          this.insert(key, entry.left);
        }
      }
    }
  }

  /**
   * Time Complexity
   * In worst cases, you have to go to the bottom left (level of the leaves),
   * and it takes O(h) time where h = height of the tree.
   */
  findMin(entry = this.root) {
    if (entry.left) {
      return this.findMin(entry.left);
    }

    return entry;
  }

  /**
   * Time Complexity
   * Same as `findMin`.
   */
  findMax(entry = this.root) {
    if (entry.right) {
      return this.findMax(entry.right);
    }

    return entry;
  }

  /**
   * Time Complexity
   * In worst cases, you have to go to the bottom (level of the leaves),
   * and it takes O(h) time where h = height of the tree.
   */
  nextLarger(node) {
    if (node.right) {
      return this.findMin(node.right);
    }

    let current = node;

    // keep going left up until it can't
    while (current.parent && current === current.parent.right) {
      current = current.parent;
    }

    if (!current.parent) {
      throw new Error('bigger node not exists');
    }

    return current.parent;
  }

  /**
   * Time Complexity
   * Same as `nextLarger`.
   */
  nextSmaller(node) {
    if (node.left) {
      return this.findMax(node.left);
    }

    let current = node;

    // keep going right up until it can't
    while (current.parent && current === current.parent.left) {
      current = current.parent;
    }

    if (!current.parent) {
      throw new Error('smaller node not exists');
    }

    return current.parent;
  }

  /**
   * Time Complexity
   * In worst cases, `delete` takes O(h).
   * Because it takes O(h) time to call `nextLarger`, otherwise it takes constant time.
   */
  delete(node) {
    const { nodes } = this;

    function remove(value) {
      const idx = nodes.findIndex((_node) => _node.key === value);
      nodes.splice(idx, 1, null);
    }

    // case no child / one child
    if (!node.left || !node.right) {
      if (node === node.parent.left) {
        // eslint-disable-next-line no-param-reassign
        node.parent.left = node.left || node.right;

        if (node.parent.left) {
          // eslint-disable-next-line no-param-reassign
          node.parent.left.parent = node.parent;
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        node.parent.right = node.left || node.right;
        if (node.parent.right) {
          // eslint-disable-next-line no-param-reassign
          node.parent.right.parent = node.parent;
        }
      }

      // to check RI
      remove(node.key);
      return node;
    }

    // case both child
    const nextLarger = this.nextLarger(node);
    const tmp = nextLarger.key;
    nextLarger.key = node.key;
    // eslint-disable-next-line no-param-reassign
    node.key = tmp;
    return this.delete(nextLarger);
  }

  traverseInOrder(node) {
    if (!node) return;
    this.traverseInOrder(node.left);
    console.log(node.key);
    this.traverseInOrder(node.right);
  }

  traversePreOrder(node) {
    if (!node) return;
    console.log(node.key);
    this.traversePreOrder(node.left);
    this.traversePreOrder(node.right);
  }

  traversePostOrder(node) {
    if (!node) return;
    this.traversePostOrder(node.left);
    this.traversePostOrder(node.right);
    console.log(node.key);
  }
}

module.exports = BinarySearchTree;
