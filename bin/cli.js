#!/usr/bin/env node

const program = require('commander');
const { copyTestFile } = require('../scripts/copy-test-file');

program
  .command('init')
  .description('copy test file into current working directory')
  .action(() => copyTestFile({ dest: `${process.cwd()}/.image-snapshots` }));

program.parse(process.argv);
