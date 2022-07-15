import yargs from 'yargs';
export default abstract class Prompet {
    private _yargs;
    private _colors;
    constructor(yargs: any, colors: any);
    static title(): string;
    abstract handler(): void;
    call(params: any): this;
    protected readonly yargs: () => yargs.Argv;
    protected colors(): any;
}
