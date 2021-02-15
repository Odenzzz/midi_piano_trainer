<template>
	<Sheet />
	<PianoKeyboard />
</template>

<script>

import PianoKeyboard from './components/PianoKeyboard/Keyboard';
import Sheet from './components/Sheet/Sheet';

export default {
	name: 'App',
	components: {
		PianoKeyboard,
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
