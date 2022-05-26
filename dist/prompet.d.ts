export default abstract class Prompet {
    private yargs;
    constructor(yargs: any);
    static title(): string;
    abstract handler(): void;
    call(params: any): this;
}
