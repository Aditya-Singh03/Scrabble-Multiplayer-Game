// A few utility functions to work with local storage.
const saveState = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
const restoreState = (key) => JSON.parse(window.localStorage.getItem(key));
const removeState = (key) => window.localStorage.removeItem(key);
const isSaved = (key) => window.localStorage.getItem(key) !== null;

// An array to remember player names.
const playerNames = [];

// A function to get the player names.
export const getPlayerName = (i) => playerNames[i];

/**
 * Returns a DOM element for displaying the current player's turn.
 *
 * @param {number} playerNumber the player number
 * @returns a DOM element for displaying the current player's turn
 */
const turnLabel = (playerNumber) => {
  const playerName = isSaved(`player-${playerNumber}`)
    ? restoreState(`player-${playerNumber}`)
    : `Player ${playerNumber}`;
  const pElm = document.createElement('p');
  pElm.classList.add('center');
  pElm.innerHTML = `<p>It is <strong>${playerName}</strong>'s turn</p>`;
  return pElm;
};

/**
 * Returns a input text box DOM element.
 *
 * We also create an event listener to update the player's name in the turn
 * label if the user types in a different name.
 *
 * @param {number} playerNumber the player number
 * @param {HTMLDomElement} turnLabel the label for the current player's turn
 * @returns
 */
const playerTextBox = (playerNumber, turnLabel) => {
  const playerName = `Player ${playerNumber}`;
  const inputElm = document.createElement('input');
  inputElm.type = 'text';
  inputElm.value = isSaved(`player-${playerNumber}`)
    ? restoreState(`player-${playerNumber}`)
    : playerName;

  inputElm.addEventListener('keyup', () => {
    const playerName = inputElm.value;
    turnLabel.innerHTML = `<p>It is <strong>${playerName}</strong>'s turn</p>`;
    saveState(`player-${playerNumber}`, playerName);

    // Update the player names array with new player name.
    playerNames[playerNumber - 1] = playerName;
  });

  // Add the player name to the array of player names.
  playerNames[playerNumber - 1] = inputElm.value;

  return inputElm;
};

/**
 * Returns a DOM element representing a player's view. This includes the player
 * text box and rack.
 *
 * @param {HTMLDomElement} playerTextBox the input text box for the player name
 * @param {Rack} rack the rack for the current player
 * @returns an HTML DOM element for the player view
 */
const playerView = (playerTextBox, rack) => {
  const rackViewElm = document.createElement('div');
  rackViewElm.classList.add('rack');
  rack.render(rackViewElm);

  const playerViewElm = document.createElement('div');
  playerViewElm.appendChild(playerTextBox);
  playerViewElm.appendChild(rackViewElm);

  return playerViewElm;
};

/**
 * Returns a DOM element for displaying the view for all players.
 *
 * @param {HTMLDomElement} element the element to render the multiplayer view
 * into
 * @param {Array<Rack>} racks an array of Rack objects
 * @param {number} turn the current turn number
 * @param {boolean} reset determines whether to reset the multiplayer view
 * @returns the multiplayer view
 */
export const multiPlayerView = (element, racks, turn, reset = false) => {
  const playerCount = racks.length;

  // Clear out the element
  element.innerHTML = '';

  // Clear local storage if reset is true
  if (reset) {
    for (let i = 0; i < playerCount; ++i) {
      removeState(`player-${i + 1}`);
    }
  }

  // Create the div that will hold both player views.
  const multiPlayerViewElm = document.createElement('div');

  // Create the turn label. We do this outside of the loop because it needs to
  // be accessed by both player text boxes.
  const turnLabelElm = turnLabel(turn + 1);

  // Add the current player's turn label to the multi player view.
  multiPlayerViewElm.appendChild(turnLabelElm);

  // Create each player text box and player view.
  for (let i = 0; i < playerCount; ++i) {
    const playerTextBoxElm = playerTextBox(i + 1, turnLabelElm);
    const playerViewElm = playerView(playerTextBoxElm, racks[i]);
    // Disable the text box if not current turn.
    playerTextBoxElm.disabled = i !== turn;

    // Add the player view to the multi player view.
    multiPlayerViewElm.appendChild(playerViewElm);
  }

  // Add the multi player view to the element.
  element.appendChild(multiPlayerViewElm);

  return element;
};
