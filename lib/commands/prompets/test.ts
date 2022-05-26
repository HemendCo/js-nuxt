import Prompet from '../../prompet';

export default class Test extends Prompet {
    static title() {
        return 'Balal';
    }

    handler() {
        this.call(['balal', 'a', 'b', 'cc']);
        this.call(['balal', 'a', 'b', 'cc']);
        this.call(['balal', 'a', 'b', 'cc']);
    }
}