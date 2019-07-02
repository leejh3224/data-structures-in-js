class BaseNode {
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

module.exports = BaseNode;
