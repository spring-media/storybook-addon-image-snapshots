#!/usr/bin/env node

const program = require('commander');
const { resolve } = require('path');
const { copySync } = require('fs-extra');

console.log(resolve('.'));
console.log(process.cwd());

program
  .command('copy-setup-files')
  .description('copy setup files for jest as well as the test file')
  .action(() => {
    console.log(resolve(__dirname));
    console.log(process.cwd());
  });

program.parse(process.argv);
