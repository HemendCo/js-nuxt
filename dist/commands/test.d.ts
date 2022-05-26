import Command from '../command';
export default class Test extends Command {
    aliases: string[];
    cmd: string;
    description: string;
    handler(args: Array<string>): void;
    options(): {
        name: string;
        describe: string;
    }[];
}
