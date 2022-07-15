// plugins/directive.js
import * as directives from './directives'

// get options passed from module.js
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

// create the plugin
export default (app, inject) => {
    // loop through directives and register them
    for (const directive in directives) {
        directives[directive](
            options.directives &&
            options.directives[directive] &&
            typeof options.directives[directive] === 'object' ? options.directives[directive] : {}, app)
    }
}
