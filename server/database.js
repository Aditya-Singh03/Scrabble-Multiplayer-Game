import { readFile, writeFile } from 'fs/promises';

/** A class representing a database to store scores */
class Database {
  constructor() {
    this.path = 'scores.json';
  }

  /**
   * Saves a word score to the database.
   *
   * This method reads the database file as an object, adds the new score to the
   * data, and then writes the data back to the database file.
   *
   * @param {string} name the name of the player
   * @param {string} word the word played
   * @param {number} score the score of the word
   */
  async saveWordScore(name, word, score) {
    const data = await this._read();
    data.word.push({ name, word, score });
    await this._write(data);
  }

  /**
   * Saves a game score to the database.
   *
   * This method reads the database file as an object, adds the new score to the
   * data, and then writes the data back to the database file.
   *
   * @param {string} name the name of the player
   * @param {number} score the score of the game
   */
  async saveGameScore(name, score) {
    const data = await this._read();
    data.game.push({ name, score });
    await this._write(data);
  }

  /**
   * Returns the top 10 word scores.
   *
   * This method reads the database file as an object, sorts the word scores by
   * word score, and returns the top 10.
   *
   * @returns [{name: string, word: string, score: number}] returns the top 10
   * scores
   */
  async top10WordScores() {
    const data = await this._read();
    const sorted = data.word.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 10);
    return top;
  }

  /**
   * Returns the top 10 game scores.
   *
   * This method reads the database file as an object, sorts the game scores by
   * game score, and returns the top 10.
   *
   * @returns [{name: string, score: number}] returns the top 10 game scores
   */
  async top10GameScores() {
    const data = await this._read();
    const sorted = data.game.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 10);
    return top;
  }

  async _read() {
    try {
      const data = await readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { word: [], game: [] };
    }
  }

  // This is a private methods. The # prefix means that they are private.
  async _write(data) {
    await writeFile(this.path, JSON.stringify(data), 'utf8');
  }
}

const database = new Database();

export { database };
