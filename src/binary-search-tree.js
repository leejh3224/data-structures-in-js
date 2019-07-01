class Node {
  constructor(key, left = null, right = null, parent = null) {
    if (!key || typeof key !== 'number') {
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
    return this.nodes.every((node) => {
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

  find(key, entry = this.root) {
    if (!entry) {
      throw new Error('key not found!');
    }

    if (key > entry.key) {
      return this.find(key, entry.right);
    }

    if (key < entry.key) {
      return this.find(key, entry.left);
    }

    return entry;
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

  findMin(entry = this.root) {
    if (entry.left) {
      return this.findMin(entry.left);
    }

    return entry;
  }

  findMax(entry = this.root) {
    if (entry.right) {
      return this.findMax(entry.right);
    }

    return entry;
  }

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

  delete() {
    this.x = '';
  }
}

module.exports = BinarySearchTree;
