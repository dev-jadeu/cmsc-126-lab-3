let grid;
let algorithm;
let isMouseDown = false;
let isStartNodeSet = false;
let isEndNodeSet = false;

document.addEventListener('DOMContentLoaded', () => {
    initializeGrid();
    setupEventListeners();
});

function initializeGrid() {
    const gridSize = parseInt(document.getElementById('gridSize').value);
    grid = new Grid(gridSize);
    algorithm = new Algorithm(grid);
    createGridUI();
}

function createGridUI() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${grid.size}, 1fr)`;

    for (let row = 0; row < grid.size; row++) {
        for (let col = 0; col < grid.size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            gridContainer.appendChild(cell);
        }
    }
}

function setupEventListeners() {
    const gridContainer = document.getElementById('grid');
    const findPathButton = document.getElementById('findPath');
    const clearGridButton = document.getElementById('clearGrid');
    const gridSizeSelect = document.getElementById('gridSize');

    gridContainer.addEventListener('mousedown', handleMouseDown);
    gridContainer.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseup', () => isMouseDown = false);
    findPathButton.addEventListener('click', visualizeAlgorithm);
    clearGridButton.addEventListener('click', clearGrid);
    gridSizeSelect.addEventListener('change', handleGridSizeChange);
}

function handleMouseDown(e) {
    if (!e.target.classList.contains('cell')) return;
    isMouseDown = true;
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    handleCellClick(row, col);
}

function handleMouseOver(e) {
    if (!isMouseDown || !e.target.classList.contains('cell')) return;
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    handleCellClick(row, col);
}

function handleCellClick(row, col) {
    const node = grid.getNode(row, col);
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    if (!isStartNodeSet) {
        grid.setStart(row, col);
        cell.classList.add('start');
        isStartNodeSet = true;
    } else if (!isEndNodeSet) {
        grid.setEnd(row, col);
        cell.classList.add('end');
        isEndNodeSet = true;
    } else {
        grid.toggleWall(row, col);
        cell.classList.toggle('wall');
    }
}

async function visualizeAlgorithm() {
    if (!grid.startNode || !grid.endNode) {
        showNotification('Please set both start and end points!');
        return;
    }

    const algorithmType = document.getElementById('algorithm').value;
    const speed = document.getElementById('speed').value;
    const findPathButton = document.getElementById('findPath');

    // Disable the button and show loading message
    findPathButton.disabled = true;
    findPathButton.textContent = 'Path Finding, Please Wait...';

    // Reset the grid state but keep walls, start, and end points
    grid.reset();
    clearVisualization();

    try {
        const visitedNodesInOrder = algorithmType === 'dijkstra'
            ? await algorithm.dijkstra(grid.startNode, grid.endNode, speed)
            : await algorithm.aStar(grid.startNode, grid.endNode, speed);

        if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) {
            showNotification('No path found!');
            return;
        }

        // Animate visited nodes
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i];
            const cell = document.querySelector(`[data-row="${node.row}"][data-col="${node.col}"]`);
            if (!node.isStart && !node.isEnd) {
                cell.classList.add('visited');
            }
            await algorithm.delay(speed);
        }

        // Animate the path
        if (algorithm.nodesInShortestPathOrder && algorithm.nodesInShortestPathOrder.length > 0) {
            for (let i = 0; i < algorithm.nodesInShortestPathOrder.length; i++) {
                const node = algorithm.nodesInShortestPathOrder[i];
                const cell = document.querySelector(`[data-row="${node.row}"][data-col="${node.col}"]`);
                if (!node.isStart && !node.isEnd) {
                    cell.classList.add('path');
                }
                await algorithm.delay(speed);
            }
        }
    } catch (error) {
        console.error('Error during pathfinding:', error);
        showNotification('An error occurred during pathfinding. Please try again.');
    } finally {
        // Re-enable the button and restore original text
        findPathButton.disabled = false;
        findPathButton.textContent = 'Find Path';
    }
}

function clearGrid() {
    grid = new Grid(grid.size);
    algorithm = new Algorithm(grid);

    // Clear all cell classes
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('start', 'end', 'wall', 'visited', 'path');
    });

    isStartNodeSet = false;
    isEndNodeSet = false;
}

function clearVisualization() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('visited', 'path');
    });
}

function handleGridSizeChange() {
    const newSize = parseInt(document.getElementById('gridSize').value);
    grid.resize(newSize);
    algorithm = new Algorithm(grid);
    createGridUI();
    isStartNodeSet = false;
    isEndNodeSet = false;
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}