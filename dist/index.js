"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// module.js
const hemend_js_library_1 = require("hemend-js-library");
const { resolve, join } = require('path');
const { readdirSync } = require('fs');
const hemendNuxtModule = function (moduleOptions) {
    const namespace = 'hemend';
    // Compiler flags
    const isProduction = process.env.NODE_ENV === 'production';
    // Build module options
    const options = (0, hemend_js_library_1.extend)({
        namespace,
        component: {
            prefix: 'Hem'
        },
        storage: {
            prefix: namespace,
            driver: 'local',
            ttl: 0
        },
        middleware: {
            auth: {
                route: '/login'
            },
            guest: {
                route: '/'
            },
        },
        api: {
            url: '/',
            /*
             * routes: [{name: 'Operator', url: '/api/operator/1/'}, {name: 'Admin', url: '/api/admin/1/'}]
             *
             * usage get method: this.$hemend.request().getOperator('sections.get');
             * usage get method: this.$hemend.request().getAdmin('sections.get');
             * usage post method: this.$hemend.request().postOperator('sections.get');
             * usage post method: this.$hemend.request().postAdmin('sections.get');
             *
             */
            routes: []
        },
        debug: !isProduction
    }, this.options.hemend || {}, moduleOptions);
    // Resolve config paths
    const cwd = process.cwd();
    const componentsDir = resolve(cwd, 'components');
    const layoutsDir = resolve(cwd, 'layouts');
    const pagesDir = resolve(cwd, 'pages');
    const pluginsDir = resolve(cwd, 'plugins');
    const staticDir = resolve(cwd, 'static');
    const storeDir = resolve(cwd, 'store');
    // add all of the initial plugins
    const pluginsToSync = [
        '../nuxt/components/index.js',
        '../nuxt/store/index.js',
        '../nuxt/plugins/index.js',
        '../nuxt/plugins/mixin.js',
        '../nuxt/plugins/directive.js',
        '../nuxt/plugins/flash-message.js',
        '../nuxt/debug.js',
        '../nuxt/middleware/index.js',
        '../nuxt/middleware/auth.js',
        '../nuxt/middleware/guest.js'
    ];
    for (const pathString of pluginsToSync) {
        this.addPlugin({
            src: resolve(__dirname, pathString),
            fileName: join(namespace, pathString),
            options
        });
    }
    // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
    const foldersToSync = [
        {
            path: '../nuxt/plugins/directives',
            recursive: false
        },
        {
            path: '../nuxt/plugins/helpers',
            recursive: false
        },
        {
            path: '../nuxt/plugins/mixin',
            recursive: false
        },
        {
            path: '../nuxt/store/modules',
            recursive: false
        },
        {
            path: '../nuxt/components/lib',
            recursive: true
        },
        {
            path: '../nuxt/assets',
            recursive: true
        },
    ];
    const addTemplate = (path, pathString, recursive = false) => {
        for (const dirent of readdirSync(path, { withFileTypes: true })) {
            if (dirent.isDirectory()) {
                if (!recursive) {
                    continue;
                }
                const subfolder_path = resolve(path, dirent.name);
                addTemplate(subfolder_path, join(pathString, dirent.name), recursive);
                continue;
            }
            const file_name = dirent.name;
            this.addTemplate({
                src: resolve(path, file_name),
                fileName: join(namespace, pathString, file_name),
                options
            });
        }
    };
    for (const pathObject of foldersToSync) {
        const path = resolve(__dirname, pathObject.path);
        addTemplate(path, pathObject.path, pathObject.recursive);
    }
};
exports.default = hemendNuxtModule;
module.exports.meta = require('../package.json');
