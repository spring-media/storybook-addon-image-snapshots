const { copyTestFile } = require('./copy-test-file');

const snapshotDir = `${process.cwd()}/.image-snapshots`;

copyTestFile({ dest: snapshotDir });
