#!/usr/bin/env node

import Command, { Options, Option } from './command';
import Prompet from './prompet';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

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
      var cmd: Command = new cmdClass(yargs);

      yargs
        .command({
          command: cmd.getCmd(),
          aliases: cmd.getAliases(),
          describe: cmd.getDescription(),
          builder: (_yargs: yargs.Argv) => {
            let options: Options = cmd.options();
            
            options.forEach( function( option: Option ) {
              option.demandOption = option.required;
              
              if(option.required) {
                _yargs.positional(option.name, option);
              } else {
                _yargs.option(option.name, option);
              }
            })

            return _yargs;
          },
          handler: (argv: yargs.Arguments) => {
            const {_, $0, ...args} = argv;
            cmd.handler(args, _, $0);
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
      console.log(colors.info('This command will be run by cli prompts (default)'));
      
      const { AutoComplete } = require('enquirer');

      let choices : any = [];
      fs.readdirSync(__dirname + '/commands/prompets/').forEach( function( file:any ) {
        if (path.extname(file) == '.ts') {
          let filepath = './commands/prompets/' + path.basename(path.basename(file, '.d.ts'), '.ts');
          let prtClass = require( filepath ).default;

          if(prtClass.prototype instanceof Prompet) {
            choices.push({
              name: prtClass.title(),
              value: prtClass
            });
          }
        }
      });

      const selectCommand = () => {
        const prompt = new AutoComplete({
          name: 'Command',
          message: colors.success('Type the desired command or select from the list below:'),
          limit: 10,
          initial: 0,
          choices: choices
        });

        return prompt.run();
      }

      const run = async () => {
        try {
          const command = await selectCommand();
          const prt: Prompet = new command(yargs);
          prt.handler();
        } catch(e) {}
      }

      run();
    }
  })
  .scriptName(colors.warning('hnuxt'))
  .usage('\nUsage:\n\u200B ' + colors.warning('$0') + colors.success(' <cmd> [args]'))
  .version('1.0.0')
  .help()
  .alias('help', 'h')
  .argv;

/*
import Command, { Options, Option, OptionFinal } from './command';
import Prompet from './prompet';

const fs = require('fs');
const path = require( 'path' );
const colors = require('ansi-colors');
const yargs = require( 'yargs' );

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
      var cmd: Command = new cmdClass(yargs);

      yargs
        .command({
          command: cmd.getCmd(),
          aliases: cmd.getAliases(),
          desc: cmd.getDescription(),
          builder: (_yargs: any) => {
            let options: Options = cmd.options();
            
            options.forEach( function( option: Option ) {
              let opt: OptionFinal = {
                type: option.type ?? 'string',
                alias: option.alias ,
                describe: option.desc ?? null,
                required: option.required ?? false,
                default: option.default ?? null,
                choices: option.choices ?? null,
                deprecated: option.deprecated ?? false,
                positional: option.positional ?? false,
                conflicts: option.conflicts ?? null,
                coerce: option.coerce ?? null,
              }

              if(opt.default === null) {
                delete opt['default'];
              }
              if(opt.conflicts === null) {
                delete opt['conflicts'];
              }
              if(opt.coerce === null) {
                delete opt['coerce'];
              }

              if(option.positional) {
                _yargs.positional(option.name, opt);
              } else {
                _yargs.option(option.name, opt);
              }
            })
          },
          handler: (argv: any) => {
            const {_, $0, ...args} = argv;
            cmd.handler(args, _, $0);
          }
        });
    }
  }
});

const argv = yargs
  .command({
    command: '$0',
    desc: 'The default command will be run by Stylish CLI prompts',
    builder: (_yargs: any) => {
    },
    handler: (argv: any) => {
      console.log(colors.info('This command will be run by cli prompts (default)'));
      
      const { AutoComplete } = require('enquirer');

      let choices : any = [];
      fs.readdirSync(__dirname + '/commands/prompets/').forEach( function( file:any ) {
        if (path.extname(file) == '.ts') {
          let filepath = './commands/prompets/' + path.basename(path.basename(file, '.d.ts'), '.ts');
          let prtClass = require( filepath ).default;

          if(prtClass.prototype instanceof Prompet) {
            choices.push({
              name: prtClass.getName(),
              value: prtClass
            });
          }
        }
      });

      const selectCommand = () => {
        const prompt = new AutoComplete({
          name: 'Command',
          message: colors.success('Type the desired command or select from the list below:'),
          limit: 10,
          initial: 0,
          choices: choices
        });

        return prompt.run();
      }

      const run = async () => {
        try {
          const command = await selectCommand();
          const prt: Prompet = new command(yargs);
          prt.handler();
        } catch(e) {}
      }

      run();
    }
  })
  .scriptName(colors.warning('hnuxt'))
  .usage('\nUsage:\n\u200B ' + colors.warning('$0') + colors.success(' <cmd> [args]'))
  .version('1.0.0')
  .help()
  .alias('help', 'h')
  .argv;

interface HnuxtInterface {
    yargs: any;
}


/*
const doPrompts = () => {
  const semver = require('semver');

  const template: string = `{
  "name": "\${name}",
  "description": "\${description}",
  "version": "\${version}",
  "homepage": "https://github.com/\${username}/\${name}",
  "author": "\${author_name} (https://github.com/\${username})",
  "repository": "\${username}/\${name}",
  "license": "\${license:MIT}"
}`;

  const prompt = new Snippet({
    name: 'username',
    message: 'Fill out the fields in package.json',
    required: true,
    fields: [
      {
      name: 'author_name',
      message: 'Author Name'
      },
      {
      name: 'version',
      validate(value:any, state:any, item:any, index:number) {
        if (item && item.name === 'version' && !semver.valid(value)) {
        return prompt.styles.danger('version should be a valid semver value');
        }
        
        return true;
      }
      }
    ],
    template
    });
    
  return prompt.run();

};

const run = async () => {
  try {
    const command = await doPrompts();
    console.log(command);
  } catch(e) {}
}

run();
*/