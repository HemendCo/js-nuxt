"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(yargs, colors) {
        this.aliases = [];
        this.setArgv = (argv) => {
            let { _, $0 } = argv, args = __rest(argv, ["_", "$0"]);
            $0 = $0.replace(new RegExp('\u001b[^m]*?m', 'g'), ''); // replace ANSI colors
            this.argv = { args, $0, _ };
            return this;
        };
        this.yargs = () => {
            return this._yargs;
        };
        this._yargs = yargs;
        this._colors = colors;
    }
    arguments() {
        return [];
    }
    options() {
        return [];
    }
    get(name) {
        var _a, _b;
        return (_b = (_a = this.argv) === null || _a === void 0 ? void 0 : _a.args[name]) !== null && _b !== void 0 ? _b : null;
    }
    getAliases() {
        return this.aliases;
    }
    getCommand() {
        return this.command;
    }
    getDescription() {
        return this.description;
    }
    call(params) {
        this._yargs.parse(params);
        return this;
    }
    colors() {
        return this._colors;
    }
}
exports.default = Command;
