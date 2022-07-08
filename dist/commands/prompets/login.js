"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompet_1 = __importDefault(require("../../prompet"));
class Test extends prompet_1.default {
    static title() {
        return 'Login';
    }
    handler() {
        this.call(['login']);
    }
}
exports.default = Test;
