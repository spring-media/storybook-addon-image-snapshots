import { addParameters } from '@storybook/vue';
import { PARAM_KEY } from '../../dist/constants';

addParameters({
  [PARAM_KEY]: {
    snapshots: ({ id }) => [`storyshots-${id.replace('--', '-')}-snap.png`],
  },
});
