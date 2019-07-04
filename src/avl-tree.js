const BinarySearchTree = require('./binary-search-tree');

class AVLTree extends BinarySearchTree {
  static build(keys) {
    if (!keys || !keys.length) {
      throw new Error('keys must not be empty!');
    }

    const avl = new AVLTree();

    keys.forEach((key) => {
      avl.insertAVL(key);
    });

    return avl;
  }

  // eslint-disable-next-line class-methods-use-this
  rebalance(nodes) {
    nodes.forEach((node) => {
      switch (node.balance) {
        case 0:
          node.leftRotate();
          break;
        case 1:
          node.rightRotate();
          break;
        case 2: {
          node.left.leftRotate();
          node.rightRotate();
          break;
        }
        case 3: {
          node.right.rightRotate();
          node.leftRotate();
          break;
        }
        default:
          break;
      }
    });
  }

  insertAVL(key) {
    super.insert(key);
    this.rebalance(this.nodes);
  }

  deleteAVL(node) {
    super.delete(node);
    this.rebalance(this.getNodes);
  }
}

module.exports = AVLTree;
