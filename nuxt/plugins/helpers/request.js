// plugins/helpers/request.js

import { capitalizeFirstLetter } from 'hemend-js-library'

const REQUEST_METHODS = ['get', 'post'];

class RequestClass {
    /**
     * @param options
     * @param app
     */
    constructor (options, app) {
        this.opt = options.api
        this.axios = app.$axios
        this.store = app.store
        this.error = app.error || console.error || app.nuxtError
        this.$plugin = app['$' + options.namespace]
    }

    /**
     * @param {string} method
     * @param {Object|null} data
     * @returns {Promise}
     */
    get (method, data, route) {
        return this.send(method, data, 'get', route);
    }

    /**
     * @param {string} method
     * @param {Object|null} data
     * @returns {Promise}
     */
    post (method, data, route) {
        return this.send(method, data, 'post', route);
    }

    /**
     * @param {string} method
     * @param {Object|undefined} data
     * @param {string|undefined} type
     * @param {Object|undefined} route
     * @returns {Promise}
     */
    send (method, data, type, route) {
        type = type || 'post';

        if(!REQUEST_METHODS.includes(type)) {
            return Promise.reject('$axios type is not valid')
        }

        const token = this.store.getters['auth/hasToken'] ? this.store.getters['auth/getToken'].access_token : null;

        if(token) {
            this.axios.setToken(token, 'Bearer')
        }

        const url = this.generateUrl(!!route ? route.url : this.opt.url, method);
        const req = type === 'post' ? this.axios.post : this.axios.get;

        const fetchData = function(resolve, reject) {
            req(url, data).then(function(response) {
                if(response.data.status_code === 'OK') {
                    resolve(response.data);
                } else {
                    reject(response.data);
                }
            }).catch(function(e) {
                reject(e);
            });
        }

        return new Promise(fetchData);
    }

    generateUrl(path, method) {
        return path.replace(/\/*$/gm, '') + '/' + method;
    }
}

export const request = (options, app) => {
    const req = new RequestClass(options, app);
    const routes = options.api?.routes;

    for(const i in routes) {
        const route = routes[i];
        for(const j in REQUEST_METHODS) {
            const m = REQUEST_METHODS[j];
            Object.defineProperty(req, m + capitalizeFirstLetter(route.name), {
                get: () => (method, data) => {
                    return req[m](method, data, route);
                }
            });
        }
    }

    return req;
}