import { vueVersionMajor } from '../../plugins/helpers/vue.js'

const components = require('./vue' + vueVersionMajor()).default

export default {
    ...components
}
