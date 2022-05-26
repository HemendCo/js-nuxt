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
        this.cmd = 'balal <key> [value]';
        this.description = 'Set a config variable';
    }
    handler(args) {
        console.log('99999999', args);
    }
    options() {
        return [
            {
                name: 'key',
                describe: 'Key is required',
                // conflicts: 'email',
            },
            {
                name: 'value',
                describe: 'Value is required',
                // conflicts: 'username'
            }
        ];
    }
}
exports.default = Test;
