import ClassEvents from './ClassEvents.js';

const noteList = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const octaveNames = ['Субконтроктава', 'Контроктава', 'Большая октава', 'Малая октава', 'Первая октава', 'Вторая октава', 'Третья октава', 'Четвёртая октава', 'Пятая октава'];


class Midi extends ClassEvents {
	
	constructor() {
		super();
		this.init();
	}

	init = async () => {
		const midi = await navigator.requestMIDIAccess();
		this.onMIDISuccess(midi);
	}

	onMIDISuccess = (midiAccess) =>{
		for (var input of midiAccess.inputs.values()) {
			input.onmidimessage = this.getMIDIMessage;
		}
	}
	
	getMIDIMessage = (message) => {
		var command = message.data[0];
		var noteNumber = message.data[1];
		var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

		if (command === 144) {
			this.sendNotePlayed(noteNumber, velocity, velocity > 0);
		}else if (command === 128){
			this.sendNotePlayed(noteNumber, velocity, false);
		}
	}

	sendNotePlayed = (noteNumber, velocity, press) => {

		this.trigger('noteplayed', { note: this.calculateOctave(noteNumber), velocity, press });
	}

	calculateOctave = (noteNumber) => {
		
		const octave = Math.floor(noteNumber / 12) - 1;
		const relativeNoteNumber = noteNumber - (octave + 1) * 12;

		return {
			octaveNumber: octave,
			octaveName: octaveNames[octave],
			noteNumber: noteNumber,
			noteRelativeNumber: relativeNoteNumber + 1,
			noteName: noteList[relativeNoteNumber]
		};
	}

	
}

export { Midi };