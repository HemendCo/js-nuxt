import yargs from 'yargs';
export interface Option extends yargs.PositionalOptions {
    name: string;
    required?: boolean;
}
export interface Options extends Array<Option> {
}
export interface Alias {
    key: string;
    alias: string;
}
export interface Choices {
    key: string;
    choices: Array<string>;
}
export interface Help {
    option: string;
    description: string;
}
export default abstract class Command {
    private yargs;
    protected aliases: Array<string>;
    protected abstract cmd: string;
    protected abstract description: string;
    constructor(yargs: any);
    options(): Options;
    abstract handler(args: unknown, _?: any, $0?: any): void;
    getAliases(): Array<string>;
    getCmd(): string | Array<string>;
    getDescription(): string;
    call(params: any): this;
}
