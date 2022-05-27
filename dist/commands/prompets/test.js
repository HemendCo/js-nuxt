"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompet_1 = __importDefault(require("../../prompet"));
class Test extends prompet_1.default {
    static title() {
        return 'Balal';
    }
    handler() {
        const { Form } = require('enquirer');
        const prompt = new Form({
            name: 'user',
            message: 'Please provide the following information:',
            choices: [
                { name: 'firstname', message: 'First Name' },
                { name: 'lastname', message: 'Last Name' },
                { name: 'username', message: 'GitHub username', initial: 'jonschlinkert' }
            ]
        });
        prompt.run()
            .then((value) => {
            console.log('Answer:', value);
            this.call(['balal', 'a', 'b', 'cc']);
            this.call(['balal', 'a', 'b', 'cc']);
            this.call(['balal', 'a', 'b', 'cc']);
        })
            .catch(console.error);
    }
}
exports.default = Test;
