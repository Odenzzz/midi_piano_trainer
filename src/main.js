window._ = require('lodash');

import { createApp } from 'vue';
import App from './App.vue';
import { Midi } from './utils/midi';
import { ChordsBulder } from './utils/chords';

const app = createApp(App);

app.config.globalProperties.$midi = new Midi();
app.config.globalProperties.$chords = ChordsBulder;

app.mount('#app');
