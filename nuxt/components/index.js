import Vue from 'vue'
import components from './lib'

// get options passed from module.js
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

// loop through components and register them
for (const cName in components) {
  const name = options.component.prefix + cName.ucfirst();

  Vue.component(name, {
    // extend the original component
    extends: components[cName],
    // add a plugin options prop to gain access to the options in the component
    props: {
      options: {
        type: Object,
        default: () => ({ ...options })
      }
    }
  })
}
