<template>
	<div class="note" :class="[`note--${lineType}`]" :style="`left: ${left}px; top: ${top}px`"></div>
</template>

<script>
	import _ from 'lodash';

	export default {
		name: 'Note',
		props: ['noteNumber', 'type', 'keysList'],
		data() {
			return {
				noteInfo: {
					noteDiff: 0,
					noteIsBlack: false
				},
				startNote: this.type == 'treble' ? 77 : 53
			}
		},
		computed: {
			left: function() {
				return 0;
			},
			top: function() {
				const startPosition = this.type == 'treble' ? -9 : 53;
				const noteDiff = this.calculateNoteInfo();
				const offset = startPosition + noteDiff * 11;
				return offset;
			},
			lineType: function() {
				const noteDiff = this.calculateNoteInfo();
				if (this.type == 'treble'){
					if (noteDiff % 2 == 0) return 'centerline';
					if ((this.noteNumber > this.startNote) || this.noteNumber === 59) return 'underline'; else return 'upperline';
				}
				return 'centerline'; // underline, upperline, centerline
			}
		},
		methods: {
			calculateNoteInfo(){
				let diff = 0;
				const startNoteIndex = _.findIndex(this.keysList, ['number', this.startNote]);
				const noteIndex = _.findIndex(this.keysList, ['number', this.noteNumber]);
				const start = startNoteIndex < noteIndex ? startNoteIndex : noteIndex;
				const end = startNoteIndex < noteIndex ? noteIndex : startNoteIndex;

				this.noteInfo.noteIsBlack = this.keysList[noteIndex].isBlack;

				for (let i = start; i < end; i++){
					diff += this.keysList[i].isBlack ? 0 : 1;
				}

				if (this.startNote < this.noteNumber) return 0 - diff;
				return diff;
			}
		}
	}
</script>

<style lang="scss">
	.note{
		width: 26px;
		height: 20px;
		border: 4px solid #494949;
		border-radius: 100%;
		position: absolute;
		top: 22px;
		&:after{
			content: "";
			width: 40px;
			height: 2px;
			background: #727272;
			position: absolute;
			left: calc(50% - 20px);
		}
		&--underline::after{
			bottom: -6px;
		}
		&--upperline::after{
			top: -6px;
		}
		&--centerline::after{
			top: calc(50% - 1px);
		}
		&--noline::after{
			display: none;
		}
	}	
</style>