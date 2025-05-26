# Pathfinding Visualizer

A web-based interactive pathfinding visualizer that demonstrates Dijkstra's Algorithm and A* Search Algorithm.

## Features

- Interactive 10x10 grid (resizable to 15x15 or 20x20)
- Support for both Dijkstra's Algorithm and A* Search
- Visual representation of the pathfinding process
- Adjustable visualization speed
- Ability to place walls and obstacles
- Clear, pastel-colored UI design

## How to Use

1. Open `index.html` in a web browser
2. Click on the grid to:
   - First click: Set the start point (green)
   - Second click: Set the end point (pink)
   - Subsequent clicks: Toggle walls (purple)
3. Choose your preferred algorithm from the dropdown menu
4. Adjust the visualization speed if desired
5. Click "Find Path" to start the visualization
6. Use "Clear Grid" to reset the grid

## Controls

- **Algorithm**: Choose between Dijkstra's Algorithm and A* Search
- **Speed**: Adjust visualization speed (slow, medium, fast)
- **Grid Size**: Change the grid dimensions (10x10, 15x15, 20x20)
- **Find Path**: Start the pathfinding visualization
- **Clear Grid**: Reset the grid to its initial state

## Color Legend

- Green: Start point
- Pink: End point
- Purple: Walls/obstacles
- Blue: Visited nodes
- Yellow: Final path

## Implementation Details

The project is implemented using:
- Vanilla JavaScript (ES6+)
- CSS Grid for layout
- Object-Oriented Programming principles
- Asynchronous JavaScript for animations

## File Structure

- `index.html`: Main HTML structure
- `styles.css`: Styling and animations
- `js/Node.js`: Node class implementation
- `js/Grid.js`: Grid management
- `js/Algorithm.js`: Pathfinding algorithms
- `js/main.js`: UI interactions and visualization
