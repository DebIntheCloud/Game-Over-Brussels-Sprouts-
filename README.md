React Grid Game

A simple React-based grid game where you control the player, collect items, and avoid the enemy. The game features movement, item collection with sound effects, inventory tracking, and a roaming enemy that ends the game on collision.

Features

Player Movement
Move using arrow keys or WASD. Boundaries prevent moving outside the grid.

Items and Sounds
Collect items placed on the grid (dumbbells, fizz, Xbox, wife, farm). Each item plays a unique sound when collected. Inventory prevents duplicates.

Inventory System
Collected items appear in a persistent inventory panel. Clear inventory with one click.

Enemy Logic
Enemy moves randomly every 500ms. Colliding with the enemy triggers a game over message. The player respawns, and inventory resets.

Demo

Grid size: 4x4

Items and enemy spawn in preset positions.

Game board uses CSS Grid and Flexbox for layout.

Controls

Arrow Keys or WASD → Move player

Move onto the same tile to collect an item

Use the "Clear Inventory" button to reset

Tech Stack

React (functional components with hooks)

JavaScript

CSS Grid and Flexbox

HTML5 Audio API

Installation

Clone the repository:

git clone https://github.com/yourusername/react-grid-game.git
cd react-grid-game


Install dependencies:

npm install


Run the app:

npm start


Build for production:

npm run build

File Structure
src/
│── images/        # Player, enemy, and item assets
│── sounds/        # Item pickup sound files
│── Map.js         # Main game component
│── App.js         # Entry point
│── index.js       # React root

Possible Extensions

Add a scoring system (points per item)

Multiple enemy types with different speeds

Player health system instead of instant game over

Procedural item generation

Background music toggle