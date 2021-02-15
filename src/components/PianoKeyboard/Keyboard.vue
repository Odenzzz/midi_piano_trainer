<template>
	<div class="keyboard-table">
		<div class="keyboard">
			<div class="keyboard__top"></div>
			<div class="keyboard__keys">
				<button class="keyboard__key" 
					v-for="key in keysList" :key="key.id"
					:class="[key.isBlack && 'keyboard__key--black', keyIsActive(key.number) && 'keyboard__key--active']"
				>
					<!-- <span class="keyboard__key-label">{{ key.relativeNumber }}</span> -->
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { generateKeysList } from '../../utils/keysList.js';

	export default {
		name: 'Keyboard',
		data() {
			return {
				keysNumber: 88,
				keysList: [],
				activeKeys: []
			}
		},
		mounted(){
			this.keysList = generateKeysList(20);
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
		},
		methods: {
			keyIsActive(keyNumber) {
				return this.activeKeys.indexOf(keyNumber) > -1;
			}
		}
	}
</script>

<style lang="scss">
	.keyboard-table{
		background: rgb(133, 133, 133);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.keyboard{
		background: #535353;
		padding: 15px;
		&__top{
			height: 60px;
		}
		&__keys{
			display: flex;
			align-items: flex-start;
			justify-content: center;
			color: #fff;
		}
		&__key{
			background: #fffef9;
			height: 200px;
			width: 20px;
			padding: 0;
			margin: 0 2.2px;
			border: none;
			position: relative;
			z-index: 1;
			position: relative;
			&:after{
				content: "";
				position: absolute;
				height: 100%;
				width: 100%;
				top: 0;
				left: 0;
				background: transparent;
				transition: .2s ease;
			}
			&--active:after{
				background: rgba(252, 66, 91, 0.5);
			}
			&--black{
				background: #101010;
				height: 150px;
				width: 14px;
				margin: 0 -7px;
				z-index: 2;
				color: #fff;
			}
		}
		&__key-label{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			text-align: center;
		}
	}
</style>