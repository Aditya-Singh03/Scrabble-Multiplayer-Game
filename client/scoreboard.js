class WordScoreBoard {
	constructor() {
		this.words = [];
	}

	// TODO #8: Save the word score to the server
	async saveWordScore(name, word, score) {
		const obj = { name, word, score }
		this.words.push(obj);

		await fetch('/wordScore', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		}).then(res => {
			if (res.ok) console.log('Word score saved successfully');
			else console.error("Couldn't save word score");
		}).catch(err => {
			console.error('Some error occured in client/saveWordScore function', err);
		});
	}

	render(element) {
		let html = '<h1>Word Scores</h1>';
		html += '<table>';
		this.words.forEach((word) => {
			html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
		});
		html += '</table>';
		element.innerHTML = html;
	}
}

class GameScoreBoard {
	constructor() {
		this.game = [];
	}

	render(element) {
		let html = '<h1>Game Score</h1>';
		html += '<table>';
		this.game.forEach((word) => {
			html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
		});
		html += '</table>';
		element.innerHTML = html;
	}

	// TODO #9: Save the game score to the server
	async saveGameScore(name, score) { 
		const obj = { name, score }
		this.game.push(obj);

		await fetch('/gameScore', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		}).then(res => {
			if (res.ok) console.log('Game score saved successfully');
			else console.error("Couldn't save game score");
		}).catch(err => {
			console.error('Some error occured in client/saveGameScore function', err);
		});
	}
}

class TopWordAndGameScoreBoard {
	// TODO #10: Render the top word and game scores
	async render(element) {
		let html = '<h1>Top Word Scores</h1>';
		html += '<table>';
		let response = await fetch('/highestWordScores', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		}).catch(err => {
			console.error('Some error occured in client/render function', err);
		});
		let data = await response.json();
		data.forEach((word) => {
			html += `
				<tr>
					<td>${word.word}</td>
					<td>${word.name}</td>
					<td>${word.score}</td>
				</tr>
			`;
		});

		html += '</table>';
		html += '<h1>Top Game Scores</h1>';
		html += '<table>';
		let gameRespone = await fetch('/highestGameScores', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch(err => {
			console.error('Some error occured in client/render function', err);
		});

		let gameData = await gameRespone.json();
			gameData.forEach((game) => {
				html += `
					<tr>
						<td>${game.name}</td>
						<td>${game.score}</td>
					</tr>
				`;
				console.log(game);
			});
		html += '</table>';
		element.innerHTML = html;
	}
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
