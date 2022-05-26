import Command from '../command';

export default class Test extends Command {
    aliases = ['run', 'up'];
    cmd = 'balal <key> [value]';
    description = 'Set a config variable';

    handler(args:Array<string>) {
        console.log('99999999', args)
    }

    options() {
        return [
            {
                name: 'key',
                describe: 'Key is required',
                // conflicts: 'email',
            },
            {
                name: 'value',
                describe: 'Value is required',
                // conflicts: 'username'
            }
        ];
    }
}