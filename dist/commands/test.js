"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("../command"));
class Test extends command_1.default {
    constructor() {
        super(...arguments);
        this.aliases = ['run', 'up'];
        this.command = 'balal <name> [force]';
        this.description = 'Set a config variable';
    }
    handler() {
        console.log('99999999', this.argv, process.argv);
    }
    arguments() {
        return [
            {
                name: 'name',
                describe: 'name is required',
                type: 'string'
                // conflicts: 'email',
            }
        ];
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
