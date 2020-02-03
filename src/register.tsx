import * as React from 'react';
import { addons } from '@storybook/addons';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';
import { ImageSnapshotPanel } from './components/ImageSnapshotPanel';

export const register = (): void => {
  addons.register(ADDON_ID, ({ getCurrentParameter, getCurrentStoryData }) => {
    addons.addPanel(PANEL_ID, {
      title: 'Image Snapshot',
      paramKey: PARAM_KEY,
      // eslint-disable-next-line react/prop-types
      render: ({ active, key }) => (
        <ImageSnapshotPanel
          active={active}
          getCurrentParameter={getCurrentParameter}
          getCurrentStoryData={getCurrentStoryData}
          key={key}
        />
      ),
    });
  });
};
