import _ from 'lodash';
import { generateKeysList } from './keysList';

const chords = {
	'major': {
		steps: [0, 4, 7],
		buildingTip: 'A major chord consists of a root note (1st), a major third (+4 semitones), and a perfect 5th (+7 semitones).',
	},
	'minor': {
		steps: [0, 3, 7],
		buildingTip: 'A minor chord consists of a root note (1st), a minor third (+3 semitones), and a perfect 5th (+7 semitones).',
	},
	'diminished': {
		steps: [0, 3, 6],
		buildingTip: 'A diminished chord consists of a root note (1st), a minor third (+3 semitones), and a diminished/flat fifth (+6 semitones).',
	},
	'maj7': {
		steps: [0, 4, 7, 11],
		buildingTip: 'A major seventh chord consists of a root note (1st), a major third (+4 semitones), a perfect 5th (+7 semitones), and a major 7th (+11 semitones). Another way to think about major seventh chords is they are a major triad (i.e. major chord) with a major 7th on top.',
	},
	'min7': {
		steps: [0, 3, 7, 10],
		buildingTip: 'A minor seventh chord consists of a root note (1st), a minor third (+3 semitones), a perfect 5th (+7 semitones), and a minor 7th (+10 semitones). Another way to think about minor seventh chords is they are a minor triad with a minor 7th on top.',
	},
	'dom7': {
		steps: [0, 4, 7, 10],
		buildingTip: 'A dominant seventh chord consists of a root note (1st), a major third (+4 semitones), a perfect 5th (+7 semitones), and a minor 7th (+10 semitones). Another way to think about major seventh chords is they are a major seventh chord with the top note lowered by one semitone.',
	},
	'sus2': {
		steps: [0, 2, 7],
		buildingTip: 'A sus2 chord consists of a root note (1st), a major second (+2 semitones), and a perfect fifth (+7 semitones). Another way to think about them is they are major chords with a major second instead of a major third.',
	},
	'sus4': {
		steps: [0, 5, 7],
		buildingTip: 'A sus4 chord consists of a root note (1st), a major fourth (+5 semitones), and a perfect fifth (+7 semitones). Another way to think about them is they are major chords with a perfect fourth instead of a major third.',
	},
	'aug': {
		steps: [0, 4, 8],
		buildingTip: 'An augmented chord consists of a root note (1st), a major third (+4 semitones), and an augmented 5th (+8 semitones). Another way to think about augmented chords is they are a major chord with the top note raised one semitone.',
	},
	'dom9': {
		steps: [0, 4, 7, 10, 14],
		buildingTip: 'The dominant ninth nine chord consists of a root, major 3rd (+4 semitones), perfect 5th (+ 7 semitones), minor/flat 7th (+10 semitones), and major 9th (+14 semitones).',
	},
	'maj11': {
		steps: [0, 4, 7, 11, 14],
		buildingTip: 'A major eleventh chord consists of a root note (1st), a major third (+4 semitones), a perfect 5th (+7 semitones), a major 7th (+11 semitones), a major 9th (+14 semitones), and an 11th (+17 semitones).',
	}
}

const ChordsBulder = {
	keysList: generateKeysList(),

	buildChord: function(tonic = 'C', type = 'major', notesCount = 3) {
		const note = this.findNoteByName(tonic);
		
		return this.createChord(note, chords[type].steps, notesCount);
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