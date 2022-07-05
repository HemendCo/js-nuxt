// middleware/index.js
import Middleware from '../../middleware'
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const { namespace } = options

Middleware[namespace] = context => {
  const { route, store, app } = context
  
  console.log('Hemend middleware route', route.path)
  console.log('Hemend middleware hemend store', store.state[namespace])
  console.log('Hemend middleware auth store', store.state['auth'])
  console.log('Hemend middleware options', app[`$${namespace}`])
}