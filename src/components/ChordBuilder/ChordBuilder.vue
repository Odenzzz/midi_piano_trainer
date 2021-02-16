<template>
	<div></div>
</template>

<script>

	export default {
		name: "ChordBuilder",
		mounted(){
			console.log(this.$chords.buildChord('B', 'minor'))
		}
	}
</script>

<style>

</style>