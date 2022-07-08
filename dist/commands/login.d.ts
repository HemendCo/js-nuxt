import Command, { Options } from '../command';
export default class Test extends Command {
    command: string;
    description: string;
    handler(): void;
    options(): Options;
}
