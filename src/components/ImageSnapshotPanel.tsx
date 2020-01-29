import React, { FunctionComponent } from 'react';
import { useStorybookApi } from '@storybook/api';
import PropTypes from 'prop-types';
import { Placeholder } from '@storybook/components';
import { ImageSnapshot } from './ImageSnapshot';
import { PARAM_KEY } from '../constants';

export interface ImageSnapshotPanelProps {
  active: boolean;
}

export interface StoryData {
  id: string;
  name: string;
  kind: string;
}

export interface ImageSnapshotStoryParameters {
  snapshotFileName: (storyData: StoryData) => string;
}

export const ImageSnapshotPanel: FunctionComponent<ImageSnapshotPanelProps> = props => {
  const { active } = props;
  const { getCurrentStoryData, getCurrentParameter } = useStorybookApi();

  if (!active || !getCurrentStoryData()) {
    return null;
  }

  // @ts-ignore
  const { id, name, kind } = getCurrentStoryData();
  const { snapshotFileName } = getCurrentParameter<ImageSnapshotStoryParameters>(PARAM_KEY);
  const image = snapshotFileName({ id, name, kind });

  return (
    <div>
      <ImageSnapshot snapshot={image} onError={<Placeholder>No image found.</Placeholder>} />
    </div>
  );
};

ImageSnapshotPanel.propTypes = {
  active: PropTypes.bool.isRequired,
};
