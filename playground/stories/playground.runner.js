import { initImageSnapshots } from '../../dist';
import kebabCase from 'lodash.kebabcase';

initImageSnapshots({
  framework: 'vue',
  storybookUrl: 'http://host.docker.internal:8888',
  getMatchOptions: () => ({
    customSnapshotsDir: '.image-snapshots',
    customSnapshotIdentifier: ({ currentTestName }) => kebabCase(currentTestName),
  }),
});
