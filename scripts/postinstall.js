const { copyTestFile } = require('./copy-test-file');

const snapshotDir = `${process.env.INIT_CWD}/.image-snapshots`;

copyTestFile({ dest: snapshotDir });
