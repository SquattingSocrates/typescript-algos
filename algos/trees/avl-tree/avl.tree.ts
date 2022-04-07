export class AVLTree {
    constructor(public root?: Node) {}

    insert(value: number) {
        if (this.root) {
            this.root = AVLTree._insert(this.root, value);
        } else {
            this.root = new Node(value)
        }
    }

    preOrder() {
        const out: number[] = [];
        if (this.root) {
            this.root.preOrder(out)
        }
        return out
    }


    delete(value: number) {
        if (!this.root) {
            return
        }
        if (this.root.value === value) {
            this.root = this.root.getSuccessor();
        } else {
            this.root = AVLTree.delete(this.root, value)
        }
    }

    private static _insert(node: Node, value: number) {
        if (node == null) {
            return new Node(value)
        }
        if (node.value > value) {
            node.left = AVLTree._insert(node.left, value)
        }
        if (node.value < value) {
            node.right = AVLTree._insert(node.right, value)
        }
        if (node.value === value) {
            return node
        }

        node.height = AVLTree.height(node)
        const balance = AVLTree.height(node.left) - AVLTree.height(node.right)
        
        if (balance > 1) {
            return AVLTree.leftRotate(node, value)
        } else if (balance < -1) {
            return AVLTree.rightRotate(node, value)
        }

        return node
    }

    private static leftRotate(node: Node, value: number) {
        const isLeftLeft = node.left.value > value

        const [z, y] = [node, node.left]
        if (isLeftLeft) {
            z.left = y.right
            y.right = z
            return y
        } else {
            const x = y.right
            y.right = x.left
            x.left = y
            z.left = x.right
            x.right = z
            return x
        }
    }

    private static rightRotate(node: Node, value: number) {
        const isRightRight = node.right.value < value

        const [z, y] = [node, node.right]
        if (isRightRight) {
            z.right = y.left
            y.left = z
            return y
        } else {
            const x = y.left
            y.left = x.right
            x.right = y
            z.right = x.left
            x.left = z
            return x
        }
    }

    private static height(node: Node): number {
            if (!node) {
                return 0
            }
            return 1 + Math.max(AVLTree.height(node.left), AVLTree.height(node.right))   
    }


    private static delete(node: Node, value: number) {
        if (value < node.value) {
            node.left = AVLTree.delete(node.left, value)
        } else if (value > node.value) {
            node.right = AVLTree.delete(node.right, value)
        } else {
            if (!node.left && !node.right) {
                return null
            }
            if (!node.left) {
                return node.right
            }
            if (!node.right) {
                return node.left
            }
            node = node.getSuccessor()
        }

        node.height = AVLTree.height(node)
        const balance = AVLTree.height(node.left) - AVLTree.height(node.right)
        
        if (balance > 1) {
            return AVLTree.leftRotate(node, value)
        } else if (balance < -1) {
            return AVLTree.rightRotate(node, value)
        }
        return node
    }
}

export class Node {
    constructor(public value: number, public left?: Node, public right?: Node, public height = 0) {}

    preOrder(out: number[]) {
        out.push(this.value)
        this.left?.preOrder(out)
        this.right?.preOrder(out)
    }

    getSuccessor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let prev: Node = this;
        let curr = this.right;
        let tookLeft = false
        while (curr?.left != null) {
            tookLeft = true
            prev = curr
            curr = curr.left
        }
        if (curr && tookLeft) {
            // delete reference to leftmost node
            prev.left = null
            curr.right = this.right
            curr.left = this.left
        }
        return curr
    }
}