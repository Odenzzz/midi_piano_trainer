<template>
	<div class="sheet-container">
		<div class="sheet">
			<div class="sheet__line"></div>
			<div class="sheet__line">
				<img v-if="type == 'bass'" src="./images/bass-clef.svg" alt="Bass clef" class="sheet__key sheet__key--bass">
			</div>
			<div class="sheet__line"></div>
			<div class="sheet__line">
				<img v-if="type == 'treble'" src="./images/treble-clef.svg" alt="Treble clef" class="sheet__key sheet__key--treble">
			</div>
			<div class="sheet__line"></div>
			<div class="sheet__notes" :class="[`sheet__notes--${type}`]">
				<Note v-for="(noteNumber, index) in notes" :key="index" :noteNumber="noteNumber" :type="type" :keysList="keysList" />
			</div>
		</div>
	</div>
</template>

<script>
	import Note from './Note';
	import { generateKeysList } from '../../utils/keysList.js';

	export default {
		name: "SheetPart",
		components: {
			Note
		},
		props: ['type', 'notes'],
		data(){
			return {
				keysList: []
			}
		},
		created(){
			this.keysList = generateKeysList(1, 120);
		}
	}
</script>

<style lang="scss">
	.sheet-container{
		margin: 0 auto;
		max-width: 500px;
	}
	.sheet {
		position: relative;
		margin: 42px 0;
		&__line{
			position: relative;
			border-bottom: 2px solid rgb(114, 114, 114);
			margin: 20px 0;
		}
		&__key{
			position: absolute;
			bottom: -30px;
			z-index: 2;
			&--treble {
				width: 80px;
				left: 30px;
			}
			&--bass {
				width: 50px;
				left: 45px;
			}
		}
		&__notes{
			position: absolute;
			left: 150px;
			width: 100px;
			height: 100%;
			bottom: 0;
		}
	}
</style>