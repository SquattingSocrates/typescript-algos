import { AVLTree } from './avl.tree'

describe('AVLTree', () => {
    test('create root node', () => {
        const tree = new AVLTree()
        tree.insert(5)
        expect(tree.root.value).toBe(5)
    })

    test('insert sorted nodes', () => {
        const tree = new AVLTree()
        tree.insert(10)
        tree.insert(20)
        tree.insert(30)
        tree.insert(40)
        tree.insert(50)
        tree.insert(25)
        console.log("GOT THIS TREE", tree.root)
        expect(tree.root.value).toBe(30)
        expect(tree.root.left.value).toBe(20)
        expect(tree.root.right.value).toBe(40)
        expect(tree.root.left.left.value).toBe(10)
        expect(tree.root.left.right.value).toBe(25)
        expect(tree.root.right.right.value).toBe(50)
        expect(tree.preOrder()).toEqual([30, 20, 10, 25, 40, 50])
    })

    describe('#delete', () => {
        test('delete leaf node', () => {
            const tree = new AVLTree()
            tree.insert(50)
            tree.insert(70)
            tree.insert(30)
            tree.insert(20)
            tree.insert(40)
            tree.insert(60)
            tree.insert(80)
            expect(tree.preOrder()).toEqual([50, 30, 20, 40, 70, 60, 80])
            tree.delete(80)
            expect(tree.preOrder()).toEqual([50, 30, 20, 40, 70, 60])
        })

        test('delete and rebalance', () => {
            const tree = new AVLTree()
            tree.insert(9)
            tree.insert(5)
            tree.insert(10)
            tree.insert(0)
            tree.insert(6)
            tree.insert(11)
            tree.insert(-1)
            tree.insert(1)
            tree.insert(2)
            
            expect(tree.preOrder()).toEqual([9, 1, 0, -1, 5, 2, 6, 10, 11])
            tree.delete(10)
            expect(tree.preOrder()).toEqual([1, 0, -1, 9, 5, 2, 6, 11])
            expect(tree.root.value).toBe(1)
        })
    })
})
