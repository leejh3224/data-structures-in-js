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

  it.todo('find');

  it.todo('find_min');

  it.todo('find_max');

  it.todo('next_larger');

  it.todo('next_smaller');

  it.todo('delete');
});
