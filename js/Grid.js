class Grid {
    constructor(size = 10) {
        this.size = size;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
        this.initializeGrid();
    }

    initializeGrid() {
        this.grid = [];
        for (let row = 0; row < this.size; row++) {
            const currentRow = [];
            for (let col = 0; col < this.size; col++) {
                const node = new Node(row, col);
                currentRow.push(node);
            }
            this.grid.push(currentRow);
        }
    }

    reset() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const node = this.grid[row][col];
                node.reset();
                if (node.isStart) this.startNode = node;
                if (node.isEnd) this.endNode = node;
            }
        }
    }

    setStart(row, col) {
        if (this.startNode) {
            this.startNode.isStart = false;
        }
        const node = this.grid[row][col];
        node.isStart = true;
        this.startNode = node;
    }

    setEnd(row, col) {
        if (this.endNode) {
            this.endNode.isEnd = false;
        }
        const node = this.grid[row][col];
        node.isEnd = true;
        this.endNode = node;
    }

    toggleWall(row, col) {
        const node = this.grid[row][col];
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
        }
    }

    resize(newSize) {
        this.size = newSize;
        this.initializeGrid();
    }

    getNode(row, col) {
        return this.grid[row][col];
    }

    getAllNodes() {
        const nodes = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                nodes.push(this.grid[row][col]);
            }
        }
        return nodes;
    }

    getUnvisitedNeighbors(node) {
        return node.getNeighbors(this.grid).filter(neighbor => !neighbor.isVisited);
    }
}