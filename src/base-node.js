function height(node) {
  return node ? node.height : -1;
}

class BaseNode {
  constructor(key, left = null, right = null, parent = null) {
    if (!key || typeof key !== 'number') {
      throw new Error('key is invalid!');
    }

    this.key = key;
    this.left = left;
    this.right = right;
    this.parent = parent;

    // AVL Tree
    this.height = 0;
  }

  // AVL
  updateHeight() {
    const leftSubtreeHeight = this.left ? this.left.height : -1;
    const rightSubtreeHeight = this.right ? this.right.height : -1;
    this.height = Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
  }

  // AVL
  rotateLeft() {
    const { right } = this;
    this.right = right.left;
    right.left = this;
    this.updateHeight();
    right.updateHeight();
    return right;
  }

  // AVL
  rotateRight() {
    const { left } = this;
    this.left = left.right;
    left.right = this;
    this.updateHeight();
    left.updateHeight();
    return left;
  }

  get leftHeight() {
    return height(this.left ? this.left.height : null);
  }

  get rightHeight() {
    return height(this.right ? this.right.height : null);
  }

  get balance() {
    const NEEDS_SINGLE_LEFT_ROTATION = 0;
    const NEEDS_SINGLE_RIGHT_ROTATION = 1;
    const NEEDS_LEFT_RIGHT_ROTATION = 2;
    const NEEDS_RIGHT_LEFT_ROTATION = 3;
    const BALANCED = 4;

    const leftHeavy = this.leftHeight >= 2 + this.rightHeight;
    const rightHeavy = this.rightHeight >= 2 + this.leftHeight;

    if (leftHeavy) {
      return this.left.leftHeight >= this.left.rightHeight
        ? NEEDS_SINGLE_RIGHT_ROTATION
        : NEEDS_LEFT_RIGHT_ROTATION;
    }

    if (rightHeavy) {
      return this.right.rightHeight >= this.right.leftHeight
        ? NEEDS_SINGLE_LEFT_ROTATION
        : NEEDS_RIGHT_LEFT_ROTATION;
    }

    return BALANCED;
  }
}

module.exports = BaseNode;
