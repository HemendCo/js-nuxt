import Prompet from '../../prompet';

export default class Help extends Prompet {
  static title() {
    return 'Help';
  }

  handler() {
    this.yargs().showHelp();
  }
}