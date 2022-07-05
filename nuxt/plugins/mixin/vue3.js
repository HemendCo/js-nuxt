import Vue from 'vue'

// get the options out using lodash templates
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
// extract the namespace from the options
const { namespace } = options

if (!Vue[namespace]) {
    Vue.namespace = true

    Vue.mixin({
        methods: {}
    })
}