window._ = require('lodash');

import { createApp } from 'vue';
import App from './App.vue';
import { Midi } from './utils/midi';

const app = createApp(App);

app.config.globalProperties.$midi = new Midi();

app.mount('#app');
