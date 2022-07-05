// plugins/helpers/vue.js

import Vue from 'vue'

export const vueVersion = () => {
  return Vue.version;
}

export const vueVersionMajor = () => {
  return Vue.version[0];
}
