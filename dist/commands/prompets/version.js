"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompet_1 = __importDefault(require("../../prompet"));
class Version extends prompet_1.default {
    static title() {
        return 'Version';
    }
    handler() {
        // this.yargs().showVersion((s: any) => console.log('Version:', s));
        this.yargs().showVersion();
    }
}
exports.default = Version;
