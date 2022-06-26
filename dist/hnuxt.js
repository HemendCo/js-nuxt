#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
const prompet_1 = __importDefault(require("./prompet"));
const yargs_1 = __importDefault(require("yargs"));
const fs = require('fs');
const path = require('path');
const colors = require('ansi-colors');
colors.theme({
    danger: colors.red,
    dark: colors.dim.gray,
    disabled: colors.gray,
    em: colors.italic,
    heading: colors.bold.underline,
    info: colors.cyan,
    muted: colors.dim,
    primary: colors.blue,
    strong: colors.bold,
    success: colors.green,
    underline: colors.underline,
    warning: colors.yellow
});
fs.readdirSync(__dirname + '/commands/').forEach(function (file) {
    if (path.extname(file) == '.ts') {
        let filepath = './commands/' + path.basename(path.basename(file, '.d.ts'), '.ts');
        let cmdClass = require(filepath).default;
        if (cmdClass.prototype instanceof command_1.default) {
            var cmd = new cmdClass(yargs_1.default);
            yargs_1.default
                .command({
                command: cmd.getCommand(),
                aliases: cmd.getAliases(),
                describe: cmd.getDescription(),
                builder: (_yargs) => {
                    let args = cmd.arguments();
                    let options = cmd.options();
                    args.forEach(function (arg) {
                        _yargs.positional(arg.name, arg);
                    });
                    options.forEach(function (option) {
                        _yargs.option(option.name, option);
                    });
                    return _yargs;
                },
                handler: (argv) => {
                    cmd.setArgv(argv).handler();
                }
            });
        }
    }
});
const argv = yargs_1.default
    .command({
    command: '$0',
    describe: 'The default command will be run by Stylish CLI prompts',
    builder: (_yargs) => {
        return _yargs;
    },
    handler: (argv) => {
        if (argv._.length > 0 || Object.keys(argv).length > 2) {
            console.log(colors.danger('The command "' + process.argv.slice(2).join(' ') + '" was not found.'));
            yargs_1.default.showHelp();
            return;
        }
        console.log(colors.info('This command will be run by cli prompts (default)'));
        const { AutoComplete } = require('enquirer');
        let choices = [];
        let commands = {};
        fs.readdirSync(__dirname + '/commands/prompets/').forEach(function (file, index) {
            if (path.extname(file) == '.ts') {
                let filepath = './commands/prompets/' + path.basename(path.basename(file, '.d.ts'), '.ts');
                let prtClass = require(filepath).default;
                if (prtClass.prototype instanceof prompet_1.default) {
                    let prtName = prtClass.title().toString();
                    let prtValue = prtClass;
                    if (commands.hasOwnProperty(prtName)) {
                        prtName += ' <';
                        if (prtName != prtClass.name) {
                            prtName += prtClass.name + '-';
                        }
                        prtName += (index + 1) + '>';
                    }
                    commands[prtName] = prtValue;
                    choices.push(prtName);
                }
            }
        });
        const sortAlphabetically = (ascending) => {
            return (ca, cb) => {
                const a = ca.toLowerCase(); // ignore upper and lowercase
                const b = cb.toLowerCase(); // ignore upper and lowercase
                // equal items sort equally
                if (a === b) {
                    return 0;
                }
                // 'version' or 'help' sort after anything else
                else if (['version', 'help'].includes(a)) {
                    return 1;
                }
                else if (['version', 'help'].includes(b)) {
                    return -1;
                }
                // otherwise, if we're ascending, lowest sorts first
                else if (ascending) {
                    return a < b ? -1 : 1;
                }
                // if descending, highest sorts first
                else {
                    return a < b ? 1 : -1;
                }
            };
        };
        choices.sort(sortAlphabetically(true));
        const prompt = new AutoComplete({
            name: 'Command',
            message: colors.success('Type the desired command or select from the list below:'),
            limit: 10,
            initial: 0,
            footer() {
                return colors.dim('(Scroll up and down to reveal more choices)');
            },
            choices: choices
        });
        prompt.run()
            .then((prtName) => {
            const prt = new commands[prtName](yargs_1.default);
            prt.handler();
        })
            .catch(console.error);
    }
})
    .scriptName(colors.warning('hnuxt'))
    .usage('\nUsage:\n\u200B ' + colors.warning('$0') + colors.success(' <command> [args]'))
    // .version('1.0.0')
    .help()
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;
