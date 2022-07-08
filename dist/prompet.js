"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Prompet {
    constructor(yargs, colors) {
        this.yargs = () => {
            return this._yargs;
        };
        this._yargs = yargs;
        this._colors = colors;
    }
    static title() {
        return this.prototype.constructor.name;
    }
    call(params) {
        this._yargs.parse(params);
        return this;
    }
    colors() {
        return this._colors;
    }
}
exports.default = Prompet;
