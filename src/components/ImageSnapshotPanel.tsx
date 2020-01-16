import React, { FunctionComponent } from 'react';
import { useStorybookApi } from '@storybook/api';
import PropTypes from 'prop-types';
import { ImageSnapshot } from './ImageSnapshot';

interface ImageSnapshotPanelProps {
  active: boolean;
}

export const getSnapshotNameByStoryId = (storyId: string): string =>
  `storyshots-${storyId.replace('--', '-')}-snap.png`;

export const ImageSnapshotPanel: FunctionComponent<ImageSnapshotPanelProps> = props => {
  const { active } = props;

  const { getCurrentStoryData } = useStorybookApi();

  if (!active) {
    return null;
  }

  const { id } = getCurrentStoryData();
  const snapshot = getSnapshotNameByStoryId(id);

  return (
    <div>
      <ImageSnapshot snapshot={snapshot} />
    </div>
  );
};

ImageSnapshotPanel.propTypes = {
  active: PropTypes.bool.isRequired,
};
