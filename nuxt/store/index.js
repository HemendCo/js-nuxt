// store/index.js
import hemend from './modules/hemend'
import auth from './modules/auth'
// get the options out using lodash templates
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
// extract the namespace var
const { namespace } = options
// create the plugin
export default ({ store }, inject) => {
  store.registerModule(namespace, hemend(options), {
    preserveState: store.hasModule(namespace) // if the store module already exists, preserve it
  })
  store.registerModule('auth', auth(options), {
    preserveState: store.hasModule('auth') // if the store module already exists, preserve it
  })
}
