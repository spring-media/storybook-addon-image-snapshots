#!/usr/bin/env node

const program = require('commander');
const { resolve } = require('path');
const { copyFileSync } = require('fs');

program
  .command('copy-test-file')
  .description('copy test file into current working directory')
  .action(() => {
    const source = resolve(__dirname, 'image-snapshots.test.js');
    const dest = `${process.cwd()}/image-snapshots.test.js`;

    copyFileSync(source, dest);
  });

program.parse(process.argv);
