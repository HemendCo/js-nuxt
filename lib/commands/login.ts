import Command, { Options, Arguments } from '../command';
const { join, dirname, basename } = require('path')
const { copySync, removeSync, readdirSync } = require('fs-extra')

export default class Test extends Command {
  command = 'login [force]';
  description = 'Create login.vue to nuxt project';

  handler() {
    const templates_dir = join(dirname(dirname(__dirname)), 'templates')
    const project_dir = process.cwd()
    const pages_dir = join(project_dir, 'pages');

    try {
      copySync(join(templates_dir,'pages', 'login.vue.tmpl'), join(pages_dir, 'login.vue'))
      console.log(this.colors().info('✓ Add file into `pages/login.vue` path.'));
    } catch(e: any) {
      console.log(this.colors().warning('✗ Can\'t copy `pages/login.vue` file.'), "\n  ", this.colors().danger(e));
    }

  }

  options(): Options {
    return [
      {
        name: 'force',
        alias: 'f',
        default: false,
        describe: 'Force is optional',
        type: 'boolean',
        // conflicts: 'username'
      }
    ];
  }
}