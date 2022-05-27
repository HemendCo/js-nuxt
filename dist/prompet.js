"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Prompet {
    constructor(yargs) {
        this.yargs = () => {
            return this._yargs;
        };
        this._yargs = yargs;
    }
    static title() {
        return this.prototype.constructor.name;
    }
    call(params) {
        this._yargs.parse(params);
        return this;
    }
}
exports.default = Prompet;
