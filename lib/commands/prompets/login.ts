import Prompet from '../../prompet';

export default class Test extends Prompet {
  static title() {
    return 'Login';
  }

  handler() {
    this.call(['login']);
  }
}