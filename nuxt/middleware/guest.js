// middleware/index.js
import Middleware from '../../middleware'
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

Middleware['guest'] = context => {
    const { store, redirect } = context

    // If the user is authenticated
    if (store.getters['auth/hasUser']) {
        return redirect(options.middleware.guest.route)
    }
}