const noteList = [['C'], ['C#', 'Db'], ['D'], ['D#', 'Eb'], ['E'], ['F'], ['F#', 'Gb'], ['G'], ['G#', 'Ab'], ['A'], ['A#', 'Bb'], ['B']];
const octaveNames = ['Субконтроктава', 'Контроктава', 'Большая октава', 'Малая октава', 'Первая октава', 'Вторая октава', 'Третья октава', 'Четвёртая октава', 'Пятая октава'];

function generateKeysList(offset = 1, numberOfKeys = 88){
	const keysList = [];

	for (let i = 0; i < numberOfKeys; i++) {
		const number = i + offset;
		const relativeNumber = number - (Math.floor(number / 12)) * 12 + 1;
		const octave = Math.floor(number / 12) - 1;
		keysList[i] = {
			id: i,
			number: number,
			relativeNumber: relativeNumber,
			isBlack: keyIsBlack(relativeNumber),
			noteName: noteList[relativeNumber - 1],
			octaveName: octaveNames[octave]
		};
	}

	return keysList;
}

function keyIsBlack(rnn){
	if (rnn === 2 || rnn === 4 || rnn === 7 || rnn === 9 || rnn === 11) return true;
	return false;
}



export { generateKeysList, noteList, octaveNames };