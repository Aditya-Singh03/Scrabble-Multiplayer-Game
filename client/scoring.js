/**
 * This class represents the Scrabble board scoring rules.
 */
class Scoring {
  /**
   * Initialize the board.
   *
   * The board is a 15x15 2D array/grid of objects. Rather than store letter
   * tiles as we do in the Game, we store its multiplier scoring properties.
   *
   * We use the tables defined after this class to initialize the board. These
   * tables define all of the multiplier rules of the Scrabble board.
   *
   * Each entry is either undefined or an object with the following properties:
   *
   *  - x: the x coordinate of the position
   *  - y: the y coordinate of the position
   *  - kind: 'ws' or 'ls' (for word score and letter score respectively)
   *  - multiplier: the multiplier for the position (2 or 3)
   */
  constructor() {
    this.board = [];
    for (let i = 1; i <= 15; ++i) {
      this.board[i] = [];
      for (let j = 1; j <= 15; ++j) {
        // Get the multiplier for the position (if any)
        this.board[i][j] = findMultipliers(i, j);
      }
    }
  }

  /**
   * Get the score for a word.
   *
   * @param {string} word the word to compute the score for
   * @param {Object<x|y, number>} position the position of the word
   * @param {boolean} direction true if horizontal, false if vertical
   * @returns {number} the score of the word
   */
  score(word, position, direction) {
    // The score we are going to compute
    let score = 0;

    // The word score multiplier accumulated across each letter in the word
    let wordMultiplier = 1;

    // Split the word into individual letters so we can iterate over them
    const letters = word.split('');

    // Compute the score for each letter in the word
    letters.forEach((letter, i) => {
      // Construct the coordinate depending on the direction
      //  - The index i is used as an offset from the starting position
      const coordinate = {
        x: direction ? position.x + i : position.x,
        y: direction ? position.y : position.y + i,
      };

      // Get the multiplier for the letter and its position
      const boardMultiplier = this.board[coordinate.x][coordinate.y];

      // If the letter's position is on a word multiplier, we accumulate it
      if (boardMultiplier && boardMultiplier.kind === 'ws') {
        wordMultiplier *= boardMultiplier.multiplier;
      }

      // If the letter's position is on a letter multiplier, we save it
      let letterMultiplier = 1;
      if (boardMultiplier && boardMultiplier.kind === 'ls') {
        letterMultiplier = boardMultiplier.multiplier;
      }

      // Compute the score for the letter and multiply it by the multiplier
      score += letterMultiplier * letterScores[letter];
    });

    // Compute the total score with the word multiplier
    score *= wordMultiplier;

    return score;
  }

  /**
   * This function is used to return a unique string representing the multiplier
   * at the given board position. The string that is produced has the following
   * format:
   *
   *   KINDxMULTIPLIER
   *
   * Examples: LSx2 WSx3
   *
   * This can be used for a class name to style the multiplier when rendered to
   * the browser window.
   *
   * @param {number} x the x coordinate of the board position
   * @param {number} y the y coordinate of the board position
   * @returns {string} a string representing the multiplier for the position
   */
  label(x, y) {
    const multiplier = this.board[x][y];
    if (multiplier) {
      return `${multiplier.kind.toUpperCase()}x${multiplier.multiplier}`;
    }
    return '';
  }
}

// An object mapping letters to their Scrabble scores (English)
export const letterScores = {
  '*': 0,
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

/**
 * This is an internal method is used to look up the multiplier that is used at
 * the x, y position that is given. We use the `positionMultipliers` table that
 * is defined after this function.
 *
 * @param {number} x the x coordinate of a board square
 * @param {number} y the y coordinate of a board square
 * @returns the multiplier entry if it exists; undefined otherwise
 */
function findMultipliers(x, y) {
  return positionMultipliers.find((p) => p.x === x && p.y === y);
}

// This array contains the coordinates for multiplier squares. The coordinates
// and their scores are based on the Scrabble game rules.
//
// This table is used to initialize a ScrabbleScoring object. See the
// ScrabbleScoring constructor to see how it is used.
//
// See
// https://en.wikipedia.org/wiki/Scrabble#/media/File:Blank_Scrabble_board_with_coordinates.svg
//
//
// Each entry in the table below is an object with the following properties:
//
//  - x: the x coordinate of the position on the Scrabble board
//  - y: the y coordinate of the position on the Scrabble board
//  - kind: 'ws' or 'ls' (for word score and letter score respectively)
//  - multiplier: the multiplier for the board position (2 or 3)
const positionMultipliers = [
  // Letter Score x2
  { x: 7, y: 7, kind: 'ls', multiplier: 2 },
  { x: 9, y: 7, kind: 'ls', multiplier: 2 },
  { x: 7, y: 9, kind: 'ls', multiplier: 2 },
  { x: 9, y: 9, kind: 'ls', multiplier: 2 },
  { x: 8, y: 4, kind: 'ls', multiplier: 2 },
  { x: 7, y: 3, kind: 'ls', multiplier: 2 },
  { x: 9, y: 3, kind: 'ls', multiplier: 2 },
  { x: 4, y: 1, kind: 'ls', multiplier: 2 },
  { x: 12, y: 1, kind: 'ls', multiplier: 2 },
  { x: 8, y: 12, kind: 'ls', multiplier: 2 },
  { x: 7, y: 13, kind: 'ls', multiplier: 2 },
  { x: 9, y: 13, kind: 'ls', multiplier: 2 },
  { x: 4, y: 15, kind: 'ls', multiplier: 2 },
  { x: 12, y: 15, kind: 'ls', multiplier: 2 },
  { x: 4, y: 8, kind: 'ls', multiplier: 2 },
  { x: 3, y: 7, kind: 'ls', multiplier: 2 },
  { x: 3, y: 9, kind: 'ls', multiplier: 2 },
  { x: 1, y: 4, kind: 'ls', multiplier: 2 },
  { x: 1, y: 12, kind: 'ls', multiplier: 2 },
  { x: 12, y: 8, kind: 'ls', multiplier: 2 },
  { x: 13, y: 7, kind: 'ls', multiplier: 2 },
  { x: 13, y: 9, kind: 'ls', multiplier: 2 },
  { x: 15, y: 4, kind: 'ls', multiplier: 2 },
  { x: 15, y: 12, kind: 'ls', multiplier: 2 },

  // Letter Score x3
  { x: 6, y: 2, kind: 'ls', multiplier: 3 },
  { x: 10, y: 2, kind: 'ls', multiplier: 3 },
  { x: 2, y: 6, kind: 'ls', multiplier: 3 },
  { x: 6, y: 6, kind: 'ls', multiplier: 3 },
  { x: 10, y: 6, kind: 'ls', multiplier: 3 },
  { x: 14, y: 6, kind: 'ls', multiplier: 3 },
  { x: 2, y: 10, kind: 'ls', multiplier: 3 },
  { x: 6, y: 10, kind: 'ls', multiplier: 3 },
  { x: 10, y: 10, kind: 'ls', multiplier: 3 },
  { x: 14, y: 10, kind: 'ls', multiplier: 3 },
  { x: 6, y: 14, kind: 'ls', multiplier: 3 },
  { x: 10, y: 14, kind: 'ls', multiplier: 3 },

  // Word Score x32
  { x: 8, y: 8, kind: 'ws', multiplier: 2 },
  { x: 2, y: 2, kind: 'ws', multiplier: 2 },
  { x: 3, y: 3, kind: 'ws', multiplier: 2 },
  { x: 4, y: 4, kind: 'ws', multiplier: 2 },
  { x: 5, y: 5, kind: 'ws', multiplier: 2 },
  { x: 11, y: 11, kind: 'ws', multiplier: 2 },
  { x: 12, y: 12, kind: 'ws', multiplier: 2 },
  { x: 13, y: 13, kind: 'ws', multiplier: 2 },
  { x: 14, y: 14, kind: 'ws', multiplier: 2 },
  { x: 2, y: 14, kind: 'ws', multiplier: 2 },
  { x: 3, y: 13, kind: 'ws', multiplier: 2 },
  { x: 4, y: 12, kind: 'ws', multiplier: 2 },
  { x: 5, y: 11, kind: 'ws', multiplier: 2 },
  { x: 11, y: 5, kind: 'ws', multiplier: 2 },
  { x: 12, y: 4, kind: 'ws', multiplier: 2 },
  { x: 13, y: 3, kind: 'ws', multiplier: 2 },
  { x: 14, y: 2, kind: 'ws', multiplier: 2 },

  // Word Score x32
  { x: 1, y: 1, kind: 'ws', multiplier: 3 },
  { x: 8, y: 1, kind: 'ws', multiplier: 3 },
  { x: 15, y: 1, kind: 'ws', multiplier: 3 },
  { x: 1, y: 8, kind: 'ws', multiplier: 3 },
  { x: 15, y: 8, kind: 'ws', multiplier: 3 },
  { x: 1, y: 15, kind: 'ws', multiplier: 3 },
  { x: 8, y: 15, kind: 'ws', multiplier: 3 },
  { x: 15, y: 15, kind: 'ws', multiplier: 3 },
];

// Export the one and only Scoring object.
export const scoring = new Scoring();
