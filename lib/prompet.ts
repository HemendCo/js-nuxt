import yargs from 'yargs';

export default abstract class Prompet {
  private _yargs: yargs.Argv;
  private _colors: any;

  public constructor(yargs:any, colors: any) {
    this._yargs = yargs;
    this._colors = colors
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

  protected colors() {
      return this._colors;
  }
}