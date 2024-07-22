# **Scrabble Game - Web Development Project**

This project is a web-based implementation of the classic word game Scrabble, built using HTML, CSS, JavaScript, and a Node.js backend.

**Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Technologies Used](#technologies-used)

## Features

*   **Multiplayer:** Play against a friend on the same device.
*   **Dynamic Board:** The game board renders letter tiles and bonus squares visually.
*   **Scoring:** Implements standard Scrabble scoring rules, including letter and word multipliers.
*   **Word Validation:** Checks if played words are valid using a dictionary.
*   **Score Tracking:** Keeps track of individual word scores and total game scores.
*   **Hint System:** Provides hints for possible words using available tiles.
*   **Persistent Storage:** Uses local storage to save player names and game progress.
*   **Top Scores:** Displays top 10 word and game scores, fetched from the server.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Aditya-Singh03/Scrabble-Multiplayer-Game.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Scrabble-Multiplayer-Game
    ```
3.  **Install server dependencies:**
    ```bash
    npm install
    ```
4.  **Start the server:**
    ```bash
    npm start 
    ```
5.  **Open the game in your browser:**
    ```bash
    http://localhost:3000
    ```

## How to Play

1.  **Enter Player Names:** Each player enters their name.
2.  **Take Turns:** Players take turns placing words on the board.
3.  **Enter Word and Position:** Type the word, x-coordinate, y-coordinate, and direction (horizontal/vertical).
4.  **Click "Play!":** The word will be played if it's valid and follows Scrabble rules.
5.  **Score:** Scores are calculated automatically.
6.  **End/reset Game:** Click "reset" to finish and start a new game.

## Project Structure

*   `client/`: Contains the frontend code (HTML, CSS, JavaScript).
*   `server/`: Contains the backend code (Node.js, Express).
*   `readme.md`: This file.

## Key Components

*   `Game.js`: Handles game logic, board state, and word placement.
*   `Rack.js`: Manages player tile racks.
*   `scoring.js`: Implements scoring rules.
*   `dictionary.js`: Loads and interfaces with the word dictionary.
*   `scrabbleUtils.js`: Utility functions for word validation and suggestions.
*   `multiplayer.js`: Handles multiplayer UI elements.
*   `scoreboard.js`: Manages and displays scores.
*   `server/index.js`: The main server file.
*   `server/database.js`: Handles score storage using a JSON file.

## Technologies Used

*   **Frontend:** HTML, CSS, JavaScript (ES6 modules)
*   **Backend:** Node.js, Express.js
*   **Additional Libraries:** chalk-animation (for server console animation), morgan (for logging) 
*   **Testing**: Jest for unit testing and frontend testing (client-side test.js)
