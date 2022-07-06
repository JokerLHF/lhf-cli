import { program } from 'commander';
import createAction from './commands/create';

program.version('1.0.2');

program
  .command("create <app-name>")
  .description("create a new project")
  .action(name => createAction(name))

program.parse(process.argv);