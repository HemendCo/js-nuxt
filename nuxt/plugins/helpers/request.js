
export default class Request {
    /**
     * @param {import("axios").AxiosStatic} axios
     * @param {import('../store/index')} store
     * @param {console.error} nuxtError
     */
    constructor (options, app) {
        this.axios = app.axios
        this.store = app.store
        this.error = app.nuxtError || console.error
        this.$plugin = app['$' + options.namespace]
    }

    /**
     * @param {string} method
     * @param {Object|null} data
     * @returns {Promise}
     */
    get (method, data) {
        return this.send(method, data, 'get');
    }

    /**
     * @param {string} method
     * @param {Object|null} data
     * @returns {Promise}
     */
    post (method, data) {
        return this.send(method, data, 'post');
    }

    /**
     * @param {string} method
     * @param {Object|null} data
     * @param {string|null} type
     * @returns {Promise}
     */
    send (method, data, type) {
        type = type || 'post';

        if(!['get', 'post'].includes(type)) {
            return Promise.reject('$axios type is not valid')
        }

        let token = this.store.getters['auth/hasToken'] ? this.store.getters['auth/getToken'].access_token : null;

        if(token) {
            this.axios.setToken(token, 'Bearer')
        }

        let req;
        if(type === 'post') {
            req = this.axios.post;
        } else {
            req = this.axios.get;
        }

        const fetchData = function(resolve, reject) {
            req(method, data).then(function(response) {
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
}