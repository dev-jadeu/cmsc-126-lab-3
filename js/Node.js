class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.isVisited = false;
        this.isPath = false;
        this.distance = Infinity;
        this.previousNode = null;
        this.weight = 1;
    }

    reset() {
        this.isVisited = false;
        this.isPath = false;
        this.distance = Infinity;
        this.previousNode = null;
    }

    getNeighbors(grid) {
        const neighbors = [];
        const { row, col } = this;
        const rows = grid.length;
        const cols = grid[0].length;

        // Check all four directions
        if (row > 0) neighbors.push(grid[row - 1][col]); // up
        if (row < rows - 1) neighbors.push(grid[row + 1][col]); // down
        if (col > 0) neighbors.push(grid[row][col - 1]); // left
        if (col < cols - 1) neighbors.push(grid[row][col + 1]); // right

        // Only filter out walls
        return neighbors.filter(neighbor => !neighbor.isWall);
    }

    getManhattanDistance(endNode) {
        return Math.abs(this.row - endNode.row) + Math.abs(this.col - endNode.col);
    }
}