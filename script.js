class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    arrayToBST(arr, start, end) {
        if (start > end) {
            return null;
        }
    
        let mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid])
    
        node.left = this.arrayToBST(arr, start, mid - 1);
        node.right = this.arrayToBST(arr, mid + 1, end);
    
        return node;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    insertNode(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.data) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.data) {
            node.right = this.insertNode(node.right, value);
        }

        return node;
    }
    
    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root, value) {
        if (root === null) {
            return root;
        }

        if (value < root.data) {
            root.left = this.deleteNode(root.left, value);
        } else if (value > root.data) {
            root.right = this.deleteNode(root.right, value);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            root.data = this.minValue(root.right);

            root.right = this.deleteNode(root.right, root.data);
        }
        return root;
    }

    minValue(node) {
        let minv = node.data;
        while (node.left !== null) {
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }

    levelOrder() {
        let result = [];
        let queue = new Queue();
        
        if (this.root === null) {
            return result;
        }

        queue.enqueue(this.root);

        while (!queue.isEmpty()) {
            let current = queue.dequeue();
            result.push(current.data);
            
            if (current.left !== null) {
                queue.enqueue(current.left);
            }
            if (current.right !== null) {
                queue.enqueue(current.right);
            }
        }

        return result;
    }

    preOrder(node) {
        if (node == null) {
            return;
        }
        console.log(node.data);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }

    inOrder(node) {
        let inOrderArr = [];
        let stack = [];
    
        let current = node;
    
        while (current !== null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
    
            current = stack.pop();
            inOrderArr.push(current.data);
    
            current = current.right;
        }
    
        console.log(inOrderArr);
    }


    Postorder(node) {
        if (node === null) {
            return; 
        }

        this.Postorder(node.left); 
        this.Postorder(node.right); 
        console.log(node.data);
    }
}

class Queue {
    constructor() {
        this.items = []; 
    }

    enqueue(element) {
        this.items.push(element); 
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift(); 
    }

    front() {
        if (this.isEmpty()) {
            return "No elements in Queue";
        }
        return this.items[0]; 
    }

    isEmpty() {
        return this.items.length === 0; 
    }

    printQueue() {
        let str = "";
        for (let i = 0; i < this.items.length; i++) {
            str += this.items[i] + " ";
        }
        return str;
    }
}


let bst = new Tree();
let arr = [1, 5, 8, 22, 53, 73, 125];
let n = arr.length;
bst.root = bst.arrayToBST(arr, 0, n - 1);
console.log('preOrder')
bst.preOrder(bst.root);
bst.insert(6);
console.log('preOrder + 6')
bst.preOrder(bst.root);
console.log('level Order');
console.log(bst.levelOrder());
console.log('in order');
bst.inOrder(bst.root);
console.log('post Order');
bst.Postorder(bst.root);