import yargs from 'yargs';
export interface Argument extends yargs.PositionalOptions {
    name: string;
}
export interface Arguments extends Array<Argument> {
}
export interface Option extends yargs.Options {
    name: string;
    default: any;
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
export interface Argv {
    args: {
        [key: string]: unknown;
    };
    $0: string;
    _: Array<string | number>;
}
export default abstract class Command {
    private _yargs;
    protected aliases: Array<string>;
    protected abstract command: string;
    protected abstract description: string;
    protected argv: Argv | undefined;
    constructor(yargs: yargs.Argv);
    arguments(): Arguments;
    options(): Options;
    readonly setArgv: (argv: yargs.Arguments) => this;
    get(name: string): any;
    abstract handler(): void;
    getAliases(): Array<string>;
    getCommand(): string | Array<string>;
    getDescription(): string;
    call(params: any): this;
    protected readonly yargs: () => yargs.Argv;
}
