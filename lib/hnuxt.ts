#!/usr/bin/env node

import Command, { Options, Option, Arguments, Argument } from './command';
import Prompet from './prompet';
import yargs from 'yargs';

const fs = require('fs');
const path = require( 'path' );
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

fs.readdirSync(__dirname + '/commands/').forEach( function( file:any ) {
  if (path.extname(file) == '.ts') {
    let filepath = './commands/' + path.basename(path.basename(file, '.d.ts'), '.ts');
    let cmdClass = require( filepath ).default;

    if(cmdClass.prototype instanceof Command) {
      var cmd: Command = new cmdClass(yargs, colors);

      yargs
        .command({
          command: cmd.getCommand(),
          aliases: cmd.getAliases(),
          describe: cmd.getDescription(),
          builder: (_yargs: yargs.Argv) => {
            let args: Arguments = cmd.arguments();
            let options: Options = cmd.options();
            
            args.forEach( function( arg: Argument ) {
                _yargs.positional(arg.name, arg);
            })
            
            options.forEach( function( option: Option ) {
                _yargs.option(option.name, option);
            })

            return _yargs;
          },
          handler: (argv: yargs.Arguments) => {
            cmd.setArgv(argv).handler();
          }
        });
    }
  }
});


const argv = yargs
  .command({
    command: '$0',
    describe: 'The default command will be run by Stylish CLI prompts',
    builder: (_yargs: yargs.Argv) => {
      return _yargs;
    },
    handler: (argv: yargs.Arguments) => {
      if(argv._.length > 0 || Object.keys(argv).length > 2) {
        console.log(colors.danger('The command "' + process.argv.slice(2).join(' ') + '" was not found.'));
        yargs.showHelp()
        return;
      }

      console.log(colors.info('This command will be run by cli prompts (default)'));
      
      const { AutoComplete } = require('enquirer');

      let choices : any = [];
      let commands : {[key: string]:any|unknown} = {};
      
      fs.readdirSync(__dirname + '/commands/prompets/').forEach( function( file:any, index: number ) {
        if (path.extname(file) == '.ts') {
          let filepath = './commands/prompets/' + path.basename(path.basename(file, '.d.ts'), '.ts');
          let prtClass = require( filepath ).default;

          if(prtClass.prototype instanceof Prompet) {
            let prtName = prtClass.title().toString();
            let prtValue = prtClass;
            if(commands.hasOwnProperty(prtName)) {
              prtName += ' <' ;
              if(prtName != prtClass.name) {
                prtName += prtClass.name + '-';
              }
              prtName += ( index + 1 ) + '>';
            }
            
            commands[prtName] = prtValue;
            choices.push(prtName);
          }
        }
      });

      const sortAlphabetically = (ascending:boolean) => {
        return (ca:string, cb:string) => {
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
        }
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
        .then((prtName: string) => {
            const prt: Prompet = new commands[prtName](yargs, colors);
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
