import Command, { Options, Arguments } from '../command';

export default class Test extends Command {
  aliases = ['run', 'up'];
  command = 'balal <name> [force]';
  description = 'Set a config variable';

  handler() {
    console.log('99999999', this.argv, process.argv)
  }

  arguments(): Arguments {
    return [
      {
        name: 'name',
        describe: 'name is required',
        type: 'string'
        // conflicts: 'email',
      }
    ];
  }

  options(): Options {
    return [
      {
        name: 'force',
        alias: 'f',
        default: false,
        describe: 'Force is optional',
        type: 'boolean',
        // conflicts: 'username'
      }
    ];
  }
}