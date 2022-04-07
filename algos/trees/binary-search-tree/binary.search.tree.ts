export class BinarySearchTree {
    constructor(public root?: Node) {}

    insert(value: number) {
        if (this.root) {
            this.root.insert(value);
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
            this.root.delete(value)
        }
    }
}

export class Node {
    constructor(public value: number, public left?: Node, public right?: Node) {}

    insert(value: number) {
        if (value === this.value) {
            return
        }
        if (value < this.value) {
            this.insertLeft(value)
        } else {
            this.insertRight(value)
        }
    }

    insertLeft(value: number) {
        if (this.left) {
            this.left.insert(value)
        } else {
            this.left = new Node(value)
        }
    }

    insertRight(value: number) {
        if (this.right) {
            this.right.insert(value)
        } else {
            this.right = new Node(value)
        }
    }

    preOrder(out: number[]) {
        out.push(this.value)
        this.left?.preOrder(out)
        this.right?.preOrder(out)
    }

    delete(value: number) {
        if (value < this.value) {
            console.log("ASSIGNING LEFT", value, this.value, this.left)
            this.left = this.left?.delete(value)
        } else if (value > this.value) {
            console.log("ASSIGNING RIGHT", value, this.value, this.right)
            this.right = this.right?.delete(value)
        } else {
            console.log("FOUND VALUE", this)
            if (!this.left && !this.right) {
                return null
            }
            if (!this.left) {
                return this.right
            }
            if (!this.right) {
                return this.left
            }
            return this.getSuccessor()
        }
        return this
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