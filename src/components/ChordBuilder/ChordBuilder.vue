<template>
	<div></div>
</template>

<script>
	import { noteList } from '../../utils/keysList';
	import { chords } from '../../utils/chords';
	import _ from 'lodash';

	export default {
		name: "ChordBuilder",
		data(){
			return {
				difficulty: 2
			}
		},
		mounted(){
			
			console.log(this.startRandomChord());
		},
		methods: {
			pickRandomNote(){
				const notes = noteList[_.random(0, noteList.length - 1)];
				return notes[_.random(0, notes.length - 1)];
			},
			pickRandomChordType(){
				const filteredChords = _.filter(chords, chord => chord.chordDiff <= this.difficulty);
				return filteredChords[_.random(0, filteredChords.length - 1)].name;
			},
			startRandomChord(){
				const note = this.pickRandomNote();
				const chordType = this.pickRandomChordType();
				return this.$chords.createChord(note, chordType);
			}
		}
	}
</script>

<style>

</style>