import { initImageSnapshots } from '../../dist';
import kebabCase from 'lodash.kebabcase';

const { MODE = 'server' } = process.env; // @see package.json test:static script

initImageSnapshots({
  framework: 'html',
  storybookUrl: MODE === 'static' ? 'file:///opt/storybook-static' : 'http://host.docker.internal:8888',
  getMatchOptions: () => ({
    customSnapshotsDir: '.image-snapshots',
    customSnapshotIdentifier: ({ currentTestName }) => kebabCase(currentTestName),
  }),
});
