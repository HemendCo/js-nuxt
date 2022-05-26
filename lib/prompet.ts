
export default abstract class Prompet {
    private yargs: any;

    public constructor(yargs:any) {
        this.yargs = yargs;
    }

    public static title() : string {
        return this.prototype.constructor.name;
    }

    public abstract handler(): void;

    public call(params: any) {
        this.yargs.parse(params);
        return this;
    }
}