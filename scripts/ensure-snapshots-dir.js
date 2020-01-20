const { existsSync, mkdirSync } = require('fs');

const ensureSnapshotsDir = dir => {
  if (existsSync(dir)) {
    return;
  }

  mkdirSync(dir, { recursive: true });
};

module.exports = {
  ensureSnapshotsDir,
};
