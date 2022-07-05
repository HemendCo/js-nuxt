// plugins/index.js
import * as helpers from './helpers/index.js'
// get the options out using lodash templates
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
// extract the namespace from the options
const { namespace, storage } = options
// create the plugin
export default (app, inject) => {
  // inject an object of functions into the app
  inject(namespace, {
    request() {
      return helpers.request(options, app)
    },
    storage() {
      return helpers.storage(storage)
    },
    storageBridge() {
      return helpers.storageBridge;
    },
    vueVersion() {
      return helpers.vueVersion()
    },
    vueVersionMajor() {
      return helpers.vueVersionMajor()
    }
  })
}
