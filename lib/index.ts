// module.js
import { extend } from 'hemend-js-library'

const { resolve, join } = require('path')
const { readdirSync } = require('fs')

const hemendNuxtModule = function (this: any, moduleOptions: any) {
  const namespace = 'hemend'

  // Compiler flags
  const isProduction = process.env.NODE_ENV === 'production'

  // Build module options
  const options = extend(
    {
      namespace,
      storage: {
        prefix: namespace,
        driver: 'local',
        ttl: 0
      },
      debug: !isProduction
    },
    this.options.hemend || {},
    moduleOptions
  )

  // Resolve config paths
  const cwd = process.cwd()
  const componentsDir = resolve(cwd, 'components')
  const layoutsDir = resolve(cwd, 'layouts')
  const pagesDir = resolve(cwd, 'pages')
  const pluginsDir = resolve(cwd, 'plugins')
  const staticDir = resolve(cwd, 'static')
  const storeDir = resolve(cwd, 'store')

  // add all of the initial plugins
  const pluginsToSync = [
    '../nuxt/components/index.js',
    '../nuxt/store/index.js',
    '../nuxt/plugins/index.js',
    '../nuxt/plugins/mixin.js',
    '../nuxt/debug.js',
    '../nuxt/middleware/index.js'
  ]

  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options
    })
  }

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = [
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
    }
  ]

  const addTemplate = (path: string, pathString: string, recursive: boolean=false) => {
    for (const dirent of readdirSync(path, { withFileTypes: true })) {
      if (dirent.isDirectory()) {
        if(!recursive) {
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
      })
    }
  }
  
  for (const pathObject of foldersToSync) {
    const path = resolve(__dirname, pathObject.path)
    addTemplate(path, pathObject.path, pathObject.recursive);
  }
}

export default hemendNuxtModule

module.exports.meta = require('../package.json')