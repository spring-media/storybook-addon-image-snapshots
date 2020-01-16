import * as React from 'react';
import { addons } from '@storybook/addons';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';
import { ImageSnapshotPanel } from './components/ImageSnapshotPanel';

export const register = (): void => {
  addons.register(ADDON_ID, () => {
    addons.addPanel(PANEL_ID, {
      title: 'Image Snapshot',
      paramKey: PARAM_KEY,
      render: ({ active, key }) => <ImageSnapshotPanel active={active} key={key} />,
    });
  });
};
