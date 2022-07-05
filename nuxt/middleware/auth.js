// middleware/index.js
import Middleware from '../../middleware'
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

Middleware['auth'] = context => {
    const { store, redirect } = context

    // If the user is not authenticated
    if (!store.getters['auth/hasUser']) {
        return redirect(options.middleware.auth.route)
    }
}