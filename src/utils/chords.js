import _ from 'lodash';
import { generateKeysList } from './keysList';

const chords = {
	'major': {
		name: 'major',
		steps: [0, 4, 7],
		buildingTip: 'A major chord consists of a root note (1st), a major third (+4 semitones), and a perfect 5th (+7 semitones).',
		chordDiff: 1,
	},
	'minor': {
		name: 'minor',
		steps: [0, 3, 7],
		buildingTip: 'A minor chord consists of a root note (1st), a minor third (+3 semitones), and a perfect 5th (+7 semitones).',
		chordDiff: 1,
	},
	'diminished': {
		name: 'diminished',
		steps: [0, 3, 6],
		buildingTip: 'A diminished chord consists of a root note (1st), a minor third (+3 semitones), and a diminished/flat fifth (+6 semitones).',
		chordDiff: 1,
	},
	'maj7': {
		name: 'maj7',
		steps: [0, 4, 7, 11],
		buildingTip: 'A major seventh chord consists of a root note (1st), a major third (+4 semitones), a perfect 5th (+7 semitones), and a major 7th (+11 semitones). Another way to think about major seventh chords is they are a major triad (i.e. major chord) with a major 7th on top.',
		chordDiff: 2,
	},
	'min7': {
		name: 'min7',
		steps: [0, 3, 7, 10],
		buildingTip: 'A minor seventh chord consists of a root note (1st), a minor third (+3 semitones), a perfect 5th (+7 semitones), and a minor 7th (+10 semitones). Another way to think about minor seventh chords is they are a minor triad with a minor 7th on top.',
		chordDiff: 2,
	},
	'dom7': {
		name: 'dom7',
		steps: [0, 4, 7, 10],
		buildingTip: 'A dominant seventh chord consists of a root note (1st), a major third (+4 semitones), a perfect 5th (+7 semitones), and a minor 7th (+10 semitones). Another way to think about major seventh chords is they are a major seventh chord with the top note lowered by one semitone.',
		chordDiff: 2,
	},
	'sus2': {
		name: 'sus2',
		steps: [0, 2, 7],
		buildingTip: 'A sus2 chord consists of a root note (1st), a major second (+2 semitones), and a perfect fifth (+7 semitones). Another way to think about them is they are major chords with a major second instead of a major third.',
		chordDiff: 2,
	},
	'sus4': {
		name: 'sus4',
		steps: [0, 5, 7],
		buildingTip: 'A sus4 chord consists of a root note (1st), a major fourth (+5 semitones), and a perfect fifth (+7 semitones). Another way to think about them is they are major chords with a perfect fourth instead of a major third.',
		chordDiff: 2,
	},
	'aug': {
		name: 'aug',
		steps: [0, 4, 8],
		buildingTip: 'An augmented chord consists of a root note (1st), a major third (+4 semitones), and an augmented 5th (+8 semitones). Another way to think about augmented chords is they are a major chord with the top note raised one semitone.',
		chordDiff: 2,
	},
	'dom9': {
		name: 'dom9',
		steps: [0, 4, 7, 10, 14],
		buildingTip: 'The dominant ninth nine chord consists of a root, major 3rd (+4 semitones), perfect 5th (+ 7 semitones), minor/flat 7th (+10 semitones), and major 9th (+14 semitones).',
		chordDiff: 3,
	},
	'maj11': {
		name: 'maj11',
		steps: [0, 4, 7, 11, 14],
		buildingTip: 'A major eleventh chord consists of a root note (1st), a major third (+4 semitones), a perfect 5th (+7 semitones), a major 7th (+11 semitones), a major 9th (+14 semitones), and an 11th (+17 semitones).',
		chordDiff: 3,
	}
}

const ChordsBulder = {
	__keysList: generateKeysList(),

	createChord: function(tonic = 'C', type = 'major') {
		const note = this.__findNoteByName(tonic);
		
		return {
			notes: this.__buildChord(note, tonic, chords[type].steps),
			name: `${tonic}${type}`,
			buildingTip: chords[type].buildingTip,
			difficulty: chords[type].chordDiff
		};
	},

	__buildChord: function(note, tonic, steps) {
		
		const notesList = this.__buildChordNotes(note.relativeNumber, steps);
		let tip = '';

		for (let i = 0; i < notesList.length; i++) {
			tip += i == 0 ? `${tonic} ` : `${ notesList[i][0].noteName[0] } `;
		}

		return { 
			notesCount: notesList.length,
			tip: tip.slice(0, -1),
			notesList
		}
	},

	__buildChordNotes: function(tonicNumber, steps){
		const result = [];
		steps.forEach(step => {
			const relNumber = tonicNumber + step > 12 ? (tonicNumber + step - 12) : tonicNumber + step;
			result.push(this.__findNotesByRelativeNumber(relNumber > 12 ? relNumber - 12 : relNumber));
		});
		return result;
	},

	__findNoteByName: function(name) {
		return _.find(this.__keysList, notes => _.findIndex(notes.noteName, n => n == name) > -1);
	},

	__findNotesByRelativeNumber: function(relativeNumber){
		return _.filter(this.__keysList, ['relativeNumber', relativeNumber]);
	}
};

export { ChordsBulder, chords };