import Vue from 'vue'

const vue_major_ver = Vue.version[0];
const compatible_components = require('./vue_' + vue_major_ver).default

export default {
    ...compatible_components
}
