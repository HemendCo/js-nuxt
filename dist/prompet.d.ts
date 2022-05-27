import yargs from 'yargs';
export default abstract class Prompet {
    private _yargs;
    constructor(yargs: any);
    static title(): string;
    abstract handler(): void;
    call(params: any): this;
    protected readonly yargs: () => yargs.Argv;
}
