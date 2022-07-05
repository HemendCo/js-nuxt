// store/index.js
import hemend from './modules/hemend'
import auth from './modules/auth'
// get the options out using lodash templates
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
// extract the namespace var
const { namespace } = options
// create the plugin
export default (app, inject) => {
  app.store.registerModule(namespace, hemend(options, app), {
    preserveState: app.store.hasModule(namespace) // if the store module already exists, preserve it
  })
  app.store.registerModule('auth', auth(options, app), {
    preserveState: app.store.hasModule('auth') // if the store module already exists, preserve it
  })
}
