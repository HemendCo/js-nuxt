
import yargs from 'yargs';

export interface Argument extends yargs.PositionalOptions {
    name: string;
}

export interface Arguments extends Array<Argument> {}

export interface Option extends yargs.Options {
    name: string;
    default: any;
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

export interface Argv {
    args: {[key: string]:unknown};
    $0: string;
    _: Array<string | number>;
}

export default abstract class Command {
    private _yargs: yargs.Argv;
    protected aliases: Array<string> = [];
    protected abstract command: string;
    protected abstract description: string;
    protected argv: Argv|undefined;

    public constructor(yargs: yargs.Argv) {
        this._yargs = yargs;
    }

    public arguments(): Arguments {
        return [];
    }

    public options(): Options {
        return [];
    }
    
    public readonly setArgv = (argv: yargs.Arguments): this => {
        let {_, $0, ...args} = argv;

        $0 = $0.replace(new RegExp('\u001b[^m]*?m', 'g'), '') // replace ANSI colors
        this.argv = {args, $0, _};
        
        return this;
    }

    public get(name: string): any {
        return this.argv?.args[name] ?? null;
    }

    public abstract handler(): void;

    public getAliases() : Array<string> {
        return this.aliases;
    }

    public getCommand() : string|Array<string> {
        return this.command;
    }

    public getDescription(): string {
        return this.description;
    }

    public call(params: any) {
        this._yargs.parse(params);
        return this;
    }

    protected readonly yargs = (): yargs.Argv => {
      return this._yargs;
    }
}