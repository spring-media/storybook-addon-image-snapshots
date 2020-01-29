import { addParameters } from '@storybook/html';
import { PARAM_KEY } from '../../dist/constants';

const viewports = {
  medium: {
    name: 'Medium (600px - 1024px)',
    styles: {
      width: '1024px',
      height: '960px',
    },
  },
  small: {
    name: 'Small (0px - 600px)',
    styles: {
      width: '600px',
      height: '800px',
    },
  },
};

addParameters({
  [PARAM_KEY]: {
    snapshotFileName: ({ id }) => `${id.replace('--', '-')}-snap.png`,
  },
  viewport: { viewports },
});
