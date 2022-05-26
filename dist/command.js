"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(yargs) {
        this.aliases = [];
        this.yargs = yargs;
    }
    options() {
        return [];
    }
    getAliases() {
        return this.aliases;
    }
    getCmd() {
        return this.cmd;
    }
    getDescription() {
        return this.description;
    }
    call(params) {
        this.yargs.parse(params);
        return this;
    }
}
exports.default = Command;
