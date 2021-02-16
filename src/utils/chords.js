import _ from 'lodash';
import { generateKeysList } from './keysList';

const chordSteps = {
	'major': [0, 4, 7],
	'minor': [0, 3, 7]
}

const ChordsBulder = {
	keysList: generateKeysList(),

	buildChord: function(tonic = 'C', tonal = 'major', notesCount = 3) {
		const note = this.findNoteByName(tonic);
		
		return this.createChord(note, chordSteps[tonal], notesCount);
	},

	createChord: function(note, steps, notesCount) {
		
		const notesList = this.buildChordNotes(note.relativeNumber, steps);
		let tip = '';

		for (let i = 0; i < notesCount; i++) {
			tip += `${ notesList[i][0].noteName[0] } `;
		}
		
		return { 
			notesCount,
			tip: tip.slice(0, -1),
			notesList
		}
	},

	buildChordNotes: function(tonicNumber, steps){
		const result = [];
		steps.forEach(step => {
			result.push(this.findNotesByRelativeNumber(tonicNumber + step > 12 ? (tonicNumber + step - 12) : tonicNumber + step));
		});
		return result;
	},

	findNoteByName: function(name) {
		return _.find(this.keysList, notes => _.findIndex(notes.noteName, n => n == name) > -1);
	},

	findNotesByRelativeNumber: function(relativeNumber){
		return _.filter(this.keysList, ['relativeNumber', relativeNumber]);
	}
};

export default ChordsBulder;