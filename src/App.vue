<template>
	<Sheet />
	
	<ChordBuilder />
	<PianoKeyboard />
</template>

<script>

import PianoKeyboard from './components/PianoKeyboard/Keyboard';
import Sheet from './components/Sheet/Sheet';
import ChordBuilder from './components/ChordBuilder/ChordBuilder';

export default {
	name: 'App',
	components: {
		PianoKeyboard,
		ChordBuilder,
		Sheet
	},
	methods: {

	}
}
</script>

<style lang="scss">
	body{
		margin: 0;
		padding: 0;
	}
	*{
		box-sizing: border-box;
	}
</style>
