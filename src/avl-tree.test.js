const AVLTree = require('./avl-tree');

describe('avl tree', () => {
  it('insert', () => {
    // zigzag (Left-Right heavy)
    const avl = AVLTree.build([21, 14, 22, 7, 16]);

    expect(avl.checkRI()).toBeTruthy();

    avl.insertAVL(15);

    expect(avl.checkRI()).toBeTruthy();
  });

  it('delete', () => {
    const avl = AVLTree.build([21, 14, 22, 7, 16]);

    expect(avl.checkRI()).toBeTruthy();

    const node = avl.find(16);
    avl.deleteAVL(node);

    expect(avl.checkRI()).toBeTruthy();
  });
});
