<template>
	<div class="sheet-wrapper">
		<SheetPart :type="'treble'" v-bind:notes="activeKeys" />
		<SheetPart :type="'bass'" />
	</div>
</template>

<script>
	import SheetPart from './SheetPart';

	export default {
		name: 'sheet',
		components: {
			SheetPart
		},
		data(){
			return {
				activeKeys: []
			}
		},
		mounted(){
			this.$midi.on('noteplayed', e => {
				if (e.press) {
					this.activeKeys.push(e.note.noteNumber);
				} else {
					const index = this.activeKeys.indexOf(e.note.noteNumber);
					if (index > -1) {
						this.activeKeys.splice(index, 1);
					}
				}
			});
		}
	}
</script>

<style lang="scss">
	.sheet-wrapper{
		margin: 150px 0;
	}

</style>