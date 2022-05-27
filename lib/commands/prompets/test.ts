import Prompet from '../../prompet';

export default class Test extends Prompet {
  static title() {
    return 'Balal';
  }

  handler() {
    const { Form } = require('enquirer');

    const prompt = new Form({
      name: 'user',
      message: 'Please provide the following information:',
      choices: [
        { name: 'firstname', message: 'First Name' },
        { name: 'lastname', message: 'Last Name' },
        { name: 'username', message: 'GitHub username', initial: 'jonschlinkert' }
      ]
    });

    prompt.run()
      .then((value: any) => {
        console.log('Answer:', value)
    
        this.call(['balal', 'a', 'b', 'cc']);
        this.call(['balal', 'a', 'b', 'cc']);
        this.call(['balal', 'a', 'b', 'cc']);
      })
      .catch(console.error);


  }
}