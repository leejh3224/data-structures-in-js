const BinarySearchTree = require('./binary-search-tree');

describe('binary search tree', () => {
  it('insert', () => {
    const bst = new BinarySearchTree();

    expect(bst.checkRI()).toBeTruthy();

    bst.insert(99);

    bst.insert(67);

    bst.insert(102);

    bst.insert(62);

    expect(bst.checkRI()).toBeTruthy();
  });

  it('find', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62]);

    const node = bst.find(67);

    expect(node.key).toBe(67);

    const node2 = bst.find(999);

    expect(node2).toBe(null);
  });

  it('find_min', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62]);

    const min = bst.findMin();

    expect(min.key).toBe(62);
  });

  it('find_max', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62]);

    const max = bst.findMax();

    expect(max.key).toBe(102);
  });

  it('next_larger', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62]);

    // casee 1: no right subtree
    const node = bst.find(62);

    expect(bst.nextLarger(node).key).toBe(67);

    // case 2: has right subtree
    const node2 = bst.find(99);

    expect(bst.nextLarger(node2).key).toBe(102);

    // case3: self is biggest node
    try {
      const node3 = bst.find(102);

      bst.nextLarger(node3);
    } catch (error) {
      expect(error.message).toBe('bigger node not exists');
    }
  });

  it('next_smaller', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62]);

    // casee 1: no left subtree
    const node = bst.find(102);

    expect(bst.nextSmaller(node).key).toBe(99);

    // case 2: has left subtree
    const node2 = bst.find(67);

    expect(bst.nextSmaller(node2).key).toBe(62);

    // case3: self is smallest node
    try {
      const node3 = bst.find(62);

      bst.nextSmaller(node3);
    } catch (error) {
      expect(error.message).toBe('smaller node not exists');
    }
  });

  it('delete', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62, 60, 65]);

    expect(bst.checkRI()).toBeTruthy();

    bst.delete(bst.find(62));
    bst.delete(bst.find(60));
    bst.delete(bst.find(65));
    bst.delete(bst.find(102));

    expect(bst.getNodes).toHaveLength(2);
    expect(bst.checkRI()).toBeTruthy();
  });
});
