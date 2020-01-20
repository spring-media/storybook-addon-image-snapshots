const { resolve } = require('path');
const { copyFileSync } = require('fs');
const { ensureSnapshotsDir } = require('./ensure-snapshots-dir');

const copyTestFile = ({ dest }) => {
  ensureSnapshotsDir(dest);

  const source = resolve(__dirname, '..', 'image-snapshots.test.js');

  copyFileSync(source, `${dest}/image-snapshots.test.js`);
};

module.exports = {
  copyTestFile,
};
