import "../assets/css/style.scss";

import Vue from 'vue';
import VueFlashMessage from '@smartweb/vue-flash-message';

Vue.use(VueFlashMessage, {
    time: 8000,
    strategy: 'multiple'
});