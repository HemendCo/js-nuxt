import yargs from 'yargs';

export default abstract class Prompet {
  private _yargs: yargs.Argv;

  public constructor(yargs:any) {
    this._yargs = yargs;
  }

  public static title() : string {
    return this.prototype.constructor.name;
  }

  public abstract handler(): void;

  public call(params: any) {
    this._yargs.parse(params);
    return this;
  }

  protected readonly yargs = (): yargs.Argv => {
    return this._yargs;
  }
}