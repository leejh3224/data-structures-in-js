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

    const key = bst.find(67);

    expect(key).toBe(67);

    try {
      bst.find(999);
    } catch (error) {
      expect(error.message).toBe('key not found!');
    }
  });

  it('find_min', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62]);

    const min = bst.findMin();

    expect(min).toBe(62);
  });

  it('find_max', () => {
    const bst = BinarySearchTree.build([99, 67, 102, 62]);

    const max = bst.findMax();

    expect(max).toBe(102);
  });

  it.todo('next_larger');

  it.todo('next_smaller');

  it.todo('delete');
});
