"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("../command"));
const { join, dirname, basename } = require('path');
const { copySync, removeSync, readdirSync } = require('fs-extra');
class Test extends command_1.default {
    constructor() {
        super(...arguments);
        this.command = 'login [force]';
        this.description = 'Create login.vue to nuxt project';
    }
    handler() {
        const templates_dir = join(dirname(dirname(__dirname)), 'templates');
        const project_dir = process.cwd();
        const pages_dir = join(project_dir, 'pages');
        try {
            copySync(join(templates_dir, 'pages', 'login.vue.tmpl'), join(pages_dir, 'login.vue'));
            console.log(this.colors().info('✓ Add file into `pages/login.vue` path.'));
        }
        catch (e) {
            console.log(this.colors().warning('✗ Can\'t copy `pages/login.vue` file.'), "\n  ", this.colors().danger(e));
        }
    }
    options() {
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
exports.default = Test;
