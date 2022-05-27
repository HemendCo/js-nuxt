import Command, { Options, Arguments } from '../command';
export default class Test extends Command {
    aliases: string[];
    command: string;
    description: string;
    handler(): void;
    arguments(): Arguments;
    options(): Options;
}
