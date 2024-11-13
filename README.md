# Tic Tac Toe Game

A simple yet fun Tic Tac Toe game built with React. The game allows you to play in two different modes:

1. **2 Players** (local multiplayer, both players on the same device)
2. **1 Player (vs Computer)** (play against the AI)

The game includes:

- Scoring system for both modes.
- Draw counter for both modes (separate counters for 2 players and 1 player mode).
- The ability to restart the game and reset scores.

## Features:

- Play with a friend in **2 Player mode**.
- Challenge the **AI** in **1 Player mode**.
- Separate scores for each mode (player X, player O, and AI).
- Track the number of draws for each mode.
- Reset the game or reset all scores with the provided buttons.

## Installation

To run this game locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/DLQuake/tic-tac-toe.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tic-tac-toe
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will open the game in your browser (usually at `http://localhost:5173/`).

## How to Play

- **2 Players mode**: Both players take turns on the same device to play the game.
- **1 Player (vs AI) mode**: Player X (you) will play against the AI (Player O). The AI uses the **Minimax algorithm** to make its moves.

### Controls:

- Click on any of the empty squares to make a move.
- The game will automatically switch between Player X and Player O.
- If there is a winner or a draw, the game will display the result.

### Scoring:

- In **2 Player mode**:
  - Player X's score will be tracked separately from Player O's score.
  - The draw counter will track draws for two-player games.
- In **1 Player (vs AI) mode**:
  - Player X's score (for human player) and AI's score (for AI) are tracked separately.
  - The draw counter will track draws for games between the player and AI.

### Buttons:

- **Restart Game**: Resets the current game but keeps the scores.
- **Reset All**: Resets both the game and the scores for both modes.

## Technologies Used

- **React** – Front-end library for building the user interface.
- **Minimax Algorithm** – AI logic for choosing the best moves for the computer in 1 Player mode.
- **Bulma** – A modern CSS framework used to style the application and provide a responsive layout.
- **Vite** – A fast build tool and development server used to set up the project.

## Acknowledgments

- The game is inspired by the classic Tic Tac Toe game.
- The AI uses the **Minimax** algorithm, a common decision-making algorithm used in games to choose the best possible move.