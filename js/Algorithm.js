class Algorithm {
    constructor(grid) {
        this.grid = grid;
        this.visitedNodesInOrder = [];
        this.nodesInShortestPathOrder = [];
    }

    async dijkstra(startNode, endNode, speed) {
        this.visitedNodesInOrder = [];
        this.nodesInShortestPathOrder = [];

        // Check if start and end are adjacent
        if (this.areNodesAdjacent(startNode, endNode)) {
            this.visitedNodesInOrder = [startNode];
            this.nodesInShortestPathOrder = [startNode, endNode];
            return this.visitedNodesInOrder;
        }

        // Reset all nodes
        const allNodes = this.grid.getAllNodes();
        allNodes.forEach(node => {
            node.distance = Infinity;
            node.previousNode = null;
            node.isVisited = false;
        });

        startNode.distance = 0;
        const unvisitedNodes = [...allNodes];

        while (unvisitedNodes.length > 0) {
            this.sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();

            if (closestNode.distance === Infinity) {
                this.visitedNodesInOrder = [];
                this.nodesInShortestPathOrder = [];
                return [];
            }

            closestNode.isVisited = true;
            this.visitedNodesInOrder.push(closestNode);

            if (closestNode === endNode) {
                this.nodesInShortestPathOrder = this.getNodesInShortestPathOrder(endNode);
                return this.visitedNodesInOrder;
            }

            await this.updateUnvisitedNeighbors(closestNode, speed);
        }
        this.visitedNodesInOrder = [];
        this.nodesInShortestPathOrder = [];
        return [];
    }

    async aStar(startNode, endNode, speed) {
        this.visitedNodesInOrder = [];
        this.nodesInShortestPathOrder = [];

        // Check if start and end are adjacent
        if (this.areNodesAdjacent(startNode, endNode)) {
            this.visitedNodesInOrder = [startNode];
            this.nodesInShortestPathOrder = [startNode, endNode];
            return this.visitedNodesInOrder;
        }

        // Reset all nodes
        const allNodes = this.grid.getAllNodes();
        allNodes.forEach(node => {
            node.distance = Infinity;
            node.fScore = Infinity;
            node.previousNode = null;
            node.isVisited = false;
        });

        startNode.distance = 0;
        startNode.fScore = 0;
        const unvisitedNodes = [...allNodes];

        while (unvisitedNodes.length > 0) {
            this.sortNodesByFScore(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();

            if (closestNode.distance === Infinity) {
                this.visitedNodesInOrder = [];
                this.nodesInShortestPathOrder = [];
                return [];
            }

            closestNode.isVisited = true;
            this.visitedNodesInOrder.push(closestNode);

            if (closestNode === endNode) {
                this.nodesInShortestPathOrder = this.getNodesInShortestPathOrder(endNode);
                return this.visitedNodesInOrder;
            }

            await this.updateUnvisitedNeighborsAStar(closestNode, endNode, speed);
        }
        this.visitedNodesInOrder = [];
        this.nodesInShortestPathOrder = [];
        return [];
    }

    areNodesAdjacent(node1, node2) {
        const rowDiff = Math.abs(node1.row - node2.row);
        const colDiff = Math.abs(node1.col - node2.col);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    sortNodesByDistance(unvisitedNodes) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }

    sortNodesByFScore(unvisitedNodes) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore);
    }

    async updateUnvisitedNeighbors(node, speed) {
        const unvisitedNeighbors = this.grid.getUnvisitedNeighbors(node);
        for (const neighbor of unvisitedNeighbors) {
            const tentativeDistance = node.distance + 1;
            if (tentativeDistance < neighbor.distance) {
                neighbor.distance = tentativeDistance;
                neighbor.previousNode = node;
            }
            await this.delay(speed);
        }
    }

    async updateUnvisitedNeighborsAStar(node, endNode, speed) {
        const unvisitedNeighbors = this.grid.getUnvisitedNeighbors(node);
        for (const neighbor of unvisitedNeighbors) {
            const tentativeGScore = node.distance + 1;
            if (tentativeGScore < neighbor.distance) {
                neighbor.previousNode = node;
                neighbor.distance = tentativeGScore;
                neighbor.fScore = neighbor.distance + neighbor.getManhattanDistance(endNode);
            }
            await this.delay(speed);
        }
    }

    getNodesInShortestPathOrder(finishNode) {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return nodesInShortestPathOrder;
    }

    delay(speed) {
        const speeds = {
            slow: 100,
            medium: 50,
            fast: 10
        };
        return new Promise(resolve => setTimeout(resolve, speeds[speed]));
    }
}