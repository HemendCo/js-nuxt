
import yargs from 'yargs';

export interface Option extends yargs.PositionalOptions {
    name: string;
    required?: boolean; // demandOption
}

export interface Options extends Array<Option> {}

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
    private yargs: any;
    protected aliases: Array<string> = [];
    protected abstract cmd: string;
    protected abstract description: string;

    public constructor(yargs:any) {
        this.yargs = yargs;
    }

    public options(): Options {
        return [];
    }
    public abstract handler(args: unknown, _?: any, $0?: any): void;

    public getAliases() : Array<string> {
        return this.aliases;
    }

    public getCmd() : string|Array<string> {
        return this.cmd;
    }

    public getDescription(): string {
        return this.description;
    }

    public call(params: any) {
        this.yargs.parse(params);
        return this;
    }
}