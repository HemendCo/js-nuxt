import Prompet from '../../prompet';

export default class Version extends Prompet {
  static title() {
    return 'Version';
  }

  handler() {
    this.yargs().showVersion((s: any) => console.log('Version:', s));
  }
}